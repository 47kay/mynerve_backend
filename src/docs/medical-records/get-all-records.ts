export const getMedicalRecords = {
  // method of operation
  get: {
    tags: ["Medical Records"], // operation's tag.
    description: "Get Medical Records", // operation's desc.
    operationId: "getMedicalReords", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Medical Records  were obtained", // response desc.
      },
    },
  },
};
