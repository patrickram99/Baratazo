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
-- First, let's create a category for these products
INSERT INTO "Category" (name, description) 
VALUES ('Electronics', 'Electronic devices and components')
RETURNING id;

-- Assuming the above query returned 1 as the category id
-- Now, let's insert the products

INSERT INTO "Product" (name, description, price, "categoryId", brand, model, specifications, "imageUrls", "createdAt", "updatedAt")
VALUES 
('Laptop Gamer', 'Potente laptop para gaming', 1299.99, 1, 'Generic', 'Standard', '{}', ARRAY['img/laptop1.jpg'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PC de Escritorio', 'Computadora de alto rendimiento', 999.99, 1, 'Generic', 'Standard', '{}', ARRAY['img/pc1.jpg'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Monitor 4K', 'Monitor de alta resolución', 499.99, 1, 'Generic', 'Standard', '{}', ARRAY['img/monitor1.jpg'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Teclado Mecánico', 'Teclado para gamers', 129.99, 1, 'Generic', 'Standard', '{}', ARRAY['img/teclado1.jpg'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mouse Óptico', 'Mouse de alta precisión', 59.99, 1, 'Generic', 'Standard', '{}', ARRAY['img/mouse1.jpg'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Auriculares Gaming', 'Auriculares con micrófono', 89.99, 1, 'Generic', 'Standard', '{}', ARRAY['img/auriculares1.jpg'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Tarjeta Gráfica', 'GPU de última generación', 699.99, 1, 'Generic', 'Standard', '{}', ARRAY['img/gpu1.jpg'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SSD 1TB', 'Disco de estado sólido', 149.99, 1, 'Generic', 'Standard', '{}', ARRAY['img/ssd1.jpg'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Fuente de Poder', 'Fuente modular 750W', 129.99, 1, 'Generic', 'Standard', '{}', ARRAY['img/fuente1.jpg'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Gabinete Gaming', 'Case con iluminación RGB', 99.99, 1, 'Generic', 'Standard', '{}', ARRAY['img/gabinete1.jpg'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Webcam HD', 'Cámara para streaming', 79.99, 1, 'Generic', 'Standard', '{}', ARRAY['img/webcam1.jpg'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
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
