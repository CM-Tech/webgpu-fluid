import { createSignal } from "solid-js";
import { makeEventListener } from "@solid-primitives/event-listener";

export type Touch = { identifier: number; x: number; y: number; uniform: GPUBuffer };
type Point = { clientX: number; clientY: number; identifier: number };

const randomColor = (t: number) => [
  Math.sin(t + 0) * 0.4 + 0.4,
  Math.sin(t + 2) * 0.4 + 0.4,
  Math.sin(t + 4) * 0.4 + 0.4,
];

export function createTouches(device: GPUDevice) {
  const touches = new Map<number, Touch>();
  const [list, setList] = createSignal<Touch[]>([]);
  const sync = () => setList([...touches.values()]);
  const write = (m: Touch, offset: number, data: number[]) =>
    device.queue.writeBuffer(m.uniform, offset << 2, new Float32Array(data));

  const create = (touch: Point) => {
    const m = {
      identifier: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
      uniform: device.createBuffer({ size: 12 << 2, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST }),
    };
    write(m, 0, [...randomColor(Math.random() * Math.PI * 2), 1, m.x, m.y, 0, 0, m.x, m.y]);
    touches.set(m.identifier, m);
    sync();
  };
  const clampVelocity = (delta: number, len: number, maxLen: number, speed: number) =>
    len * speed > maxLen ? (delta / len) * maxLen : delta * speed;
  const move = (touch: Point) => {
    const m = touches.get(touch.identifier);
    if (!m) return create(touch);
    const [delX, delY] = [touch.clientX - m.x, touch.clientY - m.y];
    [m.x, m.y] = [touch.clientX, touch.clientY];
    const len = Math.hypot(delX, delY);
    const [maxLen, speed] = [2000, 16];
    write(m, 4, [m.x, m.y, clampVelocity(delX, len, maxLen, speed), clampVelocity(delY, len, maxLen, speed)]);
  };
  const destroy = (touch: Point) => {
    const m = touches.get(touch.identifier);
    if (!m) return;
    touches.delete(m.identifier);
    m.uniform.destroy();
    sync();
  };

  makeEventListener(window, "mousemove", (e) => move({ clientX: e.clientX, clientY: e.clientY, identifier: -1 }));
  makeEventListener(window, "wheel", (e) => e.preventDefault(), { passive: false });
  const touchEvents = { touchstart: create, touchmove: move, touchend: destroy } as const;
  for (const [type, handler] of Object.entries(touchEvents)) {
    makeEventListener(
      window,
      type as keyof typeof touchEvents,
      (e) => {
        e.preventDefault();
        destroy({ identifier: -1, clientX: 0, clientY: 0 });
        Array.from(e.changedTouches).forEach(handler);
      },
      { passive: false },
    );
  }

  let t = 0;
  return {
    list,
    endFrame() {
      for (const m of touches.values()) write(m, 6, [0, 0, m.x, m.y]);
      const mouse = touches.get(-1);
      if (mouse) write(mouse, 0, randomColor(t));
      t += 0.1;
    },
  };
}
