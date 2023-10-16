const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { default: mongoose } = require("mongoose");
dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 3001;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

function start() {
  app.listen(port, () => {
    console.log("Server is running on port ", port);
  });

  mongoose
    .connect(process.env.MONGOOSE_CONNECT, { ignoreUndefined: true })
    .then(() => {
      console.log("Database connect successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}

start();
