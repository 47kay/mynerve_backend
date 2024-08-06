export const createProfile = {
  post: {
    tags: ["Profile"],
    description: "Create Profile",
    operationId: "createProfile",
    parameters: [],
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
        description: "profile created successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
