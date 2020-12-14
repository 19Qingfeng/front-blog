module.exports = {
  devServer: {
    port: 9000,
    hot: true,
    proxy: {
      "/api": {
        target: "http://192.168.5.240:8000",
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
};
