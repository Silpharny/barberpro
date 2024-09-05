import prismaClient from "../../prisma"

interface HaircutRequest {
  user_id: string
}

// Checar assinatura do usuário

class CheckSubscriptionService {
  async execute({ user_id }: HaircutRequest) {
    const status = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        subscriptions: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    })

    return status
  }
}

export { CheckSubscriptionService }
