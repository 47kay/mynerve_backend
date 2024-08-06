export const verifyEmail = {
  post: {
    tags: ["Email Verification"],
    description: "Verify Email",
    operationId: "verifyMail",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/VerifyEmail",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Email verified successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
