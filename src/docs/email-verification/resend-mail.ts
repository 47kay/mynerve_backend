export const resendEmail = {
  post: {
    tags: ["Email Verification"],
    description: "Resend mail",
    operationId: "resendMail",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResendMail",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Mail resent successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
