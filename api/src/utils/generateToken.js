import jwt from 'jsonwebtoken'

const { JWT_SECRET, JWT_LIFESPAN } = process.env

const generateToken = userId =>
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_LIFESPAN })

export { generateToken }