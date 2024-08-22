const http = require("http");
const path = require("path");
const fs = require("fs");
const fs_promises = require("fs").promises;

const log_events = require("./log_events");
const event_emitter = require("events");
class Emitter extends event_emitter {};
const my_emitter = new Emitter();

my_emitter.on("log", (message, log_filename) => {
  (log_events(message, log_filename))
});

const PORT = process.env.PORT || 3500;

const serve_file = async (file_path, content_type, response) => {
  try {
    const raw_data = await fs_promises.readFile(
      file_path,
      !content_type.includes("image") ? "utf8" : ""
    );
    const data = content_type === "application/json"
                 ? JSON.parse(raw_data) : raw_data;
    response.writeHead(
      file_path.includes("404.html") ? 404 : 200,
      { "Content-Type": content_type }
    );
    response.end(
      content_type === "application/json" ? JSON.stringify(data) : data
    );
  }
  catch (err) {
    console.error(err);
    my_emitter.emit("log", `${err.name}: ${err.message}`, "err_log.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((request, response) => {
  console.log(request.url, request.method);
  my_emitter.emit("log", `${request.url}\t${request.method}`, "req_log.txt");

  const extension = path.extname(request.url);

  let content_type;

  switch (extension) {
    case ".css":
      content_type = "text/css";
      break;
    case ".js":
      content_type = "text/javascript";
      break;
    case ".json":
      content_type = "application/json";
      break;
    case ".jpg":
      content_type = "image/jpeg";
      break;
    case ".png":
      content_type = "image/png";
      break;
    case ".webp":
      content_type = "image/webp";
      break;
    case ".txt":
      content_type = "text/plain";
      break;
    default:
      content_type = "text/html";
  }

  let file_path =
    content_type === "text/html" && request.url === "/"
    ? path.join(__dirname, "views", "index.html")
    : content_type === "text/html" && request.url.slice(-1) === "/"
      ? path.join(__dirname, "views", request.url, "index.html")
      : content_type === "text/html"
        ? path.join(__dirname, "views", request.url)
        : path.join(__dirname, request.url);

  if (!extension && request.url.slice(-1) !== "/") {
    file_path += ".html";
  }

  const file_exists = fs.existsSync(file_path);

  if (file_exists) {
    serve_file(file_path, content_type, response);
  }
  else {
    switch (path.parse(file_path).base) {
      case "old-page.html":
        response.writeHead(301, { "Location" : "/new-page.html" });
        response.end();
        break;
      case "www-page.html":
        response.writeHead(301, { "Location" : "/" });
        response.end();
        break;
      default:
        serve_file(path.join(__dirname, "views", "404.html"), "text/html", 
                  response);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
