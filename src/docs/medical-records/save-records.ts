export const saveRecords = {
  post: {
    tags: ["Medical Records"],
    description: "Save Medical Records",
    operationId: "saveMedicalRecords",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/MedicalRecords",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Medical records created successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
