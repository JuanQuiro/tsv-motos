import prisma from '../../lib/prisma'

export default async function handle(data) {
  const result = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      Ingresos: '500',
      Yummy: true,
      Extranjero: true,
      Cedula: 'sasasa',
      PrimerNombre: 'sasasa',
      SegundoNombre: 'sasasas',
      PrimerApellido: 'asasas',
      SegundoApellido: 'saasa',
      Dirrecion: 'asa',
      message: 'as',
      Pais: 'paris',
      subject: 'sasa'
    }
  })
  return res.status(200).json({ success: true })
}
