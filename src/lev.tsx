import { LevaErrors } from "solid-leva/types/utils";

const Store = function() {
    const store = create(subscribeWithSelector(() => ({
      data: {}
    })));
    const eventEmitter = createEventEmitter();
    this.useStore = store;
    this.storeId = getUid();
    const folders = {};
    const orderedPaths = new Set();
    this.getVisiblePaths = () => {
      const data = this.getData();
      const paths = Object.keys(data);
      const hiddenFolders = [];
      Object.entries(folders).forEach(([path, settings]) => {
        if (settings.render && paths.some((p2) => p2.indexOf(path) === 0) && !settings.render(this.get))
          hiddenFolders.push(path + ".");
      });
      const visiblePaths = [];
      orderedPaths.forEach((path) => {
        if (path in data && data[path].__refCount > 0 && hiddenFolders.every((p2) => path.indexOf(p2) === -1) && (!data[path].render || data[path].render(this.get)))
          visiblePaths.push(path);
      });
      return visiblePaths;
    };
    this.setOrderedPaths = (newPaths) => {
      newPaths.forEach((p2) => orderedPaths.add(p2));
    };
    this.orderPaths = (paths) => {
      this.setOrderedPaths(paths);
      return paths;
    };
    this.disposePaths = (paths) => {
      store.setState((s2) => {
        const data = s2.data;
        paths.forEach((path) => {
          if (path in data) {
            const input2 = data[path];
            input2.__refCount--;
            if (input2.__refCount === 0 && input2.type in SpecialInputs) {
              delete data[path];
            }
          }
        });
        return {
          data
        };
      });
    };
    this.dispose = () => {
      store.setState(() => {
        return {
          data: {}
        };
      });
    };
    this.getFolderSettings = (path) => {
      return folders[path] || {};
    };
    this.getData = () => {
      return store.getState().data;
    };
    this.addData = (newData, override) => {
      store.setState((s2) => {
        const data = s2.data;
        Object.entries(newData).forEach(([path, newInputData]) => {
          let input2 = data[path];
          if (!!input2) {
            const _a = newInputData, {
              type,
              value
            } = _a, rest2 = __objRest(_a, [
              "type",
              "value"
            ]);
            if (type !== input2.type) {
              warn(LevaErrors.INPUT_TYPE_OVERRIDE, type);
            } else {
              if (input2.__refCount === 0 || override) {
                Object.assign(input2, rest2);
              }
              input2.__refCount++;
            }
          } else {
            data[path] = __spreadProps(__spreadValues({}, newInputData), {
              __refCount: 1
            });
          }
        });
        return {
          data
        };
      });
    };
    this.setValueAtPath = (path, value, fromPanel) => {
      store.setState((s2) => {
        const data = s2.data;
        updateInput(data[path], value, path, this, fromPanel);
        return {
          data
        };
      });
    };
    this.setSettingsAtPath = (path, settings) => {
      store.setState((s2) => {
        const data = s2.data;
        data[path].settings = __spreadValues(__spreadValues({}, data[path].settings), settings);
        return {
          data
        };
      });
    };
    this.disableInputAtPath = (path, flag) => {
      store.setState((s2) => {
        const data = s2.data;
        data[path].disabled = flag;
        return {
          data
        };
      });
    };
    this.set = (values, fromPanel) => {
      store.setState((s2) => {
        const data = s2.data;
        Object.entries(values).forEach(([path, value]) => {
          try {
            updateInput(data[path], value, void 0, void 0, fromPanel);
          } catch {
          }
        });
        return {
          data
        };
      });
    };
    this.getInput = (path) => {
      try {
        return this.getData()[path];
      } catch (e2) {
        warn(LevaErrors.PATH_DOESNT_EXIST, path);
      }
    };
    this.get = (path) => {
      var _a;
      return (_a = this.getInput(path)) == null ? void 0 : _a.value;
    };
    this.emitOnEditStart = (path) => {
      eventEmitter.emit(`onEditStart:${path}`, this.get(path), path, __spreadProps(__spreadValues({}, this.getInput(path)), {
        get: this.get
      }));
    };
    this.emitOnEditEnd = (path) => {
      eventEmitter.emit(`onEditEnd:${path}`, this.get(path), path, __spreadProps(__spreadValues({}, this.getInput(path)), {
        get: this.get
      }));
    };
    this.subscribeToEditStart = (path, listener) => {
      eventEmitter.on(`onEditStart:${path}`, listener);
      return () => eventEmitter.off(path, listener);
    };
    this.subscribeToEditEnd = (path, listener) => {
      eventEmitter.on(`onEditEnd:${path}`, listener);
      return () => eventEmitter.off(path, listener);
    };
    const _getDataFromSchema = (schema2, rootPath, mappedPaths) => {
      const data = {};
      Object.entries(schema2).forEach(([key, rawInput]) => {
        if (key === "")
          return warn(LevaErrors.EMPTY_KEY);
        let newPath = join(rootPath, key);
        if (rawInput.type === SpecialInputs.FOLDER) {
          const newData = _getDataFromSchema(rawInput.schema, newPath, mappedPaths);
          Object.assign(data, newData);
          if (!(newPath in folders))
            folders[newPath] = rawInput.settings;
        } else if (key in mappedPaths) {
          warn(LevaErrors.DUPLICATE_KEYS, key, newPath, mappedPaths[key].path);
        } else {
          const normalizedInput = normalizeInput(rawInput, key, newPath, data);
          if (normalizedInput) {
            const {
              type,
              options,
              input: input2
            } = normalizedInput;
            const _a = options, {
              onChange,
              transient,
              onEditStart,
              onEditEnd
            } = _a, _options = __objRest(_a, [
              "onChange",
              "transient",
              "onEditStart",
              "onEditEnd"
            ]);
            data[newPath] = __spreadProps(__spreadValues(__spreadValues({
              type
            }, _options), input2), {
              fromPanel: true
            });
            mappedPaths[key] = {
              path: newPath,
              onChange,
              transient,
              onEditStart,
              onEditEnd
            };
          } else {
            warn(LevaErrors.UNKNOWN_INPUT, newPath, rawInput);
          }
        }
      });
      return data;
    };
    this.getDataFromSchema = (schema2) => {
      const mappedPaths = {};
      const data = _getDataFromSchema(schema2, "", mappedPaths);
      return [data, mappedPaths];
    };
  };