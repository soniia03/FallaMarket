const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Servidor FallaMarket ejecutándose en puerto ${port}`);
  console.log(`📚 Documentación disponible en: http://localhost:${port}/api/v1/documentacion`);
  console.log(`🌟 Productos: http://localhost:${port}/api/v1/products/get/all`);
  console.log(`👥 Usuarios: http://localhost:${port}/api/v1/users/get/all`);
});