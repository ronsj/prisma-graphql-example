const { makeSchema, objectType } = require('nexus')
const { allUsers, postById, feed, draftsByUser } = require('./queries')
const {
  createDraft,
  signupUser,
  togglePublishPost,
  incrementPostViewCount,
  deletePost,
} = require('./mutations')
const {
  DateTime,
  User,
  Post,
  SortOrder,
  PostOrderByUpdatedAtInput,
  UserUniqueInput,
  PostCreateInput,
  UserCreateInput,
} = require('./types')

const defineFields = (fields) => {
  return (t) => {
    fields.forEach((field) => {
      field(t)
    })
  }
}

// https://nexusjs.org/docs/guides/schema#basic-anatomy
const Query = objectType({
  // The name of this type
  name: 'Query',
  // The type definition block where fields are defined
  definition: defineFields([allUsers, postById, feed, draftsByUser]),
})

const Mutation = objectType({
  // The name of this type
  name: 'Mutation',
  // The type definition block where fields are defined
  definition: defineFields([
    signupUser,
    createDraft,
    togglePublishPost,
    incrementPostViewCount,
    deletePost,
  ]),
})

const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Post,
    User,
    UserUniqueInput,
    UserCreateInput,
    PostCreateInput,
    SortOrder,
    PostOrderByUpdatedAtInput,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

module.exports = {
  schema: schema,
}
