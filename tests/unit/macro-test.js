import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { translationMacro as t } from 'ember-i18n';

moduleFor('service:i18n', 'translationMacro', {
  integration: true,

  beforeEach: function() {
    const i18n = this.subject({ locale: 'en' });

    this.object = Ember.Object.extend({
      i18n: i18n,

      numberClicks: 9,

      tMacroProperty: t('with.interpolations', { clicks: 'numberClicks' }),
    }).create();
  }
});

test('defines a computed property that translates', function(assert) {
  assert.equal(this.object.get('tMacroProperty'), 'Clicks: 9');
});

test('defines a computed property with dependencies', function(assert) {
  Ember.run(this.object, 'set', 'numberClicks', 13);
  assert.equal(this.object.get('tMacroProperty'), 'Clicks: 13');
});
