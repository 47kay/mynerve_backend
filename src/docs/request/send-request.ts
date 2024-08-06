export const sendRequest = {
  post: {
    tags: ["Request"],
    description: "Send Medical Request",
    operationId: "sendRequest",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Request",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Request sent successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
