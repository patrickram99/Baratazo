import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts'

// Actualizada la interfaz OrderData para incluir email y otros campos necesarios
interface OrderData {
  orderNumber: string
  orderDate: string
  estimatedDelivery: string
  email: string
  totalAmount: number
  statusDates: {
    confirmado: string
    en_proceso: string
    enviado: string
    entregado: string
  }
  products: Array<{
    productId: string
    name: string
    price: number
    cantidad: number
    imageUrl?: string
  }>
}

interface ProcessedData {
  dailySales: Array<{ date: string; total: number; orders: number }>
  productSales: Array<{ name: string; cantidad: number; revenue: number }>
  statusDistribution: Array<{ status: string; count: number }>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const DashboardVentas: React.FC = () => {
  const [orders, setOrders] = useState<Record<string, OrderData>>({})
  const [processedData, setProcessedData] = useState<ProcessedData>({
    dailySales: [],
    productSales: [],
    statusDistribution: [],
  })

  useEffect(() => {
    const ordersData = localStorage.getItem('orderTrackingData')
    if (ordersData) {
      const parsedOrders = JSON.parse(ordersData)
      setOrders(parsedOrders)
      processOrders(parsedOrders)
    }
  }, [])

  const processOrders = (orders: Record<string, OrderData>) => {
    // Procesar ventas diarias
    const dailySalesMap = new Map<string, { total: number; orders: number }>()

    // Procesar ventas por producto
    const productSalesMap = new Map<string, { cantidad: number; revenue: number }>()

    // Procesar distribución de estados
    const statusCount = new Map<string, number>()

    Object.values(orders).forEach(order => {
      // Procesar ventas diarias
      const date = new Date(order.orderDate).toLocaleDateString()
      const currentDaily = dailySalesMap.get(date) || { total: 0, orders: 0 }
      dailySalesMap.set(date, {
        total: currentDaily.total + order.totalAmount,
        orders: currentDaily.orders + 1,
      })

      // Procesar ventas por producto
      order.products.forEach(product => {
        const currentProduct = productSalesMap.get(product.name) || { cantidad: 0, revenue: 0 }
        productSalesMap.set(product.name, {
          cantidad: currentProduct.cantidad + product.cantidad,
          revenue: currentProduct.revenue + product.price * product.cantidad,
        })
      })

      // Contar estados
      Object.entries(order.statusDates).forEach(([status, date]) => {
        if (date) {
          statusCount.set(status, (statusCount.get(status) || 0) + 1)
        }
      })
    })

    setProcessedData({
      dailySales: Array.from(dailySalesMap, ([date, data]) => ({
        date,
        ...data,
      })),
      productSales: Array.from(productSalesMap, ([name, data]) => ({
        name,
        ...data,
      })),
      statusDistribution: Array.from(statusCount, ([status, count]) => ({
        status,
        count,
      })),
    })
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Dashboard de Ventas</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Gráficos existentes */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Ventas Diarias</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={processedData.dailySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" name="Total (S/)" stroke="#8884d8" />
                <Line type="monotone" dataKey="orders" name="# Órdenes" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Ventas por Producto</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processedData.productSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cantidad" name="Cantidad" fill="#8884d8" />
                <Bar dataKey="revenue" name="Ingresos (S/)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Distribución de Estados</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={processedData.statusDistribution}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {processedData.statusDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Resumen</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <h3 className="text-lg font-medium">Total Ventas</h3>
                <p className="text-2xl font-bold text-blue-600">
                  S/{' '}
                  {processedData.dailySales.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)}
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <h3 className="text-lg font-medium">Total Órdenes</h3>
                <p className="text-2xl font-bold text-green-600">
                  {processedData.dailySales.reduce((acc, curr) => acc + curr.orders, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de órdenes */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold">Todas las Órdenes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    ID Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Productos
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {Object.entries(orders).map(([orderNumber, order]) => (
                  <tr key={orderNumber} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">{orderNumber}</td>
                    <td className="whitespace-nowrap px-6 py-4">{order.orderDate}</td>
                    <td className="px-6 py-4">{order.email || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {Object.entries(order.statusDates)
                          .reverse()
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          .find(([_, date]) => date)?.[0] || 'N/A'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      S/ {order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <ul className="list-inside list-disc">
                        {order.products.map((product, index) => (
                          <li key={index}>
                            {product.name} (x{product.cantidad})
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardVentas
