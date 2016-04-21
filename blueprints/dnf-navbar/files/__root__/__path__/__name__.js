import Ember from 'ember';
<%= importTemplate %>
export default Ember.Component.extend({<%= contents %>
  tagName: 'nav',
  classNames: ['navbar', 'navbar-default'],
});
