export const disapproveRequest = {
  post: {
    tags: ["Request"],
    description: "Disapprove Medical Request",
    operationId: "disapproveRequest",
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
        description: "Request disapprove successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
