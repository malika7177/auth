require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoute"); 
const app = express();

app.use(express.json()); 
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://auth-theta-one.vercel.app/" 
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

connectDB();

app.use("/api/auth", authRoutes);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "https://auth-1-fzi4.onrender.com", 
      },
    ],
  },
  apis: ["./routes/authRoute.js"], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});