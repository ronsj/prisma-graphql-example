const { nonNull, intArg } = require('nexus')

module.exports = {
  togglePublishPost(t) {
    t.field('togglePublishPost', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, args, context) => {
        const post = await context.prisma.post.findUnique({
          where: { id: args.id || undefined },
          select: {
            published: true,
          },
        })

        if (!post) {
          throw new Error(
            `Post with ID ${args.id} does not exist in the database.`
          )
        }

        return context.prisma.post.update({
          where: { id: args.id || undefined },
          data: { published: !post.published },
        })
      },
    })
  },
}
