const { nonNull, arg } = require('nexus')

module.exports = {
  signupUser(t) {
    t.nonNull.field('signupUser', {
      type: 'User',
      args: {
        data: nonNull(
          arg({
            type: 'UserCreateInput',
          })
        ),
      },
      resolve: (_, args, context) => {
        const postData = args.data.posts
          ? args.data.posts.map((post) => {
              return { title: post.title, content: post.content || undefined }
            })
          : []
        return context.prisma.user.create({
          data: {
            name: args.data.name,
            email: args.data.email,
            posts: {
              create: postData,
            },
          },
        })
      },
    })
  },
}
