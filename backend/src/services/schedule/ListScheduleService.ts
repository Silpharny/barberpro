import prismaClient from "../../prisma"

interface ScheduleRequest {
  user_id: string
}

class ListScheduleService {
  async execute({ user_id }: ScheduleRequest) {
    const schedules = await prismaClient.service.findMany({
      where: {
        userId: user_id,
      },
      select: {
        id: true,
        customer: true,
        haircut: true,
      },
      orderBy: {
        created_at: "desc",
      },
    })

    return schedules
  }
}

export { ListScheduleService }
