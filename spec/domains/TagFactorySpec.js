import TagFactory from 'domains/TagFactory'
import Tag from 'domains/Tag'
import data from 'data/tag.yaml'

describe("TagFactory", function() {

  describe("create", () => {
    before(() => {
      this.tag = TagFactory.create({
        name: "Name",
        experience: 1,
        interest: 2,
        comment: "Comment",
        children: [
          {
            name: "Name1",
            experience: 3,
            interest: 4,
            comment: "Comment1",
          },
          {
            name: "Name2",
            experience: 5,
            interest: 6,
            comment: "Comment2",
            children: [
              {
                name: "Name3",
                experience: 7,
                interest: 8,
                comment: "Comment3",
              },
            ],
          },
        ],
      })
    })
    it("should be return new instance", () => {
      assert.ok(this.tag instanceof Tag)
    })
    it("should be has children", () => {
      assert.equal(this.tag.children.size, 2)
      this.tag.children.forEach(child => {
        assert.ok(child instanceof Tag)
      })
    })
    it("should be has grandson", () => {
      assert.equal(this.tag.children.get(1).children.size, 1)
      this.tag.children.get(1).children.forEach(child => {
        assert.ok(child instanceof Tag)
      })
    })
  })
})
