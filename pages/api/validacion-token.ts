import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from '@clerk/nextjs';


type ValidateTokenResponse = {
    valid: boolean;
};

const handler = (req: NextApiRequest, res: NextApiResponse<ValidateTokenResponse>) => {
    const prisma = new PrismaClient()
  if (req.method === "POST") {
    const { token } = req.body;
    const serverToken = "123";

    if (token === serverToken) {
        const { userId } : { userId: string | null } = auth();
        const prismaClerk = async () => {
        await prisma.admin.create({
                data: {
                    autorizacion: true,
                    id_clerk: userId || 'ERROR'
        }
    })
}
    prismaClerk()
      res.status(200).json({ valid: true });
    } else {
      res.status(200).json({ valid: false });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
};

export default handler;