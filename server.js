const fs = require("fs", "UTF-8");
const jsonData = require("./data.json");
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.method == "GET" && req.url == "/") {
    resFile("./index.html", req, res);
  }
  if (req.method == "GET" && req.url == "/script.js") {
    resFile("./script.js", req, res)
  }
  if (req.method == "GET" && req.url == "/data.json") {
    resFile("./data.json", req, res);
  }
  if (req.method == "GET" && req.url.split(".")[1] == "jpg") {
    resImg(`.${req.url}`, req, res);
  }
  if (req.method == "POST" && req.url == "/edit") {
    let data = '';
    req.on("data", chunk => data += chunk)
    .on("end", () => {
      let parse = JSON.parse(data);
      if (parse && parse.id) jsonData[parse.id].color1 = parse.color1;
      if (parse && parse.id) jsonData[parse.id].color2 = parse.color2;
      if (parse && parse.id) jsonData[parse.id].color3 = parse.color3;
      if (parse && parse.id) jsonData[parse.id].color4 = parse.color4;
      if (parse && parse.id) jsonData[parse.id].color5 = parse.color5;
      fs.writeFile("./data.json", JSON.stringify(jsonData), (err) => {
        if (err) throw err;
        res.writeHead("302", {
          "Location": "/"
        });
        res.end();
      });
    })
  }
}).listen(8080);

const resFile = (p, req, res) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead("200", {"Content-Type" : "text/html; charset=utf-8"})
    res.end(data);
  });
}

const resImg = (p, req, res) => {
  fs.readFile(p, (err, data) => {
    if (err) throw err;
    res.writeHead("200", {"Content-Type" : "image/jpeg"});
    res.end(data);
  });
}