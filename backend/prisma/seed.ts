import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    name: 'Procesador Intel Core i9-13900K',
    description: 'Procesador de 24 núcleos y 32 hilos, ideal para gaming y tareas pesadas.',
    price: 2199.99,
    categoryId: 1, // CPU
    brand: 'Intel',
    model: 'i9-13900K',
    specifications: { cores: 24, threads: 32, baseClock: '3.0GHz', boostClock: '5.8GHz' },
    imageUrls: [
      'https://res.cloudinary.com/dyrcgw9wb/image/upload/v1732667011/Procesador_Intel_i9-13900K_qbwhf4.jpg',
    ],
  },
  {
    name: 'Tarjeta Gráfica NVIDIA GeForce RTX 4090',
    description: 'La GPU más potente con 24GB de VRAM GDDR6X para gaming 4K.',
    price: 13599.99,
    categoryId: 2, // GPU
    brand: 'NVIDIA',
    model: 'RTX 4090',
    specifications: { vram: '24GB', cudaCores: 16384, powerRequirement: '450W' },
    imageUrls: [
      'https://res.cloudinary.com/dyrcgw9wb/image/upload/v1732667011/Tarjeta_Gr%C3%A1fica_NVIDIA_RTX_4090_erh7aj.jpg',
    ],
  },
  {
    name: 'Placa Base ASUS ROG STRIX Z790-E Gaming WiFi',
    description: 'Placa base con soporte para DDR5 y PCIe 5.0 para entusiastas del rendimiento.',
    price: 2899.99,
    categoryId: 3, // Motherboard
    brand: 'ASUS',
    model: 'ROG STRIX Z790-E',
    specifications: { chipset: 'Z790', socket: 'LGA1700', wifi: true },
    imageUrls: [
      'https://res.cloudinary.com/tu-cloud-name/image/upload/v1/productos/motherboard-asus.jpg',
    ],
  },
  {
    name: 'Memoria RAM Corsair Vengeance DDR5 32GB (2x16GB)',
    description: 'Memoria DDR5 de alto rendimiento con velocidad de 5600MHz.',
    price: 569.99,
    categoryId: 4, // RAM
    brand: 'Corsair',
    model: 'Vengeance DDR5',
    specifications: { capacity: '32GB', speed: '5600MHz', latency: 'CL36' },
    imageUrls: [
      'https://res.cloudinary.com/dyrcgw9wb/image/upload/v1732669625/Memoria_RAM_Corsair_Vengeance_DDR5_32GB_2x16GB_nyntqt.avif',
    ],
  },
  {
    name: 'Disco Duro Seagate Barracuda 2TB',
    description: 'Disco duro confiable para almacenamiento masivo de datos.',
    price: 269.99,
    categoryId: 5, // Storage
    brand: 'Seagate',
    model: 'Barracuda',
    specifications: { capacity: '2TB', type: 'HDD', speed: '7200RPM' },
    imageUrls: [
      'https://res.cloudinary.com/dyrcgw9wb/image/upload/v1732669624/Disco_Duro_Seagate_Barracuda_2TB_tftl8e.webp',
    ],
  },
  {
    name: 'SSD Samsung 980 Pro 1TB',
    description: 'Unidad SSD NVMe con velocidad PCIe 4.0 para alto rendimiento.',
    price: 588.99,
    categoryId: 5, // Storage
    brand: 'Samsung',
    model: '980 Pro',
    specifications: { capacity: '1TB', type: 'NVMe SSD', readSpeed: '7000MB/s' },
    imageUrls: [
      'https://res.cloudinary.com/dyrcgw9wb/image/upload/v1732669658/SSD_Samsung_980_Pro_1TB_w8bhn0.webp',
    ],
  },
  {
    name: 'Fuente de Poder EVGA 750W SuperNOVA G5',
    description: 'Fuente de poder certificada 80 Plus Gold para sistemas exigentes.',
    price: 529.99,
    categoryId: 6, // Power Supply
    brand: 'EVGA',
    model: 'SuperNOVA G5',
    specifications: { wattage: '750W', efficiency: '80 Plus Gold', modular: true },
    imageUrls: [
      'https://res.cloudinary.com/dyrcgw9wb/image/upload/v1732669625/Fuente_de_Poder_EVGA_750W_SuperNOVA_G5_ol313w.jpg',
    ],
  },
  {
    name: 'Gabinete NZXT H510 Elite',
    description: 'Gabinete compacto con iluminación RGB y panel de vidrio templado.',
    price: 629.99,
    categoryId: 7, // Case
    brand: 'NZXT',
    model: 'H510 Elite',
    specifications: { type: 'Mid Tower', color: 'Black', fansIncluded: 2 },
    imageUrls: [
      'https://res.cloudinary.com/dyrcgw9wb/image/upload/v1732669625/Gabinete_NZXT_H510_Elite_obdoan.jpg',
    ],
  },
  {
    name: 'Monitor ASUS TUF Gaming VG27AQ',
    description: 'Monitor gaming 27" con resolución 1440p, 165Hz y tecnología G-Sync.',
    price: 1399.99,
    categoryId: 8, // Monitor
    brand: 'ASUS',
    model: 'VG27AQ',
    specifications: { resolution: '2560x1440', refreshRate: '165Hz', panel: 'IPS' },
    imageUrls: [
      'https://res.cloudinary.com/dyrcgw9wb/image/upload/v1732669625/Monitor_ASUS_TUF_Gaming_VG27AQ_hhe494.jpg',
    ],
  },
  {
    name: 'Teclado Mecánico HyperX Alloy Elite 2',
    description: 'Teclado mecánico RGB con switches lineales Red.',
    price: 309.99,
    categoryId: 9, // Peripherals
    brand: 'HyperX',
    model: 'Alloy Elite 2',
    specifications: { switches: 'Red', rgb: true, layout: 'QWERTY' },
    imageUrls: [
      'https://res.cloudinary.com/dyrcgw9wb/image/upload/v1732669665/Teclado_Mec%C3%A1nico_HyperX_Alloy_Elite_2_blfp7f.jpg',
    ],
  },
]

async function main() {
  try {
    console.log('Comenzando el semillado de productos...')

    // Asegurarse de que las categorías existen antes de insertar productos.
    const categories = [
      { id: 1, name: 'CPU' },
      { id: 2, name: 'GPU' },
      { id: 3, name: 'Motherboard' },
      { id: 4, name: 'RAM' },
      { id: 5, name: 'Storage' },
      { id: 6, name: 'Power Supply' },
      { id: 7, name: 'Case' },
      { id: 8, name: 'Monitor' },
      { id: 9, name: 'Peripherals' },
    ]

    for (const category of categories) {
      await prisma.category.upsert({
        where: { id: category.id },
        update: {},
        create: { id: category.id, name: category.name },
      })
    }

    for (const product of products) {
      const createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          category: {
            connect: { id: product.categoryId },
          },
          brand: product.brand,
          model: product.model,
          specifications: product.specifications,
          imageUrls: product.imageUrls,
        },
      })
      console.log(`Producto ${createdProduct.name} creado con éxito.`)
    }
  } catch (error) {
    console.error('Error al crear los productos:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
