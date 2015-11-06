import TagNode from 'domains/TagNode'
import Tag from 'domains/Tag'

describe("TagNode", function() {

  before(() => {
    this.tag = new Tag({
      name: "Name",
      experience: 1,
      interest: 2,
    })
    this.parentTag = new Tag({
      name: "Parent",
      experience: 3,
      interest: 4,
    })
    this.node = new TagNode({
      id: 1,
      group: 2,
      tag: this.tag,
      parentTag: this.parentTag,
    })
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.node instanceof TagNode)
    })
  })

  describe("id", () => {
    it("should be return initial param", () => {
      assert.equal(this.node.id, 1)
    })
  })

  describe("group", () => {
    it("should be return initial param", () => {
      assert.equal(this.node.group, 2)
    })
  })

  describe("tag", () => {
    it("should be return initial param", () => {
      assert.equal(this.node.tag, this.tag)
    })
  })

  describe("parentTag", () => {
    it("should be return initial param", () => {
      assert.equal(this.node.parentTag, this.parentTag)
    })
  })
})
