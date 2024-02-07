import prisma from '../../lib/prisma'

export default async function handle(info) {
  const result = await prisma.user.create({
    data: {
      name: `${info.name}`,
      email: `${info.email}`,
      Ingresos: `${info.Ingresos}`,
      Yummy: true,
      Extranjero: true,
      Cedula: `${info.Cedula}`,
      PrimerNombre: `${info.PrimerNombre}`,
      SegundoNombre: `${info.SegundoNombre}`,
      PrimerApellido: `${info.PrimerApellido}`,
      SegundoApellido: `${info.SegundoApellido}`,
      Dirrecion: `${info.Dirrecion}`,
      message: `${info.message}`,
      Pais: 'paris',
      subject: 'sasa'
    }
  })
  return res.status(200).json({ success: true })
}
