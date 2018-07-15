const fs = require('fs'),
  argv = require('yargs').argv;

const config = {
  presets: ["env"],
  plugins: [
    "add-module-exports",
    "transform-es2015-modules-umd"
  ]
};

function removePlugin(plugins, pluginToRemove){
  return plugins.filter(plugin => {
    return plugin !== pluginToRemove;
  });
}

if(argv.env == 'test')
  config.plugins = removePlugin(config.plugins, 'transform-es2015-modules-umd');

fs.writeFileSync('./.babelrc', JSON.stringify(config));
