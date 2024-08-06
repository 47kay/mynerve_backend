export const getUserRequest = {
  // method of operation
  get: {
    tags: ["Request"], // operation's tag.
    description: "Get User Request", // operation's desc.
    operationId: "getUserRequest", // unique operation id.
    parameters: [
      {
        name: "userId", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "A  user id", // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Users request Records  obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Request", // wallet model
            },
          },
        },
      },
    },
  },
};
