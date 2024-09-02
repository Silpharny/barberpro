import prismaClient from "../../prisma"

interface HaircutRequest {
  userId: string
  name: string
  price: number
}

// Verificar quantos modelos o usuário tem cadastrado
// Verificar se o usuário é premium, se não, limitamos a quantidade de cortes que o usuário pode cadastrar

class CreateHaircutService {
  async execute({ userId, name, price }: HaircutRequest) {
    if (!name || !price) {
      throw new Error("Name and price are required")
    }

    // Verificar quantos modelos o usuário tem cadastrado
    const userAlreadyHasHaircuts = await prismaClient.haircut.count({
      where: {
        userId,
      },
    })

    // Verificar se o usuário é premium
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        subscriptions: true,
      },
    })

    // Criando validação / limite de cortes
    if (
      userAlreadyHasHaircuts >= 3 &&
      user?.subscriptions?.status !== "active"
    ) {
      throw new Error("You can only have 3 haircuts")
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
