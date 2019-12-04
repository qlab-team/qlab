module.exports = {
  setupFiles: ["<rootDir>/test/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "identity-obj-proxy"
  }
};
