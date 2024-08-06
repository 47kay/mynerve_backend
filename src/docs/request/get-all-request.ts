export const getAllRequest = {
  // method of operation
  get: {
    tags: ["Request"], // operation's tag.
    description: "Get Requests Records", // operation's desc.
    operationId: "getRequest", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Request Records  were obtained", // response desc.
      },
    },
  },
};
