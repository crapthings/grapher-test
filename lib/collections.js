import _ from 'lodash'

Posts = new Mongo.Collection('posts')

Comments = new Mongo.Collection('comments')

Comments.addLinks({
  post: {
    type: 'one',
    collection: Posts,
    field: 'postId',
    index: true,
  }
})

if (Meteor.isServer) {

  Posts.expose()
  Comments.expose()

  fake()

}

function fake() {

  _.each([Posts, Comments], c => c.remove({}))

  const postsIds = _.times(10, n => Posts.insert({ title: 'post' + n }))

  _.each(postsIds, postId => Comments.insert({
    postId,
    content: 'this is a comment',
  }))

}
