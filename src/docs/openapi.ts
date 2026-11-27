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

    "/api/species": {
      get: {
        tags: ["Species"],
        summary: "Get all species",
        description: "Retrieve all registered livestock species",
        responses: {
          "200": {
            description: "Species retrieved successfully",
          },
          "500": {
            description: "Failed to retrieve species",
          },
        },
      },

      post: {
        tags: ["Species"],
        summary: "Create a species",
        description: "Add a livestock species and define its management type",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "code", "management_type"],
                properties: {
                  name: {
                    type: "string",
                    example: "Chicken",
                  },
                  code: {
                    type: "string",
                    example: "CHK",
                  },
                  management_type: {
                    type: "string",
                    enum: ["individual", "flock"],
                    example: "flock",
                  },
                  description: {
                    type: "string",
                    example: "Domestic poultry",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Species created successfully",
          },
          "500": {
            description: "Failed to create species",
          },
        },
      },
    },

    "/api/livestock": {
      get: {
        summary: "Get all livestock",
        description: "Retrieve all registered livestock across farms",
        tags: ["Livestock"],
        responses: {
          "200": {
            description: "Livestock retrieved successfully",
          },
          "500": {
            description: "Failed to retrieve livestock",
          },
        },
      },

      post: {
        summary: "Register livestock",
        description: "Register a new animal under a farm",
        tags: ["Livestock"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["farm_id", "species_id", "animal_code"],
                properties: {
                  farm_id: {
                    type: "string",
                    format: "uuid",
                    example: "YOUR-FARM-UUID",
                  },
                  species_id: {
                    type: "string",
                    format: "uuid",
                    example: "YOUR-GOAT-SPECIES-UUID",
                  },
                  animal_code: {
                    type: "string",
                    example: "GOAT-001",
                  },
                  breed: {
                    type: "string",
                    example: "Boer",
                  },
                  sex: {
                    type: "string",
                    enum: ["male", "female", "unknown"],
                    example: "female",
                  },
                  date_of_birth: {
                    type: "string",
                    format: "date",
                    example: "2025-05-12",
                  },
                  acquisition_date: {
                    type: "string",
                    format: "date",
                    example: "2025-06-01",
                  },
                  acquisition_type: {
                    type: "string",
                    example: "Purchased",
                  },
                  notes: {
                    type: "string",
                    example: "Healthy young goat",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Livestock registered successfully",
          },
          "500": {
            description: "Failed to register livestock",
          },
        },
      },
    },
    "/api/livestock-flocks": {
      get: {
        summary: "Get all livestock flocks",
        tags: ["Livestock Flocks"],
        responses: {
          "200": {
            description: "Livestock flocks retrieved successfully",
          },
        },
      },

      post: {
        summary: "Register a livestock flock",
        tags: ["Livestock Flocks"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: [
                  "farm_id",
                  "species_id",
                  "flock_code",
                  "total_quantity",
                ],
                properties: {
                  farm_id: {
                    type: "string",
                    format: "uuid",
                  },
                  species_id: {
                    type: "string",
                    format: "uuid",
                  },
                  flock_code: {
                    type: "string",
                    example: "FLOCK-001",
                  },
                  breed: {
                    type: "string",
                    example: "Sasso",
                  },
                  total_quantity: {
                    type: "integer",
                    example: 200,
                  },
                  male_quantity: {
                    type: "integer",
                    example: 80,
                  },
                  female_quantity: {
                    type: "integer",
                    example: 120,
                  },
                  purpose: {
                    type: "string",
                    example: "Layers",
                  },
                  date_established: {
                    type: "string",
                    format: "date",
                  },
                  notes: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Livestock flock registered successfully",
          },
        },
      },
    },

    "/api/inventory-categories": {
      get: {
        tags: ["Inventory Categories"],
        summary: "Get all inventory categories",
        description: "Retrieve all registered inventory categories",
        responses: {
          "200": {
            description: "Inventory categories retrieved successfully",
          },
          "500": {
            description: "Failed to retrieve inventory categories",
          },
        },
      },
      post: {
        tags: ["Inventory Categories"],
        summary: "Create an inventory category",
        description: "Register a new inventory category",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: {
                    type: "string",
                    example: "Feeds",
                  },
                  description: {
                    type: "string",
                    example: "All livestock feed and nutritional supplies",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Inventory category created successfully",
          },
          "500": {
            description: "Failed to create inventory category",
          },
        },
      },
    },

    "/api/inventory-items": {
      get: {
        tags: ["Inventory Items"],
        summary: "Get all inventory items",
        description:
          "Retrieve all registered inventory items with their categories",
        responses: {
          "200": {
            description: "Inventory items retrieved successfully",
          },
          "500": {
            description: "Failed to retrieve inventory items",
          },
        },
      },
      post: {
        tags: ["Inventory Items"],
        summary: "Create an inventory item",
        description:
          "Register a new inventory item. The item code is generated automatically.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "category_id", "unit_of_measure"],
                properties: {
                  name: {
                    type: "string",
                    example: "Layer Mash",
                  },
                  category_id: {
                    type: "string",
                    format: "uuid",
                    example: "YOUR-INVENTORY-CATEGORY-UUID",
                  },
                  unit_of_measure: {
                    type: "string",
                    example: "kg",
                  },
                  minimum_stock_level: {
                    type: "number",
                    example: 50,
                  },
                  description: {
                    type: "string",
                    example: "Commercial layer feed",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Inventory item created successfully",
          },
          "500": {
            description: "Failed to create inventory item",
          },
        },
      },
    },

    "/api/suppliers": {
      get: {
        tags: ["Suppliers"],
        summary: "Get all suppliers",
        description: "Retrieve all registered suppliers",
        responses: {
          "200": {
            description: "Suppliers retrieved successfully",
          },
          "500": {
            description: "Failed to retrieve suppliers",
          },
        },
      },
      post: {
        tags: ["Suppliers"],
        summary: "Create a supplier",
        description:
          "Register a new supplier. Supplier code is generated automatically.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: {
                    type: "string",
                    example: "Malawi Farm Supplies",
                  },
                  contact_person: {
                    type: "string",
                    example: "John Banda",
                  },
                  phone: {
                    type: "string",
                    example: "+265 991 234 567",
                  },
                  email: {
                    type: "string",
                    format: "email",
                    example: "info@example.com",
                  },
                  address: {
                    type: "string",
                    example: "Blantyre, Malawi",
                  },
                  description: {
                    type: "string",
                    example: "Supplier of animal feeds and veterinary products",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Supplier created successfully",
          },
          "500": {
            description: "Failed to create supplier",
          },
        },
      },
    },

    "/api/stock-receipts": {
      get: {
        tags: ["Stock Receiving"],
        summary: "Get all stock receipts",
        description:
          "Retrieve stock receipts with farm, supplier and received item details",
        responses: {
          "200": {
            description: "Stock receipts retrieved successfully",
          },
          "500": {
            description: "Failed to retrieve stock receipts",
          },
        },
      },
      post: {
        tags: ["Stock Receiving"],
        summary: "Create a stock receipt",
        description:
          "Record stock received from a supplier, including multiple inventory items",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["farm_id", "supplier_id", "items"],
                properties: {
                  farm_id: {
                    type: "string",
                    format: "uuid",
                    example: "YOUR-FARM-UUID",
                  },
                  supplier_id: {
                    type: "string",
                    format: "uuid",
                    example: "YOUR-SUPPLIER-UUID",
                  },
                  received_date: {
                    type: "string",
                    format: "date",
                    example: "2026-11-27",
                  },
                  supplier_reference: {
                    type: "string",
                    example: "INV-2026-001",
                  },
                  notes: {
                    type: "string",
                    example: "Monthly poultry feed delivery",
                  },
                  items: {
                    type: "array",
                    minItems: 1,
                    items: {
                      type: "object",
                      required: ["inventory_item_id", "quantity"],
                      properties: {
                        inventory_item_id: {
                          type: "string",
                          format: "uuid",
                          example: "YOUR-INVENTORY-ITEM-UUID",
                        },
                        quantity: {
                          type: "number",
                          example: 200,
                        },
                        unit_cost: {
                          type: "number",
                          example: 1500,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Stock receipt created successfully",
          },
          "500": {
            description: "Failed to create stock receipt",
          },
        },
      },
    },

    "/api/stock-movements": {
      get: {
        tags: ["Stock Movements"],
        summary: "Get stock movement history",
        description:
          "Retrieve stock movements with farm and inventory item details",
        responses: {
          "200": {
            description: "Stock movements retrieved successfully",
          },
          "500": {
            description: "Failed to retrieve stock movements",
          },
        },
      },
    },

    "/api/stock-movements/balances": {
      get: {
        tags: ["Stock Movements"],
        summary: "Get current stock balances",
        description:
          "Retrieve calculated stock balances for each farm and inventory item",
        responses: {
          "200": {
            description: "Stock balances retrieved successfully",
          },
          "500": {
            description: "Failed to retrieve stock balances",
          },
        },
      },
    },

    "/api/stock-movements/issues": {
      post: {
        tags: ["Stock Movements"],
        summary: "Issue stock",
        description:
          "Record stock issued from a farm's inventory. The system checks available stock before processing the issue.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["farm_id", "inventory_item_id", "quantity"],
                properties: {
                  farm_id: {
                    type: "string",
                    format: "uuid",
                    example: "YOUR-FARM-UUID",
                  },
                  inventory_item_id: {
                    type: "string",
                    format: "uuid",
                    example: "YOUR-INVENTORY-ITEM-UUID",
                  },
                  quantity: {
                    type: "number",
                    example: 20,
                  },
                  movement_date: {
                    type: "string",
                    format: "date",
                    example: "2026-11-27",
                  },
                  reference_type: {
                    type: "string",
                    example: "feeding",
                  },
                  reference_id: {
                    type: "string",
                    format: "uuid",
                  },
                  notes: {
                    type: "string",
                    example: "Feed issued to poultry",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Stock issued successfully",
          },
          "400": {
            description: "Insufficient stock",
          },
          "500": {
            description: "Failed to issue stock",
          },
        },
      },
    },
    "/api/stock-movements/adjustments": {
      post: {
        tags: ["Stock Movements"],
        summary: "Create a stock adjustment",
        description:
          "Manually increase or decrease stock to correct inventory balances. A reason is required.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: [
                  "farm_id",
                  "inventory_item_id",
                  "quantity",
                  "adjustment_direction",
                  "reason",
                ],
                properties: {
                  farm_id: { type: "string", format: "uuid" },
                  inventory_item_id: { type: "string", format: "uuid" },
                  quantity: { type: "number", exclusiveMinimum: 0 },
                  adjustment_direction: {
                    type: "string",
                    enum: ["increase", "decrease"],
                  },
                  reason: { type: "string", minLength: 1 },
                  movement_date: { type: "string", format: "date" },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Stock adjustment created successfully",
          },
          "400": {
            description: "Invalid adjustment or insufficient stock",
          },
          "500": {
            description: "Server error",
          },
        },
      },
    },
    "/api/products": {
  get: {
    tags: ["Products"],
    summary: "Get all products",
    description: "Retrieve all active and inactive products in the shared product catalogue.",
    security: [{ bearerAuth: [] }],
    responses: {
      "200": {
        description: "Products retrieved successfully",
      },
      "500": {
        description: "Server error",
      },
    },
  },
  post: {
    tags: ["Products"],
    summary: "Create a product",
    description: "Add a new product to the shared product catalogue.",
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "unit_of_measure"],
            properties: {
              name: { type: "string", example: "Eggs" },
              unit_of_measure: { type: "string", example: "pieces" },
              description: {
                type: "string",
                example: "Fresh chicken eggs",
              },
            },
          },
        },
      },
    },
    responses: {
      "201": {
        description: "Product created successfully",
      },
      "500": {
        description: "Server error",
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
