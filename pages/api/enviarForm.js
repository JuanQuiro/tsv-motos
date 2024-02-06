import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

prisma.user.create({
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
