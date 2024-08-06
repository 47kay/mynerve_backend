export const updateRecords = {
  put: {
    tags: ["Medical Records"],
    description: "Update  Medical Records",
    operationId: "updateMedicalRecords",
    parameters: [
      {
        name: "id", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "Medical records  id", // param desc.
      },
    ],
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
        description: "Medical Records updated successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
