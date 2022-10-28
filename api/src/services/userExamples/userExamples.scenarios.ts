import type { Prisma, UserExample } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserExampleCreateArgs>({
  userExample: {
    one: {
      data: { email: 'String4289700', dateOfBirth: '2022-10-28T19:06:39.384Z' },
    },
    two: {
      data: { email: 'String8632450', dateOfBirth: '2022-10-28T19:06:39.384Z' },
    },
  },
})

export type StandardScenario = ScenarioData<UserExample, 'userExample'>
