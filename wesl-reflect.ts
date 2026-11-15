// wesl-plugin build extension: `?reflect` imports give the linked WGSL, its entry points
// and their bind group layout entries.
import { bindIdents, link, noSuffix, parseSrcModule } from "wesl";
import type { AttributeElem, DeclIdent, FnElem, GlobalVarElem, Scope, TypeRefElem } from "wesl";
import type { PluginExtension } from "wesl-plugin";

const ACCESS = { read: "read-only", write: "write-only", read_write: "read-write" } as const;
const SAMPLE_TYPES = { f32: "float", i32: "sint", u32: "uint" } as const;
const DIMENSIONS: Record<string, string> = { "2d_array": "2d-array", cube_array: "cube-array" };

export const reflectExtension: PluginExtension = {
  extensionName: "reflect",
  async emitFn(baseId, api, conditions) {
    const rootModuleName = noSuffix(await api.weslMain(baseId));
    const code = (await link({ weslSrc: await api.weslSrc(), rootModuleName, conditions })).dest;
    return `export default ${JSON.stringify({ code, entries: reflect(code) })};`;
  },
};

function reflect(src: string) {
  const rootAst = parseSrcModule({ modulePath: "package::main", debugFilePath: "linked.wgsl", src });
  bindIdents({ rootAst, resolver: undefined as any }); // already linked: nothing left to resolve
  const text = (e: { start: number; end: number }) => src.slice(e.start, e.end).trim();
  const attribute = (attributes: AttributeElem[] = [], name: string) => {
    const a = attributes.map((a) => a.attribute).find((a) => a.kind === "@attribute" && a.name === name);
    return a?.kind === "@attribute" ? (a.params ?? []).map(text) : undefined;
  };

  const layout = (v: GlobalVarElem) => {
    const type = v.name.typeRef as TypeRefElem;
    const name = type.name.originalName;
    const params = (type.templateParams ?? []).map(text);
    if (name.startsWith("sampler")) return { sampler: name === "sampler" ? {} : { type: "comparison" } };
    if (name.startsWith("texture_storage"))
      return { storageTexture: { format: params[0], access: ACCESS[params[1] as keyof typeof ACCESS] } };
    if (name.startsWith("texture_depth")) return { texture: { sampleType: "depth" } };
    if (name.startsWith("texture_")) {
      const dimension = name.slice("texture_".length);
      const sampleType = SAMPLE_TYPES[params[0] as keyof typeof SAMPLE_TYPES];
      return {
        texture:
          dimension === "2d" ? { sampleType } : { sampleType, viewDimension: DIMENSIONS[dimension] ?? dimension },
      };
    }
    // `var<uniform>` or `var<storage, read_write>`: the address space is plain text in the AST.
    const [, space, access] =
      v.contents
        .filter((c) => c.kind === "text")
        .map(text)
        .join(" ")
        .match(/\w+/g) ?? [];
    return {
      buffer: { type: space === "uniform" ? "uniform" : access === "read_write" ? "storage" : "read-only-storage" },
    };
  };

  const reach = (decl: DeclIdent, seen = new Set<DeclIdent>()) => {
    const visit = (scope: Scope) => {
      for (const child of scope.contents) {
        if (child.kind === "scope" || child.kind === "partial") visit(child);
        else if (
          child.kind === "ref" &&
          child.refersTo?.kind === "decl" &&
          child.refersTo.isGlobal &&
          !seen.has(child.refersTo)
        )
          reach(child.refersTo, seen);
      }
    };
    seen.add(decl);
    if (decl.dependentScope) visit(decl.dependentScope);
    return seen;
  };

  const entries: Record<string, object> = {};
  for (const fn of rootAst.moduleElem.contents.filter((e): e is FnElem => e.kind === "fn")) {
    const stage = (["fragment", "compute", "vertex"] as const).find((s) => attribute(fn.attributes, s));
    if (!stage) continue;
    const bindings = [...reach(fn.name.ident)]
      .map((d) => d.declElem)
      // resources only: a `var<private>` or `var<workgroup>` has no @group
      .filter((e): e is GlobalVarElem => e?.kind === "gvar" && !!attribute(e.attributes, "group"))
      .map((v) => ({
        name: v.name.decl.ident.originalName,
        group: +attribute(v.attributes, "group")![0],
        binding: +attribute(v.attributes, "binding")![0],
        layout: layout(v),
      }))
      .sort((a, b) => a.group - b.group || a.binding - b.binding);
    entries[fn.name.ident.originalName] = {
      stage,
      bindings,
      workgroupSize: attribute(fn.attributes, "workgroup_size")?.map(Number),
    };
  }
  return entries;
}
