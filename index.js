const express = require("express");
const bodyParser = require("body-parser");
const ngrok = require("ngrok");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome");
});
require("./routes/df-routes")(app);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Start ngrok and print the ngrok URL
  const url = await ngrok.connect(PORT);
  console.log(`ngrok tunnel set up at ${url}`);
});
