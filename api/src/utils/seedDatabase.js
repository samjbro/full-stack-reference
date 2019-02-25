import bcrypt from 'bcryptjs'

import prisma from '../prisma'

const userOne = {
  input: {
    name: 'Test',
    email: 'test@email.com',
    password: bcrypt.hashSync('valid1234')
  }
}

const seedDatabase = async () => {
  await prisma.mutation.deleteManyUsers()
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  })
}

seedDatabase()