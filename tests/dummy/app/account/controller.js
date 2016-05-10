import Ember from 'ember';

export
default Ember.Controller.extend({
  auth: Ember.inject.service(),
  //loginEmail: 'test@test.com',
  //signupEmail: 'test@test.com',
  //loginPassword: '1234',
  //signupPassword: '1234',

  isLoginDisabled: false,
  isSignupDisabled: false,

  actions: {

    forgotPassword: () => {
      this.set('showPasswordReset', true);
    },

    signUp: function(provider) {
      this.set('signupErrorMessage', '');
      this.set('isSignupDisabled', true);
      this.get('auth').signUp(provider, this.get('signupEmail'), this.get('signupPassword')).then(() => {
        this.set('isSignupDisabled', false);
        this.send('signIn', provider, this.get('signupEmail'), this.get('signupPassword'));
      }).catch(error => {
        this.set('isSignupDisabled', false);
        this.set('signupErrorMessage', error);
      });
    },

    signIn: function(provider, email, password) {
      this.set('loginErrorMessage', '');
      this.set('isLoginDisabled', true);
      this.get('auth').signIn(provider, email || this.get('loginEmail'), password || this.get('loginPassword')).then(() => {
        this.set('isLoginDisabled', false);
      }).catch(error => {
        this.set('isLoginDisabled', false);
        this.set('loginErrorMessage', error);
      });
    },

    signOut: function() {
      this.get('auth').signOut();
    }
  }
});

