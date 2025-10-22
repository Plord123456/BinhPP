const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const fs = require('fs');

const dbFilePath = path.join(__dirname, 'db.json');

let dbObject;
let hasError = false;

console.log('------------------------------------');
console.log('=> TIM THAY file db.json.');

try {
  // Tự đọc file (chúng ta biết bước này thành công)
  const fileContent = fs.readFileSync(dbFilePath, 'utf8');
  // Tự parse file (chúng ta biết bước này thành công)
  dbObject = JSON.parse(fileContent);
  console.log('=> Parse JSON thanh cong! Chuan bi khoi dong server...');
  
} catch (error) {
  console.error('=> LOI KHI DOC HOAC PARSE FILE:', error.message);
  hasError = true;
  dbObject = { error: "Khong the doc db.json" };
}

console.log('------------------------------------');

// ===========================================
// THAY ĐỔI QUAN TRỌNG:
// Thay vì truyền 'dbFilePath' (là 1 string đường dẫn),
// chúng ta truyền 'dbObject' (là đối tượng JS đã được parse)
// ===========================================
const router = jsonServer.router(dbObject);

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  if (hasError) {
    console.log('!!! Server da chay, NHUNG co loi khi doc db.json !!!');
  } else {
    console.log('JSON Server is running on port', port);
  }
});