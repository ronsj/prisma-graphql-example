const { createDraft } = require('./createDraft')
const { signupUser } = require('./signupUser')
const { togglePublishPost } = require('./togglePublishPost')
const { incrementPostViewCount } = require('./incrementPostViewCount')
const { deletePost } = require('./deletePost')

module.exports = {
  createDraft,
  signupUser,
  togglePublishPost,
  incrementPostViewCount,
  deletePost,
}
