import Ember from 'ember';

export
default Ember.Controller.extend({
  auth: Ember.inject.service(),

  resetForm: function() {
    this.set('loginEmail', '');
    this.set('loginPassword', '');
    this.set('signupPassword', '');
    this.set('signupEmail', '');
    this.set('forgotEmail', '');
    this.set('forgotPassword', '');
    this.set('loginErrorMessage', '');
    this.set('signupErrorMessage', '');
    this.set('forgotPasswordErrorMessage', '');
    this.set('showForgotPasswordSuccess', false);
    this.set('showForgotPassword', false);
    this.set('isSignupDisabled', false);
    this.set('isLoginDisabled', false);
    this.set('isForgotPasswordDisabled', false);
  },

  actions: {

    forgotPassword: function() {
      this.set('showForgotPassword', true);
      this.set('forgotPasswordErrorMessage', '');
      this.set('isForgotPasswordDisabled', false);
      this.set('showForgotPasswordSuccess', false);
    },

    hideForgotPassword: function() {
      this.set('showForgotPassword', false);
    },

    submitForgotPassword: function() {
      this.set('forgotPasswordErrorMessage', '');
      this.set('isForgotPasswordDisabled', true);
      this.set('showForgotPasswordSuccess', false);
      this.get('auth').forgotPassword(this.get('forgotEmail')).then(() => {
        this.resetForm();
        this.set('showForgotPasswordSuccess', true);
      }).catch(error => {
        this.set('isForgotPasswordDisabled', false);
        this.set('forgotPasswordErrorMessage', error);
      });
    },

    signUp: function(provider) {
      this.set('signupErrorMessage', '');
      this.set('isSignupDisabled', true);
      let {
        signupEmail, signupPassword
      } = this.getProperties(['signupEmail', 'signupPassword']);
      this.get('auth').signUp(provider, signupEmail, signupPassword).then(() => {
        this.send('signIn', provider, signupEmail, signupPassword);
      }).catch(error => {
        this.set('isSignupDisabled', false);
        this.set('signupErrorMessage', error);
      });
    },

    signIn: function(provider, email, password) {
      this.set('loginErrorMessage', '');
      this.set('isLoginDisabled', true);
      this.get('auth').signIn(provider, email || this.get('loginEmail'), password || this.get('loginPassword')).then(() => {
        this.resetForm();
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

