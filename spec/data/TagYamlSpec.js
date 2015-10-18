import TagFactory from 'domains/TagFactory'
import Tag from 'domains/Tag'
import data from 'data/tag.yaml'

describe("TagYaml", function() {

  before(() => {
    this.tag = TagFactory.create(data)
  })
  it("should be read correctly", () => {
    assert.ok(this.tag instanceof Tag)
  })
  it("should be has children", () => {
    assert.ok(this.tag.children.length > 0)
    for (const child of this.tag.children) {
      assert.ok(child instanceof Tag)
    }
  })
})
