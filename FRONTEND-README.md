# FallaMarket - Frontend Angular Adaptado

## Descripción

El frontend de Angular ha sido completamente adaptado para trabajar con el backend de trajes falleros. Todos los componentes han sido modificados para manejar la estructura de datos del backend.

## Cambios Realizados

### 1. **Interfaces Actualizadas** (`src/app/models/interfaces.ts`)
- **Traje**: Interfaz principal basada en el modelo del backend
  - `_id`: ID único del traje
  - `nombre`: Nombre del traje
  - `material`: Material del traje
  - `propietario`: Propietario del traje
  - `createdAt` y `updatedAt`: Fechas automáticas

### 2. **Servicio TrajeService** (`src/app/services/product.service.ts`)
- Conecta con los endpoints reales del backend: `http://localhost:3000/api/v1/trajes`
- **Endpoints implementados**:
  - `GET /` - Obtener todos los trajes
  - `GET /traje/:id` - Obtener traje por ID
  - `POST /anadir` - Crear nuevo traje
  - `PUT /editar/:id` - Actualizar traje
  - `DELETE /eliminar/:id` - Eliminar traje

### 3. **Componentes Adaptados**
- **TrajeListComponent**: Lista de trajes con filtros por material y propietario
- **TrajeFormComponent**: Formulario para crear/editar trajes
- **TrajeDetailComponent**: Vista detallada de un traje
- **HomeComponent**: Dashboard adaptado con estadísticas de trajes

### 4. **Rutas Actualizadas** (`src/app/app.routes.ts`)
- `/trajes` - Lista de trajes
- `/trajes/add` - Añadir nuevo traje
- `/trajes/edit/:id` - Editar traje
- `/trajes/:id` - Ver detalles del traje

## Cómo usar el sistema

### 1. **Iniciar el Backend**
```bash
cd backend
npm start
```
El backend debe ejecutarse en `http://localhost:3000`

### 2. **Iniciar el Frontend Angular**
```bash
cd frontend-angular
npm start
```
El frontend se ejecutará en `http://localhost:4200`

### 3. **Usar la aplicación**

1. **Dashboard (Página principal)**:
   - Ve estadísticas de tu colección
   - Accede rápidamente a la lista de trajes
   - Ve los trajes más recientes

2. **Lista de Trajes**:
   - Ve todos los trajes registrados
   - Filtra por nombre, material o propietario
   - Accede a acciones de ver, editar y eliminar

3. **Añadir Traje**:
   - Completa el formulario con nombre, material y propietario
   - Selecciona materiales predefinidos o añade uno personalizado

4. **Ver Detalles**:
   - Ve información completa del traje
   - Accede a acciones de edición y eliminación
   - Ve el historial de fechas

## Materiales Predefinidos

El sistema incluye materiales comunes para trajes falleros:
- Seda
- Brocado
- Terciopelo
- Raso
- Tafetán
- Damasco
- Algodón
- Lino

## Características

### ✅ **Funcionalidades Implementadas**
- ✅ Conexión completa con el backend real
- ✅ CRUD completo de trajes (Crear, Leer, Actualizar, Eliminar)
- ✅ Filtros y búsqueda
- ✅ Validación de formularios
- ✅ Dashboard con estadísticas
- ✅ Responsive design
- ✅ Manejo de errores
- ✅ Navegación intuitiva

### 🎨 **Diseño y UX**
- Interfaz adaptada a la temática fallera
- Gradientes azules/morados para representar la tradición
- Iconos de trajes y coronas falleras
- Cards con hover effects
- Formularios con validación visual
- Timeline para historial de cambios

### 📱 **Responsive**
- Optimizado para móviles y tablets
- Navegación adaptativa
- Cards que se ajustan al tamaño de pantalla

## Estructura de Archivos Nuevos/Modificados

```
frontend-angular/src/app/
├── models/
│   └── interfaces.ts (✅ Actualizado)
├── services/
│   └── product.service.ts (✅ Actualizado - ahora TrajeService)
├── components/
│   ├── home/ (✅ Actualizado)
│   ├── traje-list/ (⭐ Nuevo)
│   ├── traje-form/ (⭐ Nuevo)
│   └── traje-detail/ (⭐ Nuevo)
├── app.routes.ts (✅ Actualizado)
└── app.component.ts (✅ Actualizado)
```

## Tecnologías Utilizadas

- **Frontend**: Angular 17, Bootstrap 5, Font Awesome
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Comunicación**: HTTP REST API
- **Validación**: Reactive Forms con Validators

## Esquema de Datos

```typescript
interface Traje {
  _id?: string;
  nombre: string;      // Requerido, mínimo 3 caracteres
  material: string;    // Requerido
  propietario: string; // Requerido, mínimo 2 caracteres
  createdAt?: string;  // Automático
  updatedAt?: string;  // Automático
}
```

## Testing

Para probar el sistema:

1. Añadir algunos trajes de prueba
2. Verificar que la lista se actualiza
3. Probar los filtros
4. Editar y eliminar trajes
5. Verificar que las estadísticas se actúen correctamente

## Próximos Pasos

Si quieres expandir el sistema:
- Añadir autenticación de usuarios
- Añadir imágenes a los trajes
- Implementar sistema de préstamos
- Añadir categorías adicionales
- Implementar exportación de datos