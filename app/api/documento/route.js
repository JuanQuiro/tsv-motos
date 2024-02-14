const { NextResponse } = require("next/server");
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'ddvavjm3j', 
  api_key: '885457736781271', 
  api_secret: 'h6SxnKJOPeFxdwtGkUGrRkt-AB4' 
});

export async function POST(req) {
    const data = await req.formData()
    const image = data.get('image')

    if (!image) {
        return NextResponse.json('No se pudo subir la imagen',{status: 400})
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes)

    const filePath = path.join(process.cwd(), 'public', image.name);
    await writeFile(filePath,buffer) 

    const response = await cloudinary.uploader.upload(filePath)
    console.log(response);

    return NextResponse.json('formulario')
}