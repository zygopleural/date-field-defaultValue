export const schema = gql`
  type UserExample {
    id: Int!
    email: String!
    name: String
    dateOfBirth: DateTime!
  }

  type Query {
    userExamples: [UserExample!]! @requireAuth
    userExample(id: Int!): UserExample @requireAuth
  }

  input CreateUserExampleInput {
    email: String!
    name: String
    dateOfBirth: DateTime!
  }

  input UpdateUserExampleInput {
    email: String
    name: String
    dateOfBirth: DateTime
  }

  type Mutation {
    createUserExample(input: CreateUserExampleInput!): UserExample! @requireAuth
    updateUserExample(id: Int!, input: UpdateUserExampleInput!): UserExample!
      @requireAuth
    deleteUserExample(id: Int!): UserExample! @requireAuth
  }
`
