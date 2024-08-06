export const updateProfile = {
  put: {
    tags: ["Profile"],
    description: "Update  Profile",
    operationId: "updateProfile",
    parameters: [
      {
        name: "id", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "A  profile id", // param desc.
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Profile",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Profile updated successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
