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
      const query = url.parse(req.url, true).query; //parseQueryString <boolean> If true, the query property will always be set to an object returned by the querystring module's parse() method. If false, the query property on the returned URL object will be an unparsed, undecoded string. Default: false.
      const { listName } = query;
      if (listName in list) {
        sendResponse(res, list[listName], 200);
      } else {
        sendResponse(res, "List not found", 404);
      }
    },
    POST: (req, res) => {
      parseData(req, data => {
        const { todo, listName } = data;
        list[listName].push(todo);
        sendResponse(res, list[listName], 201);
      });
    },
    DELETE: (req, res) => {
      const query = url.parse(req.url, true).query;
      const { index, listName } = query;
      list[listName].splice(index, 1);
      sendResponse(res, list[listName], 202);
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
