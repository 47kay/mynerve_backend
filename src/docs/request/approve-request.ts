export const approveRequest = {
  post: {
    tags: ["Request"],
    description: "Approve Medical Request",
    operationId: "approveRequest",
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
        description: "Request approve successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
