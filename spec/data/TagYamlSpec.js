import data from 'data/tag.yaml'
import Tag from 'domains/Tag'
import TagNode from 'domains/TagNode'
import TagCloud from 'domains/TagCloud'
import TagFactory from 'domains/TagFactory'
import TagCloudFactory from 'domains/TagCloudFactory'

describe("TagYaml", function() {

  describe("TagFactory", () => {
    before(() => {
      this.tag = TagFactory.create(data)
    })
    it("should be create tag correctly", () => {
      assert.ok(this.tag instanceof Tag)
      assert.ok(this.tag.children.length > 0)
      for (const child of this.tag.children) {
        assert.ok(child instanceof Tag)
      }
    })
  })

  describe("TagCloudFactory", () => {
    before(() => {
      const tag = TagFactory.create(data)
      this.cloud = TagCloudFactory.create(tag)
    })
    it("should be create tag cloud correctly", () => {
      assert.ok(this.cloud instanceof TagCloud)
      assert.ok(this.cloud.nodes.length > 0)
      for (const node of this.cloud.nodes) {
        assert.ok(node instanceof TagNode)
      }
    })
  })
})
