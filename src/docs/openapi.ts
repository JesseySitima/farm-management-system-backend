export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Farm Management API",
    version: "1.0.0",
    description: "API documentation for the Farm Management System",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
  ],
  paths: {
  "/api/auth/register": {
    post: {
      tags: ["Authentication"],
      summary: "Register a new user",
      description: "Creates a new user account.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "first_name",
                "last_name",
                "email",
                "password",
              ],
              properties: {
                first_name: {
                  type: "string",
                  example: "John",
                },
                last_name: {
                  type: "string",
                  example: "Banda",
                },
                email: {
                  type: "string",
                  format: "email",
                  example: "john@example.com",
                },
                phone: {
                  type: "string",
                  example: "+265991234567",
                },
                password: {
                  type: "string",
                  format: "password",
                  example: "Password123",
                },
                role_id: {
                  type: "string",
                  format: "uuid",
                  description: "Optional. Defaults to Farm Worker.",
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User registered successfully",
        },
        "400": {
          description: "Invalid input or registration failed",
        },
      },
    },
  },

"/api/auth/login": {
  post: {
    tags: ["Authentication"],
    summary: "Login user",
    description: "Authenticates a user and returns a JWT access token.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: {
                type: "string",
                format: "email",
                example: "john.banda@example.com",
              },
              password: {
                type: "string",
                format: "password",
                example: "Password123",
              },
            },
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Login successful. Returns JWT and user details.",
      },
      "401": {
        description: "Invalid credentials or inactive account.",
      },
    },
  },
},

"/api/auth/me": {
  get: {
    tags: ["Authentication"],
    summary: "Get authenticated user",
    description: "Returns the profile of the currently authenticated user.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "User retrieved successfully",
      },
      401: {
        description: "Authentication token is missing, invalid, or expired",
      },
      404: {
        description: "User not found or inactive",
      },
    },
  },
},
//place above
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};