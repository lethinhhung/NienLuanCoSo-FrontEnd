class NodeSchemePlugin {
    apply(compiler) {
        compiler.hooks.normalModuleFactory.tap('NodeSchemePlugin', (nmf) => {
            nmf.hooks.beforeResolve.tapAsync('NodeSchemePlugin', (resolveData, callback) => {
                if (resolveData.request.startsWith('node:')) {
                    resolveData.request = resolveData.request.replace(/^node:/, '');
                }
                callback();
            });
        });
    }
}

module.exports = NodeSchemePlugin;
