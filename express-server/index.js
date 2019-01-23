const express = require("express");
const parser = require("body-parser");
/*
Express: Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
*/
const path = require("path");
const PORT = 3000;
//middlewares: https://medium.com/@agoiabeladeyemi/a-simple-explanation-of-express-middleware-c68ea839f498
const app = express();

app.use(parser.json());
//Parses the text as JSON and exposes the resulting object on req.body
app.use(parser.urlencoded({ extended: true }));
/*Parses the text as URL encoded data (which is how browsers tend to send form data 
  from regular forms set to POST) and exposes the resulting object (containing the keys and values) 
  on req.body. */
app.use(express.static(path.resolve(__dirname, "../static")));

const list = {
  Todos: []
};

app.get("/api/todoList", (req, res) => {
  const { listName } = req.query;
  if (list[listName]) {
    res.status(200).send(list[listName]);
  } else {
    res.status(404).send("List not found");
  }
});
app.post("/api/todoList", (req, res) => {
  const { todo, listName } = req.body;
  list[listName].push(todo);
  res.status(201).send("Success in POST");
});
app.delete("/api/todoList", (req, res) => {
  const { index, listName } = req.query;
  list[listName].splice(index, 1);
  res.status(202).send("Success in DELETE");
});

app.listen(PORT, () => {
  console.log("app is listening on PORT", PORT);
});
