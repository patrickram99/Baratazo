# Baratazo

Este es un proyecto monorepo que contiene un backend en Express y un frontend en React.

## Requisitos previos

- Node.js (versión 14 o superior)
- npm (normalmente viene con Node.js)

## Clonar el repositorio

Para clonar el repositorio, ejecuta el siguiente comando en tu terminal:

```bash
git clone https://github.com/patrickram99/Baratazo.git
cd Baratazo
```

## Instalación

1. Instala las dependencias del proyecto raíz:

```bash
npm install
```

2. Instala las dependencias del backend:

```bash
npm install -w backend
```

3. Instala las dependencias del frontend:

```bash
npm install -w frontend
```

## Configurar base de datos

1. Instalar PostgreSQL.

2. Crear una base de datos vacía llamada "baratazo_db".

3. Crear archivo .env en folder backend, debería verse asi:

```
.
├── backend/
│   └── .env
│   └── .gitignore
│   └── package.json
│   └── otros archivos...
├── frontend/
│   ├── src/
│   └── package.json
├── package.json
└── README.md
```

3. Definir la URL de conexión a PostgreSQL con usuario y contraseña del programa dentro del archivo .env:

```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/baratazo_db?schema=public"
```

4. Ejecutar la migración inicial de la base de datos
   
```
cd backend/
npx prisma db push
```

5. Añadir datos de prueba, debe hacerse manualmente desde PgAdmin o el gestor de PostgreSQL que usen
   
```
USE baratazo_db;

-- Limpiar tablas existentes
DELETE FROM "Inventory";
DELETE FROM "ProductVariant";
DELETE FROM "Product";
DELETE FROM "Category";

-- Reiniciar las secuencias de autoincremento
ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Product_id_seq" RESTART WITH 1;
ALTER SEQUENCE "ProductVariant_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Inventory_id_seq" RESTART WITH 1;

-- Insertar categorías de muestra
INSERT INTO "Category" (id, name, description)
VALUES 
(1, 'CPUs', 'Central Processing Units'),
(2, 'GPUs', 'Graphics Processing Units'),
(3, 'Motherboards', 'Computer Motherboards'),
(4, 'RAM', 'Random Access Memory');

-- Insertar productos de muestra con IDs explícitos
INSERT INTO "Product" (id, name, description, price, "categoryId", brand, model, specifications, "imageUrls", "createdAt", "updatedAt")
VALUES 
(1, 'Intel Core i7-11700K', 'High-performance CPU for gaming and productivity', 349.99, 1, 'Intel', 'i7-11700K', 
 '{"cores": 8, "threads": 16, "base_clock": "3.6 GHz", "boost_clock": "5.0 GHz"}', 
 ARRAY['https://example.com/i7-11700k-image.jpg'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(2, 'AMD Ryzen 9 5900X', 'Powerful CPU for enthusiasts and professionals', 549.99, 1, 'AMD', 'Ryzen 9 5900X', 
 '{"cores": 12, "threads": 24, "base_clock": "3.7 GHz", "boost_clock": "4.8 GHz"}', 
 ARRAY['https://example.com/ryzen-9-5900x-image.jpg'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(3, 'NVIDIA GeForce RTX 3080', 'High-end graphics card for 4K gaming', 699.99, 2, 'NVIDIA', 'GeForce RTX 3080', 
 '{"memory": "10GB GDDR6X", "cuda_cores": 8704, "boost_clock": "1.71 GHz"}', 
 ARRAY['https://example.com/rtx-3080-image.jpg'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(4, 'ASUS ROG Strix B550-F Gaming', 'Feature-rich motherboard for AMD Ryzen CPUs', 189.99, 3, 'ASUS', 'ROG Strix B550-F Gaming', 
 '{"socket": "AM4", "form_factor": "ATX", "memory_slots": 4}', 
 ARRAY['https://example.com/rog-strix-b550f-image.jpg'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

(5, 'Corsair Vengeance LPX 32GB', 'High-performance DDR4 RAM kit', 159.99, 4, 'Corsair', 'Vengeance LPX', 
 '{"capacity": "32GB", "speed": "3200MHz", "latency": "CL16"}', 
 ARRAY['https://example.com/corsair-vengeance-lpx-image.jpg'], 
 CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insertar variantes de productos
INSERT INTO "ProductVariant" ("productId", sku, name, price)
VALUES 
(1, 'I7-11700K-BOX', 'Intel Core i7-11700K Boxed', 349.99),
(1, 'I7-11700K-TRAY', 'Intel Core i7-11700K Tray', 339.99),
(2, 'R9-5900X-BOX', 'AMD Ryzen 9 5900X Boxed', 549.99),
(3, 'RTX3080-10G', 'NVIDIA GeForce RTX 3080 10GB', 699.99),
(3, 'RTX3080-12G', 'NVIDIA GeForce RTX 3080 12GB', 799.99),
(4, 'ROG-B550F-GAMING', 'ASUS ROG Strix B550-F Gaming', 189.99),
(5, 'CMK32GX4M2E3200C16', 'Corsair Vengeance LPX 32GB (2x16GB)', 159.99);

-- Insertar inventario de muestra
INSERT INTO "Inventory" ("productId", "variantId", quantity, location)
VALUES 
(1, 1, 50, 'Warehouse A'),
(1, 2, 30, 'Warehouse B'),
(2, 3, 40, 'Warehouse A'),
(3, 4, 25, 'Warehouse C'),
(3, 5, 15, 'Warehouse C'),
(4, 6, 60, 'Warehouse B'),
(5, 7, 100, 'Warehouse A');
```

## Ejecutar el proyecto

Para ejecutar tanto el backend como el frontend simultáneamente, usa el siguiente comando en la raíz del proyecto:

```bash
npm start
```

Esto iniciará el backend en `http://localhost:4000` y el frontend en `http://localhost:5173`.

## Comandos útiles

- Ejecutar solo el backend:

  ```bash
  npm run backend
  ```

- Ejecutar solo el frontend:

  ```bash
  npm run frontend
  ```

- Ejecutar linter en todo el proyecto:

  ```bash
  npm run lint
  ```

- Formatear código en todo el proyecto:
  ```bash
  npm run format
  ```

## Instalar nuevos paquetes

Para instalar nuevos paquetes en un workspace específico, usa el flag `-w`:

- Para el backend:

  ```bash
  npm install nombre-del-paquete -w backend
  ```

- Para el frontend:

  ```bash
  npm install nombre-del-paquete -w frontend
  ```

- Para instalar un paquete como dependencia de desarrollo, agrega `-D`:
  ```bash
  npm install nombre-del-paquete -D -w backend
  ```

## Estructura del proyecto

```
.
├── backend/
│   ├── src/
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
├── package.json
└── README.md
```

## Contribuir

1. Asegúrate de que tu código pase el linter y esté formateado correctamente antes de hacer commit.
2. Sigue las convenciones de commit establecidas en el proyecto.
3. El commit solo se considera valido si sigue el formato de [https://www.conventionalcommits.org/en/v1.0.0/#summary](https://www.conventionalcommits.org/en/v1.0.0/#summary)
