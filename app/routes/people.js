import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.get('store').getPeople();
  },

  store: service()
});
