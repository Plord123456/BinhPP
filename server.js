const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const fs = require('fs'); // Dùng 'fs' để đọc file

const dbFilePath = path.join(__dirname, 'db.json');

console.log('------------------------------------');
console.log('Duong dan day du den file:');
console.log(dbFilePath);

if (!fs.existsSync(dbFilePath)) {
  console.log('=> LOI: KHONG TIM THAY file db.json!');
} else {
  console.log('=> TIM THAY file db.json.');
  
  // --- BUOC DEBUG MOI: Doc va Parse file ---
  try {
    console.log('=> Dang doc file...');
    // Đọc nội dung file
    const fileContent = fs.readFileSync(dbFilePath, 'utf8');
    console.log('=> Doc file thanh cong.');
    
    console.log('=> Dang parse JSON...');
    // Thử parse JSON
    JSON.parse(fileContent);
    console.log('=> Parse JSON thanh cong! File hop le.');
    
  } catch (error) {
    // Nếu đọc hoặc parse lỗi, in ra lỗi
    console.error('=> LOI KHI DOC HOAC PARSE FILE:', error.message);
  }
  // --- KET THUC DEBUG ---
}

console.log('------------------------------------');

// Khởi động json-server
const router = jsonServer.router(dbFilePath);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log('JSON Server is running on port', port);
});