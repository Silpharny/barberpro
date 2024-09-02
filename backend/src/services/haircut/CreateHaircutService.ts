import prismaClient from "../../prisma"

interface HaircutRequest {
  userId: string
  name: string
  price: number
}

class CreateHaircutService {
  async execute({ userId, name, price }: HaircutRequest) {
    if (!name || !price) {
      throw new Error("Name and price are required")
    }

    const haircut = await prismaClient.haircut.create({
      data: {
        name,
        price,
        userId,
      },
    })

    return haircut
  }
}

export { CreateHaircutService }
