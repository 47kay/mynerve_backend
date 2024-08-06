export const getAllProfile = {
  // method of operation
  get: {
    tags: ["Profile"], // operation's tag.
    description: "Get Profile", // operation's desc.
    operationId: "getProfile", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Profile were obtained", // response desc.
      },
    },
  },
};
