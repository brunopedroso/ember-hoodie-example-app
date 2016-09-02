import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    postNewMessage() {
      let conversation = this.get('model');
      let msg = {
        text: this.get('message'),
        conversation
      };
      let message = this.store.createRecord('message', msg);
      message.save().then(()=>{
        conversation.get('messages').pushObject(message);
        conversation.save();
        Ember.Logger.debug('finished saving');
      });
      this.set('newMessage', '');
    },

  },

});