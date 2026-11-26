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
                required: ["first_name", "last_name", "email", "password"],
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
    "/api/roles": {
      get: {
        tags: ["Roles"],
        summary: "Get all active roles",
        description: "Retrieves all active user roles available in the system.",
        responses: {
          "200": {
            description: "Roles retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Roles retrieved successfully",
                    },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            format: "uuid",
                          },
                          name: {
                            type: "string",
                            example: "Farm Manager",
                          },
                          description: {
                            type: "string",
                            nullable: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Failed to retrieve roles",
          },
        },
      },
    },

    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        description:
          "Retrieves users with pagination. Only System Administrators can access this endpoint.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "page",
            in: "query",
            required: false,
            schema: {
              type: "integer",
              default: 1,
              minimum: 1,
            },
            description: "Page number",
          },
          {
            name: "limit",
            in: "query",
            required: false,
            schema: {
              type: "integer",
              default: 10,
              minimum: 1,
              maximum: 100,
            },
            description: "Number of users per page",
          },
        ],
        responses: {
          "200": {
            description: "Users retrieved successfully",
          },
          "401": {
            description: "Authentication required",
          },
          "403": {
            description: "Insufficient permissions",
          },
          "500": {
            description: "Failed to retrieve users",
          },
        },
      },
    },
    "/api/farms": {
      get: {
        summary: "Get all farms",
        description: "Retrieve all registered farms",
        tags: ["Farms"],
        responses: {
          "200": {
            description: "Farms retrieved successfully",
          },
          "500": {
            description: "Failed to retrieve farms",
          },
        },
      },

      post: {
        summary: "Create a farm",
        description: "Register a new farm",
        tags: ["Farms"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "farm_code", "location"],
                properties: {
                  name: { type: "string", example: "Green Valley Farm" },
                  farm_code: { type: "string", example: "FARM-001" },
                  description: {
                    type: "string",
                    example: "Mixed livestock farm",
                  },
                  location: { type: "string", example: "Chigumula" },
                  district: { type: "string", example: "Blantyre" },
                  region: { type: "string", example: "Southern Region" },
                  size: { type: "number", example: 25 },
                  size_unit: { type: "string", example: "hectares" },
                  contact_person: { type: "string", example: "John Banda" },
                  phone: { type: "string", example: "+265991234567" },
                  email: { type: "string", example: "farm@example.com" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Farm created successfully",
          },
          "500": {
            description: "Failed to create farm",
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
