import prismaClient from "../../prisma"

interface HaircutRequest {
  haircut_id: string
  user_id: string
  customer: string
}

class NewScheduleService {
  async execute({ haircut_id, user_id, customer }: HaircutRequest) {
    if (!customer || !haircut_id || !user_id) {
      throw new Error("Missing data")
    }

    const schedule = await prismaClient.service.create({
      data: {
        haircutId: haircut_id,
        userId: user_id,
        customer,
      },
    })

    return schedule
  }
}

export { NewScheduleService }
