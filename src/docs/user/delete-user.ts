export const deleteUser = {
  // method of operation
  delete: {
    tags: ["User"], // operation's tag.
    description: "Delete user", // operation's desc.
    operationId: "deleteUser", // unique operation id.
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
        description: "user deleted", // response desc.
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
