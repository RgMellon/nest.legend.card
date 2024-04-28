
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient()

async function main() {
  const data = fs.readFileSync('player.txt', 'utf8')
  const lines = data.split('\n')
  
  for (const line of lines) {
    const fields = line.split('\t')
    // console.log(fields)

    await prisma.player.create({
      data: {
        id: fields[0],
        createdAt: new Date(fields[1]),
        updatedAt: new Date(fields[2]),
        teamId: fields[3],
        nationality: fields[4],
        nickName: fields[5],
        photo: fields[6],
        role: fields[7],
      },
    })
  }

  console.log('Dados importados com sucesso!')
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })