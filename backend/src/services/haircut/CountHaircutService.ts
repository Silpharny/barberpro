import prismaClient from "../../prisma"

interface HaircutRequest {
  user_id: string
}

class CountHaircutService {
  async execute({ user_id }: HaircutRequest) {
    const count = await prismaClient.haircut.count({
      where: {
        userId: user_id,
      },
    })

    return count
  }
}

export { CountHaircutService }
