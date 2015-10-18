import Tag from 'domains/Tag'

describe("Tag", function() {

  before(() => {
    this.children = [
      new Tag({
        name: "Name1",
        experience: 1234,
        interest: 2345,
      }),
      new Tag({
        name: "Name2",
        experience: 3456,
        interesta: 4567,
      })
    ]
    this.tag = new Tag({
      name: "Name",
      experience: 1234,
      interest: 2345,
      children: this.children,
    })
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.tag instanceof Tag)
    })
  })

  describe("name", () => {
    it("should be return initial param", () => {
      assert.equal(this.tag.name, "Name")
    })
  })

  describe("experience", () => {
    it("should be return initial param", () => {
      assert.equal(this.tag.experience, 1234)
    })
  })

  describe("interest", () => {
    it("should be return initial param", () => {
      assert.equal(this.tag.interest, 2345)
    })
  })

  describe("children", () => {
    it("should be return initial param", () => {
      assert.deepEqual(this.tag.children, this.children)
    })
    it("should be return copy", () => {
      const children = this.tag.children
      assert.notEqual(children, this.children)
      assert.ok(children.shift() instanceof Tag)
      assert.equal(children.length, 1)
      assert.equal(this.tag.children.length, 2)
    })
  })
})
