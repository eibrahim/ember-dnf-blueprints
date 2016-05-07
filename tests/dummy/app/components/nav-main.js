import Ember from 'ember';
import layout from '../templates/components/nav-main';

export default Ember.Component.extend({
  layout,
  tagName: 'nav',
  classNames: ['navbar', 'navbar-default'],
});
