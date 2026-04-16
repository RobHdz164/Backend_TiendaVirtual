# 📚 DOCUMENTACIÓN DE LA API - TIENDA VIRTUAL

## 🚀 Inicio Rápido

### Instalación de dependencias
```bash
npm.cmd install
```

### Iniciar el servidor
```bash
npm.cmd start
```

El servidor estará disponible en `http://localhost:8000`

### Verificar que está funcionando
```bash
# En otra terminal, prueba este comando:
curl http://localhost:8000/
# Deberías ver: {"message":"Bienvenido a mi API de tienda virtual"}
```

---

## 📋 ENDPOINTS - CATEGORÍAS

### Listar todas las categorías
```
GET /api/categorias
```
**Respuesta:**
```json
{
  "message": "Categorias encontradas",
  "categorias": [...]
}
```

### Buscar categoría por ID
```
GET /api/categorias/:id
```

### Buscar categoría por nombre
```
GET /api/categorias?nombre=Snacks
```

### Crear categoría
```
POST /api/categorias
Content-Type: application/json

{
  "nombre": "Frutas"
}
```

### Actualizar categoría
```
PUT /api/categorias/:id
Content-Type: application/json

{
  "nombre": "Frutas y Verduras"
}
```

### Eliminar categoría
```
DELETE /api/categorias/:id
```

---

## 🛍️ ENDPOINTS - PRODUCTOS

### Listar todos los productos
```
GET /api/productos
```

### Buscar producto por ID
```
GET /api/productos/:id
```

### Buscar productos por nombre (búsqueda parcial LIKE)
```
GET /api/productos?nombre=Leche
```

### Buscar productos por categoría
```
GET /api/productos?id_categoria=2
```

### Buscar por nombre Y categoría
```
GET /api/productos?nombre=Leche&id_categoria=3
```

### Crear producto
```
POST /api/productos
Content-Type: application/json

{
  "nombre": "Jugo de Manzana",
  "descripcion": "Jugo natural de manzana",
  "precio": 2.50,
  "stock": 100,
  "id_categoria": 2
}
```

### Actualizar producto
```
PUT /api/productos/:id
Content-Type: application/json

{
  "nombre": "Jugo de Manzana Premium",
  "precio": 3.50,
  "stock": 80
}
```

### Eliminar producto
```
DELETE /api/productos/:id
```

---

## 👥 ENDPOINTS - USUARIOS

### Listar todos los usuarios
```
GET /api/usuarios
```

### Buscar usuario por ID
```
GET /api/usuarios/:id
```

### Buscar usuario por email
```
GET /api/usuarios?email=juan@example.com
```

### Crear usuario
```
POST /api/usuarios
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "direccion": "Calle Principal 123",
  "telefono": "555-0001",
  "email": "juan@example.com",
  "password": "pass123",
  "rol": "cliente"
}
```

### Actualizar usuario
```
PUT /api/usuarios/:id
Content-Type: application/json

{
  "nombre": "Juan Cruz Pérez",
  "telefono": "555-0010"
}
```

### Eliminar usuario
```
DELETE /api/usuarios/:id
```

---

## 🛒 ENDPOINTS - CARRITOS

### Listar todos los carritos
```
GET /api/carritos
```

### Buscar carrito por ID
```
GET /api/carritos/:id
```

### Buscar carritos por usuario
```
GET /api/carritos?id_usuario=1
```

### Crear carrito
```
POST /api/carritos
Content-Type: application/json

{
  "id_usuario": 1,
  "estado": true,
  "total": 0
}
```

### Actualizar carrito
```
PUT /api/carritos/:id
Content-Type: application/json

{
  "estado": false,
  "total": 25.50
}
```

### Eliminar carrito
```
DELETE /api/carritos/:id
```

---

## 📦 ENDPOINTS - DETALLES DE CARRITO

### Listar todos los detalles
```
GET /api/carrito-detalle
```

### Buscar detalle por ID
```
GET /api/carrito-detalle/:id
```

### Buscar detalles por carrito
```
GET /api/carrito-detalle?id_carrito=1
```

### Crear detalle de carrito
```
POST /api/carrito-detalle
Content-Type: application/json

{
  "id_carrito": 1,
  "id_producto": 5,
  "precio_unitario": 2.50,
  "cantidad": 3
}
```

### Actualizar detalle
```
PUT /api/carrito-detalle/:id
Content-Type: application/json

{
  "cantidad": 5,
  "precio_unitario": 2.75
}
```

### Eliminar detalle
```
DELETE /api/carrito-detalle/:id
```

---

## 📊 CATEGORÍAS DISPONIBLES

1. **Snacks** - Papas fritas, doritos, cacahuetes, etc.
2. **Bebidas** - Refrescos, agua, jugo, café, té
3. **Lácteos** - Leche, yogur, queso, mantequilla
4. **Dulces** - Chocolate, caramelos, chicle, galletas
5. **Alimentos Enlatados** - Atún, frijoles, sopa, maíz
6. **Higiene Personal** - Papel, jabón, pasta dental, desodorante
7. **Conveniencia** - Cigarrillos y otros productos

---

## 💾 DATOS DE PRUEBA

El sistema incluye:
- 7 categorías
- 27 productos
- 4 usuarios (3 clientes + 1 administrador)
- 3 carritos
- 6 detalles de carrito

**Usuarios de prueba:**
- Email: juan@example.com | Contraseña: pass123
- Email: maria@example.com | Contraseña: pass456
- Email: carlos@example.com | Contraseña: pass789
- Email: admin@example.com | Contraseña: admin123

---

## 📝 NOTAS IMPORTANTES

- Todas las búsquedas por nombre usan búsqueda parcial (LIKE)
- Las fechas se generan automáticamente
- Los roles de usuario son: "cliente" o "administrador"
- El estado del carrito es: true (activo) o false (cerrado/completado)
- Las asociaciones (relaciones) se incluyen automáticamente en las respuestas
- La base de datos incluye datos de prueba realistas para una tienda de conveniencia

---

## 🧪 TESTING CON HERRAMIENTAS EXTERNAS

Para probar la API, puedes usar:
- **Postman** - https://www.postman.com/
- **Thunder Client** - Extensión de VS Code
- **cURL** - Desde la terminal
- **Insomnia** - https://insomnia.rest/

Ejemplo con cURL:
```bash
curl -X GET http://localhost:8000/api/productos
curl -X POST http://localhost:8000/api/categorias -H "Content-Type: application/json" -d "{\"nombre\":\"Frutas\"}"
```

---

## ✅ ESTADO DEL PROYECTO

✅ CRUD completo implementado para todas las tablas
✅ Búsquedas avanzadas configuradas
✅ Datos de prueba insertados
✅ Todas las pruebas pasando
✅ Asociaciones (relaciones) configuradas correctamente

---

**Última actualización:** 14 de Abril de 2026 - Versión 1.0
