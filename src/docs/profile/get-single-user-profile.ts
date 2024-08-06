export const getSingleUserProfile = {
  // method of operation
  get: {
    tags: ["Profile"], // operation's tag.
    description: "Get Profile", // operation's desc.
    operationId: "getSingleProfile", // unique operation id.
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
        description: "Profile obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Profile", // wallet model
            },
          },
        },
      },
    },
  },
};
