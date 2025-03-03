const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/data", (req, res) => {
  const { name } = req.body;
  res.send(`Received data for: ${name}`);
});

app.listen(process.env.PORT || 9000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 9000}`);
});
