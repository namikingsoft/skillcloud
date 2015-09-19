import assert from 'assert';
import $ from 'jquery';

describe("Main", () => {
  it('has 30px margin', () => {
    assert.equal($('#app').size(), 1);
  });
});
