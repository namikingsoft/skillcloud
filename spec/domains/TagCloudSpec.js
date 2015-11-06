import TagCloud from 'domains/TagCloud'
import TagNode from 'domains/TagNode'
import Tag from 'domains/Tag'

describe("TagCloud", function() {

  before(() => {
    this.nodes = [
      new TagNode({
        tag: new Tag({
          name: "Name1",
          experience: 1,
          interest: 2,
        })
      }),
      new TagNode({
        tag: new Tag({
          name: "Name2",
          experience: 3,
          interest: 4,
        })
      }),
    ]
    this.cloud = new TagCloud({
      nodes: this.nodes,
    })
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.cloud instanceof TagCloud)
    })
  })

  describe("nodes", () => {
    it("should be return initial param", () => {
      assert.equal(this.cloud.nodes.length, 2)
      assert.equal(this.cloud.nodes[0], this.nodes[0])
      assert.equal(this.cloud.nodes[1], this.nodes[1])
    })
  })
})
