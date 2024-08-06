export const deleteRequest = {
  // method of operation
  delete: {
    tags: ["Request"], // operation's tag.
    description: "Delete Request", // operation's desc.
    operationId: "deleteRequest", // unique operation id.
    parameters: [
      {
        name: "id", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "A  request id", // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Request Record deleted", // response desc.
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
