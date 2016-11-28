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

Meteor.isServer && Posts.remove({})
Meteor.isServer && Comments.remove({})

const postsIds = _.times(10, n => Posts.insert({ title: 'post' + n }))

_.each(postsIds, postId => Comments.insert({
  postId,
  content: 'this is a comment',
}))

Meteor.isServer && Posts.expose()
Meteor.isServer && Comments.expose()
