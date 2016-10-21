import Ember from 'ember';

export default Ember.Controller.extend({

  hoodieAccount: Ember.inject.service('hoodie-account'),
  hoodie: Ember.inject.service('hoodie'),
  credentials: Ember.computed('username','password', function(){
    return {
      username: this.get('username'),
      password: this.get('password')
    };
  }),

  actions: {
    signUp() {
      this.get('hoodieAccount.signUp')(this.get('credentials')).then(()=>{
        this.get('hoodieAccount.signIn')(this.get('credentials'));
      }).catch((error)=>{
        Ember.Logger.error(error);
      });
    },
    signIn() {
      this.get('hoodieAccount.signIn')(this.get('credentials')).then(() => {
        Ember.Logger.debug('pull');
        return this.get('hoodie').hoodie.store.pull();
      }).then(() => {
        Ember.Logger.debug('find');
        return this.get('store').findAll('conversation');
      }).then((all) => {
        Ember.Logger.debug('all', all);
      }).catch((er) => {
        Ember.Logger.error('err', er);
      });
    },
    signOut() {
      this.get('hoodieAccount.signOut')();
    },

    createNewConversation() {
      this.store.createRecord('conversation', {name: this.get('name')}).save();
      this.set('name', '');
    },

  },

});