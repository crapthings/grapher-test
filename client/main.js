import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {

  const query = Comments.createQuery({
    content: 1,
    post: {
      title: 1,
    },
  })

  this.string = new ReactiveVar('loading')

  Tracker.autorun(() => {
    if (query.subscribe().ready())
      this.string.set(query.fetch())
  })

});

Template.hello.helpers({
  string() {
    return JSON.stringify(Template.instance().string.get(), null, 4);
  },
})
