export const customJson = [
  { 
    "id":12,
    "name": "Smart Mode",
    "title": "AI-powered mode",
    "description": [
      "Smart Mode uses an AI-powered generator to create dummy JSON data based on your provided JSON schema.",
      "A JSON schema is a structure that describes the keys, their expected data types, and any nested relationships in your data.",
      "All keys in your schema must be written as strings (inside double quotes).",
      "Each value in the schema represents the data type for that key, not an actual value.",
      "Supported data types include:",
      " - string: Represents text values (e.g., names, addresses, messages).",
      " - number: Represents numeric values (e.g., age, price, rating).",
      " - boolean: Represents true/false values (e.g., isActive, isVerified).",
      " - date: Represents dates in ISO 8601 format (e.g., 2025-08-12T10:30:00Z).",
      " - uuid: Represents a universally unique identifier (e.g., 123e4567-e89b-12d3-a456-426614174000).",
      "You can nest objects to represent hierarchical data structures (e.g., a 'user' object inside a 'post').",
      "Arrays can also be included to represent lists of similar objects or values.",
      "Example schema:",
      {
        "name": "string",
        "email": "string",
        "age": "number",
        "isActive": "boolean",
        "user": {
          "createdAt": "date",
          "id": "uuid"
        }
      },
      "When you upload this schema in Smart Mode, the AI will generate fully populated dummy JSON data that follows your exact structure.",
      "You will also get a sharable API endpoint where this generated JSON can be fetched anytime."
    ]
  },
  {
    "id": 13,
    "name": "Basic Mode",
    "title": "Simple Json Upload",
    "description": [
      "Basic Mode is the quickest way to get a sharable API endpoint for your JSON data.",
      "Instead of uploading a schema, you paste your complete, ready-to-use JSON object or array of objects.",
      "You can upload:",
      " - A single object (for a single record).",
      " - An array of objects (for multiple records).",
      "The system will store your JSON exactly as you provide it — no AI generation or structure inference is performed.",
      "This mode is ideal when:",
      " - You already have the exact dummy data you want.",
      " - You need a static API response without changes.",
      " - You want a simple copy-paste setup.",
      "Once you paste the JSON and save, you instantly receive an API URL to fetch it.",
      "No data type interpretation or structure checking is done — what you paste is exactly what you get in the API response.",
      "Example: Single object",
      {
        "name": "John Doe",
        "email": "john@example.com",
        "age": 28
      },
      "Example: Array of objects",
      [
        {
          "name": "John Doe",
          "email": "john@example.com",
          "age": 28
        },
        {
          "name": "Jane Smith",
          "email": "jane@example.com",
          "age": 32
        }
      ],
      "This approach works best for quick demos, frontend testing, or when mocking fixed data for your application."
    ]
  }
]



export const initialDocumentsData = [
    {
        id: 1,
        name: "users",
        title: "users-docs",
        description:
            "The users endpoint provides a versatile dataset of sample user information and related data like carts, posts, and todos, making it ideal for testing and prototyping user management functionalities in web applications.",
        steps: [
            {
                name: "get all",
                code: `
// Fetch all users
fetch('https://mock-matrix-backend.vercel.app/api/v1/users')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/users?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/users?limit=5&fields=id,firstName,company')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 2,
        name: "posts",
        title: "posts-docs",
        description:
            "The posts endpoint provides a dataset of sample post information including users, comments, and likes, making it useful for testing and prototyping content management functionalities.",
        steps: [
            {
                name: "get all",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/posts')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/posts?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/posts?limit=5&fields=id,title,body')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 3,
        name: "comments",
        title: "comments-docs",
        description:
            "The comments endpoint provides a dataset of sample comments linked to posts and users, useful for testing comment sections or moderation systems.",
        steps: [
            {
                name: "get all",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/comments')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/comments?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/comments?limit=5&fields=id,body,postId')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 4,
        name: "todos",
        title: "todos-docs",
        description:
            "The todos endpoint provides a dataset of sample to-do items, making it ideal for testing and prototyping task management applications.",
        steps: [
            {
                name: "get all",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/todos')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/todos?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/todos?limit=5&fields=id,todo,completed')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 5,
        name: "products",
        title: "products-docs",
        description:
            "The products endpoint provides a dataset of sample products, ideal for testing and prototyping e-commerce applications.",
        steps: [
            {
                name: "get all",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/products')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/products?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/products?limit=5&fields=id,title,price')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 6,
        name: "carts",
        title: "carts-docs",
        description:
            "The carts endpoint provides a dataset of shopping carts containing product details, useful for testing checkout and cart systems.",
        steps: [
            {
                name: "get all",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/carts')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/carts?limit=3')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/carts?limit=3&fields=id,products,total')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 7,
        name: "images",
        title: "images-docs",
        description:
            "The images endpoint provides a dataset of sample image URLs with metadata, useful for testing gallery and image rendering functionalities.",
        steps: [
            {
                name: "get all",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/images')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/images?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/images?limit=5&fields=id,url,title')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 8,
        name: "quotes",
        title: "quotes-docs",
        description:
            "The quotes endpoint provides a dataset of famous quotes, useful for testing display of short text snippets.",
        steps: [
            {
                name: "get all",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/quotes')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/quotes?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/quotes?limit=5&fields=id,quote,author')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 9,
        name: "recipes",
        title: "recipes-docs",
        description:
            "The recipes endpoint provides a dataset of cooking recipes with ingredients and preparation steps, ideal for food-related app testing.",
        steps: [
            {
                name: "get all",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/recipes')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/recipes?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/recipes?limit=5&fields=id,title,ingredients')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 10,
        name: "http",
        title: "http-docs",
        description:
            "The http endpoint provides utilities for testing different HTTP status codes.",
        steps: [
            {
                name: "GET 200 OK",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/http/200')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "GET 404 Not Found",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/http/404')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "GET 500 Internal Server Error",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/http/500')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 11,
        name: "auth",
        title: "auth-docs",
        description:
            "The auth endpoint provides routes for authentication tasks like register, login and get access_token from refresh token.",
        steps: [
            {
                name: "Signup example",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/json-auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    "email": "shivamgupta12@gmail.com",
    "password": "hello",
    "gender": "Male"
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
        
  `,
                output: `
{
    "success": true,
    "message": "User registered successfully.",
    "user": {
        "name": "User_55da9efa",
        "username": "user_55da9efa",
        "email": "shivamgupta12@gmail.com",
        "gender": "male",
        "authId": "2b243681-2d39-4cc9-a9c2-54741942fee7",
        "profilePicture": "https://cdn.pixabay.com/photo/2024/09/05/20/13/ai-generated-9026025_1280.jpg",
        "createdAt": "2025-08-11T18:28:20.790Z",
        "__v": 0,
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbWd1cHRhMTJAZ21haWwuY29tIiwiYXV0aGlkIjoiMmIyNDM2ODEtMmQzOS00Y2M5LWE5YzItNTQ3NDE5NDJmZWU3IiwiaWF0IjoxNzU0OTM2OTAwLCJleHAiOjE3NTQ5NDA1MDB9.PJQ-AXXhfKjZFSSvYnhUAvecTOR_gkXLEkxZSpgNfd4",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbWd1cHRhMTJAZ21haWwuY29tIiwiYXV0aGlkIjoiMmIyNDM2ODEtMmQzOS00Y2M5LWE5YzItNTQ3NDE5NDJmZWU3IiwiaWF0IjoxNzU0OTM2OTAwLCJleHAiOjE3NTU1NDE3MDB9.9DB5V2m7Xe0rWprxZ49PIjeAH4gAYiJJU_rO6fspYyk"
    }
}`
            },
            {
                name: "Login example",
                code: `

fetch('https://mock-matrix-backend.vercel.app/api/v1/json-auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    "username":"user_2a4c8215",
    "email":"shivamgupta12@gmail.com",
    "password":"hello"
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
        
  `,
                output: `
{
    "success": true,
    "message": "Login successful.",
    "user": {
        "name": "User_55da9efa",
        "username": "user_55da9efa",
        "email": "shivamgupta12@gmail.com",
        "authId": "2b243681-2d39-4cc9-a9c2-54741942fee7",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbWd1cHRhMTJAZ21haWwuY29tIiwiYXV0aGlkIjoiMmIyNDM2ODEtMmQzOS00Y2M5LWE5YzItNTQ3NDE5NDJmZWU3IiwiaWF0IjoxNzU0OTM2OTMyLCJleHAiOjE3NTQ5NDA1MzJ9.tsQa7wDT2jQ1bP6pGdqmig1Orggie6eEGSTCYdWa6tQ",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbWd1cHRhMTJAZ21haWwuY29tIiwiYXV0aGlkIjoiMmIyNDM2ODEtMmQzOS00Y2M5LWE5YzItNTQ3NDE5NDJmZWU3IiwiaWF0IjoxNzU0OTM2OTMyLCJleHAiOjE3NTU1NDE3MzJ9.jysxHO6nBIqSzvx4fOjmC1Tn4Op6zaPNSixje0WEPbo"
    }
}`
            },
            {
                name: "Get Access Token Example",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/json-auth/get-access-token', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer <your_token>' },
  body: JSON.stringify({
    "refreshToken": "<your_refresh_token>"
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: `{
    "success": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbWd1cHRhMTJAZ21haWwuY29tIiwiYXV0aGlkIjoiMmVhMGUzYzctMDFkOS00MjFjLTljNTEtNTJlMjU2ZTMwMDczIiwiaWF0IjoxNzU0OTM2ODYxLCJleHAiOjE3NTQ5NDA0NjF9.Xok6MY7xhVjS9WJIESvU60G15326udSyxpmoDaNm-i8"
}`
            },
            {
                name: "Get Profile Example",
                code: `
fetch('https://mock-matrix-backend.vercel.app/api/v1/json-auth/get-profile', {
  method: 'GET',
  headers: { 'Authorization': 'Bearer <your_token>' },
})
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: `{
    "success": true,
    "user": {
        "name": "User_55da9efa",
        "username": "user_55da9efa",
        "email": "shivamgupta12@gmail.com",
        "gender": "male",
        "authId": "2b243681-2d39-4cc9-a9c2-54741942fee7",
        "profilePicture": "https://cdn.pixabay.com/photo/2024/09/05/20/13/ai-generated-9026025_1280.jpg",
        "createdAt": "2025-08-11T18:28:20.790Z",
        "__v": 0
    }
}`
            }
        ]
    }
];