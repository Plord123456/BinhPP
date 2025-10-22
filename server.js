const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const fs = require('fs'); // <-- THÊM DÒNG NÀY

const dbFilePath = path.join(__dirname, 'db.json');

// ===========================================
// DEBUG: KIỂM TRA FILE CÓ TỒN TẠI KHÔNG
// ===========================================
console.log('------------------------------------');
console.log('Dang kiem tra file tai duong dan:');
console.log(dbFilePath);

if (fs.existsSync(dbFilePath)) {
  console.log('=> TIM THAY file db.json! Dang khoi dong server...');
} else {
  console.log('=> LOI: KHONG TIM THAY file db.json!');
  console.log('=> Vui long kiem tra lai file .gitignore hoac dam bao file da duoc push len GitHub.');
}
console.log('------------------------------------');
// ===========================================

const router = jsonServer.router(dbFilePath);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log('JSON Server is running on port', port);
});