import prisma from '../../lib/prisma';

const obtenerClerks = async () => {
  try {
    const clerks = await prisma.clerk.findMany();
    return clerks;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const clerks = await obtenerClerks();
      return res.status(200).json(clerks);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: 'Bad request' });
};

export default handler;