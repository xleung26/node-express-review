const url = require("url");
const fs = require("fs");
const path = require("path");

const list = {
  Todos: []
};

const sendResponse = (res, data, statusCode) => {
  statusCode = statusCode || 200;
  res.end(JSON.stringify(data));
};

const parseData = (req, callback) => {
  let data = "";
  req.on("data", chunk => {
    data += chunk;
  });
  req.on("end", () => {
    callback(JSON.parse(data));
  });
};

const routes = {
  static: {
    GET: (req, res) => {
      let pathname = url.parse(req.url).pathname;
      console.log("Pathname check", pathname);
      if (pathname !== "/bundle.js") {
        pathname = "/index.html";
      }
      fs.readFile(
        path.join(__dirname, `../static${pathname}`),
        "utf8",
        (err, data) => {
          if (err) {
            console.log(err);
          }
          res.end(data);
        }
      );
    }
  },
  "/api/todoList": {
    GET: (req, res) => {
      console.log("IN GET");
    },
    POST: (req, res) => {
      console.log("IN POST");
    },
    DELETE: (req, res) => {
      console.log("IN DELETE");
    }
  }
};

module.exports = (req, res) => {
  let pathname = url.parse(req.url).pathname;
  console.log(`Serving request type ${req.method} to ${pathname}`);
  if (pathname !== "/api/todoList") {
    pathname = "static";
  }
  const handler = routes[pathname][req.method];
  if (handler) {
    handler(req, res);
  } else {
    sendResponse(req, "Pagenot found!", 404);
  }
};
