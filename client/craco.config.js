const path = require("path");
const resolve = (arg) => path.resolve(__dirname, arg);

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src/"),
      "@models": resolve("src/app/models"),
    },
  },
};
