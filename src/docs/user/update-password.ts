export const updatePassword = {
  post: {
    tags: ["User"],
    description: "Update user password",
    operationId: "updateUserPassword",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UpdatePassword",
          },
        },
      },
    },
    responses: {
      201: {
        description: "User password updated successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
