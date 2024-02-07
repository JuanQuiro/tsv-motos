import prisma from '../../lib/prisma'

export default async function handle(informacion) {
  const result = await prisma.user.create({
    data: {
      name: informacion.name,
      email: 'alice@prismainformacion.com',
      Ingresos: informacion.Ingresos,
      Yummy: true,
      Extranjero: true,
      Cedula: informacion.Cedula,
      PrimerNombre: informacion.PrimerNombre,
      SegundoNombre: informacion.SegundoNombre,
      PrimerApellido: informacion.PrimerApellido,
      SegundoApellido: informacion.SegundoApellido,
      Dirrecion: informacion.Dirrecion,
      message: informacion.message,
      Pais: informacion.Pais,
      subject: informacion.subject
    }
  })
  return res.status(200).json({ success: true })
}
