export const deleteProfile = {
  // method of operation
  delete: {
    tags: ["Profile"], // operation's tag.
    description: "Delete Profile", // operation's desc.
    operationId: "deleteProfile", // unique operation id.
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
        description: "Profile deleted", // response desc.
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
