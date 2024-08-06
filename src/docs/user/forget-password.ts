export const forgetPassword = {
  post: {
    tags: ["User"],
    description: "Forget password",
    operationId: "forrgetPassword",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/email",
          },
        },
      },
    },
    responses: {
      201: {
        description: "successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
