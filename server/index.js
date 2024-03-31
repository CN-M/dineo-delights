const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
require("dotenv").config();
require("colors");

const { catch404, errorHandler } = require("./middleware/errorMiddleware");

const { PORT, NODE_ENV } = process.env;
const Port = PORT || 5000;

const schema = require("./schema/schema");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GrapQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: NODE_ENV === "development",
  })
);

// Error Middleware
app.use(catch404);
app.use(errorHandler);

// Listen
app.listen(
  Port,
  console.log(
    `Serving running on http://localhost:${Port}/graphql`.cyan.underline.bold
  )
);
