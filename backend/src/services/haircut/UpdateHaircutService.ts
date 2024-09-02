import prismaClient from "../../prisma"

interface HaircutRequest {
  user_id: string
  haircut_id: string
  name: string
  price: number
  status: boolean | string
}

class UpdateHaircutService {
  async execute({ user_id, haircut_id, name, price, status }: HaircutRequest) {
    // buscar assinatura do usuário
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: true,
      },
    })

    if (user?.subscriptions?.status !== "active") {
      throw new Error("You must have an active subscription")
    }

    const updateHaircut = await prismaClient.haircut.update({
      where: {
        id: haircut_id,
      },
      data: {
        name,
        price,
        status: status === "true" ? true : false,
      },
    })

    return updateHaircut
  }
}

export { UpdateHaircutService }
