var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');  // 新增：用于处理文件路径

// 定义MIME类型映射（根据需求可扩展）
const mimeTypes = {
  '.html': 'text/html',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.css': 'text/css'
};

// 创建服务器
http.createServer(function (request, response) {  
  var pathname = url.parse(request.url).pathname;
  
  // 处理根路径：默认访问index.html
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // 拼接实际文件路径（当前目录 + 解析后的路径）
  var filePath = path.join(__dirname, pathname.substr(1));
  
  console.log("Request for " + pathname + " received.");

  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log(err);
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.write('File Not Found');
    } else {
      // 根据文件扩展名获取MIME类型（默认text/html）
      var extname = path.extname(filePath);
      var contentType = mimeTypes[extname] || 'text/html';
      response.writeHead(200, {'Content-Type': contentType});
      response.write(data);
    }
    response.end();
  });
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');