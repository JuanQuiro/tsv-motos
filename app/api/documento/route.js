const { NextResponse } = require("next/server");
import {v2 as cloudinary} from 'cloudinary';
import { writeFile } from 'fs/promises';
import path from 'path';
import { auth } from '@clerk/nextjs';
import { PrismaClient } from '@prisma/client';


cloudinary.config({ 
  cloud_name: 'ddvavjm3j', 
  api_key: '885457736781271', 
  api_secret: 'h6SxnKJOPeFxdwtGkUGrRkt-AB4' 
});


const prisma = new PrismaClient()

export async function POST(req) {
  const {userId} = auth();
  console.log(userId)
  const data = await req.formData()
  const images = ['image', 'image2', 'image3', 'image4']
  const uploadedImages = []


  for (const imageField of images) {
      const image = data.get(imageField)

      if (!image) {
          continue
      }

      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const filePath = path.join(process.cwd(), 'public', image.name)
      await writeFile(filePath, buffer)

      const response = await cloudinary.uploader.upload(filePath)
      console.log(response)

      uploadedImages.push(response)
  }



  try {
    const user = await prisma.documentos.create({
      data: {
        id_clerk : userId, 
        image : uploadedImages[0].url,
        image2 : uploadedImages[1].url,
        image3 : uploadedImages[2].url,
        image4 : uploadedImages[3].url
      },
    })
  } catch (error) {
    console.log('error');
  }

  const user2 = await prisma.clerk.update({
    where: { id_clerk: userId },
    data: { estado_formulario: 'Finalizar' },
  })


  if (uploadedImages.length === 0) {
      return NextResponse.json('No se pudo subir ninguna imagen', { status: 400 })
  }

  return NextResponse.json('formulario')
}
