import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createSale = async (req: Request, res: Response) => {
  try {
    const { usuarioId, productoId, cantidad } = req.body;

    // Obtener el producto
    const producto = await prisma.producto.findUnique({
      where: { id: productoId },
    });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Calcular el total
    const total = producto.precio * cantidad;

    // Crear la venta
    const venta = await prisma.venta.create({
      data: {
        usuarioId,
        productoId,
        cantidad,
        total,
      },
    });

    // Crear la boleta
    const boleta = await prisma.boleta.create({
      data: {
        ventaId: venta.id,
        numero: `B-${venta.id}`, // Generar un número de boleta único
        total: venta.total,
      },
    });

    // Generar la respuesta JSON
    const response = {
      venta: {
        id: venta.id,
        usuario: { id: venta.usuarioId },
        producto: { id: venta.productoId, nombre: producto.nombre, precio: producto.precio },
        cantidad: venta.cantidad,
        total: venta.total,
        fecha: venta.fecha,
      },
      boleta: {
        id: boleta.id,
        numero: boleta.numero,
        fecha: boleta.fecha,
        total: boleta.total,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error al procesar la venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};