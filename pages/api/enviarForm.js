import prisma from '../../lib/prisma'

export default async function handle(data) {
  const result = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      Ingresos: data.Ingresos,
      Yummy:data.Yummy,
      Extranjero:data.Extranjero,
      Cedula: data.Cedula,
      PrimerNombre: data.PrimerNombre,
      SegundoNombre: data.SegundoNombre,
      PrimerApellido: data.PrimerApellido,
      SegundoApellido: data.SegundoApellido,
      Dirrecion: data.Dirrecion,
      message: data.message,
      Pais: data.Pais,
      subject: data.subject
    }
  })
        return res.status(200).json({ success: true })
}
