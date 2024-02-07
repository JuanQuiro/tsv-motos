import prisma from '../../lib/prisma'

export default async function handle(informacion) {
  const result = await prisma.user.create({
    data: {
      name: informacion.name,
      email: informacion.email,
      Ingresos: informacion.Ingresos,
      Yummy: informacion.Yummy,
      Extranjero: informacion.Extranjero,
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
