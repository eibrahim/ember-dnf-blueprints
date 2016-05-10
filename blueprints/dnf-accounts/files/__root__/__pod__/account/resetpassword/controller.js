import Ember from 'ember';

export
default Ember.Controller.extend({
  queryParams: ['password', 'email'],
  password: null,
  email: null,

  auth: Ember.inject.service(),

  actions: {
    resetPassword: function() {
      this.set('resetErrorMessage', '');
      this.set('isFormDisabled', true);
      let {
        email, password, newPassword
      } = this.getProperties(['email', 'password', 'newPassword']);
      this.get('auth').resetPassword(email, password, newPassword).then(() => {
        this.get('auth').signIn('password', email, newPassword).then(() => {
          this.transitionToRoute('account');
        }).catch(() => {
          this.transitionToRoute('account');
        }).finally(() => {
          this.set('isFormDisabled', false);
          this.set('resetErrorMessage', '');
        });
      }).catch(error => {
        this.set('isFormDisabled', false);
        this.set('resetErrorMessage', error);
      });
    },
  }

});

