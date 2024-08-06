export const findUserByNerve = {
  // method of operation
  get: {
    tags: ["User"], // operation's tag.
    description: "Get user by username", // operation's desc.
    operationId: "getFind", // unique operation id.
    parameters: [
      {
        name: "nerveId", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "A  username", // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "user obtained", // response desc.
      },
    },
  },
};
