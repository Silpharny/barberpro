import prismaClient from "../../prisma"

interface HaircutRequest {
  userId: string
  status: string | boolean
}

class ListHaircutService {
  async execute({ userId, status }: HaircutRequest) {
    const haircuts = await prismaClient.haircut.findMany({
      where: {
        userId,
        status: status === "true" ? true : false,
      },
      orderBy: {
        created_at: "desc",
      },
    })

    return haircuts
  }
}

export { ListHaircutService }
