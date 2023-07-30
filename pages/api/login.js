export default function handler(req, res) {
  
  const { username } = req.body;

  const groupId = 'group-1';
  res.status(200).json({ groupId });
}
