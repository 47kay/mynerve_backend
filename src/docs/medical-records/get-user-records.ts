export const getUserRecords = {
  // method of operation
  get: {
    tags: ["Medical Records"], // operation's tag.
    description: "Get Medical Records", // operation's desc.
    operationId: "getUserMedicalRecords", // unique operation id.
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
        description: "Users Medical Records  obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/MedicalRecords", // wallet model
            },
          },
        },
      },
    },
  },
};
