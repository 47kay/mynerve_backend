export const getSingleUser = {
  // method of operation
  get: {
    tags: ["User"], // operation's tag.
    description: "Get user", // operation's desc.
    operationId: "getUser", // unique operation id.
    parameters: [
      {
        name: "id", // name of the param
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
        description: "user obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User", // wallet model
            },
          },
        },
      },
    },
  },
};
