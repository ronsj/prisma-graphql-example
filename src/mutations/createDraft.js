const { nonNull, stringArg, arg } = require('nexus')

module.exports = {
  createDraft(t) {
    t.field('createDraft', {
      type: 'Post',
      args: {
        data: nonNull(
          arg({
            type: 'PostCreateInput',
          })
        ),
        authorEmail: nonNull(stringArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.post.create({
          data: {
            title: args.data.title,
            content: args.data.content,
            author: {
              connect: { email: args.authorEmail },
            },
          },
        })
      },
    })
  },
}
