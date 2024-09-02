import prismaClient from "../../prisma"

interface ScheduleRequest {
  schedule_id: string
  user_id: string
}

class FinishScheduleService {
  async execute({ user_id, schedule_id }: ScheduleRequest) {
    if (!schedule_id || !user_id) {
      throw new Error("Missing data")
    }

    try {
      const belongsToUser = await prismaClient.service.findFirst({
        where: {
          id: schedule_id,
          userId: user_id,
        },
      })

      if (!belongsToUser) {
        throw new Error("You don't have permission to finish this schedule")
      }

      await prismaClient.service.delete({
        where: {
          id: schedule_id,
        },
      })

      return {
        message: "Schedule finished",
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export { FinishScheduleService }
