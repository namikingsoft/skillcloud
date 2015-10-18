import TagFactory from 'domains/TagFactory'
import Tag from 'domains/Tag'
import data from 'data/tag.yaml'

describe("Tag", function() {

  describe("create", () => {
    before(() => {
      this.tag = TagFactory.create({
        name: "Name",
        experience: 1,
        interest: 2,
        children: [
          {
            name: "Name1",
            experience: 3,
            interest: 4,
          },
          {
            name: "Name2",
            experience: 5,
            interest: 6,
            children: [
              {
                name: "Name3",
                experience: 7,
                interest: 8,
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
      assert.equal(this.tag.children.length, 2)
      for (const child of this.tag.children) {
        assert.ok(child instanceof Tag)
      }
    })
    it("should be has grandson", () => {
      assert.equal(this.tag.children[1].children.length, 1)
      for (const child of this.tag.children[1].children) {
        assert.ok(child instanceof Tag)
      }
    })
    it("should be read tag.yaml", () => {
      assert.equal(this.tag.children[1].children.length, 1)
      for (const child of this.tag.children[1].children) {
        assert.ok(child instanceof Tag)
      }
    })
  })
})
