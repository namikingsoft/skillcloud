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
    })
    it("should be create tag has children", () => {
      assert.ok(this.tag.children.size > 0)
      this.tag.children.forEach(child => {
        assert.ok(child instanceof Tag)
      })
    })
  })

  describe("TagCloudFactory", () => {
    before(() => {
      const tag = TagFactory.create(data)
      this.cloud = TagCloudFactory.create(tag)
    })
    it("should be create tag cloud", () => {
      assert.ok(this.cloud instanceof TagCloud)
    })
    it("should be create tag cloud has nodes", () => {
      assert.ok(this.cloud.nodes.size > 0)
      this.cloud.nodes.forEach(node => {
        assert.ok(node instanceof TagNode)
      })
    })
  })
})
