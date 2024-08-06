export const createUser = {
  post: {
    tags: ["User"],
    description: "Create user",
    operationId: "createUser",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Signup",
          },
        },
      },
    },
    responses: {
      201: {
        description: "User signup successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
