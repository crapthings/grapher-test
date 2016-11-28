Template.hello.onCreated(function helloOnCreated() {

  const query = Comments.createQuery({
    content: 1,
    post: {
      title: 1,
    },
  })

  this.comments = new ReactiveVar([])

  Tracker.autorun(() => {
    if (query.subscribe().ready())
      this.comments.set(query.fetch())
  })

});

Template.hello.helpers({
  comments() {
    return Template.instance().comments.get()
  },
})
