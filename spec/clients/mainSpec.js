import $ from 'jquery'

describe("Main", () => {
  it('has body', () => {
    assert.equal($('body').size(), 1)
  })
})
