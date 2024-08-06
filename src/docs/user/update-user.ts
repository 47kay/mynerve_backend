export const updateUser = {
  put: {
    tags: ["User"],
    description: "Update  user",
    operationId: "updateUser",
    parameters: [
      {
        name: "id", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "A  user id", // param desc.
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
          },
        },
      },
    },
    responses: {
      201: {
        description: "User updated successfully",
      },
      400: {
        description: "Server error",
      },
    },
  },
};
