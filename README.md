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
