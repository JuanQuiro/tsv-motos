  const { NextResponse } = require("next/server");
  import {v2 as cloudinary} from 'cloudinary';
  import { PrismaClient } from '@prisma/client';




  cloudinary.config({ 
    cloud_name: 'ddvavjm3j', 
    api_key: '885457736781271', 
    api_secret: 'h6SxnKJOPeFxdwtGkUGrRkt-AB4',
    secure: true,
  });


  const prisma = new PrismaClient()

  export const POST = async (req : any) => {
    const data = await req.formData();
    const images = ['image', 'image2', 'image3', 'image4'];
    const uploadedImages = [] as any;


    const userId = data.get('username');
    //console.log('userId',userId);


    
  
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
  
        await uploadedImages.push(imageUrl);
        //console.log(uploadedImages);

        
        
      } catch (error) {
        console.log("server err", error);
      }
    }
  
    
    
  try {
    const user = await prisma.documentos.create({
      data: {
        id_clerk : userId || 'Error', 
        cedula : uploadedImages[0].url,
        dashoard_yummy : uploadedImages[1]?.url,
        rif : uploadedImages[2]?.url,
        persona_cedula : uploadedImages[3]?.url
      },
    })
  } catch (error) {
    console.log('error');
  }

   //console.log('clerk ID =', userId);
  

   try {
    const user2 = await prisma.clerk.update({
      where: { id_clerk: userId || 'ERROR' },
      data: { estado_formulario: 'Finalizar', estado_proceso: 'Aplicante' },
    });
  } catch (error) {
    console.error('Error al actualizar el usuario en la tabla clerk:', error);
  }
  


  return NextResponse.redirect(new URL('/finalizar', req.url))
  };
