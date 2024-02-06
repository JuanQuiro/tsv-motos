const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body
    if (!data || !data.name || !data.email || !data.subject || !data.message) {
      return res.status(400).send({ message: 'Bad request' })
    }

    try {
      return res.status(200).json({ success: true })
    } catch (err) {
      console.log(err)
      return res.status(400).json({ message: err.message })
    }
  }
  return res.status(400).json({ message: 'Bad request' })
}

export default handler
