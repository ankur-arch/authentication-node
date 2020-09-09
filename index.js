const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const secrets = require("./secrets/secrets");

mongoose.Promise = global.Promise;
mongoose.connect(
  `mongodb+srv://${secrets.DATABASEUSERNAME}:${secrets.DATABASEPASSWORD}@shikhao-cluster.atqgg.mongodb.net/<dbname>?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

const app = express();
const users = require("./routes/users");
const posts = require("./routes/posts");

const port = process.env.PORT || 8000;

// Middelwares

//terminal outputs
app.use(morgan("dev"));
//parse as json
app.use(bodyparser.json());
//Routes
app.use("/users", users);
app.use("/posts", posts);
app.get("/", (req, res) => {
  res.send("Hi there");
});

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
