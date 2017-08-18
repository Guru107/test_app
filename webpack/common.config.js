var path = require("path");
var commonConfig = {
  context: path.resolve(__dirname, "..", "src"),
  output: {
    path: path.join(__dirname, "..", "public"),
    publicPath: "/assets/"
  }
};

module.exports = commonConfig;
