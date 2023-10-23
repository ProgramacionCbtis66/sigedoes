const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './app.js', // Tu archivo de entrada principal
  target: 'node', // Indica que es una aplicación Node.js
  externals: [nodeExternals()], // Evita empaquetar módulos de Node
  output: {
    filename: 'bundle.js', // Nombre del archivo de salida
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
  },
  mode: 'production'
};
