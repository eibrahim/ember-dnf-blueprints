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
      }).catch(reject);
    }).catch(error => {
      if (error.message) {
        throw error.message;
      }
      throw 'Enter a valid email and password and try again.';
    });
  },

  signIn: function(provider, email, password) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get("session").open("firebase", {
        provider: provider,
        email: email,
        password: password
      }).then(resolve).catch(reject);
    }).catch(error => {
      if (error.message) {
        throw error.message;
      }
      throw 'Enter a valid email and password and try again.';
    });
  },

  signOut: function() {
    this.get("session").close();
  },

  forgotPassword: function(email) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('firebase').resetPassword({
        email
      }, response => {
        if (response) {
          return reject(response);
        }
        resolve();
      });
    }).catch(error => {
      if (error.message) {
        throw error.message;
      }
      throw 'Error: Enter a valid email and try again';
    });
  },

  resetPassword: function(email, oldPassword, newPassword) {

    return new Ember.RSVP.Promise((resolve, reject) => {
      this.get('firebase').changePassword({
        email, oldPassword, newPassword
      }, response => {
        if (response) {
          return reject(response);
        }
        resolve();
      });
    }).catch(error => {
      if (error.message) {
        throw error.message;
      }
      throw 'Error: Enter a valid email and password and try again';
    });

  }
});

