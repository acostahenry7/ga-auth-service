const hostname = process.env.PROD_DB_HOST || "10.1.100.146";

module.exports = {
  app: {
    port: process.env.AUTH || 3002,
  },
  db: {
    postgres: {
      config: {
        host: "localhost",
        user: "postgres",
        password: "postgres",
        db: "ktmrecall",
        dialect: "postgres",
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      },
    },
  },
  externalSources: {
    sapServer: `http://${hostname}:50001/b1s/v1`,
  },
};
