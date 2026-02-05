# Guía de Instalación - FallaMarket

## Requisitos Previos

Antes de instalar FallaMarket, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **MongoDB** (versión 5.0 o superior)
- **Git** (para clonar el repositorio)
- **XAMPP** (para desarrollo local)

## Instalación Paso a Paso

### 1. Preparar el Entorno

```bash
# Verificar instalaciones
node --version
npm --version
mongod --version
```

### 2. Configurar MongoDB

#### Opción A: MongoDB Local
```bash
# Iniciar MongoDB
mongod

# En otra terminal, conectar a MongoDB
mongo
```

#### Opción B: MongoDB Atlas (Cloud)
1. Crear cuenta en MongoDB Atlas
2. Crear cluster gratuito
3. Obtener string de conexión
4. Actualizar `.env` con la URL de Atlas

### 3. Configurar Backend

```bash
# Navegar a la carpeta del backend
cd C:\xampp\htdocs\FallaMarket\backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Editar .env con tus configuraciones:
MONGODB_URI=mongodb://localhost:27017/fallamarket
PORT=3000
NODE_ENV=development

# Iniciar el servidor en modo desarrollo
npm run dev
```

El servidor backend estará disponible en: **http://localhost:3000**

### 4. Configurar Frontend Angular

```bash
# Navegar a la carpeta de Angular
cd C:\xampp\htdocs\FallaMarket\frontend-angular

# Instalar Angular CLI globalmente (si no lo tienes)
npm install -g @angular/cli

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

El frontend Angular estará disponible en: **http://localhost:4200**

### 5. Configurar Frontend React

```bash
# Navegar a la carpeta de React
cd C:\xampp\htdocs\FallaMarket\frontend-react

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

El frontend React estará disponible en: **http://localhost:3001**

## Verificación de Instalación

### 1. Verificar Backend
Abrir: http://localhost:3000
- Debería mostrar mensaje de bienvenida
- Probar: http://localhost:3000/api/v1/documentacion

### 2. Verificar Base de Datos
```bash
# Conectar a MongoDB
mongo

# Usar base de datos FallaMarket
use fallamarket

# Verificar colecciones
show collections

# Verificar datos
db.products.count()
db.users.count()
```

### 3. Verificar Frontends
- **Angular**: http://localhost:4200
- **React**: http://localhost:3001

Ambos deberían mostrar la página de inicio de FallaMarket.

## Scripts Útiles

### Backend
```bash
# Desarrollo con auto-reload
npm run dev

# Producción
npm start

# Ver logs
npm run dev | grep "ERROR"
```

### Frontend Angular
```bash
# Desarrollo
ng serve

# Desarrollo con puerto específico
ng serve --port 4200

# Build para producción
ng build

# Tests
ng test
```

### Frontend React
```bash
# Desarrollo
npm start

# Build para producción
npm run build

# Tests
npm test

# Análisis del bundle
npm run build && npx serve -s build
```

## Configuración de XAMPP

### 1. Configurar Apache (Opcional)
Si quieres servir los archivos estáticos:

1. Abrir XAMPP Control Panel
2. Iniciar Apache
3. Los archivos estarán disponibles en: http://localhost/FallaMarket/

### 2. Configurar Virtual Host
Editar `C:\xampp\apache\conf\extra\httpd-vhosts.conf`:

```apache
<VirtualHost *:80>
    DocumentRoot "C:\xampp\htdocs\FallaMarket"
    ServerName fallamarket.local
    <Directory "C:\xampp\htdocs\FallaMarket">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

Agregar a `C:\Windows\System32\drivers\etc\hosts`:
```
127.0.0.1 fallamarket.local
```

## Solución de Problemas

### Error de CORS
Si tienes problemas de CORS, verifica que en el backend esté configurado:
```javascript
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:3001']
}));
```

### Error de MongoDB
```bash
# Verificar que MongoDB esté ejecutándose
ps aux | grep mongod

# Iniciar MongoDB si no está ejecutándose
sudo systemctl start mongod  # Linux
brew services start mongodb  # macOS
mongod  # Windows
```

### Error de Puerto Ocupado
```bash
# Ver qué proceso usa el puerto
netstat -ano | findstr :3000

# Matar proceso (Windows)
taskkill /PID <PID> /F

# Matar proceso (Linux/macOS)
kill -9 <PID>
```

### Error de Dependencias
```bash
# Limpiar caché de npm
npm cache clean --force

# Eliminar node_modules y reinstalar
rm -rf node_modules
npm install
```

## Estructura de URLs

### Backend API
- http://localhost:3000/api/v1/documentacion
- http://localhost:3000/api/v1/products/get/all
- http://localhost:3000/api/v1/users/get/all

### Frontend Angular
- http://localhost:4200/
- http://localhost:4200/products
- http://localhost:4200/users

### Frontend React
- http://localhost:3001/
- http://localhost:3001/products
- http://localhost:3001/users

## Siguientes Pasos

1. **Desarrollo**: Comienza a desarrollar nuevas funcionalidades
2. **Personalización**: Modifica estilos y componentes según tus necesidades
3. **Despliegue**: Configura para producción en servidor real
4. **Testing**: Implementa tests unitarios y de integración

## Soporte

Para problemas o dudas:
1. Revisar logs de consola en navegador
2. Verificar logs de servidor backend
3. Comprobar conexión a base de datos
4. Consultar documentación de Angular/React