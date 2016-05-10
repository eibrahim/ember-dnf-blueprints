import Ember from 'ember';

export
default Ember.Service.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),
  firebase: Ember.inject.service(),

  signUp: function(provider, email, password) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('firebase').createUser({
        email, password, provider
      }).then((data) => {
        var uid = data.uid;
        var user = this.get('store').createRecord('user', {
          uid: uid,
          email: email,
          provider: provider,
          createdOn: new Date().getTime()
        });
        user.save().then(() => {
          resolve(user);
        }).catch(error => {
          console.error(error);
          reject("Failed to create account.");
        });
      }).catch((error) => {
        reject(error.message);
      });
    });
  },

  signIn: function(provider, email, password) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get("session").open("firebase", {
        provider: provider,
        email: email,
        password: password
      }).then(resolve).catch(error => {
        reject(error.message);
      });
    });
  },

  signOut: function() {
    this.get("session").close();
  }
});

