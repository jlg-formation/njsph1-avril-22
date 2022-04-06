module.exports = {
  apps: [
    {
      name: "Gestion-Stock",
      script: "./dist/server.js",
      env: {
        PORT: 3100,
      },
      env_production: {
        // a completer
      },
    },
  ],
};
