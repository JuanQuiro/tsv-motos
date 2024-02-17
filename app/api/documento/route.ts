  const { NextResponse } = require("next/server");
  import {v2 as cloudinary} from 'cloudinary';
  import { writeFile } from 'fs/promises';
  import { auth } from '@clerk/nextjs';
  import { PrismaClient } from '@prisma/client';
  import { v4 as uuidv4 } from 'uuid';
  import { join } from 'path';
  import { promises as fs } from 'fs';



  cloudinary.config({ 
    cloud_name: 'ddvavjm3j', 
    api_key: '885457736781271', 
    api_secret: 'h6SxnKJOPeFxdwtGkUGrRkt-AB4',
    secure: true,
  });


  const prisma = new PrismaClient()

  export const POST = async (req : any) => {
    const { userId } : { userId: string | null } = auth();
    const data = await req.formData();
    const images = ['image', 'image2', 'image3', 'image4'];
    const uploadedImages = [] as any;
  
    for (const imageField of images) {
      const image = await data.get(imageField);
  
      if (!image) {
        continue;
      }
  
      const fileBuffer = await image.arrayBuffer();
      const mime = image.type;
      const encoding = 'base64';
      const base64Data = Buffer.from(fileBuffer).toString('base64');
      const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
  
      try {
        const uploadToCloudinary = () => {
          return new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload(fileUri, {
                invalidate: true,
              })
              .then((result) => {
                //console.log(result);
                resolve(result);
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          });
        };
  
        const result = await uploadToCloudinary();
        const imageUrl = result;
  
        uploadedImages.push(imageUrl);
        console.log(uploadedImages);

        
        
      } catch (error) {
        console.log("server err", error);
      }
    }
  
    
  try {
    const user = await prisma.documentos.create({
      data: {
        id_clerk : userId || 'Error', 
        image : uploadedImages[0].url,
        image2 : uploadedImages[1]?.url,
        image3 : uploadedImages[2]?.url,
        image4 : uploadedImages[3]?.url
      },
    })
  } catch (error) {
    console.log('error');
  }

  const user2 = await prisma.clerk.update({
    where: { id_clerk: userId || 'ERROR' },
    data: { estado_formulario: 'Finalizar' },
  })


  return NextResponse.redirect(new URL('/finalizar', req.url))
  };
