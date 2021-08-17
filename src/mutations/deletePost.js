const { nonNull, intArg } = require('nexus')

module.exports = {
  deletePost(t) {
    t.field('deletePost', {
      type: 'Post',
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, context) => {
        return context.prisma.post.delete({
          where: { id: args.id },
        })
      },
    })
  },
}
