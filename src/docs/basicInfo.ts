export const basicInfo = {
  openapi: "3.0.3",
  info: {
    title: "NERVE.io API",
    description:
      "NERVE.io API documentation. An integrated medical records database",
    version: "2.0.0",
    produces: ["application/json"],
    contact: {
      name: "Farukade",
      email: "farukadekunle@gmail.com",
      url: "https://github.com/farukade",
    },
  },
  security: [{ JWTAuth: [] }],
};
