export const getHospitalRequest = {
  // method of operation
  get: {
    tags: ["Request"], // operation's tag.
    description: "Get Hospital Request", // operation's desc.
    operationId: "getHospitalRequest", // unique operation id.
    parameters: [
      {
        name: " ", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "A  hospital id", // param desc.
      },
    ], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Hospital request Records  obtained", // response desc.
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
