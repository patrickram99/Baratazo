// src/data.ts

export interface Producto {
  nombre: string
  descripcion: string
  precio: string
  imagen: string
}

export const productos: Producto[] = [
  {
    nombre: 'Laptop Gamer',
    descripcion: 'Potente laptop para gaming',
    precio: '$1299.99',
    imagen: 'img/laptop1.jpg',
  },
  {
    nombre: 'PC de Escritorio',
    descripcion: 'Computadora de alto rendimiento',
    precio: '$999.99',
    imagen: 'img/pc1.jpg',
  },
  {
    nombre: 'Monitor 4K',
    descripcion: 'Monitor de alta resolución',
    precio: '$499.99',
    imagen: 'img/monitor1.jpg',
  },
  {
    nombre: 'Teclado Mecánico',
    descripcion: 'Teclado para gamers',
    precio: '$129.99',
    imagen: 'img/teclado1.jpg',
  },
  {
    nombre: 'Mouse Óptico',
    descripcion: 'Mouse de alta precisión',
    precio: '$59.99',
    imagen: 'img/mouse1.jpg',
  },
  {
    nombre: 'Auriculares Gaming',
    descripcion: 'Auriculares con micrófono',
    precio: '$89.99',
    imagen: 'img/auriculares1.jpg',
  },
  {
    nombre: 'Tarjeta Gráfica',
    descripcion: 'GPU de última generación',
    precio: '$699.99',
    imagen: 'img/gpu1.jpg',
  },
  {
    nombre: 'SSD 1TB',
    descripcion: 'Disco de estado sólido',
    precio: '$149.99',
    imagen: 'img/ssd1.jpg',
  },
  {
    nombre: 'Fuente de Poder',
    descripcion: 'Fuente modular 750W',
    precio: '$129.99',
    imagen: 'img/fuente1.jpg',
  },
  {
    nombre: 'Gabinete Gaming',
    descripcion: 'Case con iluminación RGB',
    precio: '$99.99',
    imagen: 'img/gabinete1.jpg',
  },
  {
    nombre: 'Webcam HD',
    descripcion: 'Cámara para streaming',
    precio: '$79.99',
    imagen: 'img/webcam1.jpg',
  },
]
