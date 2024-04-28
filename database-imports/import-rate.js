const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient()

async function main() {
  const data = fs.readFileSync('rate.txt', 'utf8')
  const lines = data.split('\n')

  for (const line of lines) {
    const fields = line.split('\t')

    console.log(fields)
    
    await prisma.rate.create({
        data: {
            id: fields[0],
            playerId: fields[5],
            stageId: fields[4],
        rate: Number(fields[1]),
        },
      })

    // await prisma.rate.create({
    //   data: {
    //     id: fields[0],
    //     rate: fields[1],
    //     createdAt: new Date(fields[2]),
    //     updatedAt: new Date(fields[3]),
    //     stageId: fields[4],
    //     player_id: fields[5],
    //   },
    // })
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