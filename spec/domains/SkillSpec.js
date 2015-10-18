import Skill from 'domains/Skill'

describe("Skill", function() {

  before(() => {
    this.children = [
      new Skill({
        name: "Name1",
        experience: 1234,
        interest: 2345,
        comment: "Comment1",
      }),
      new Skill({
        name: "Name2",
        experience: 3456,
        interesta: 4567,
        comment: "Comment2",
      })
    ]
    this.skill = new Skill({
      name: "Name",
      experience: 1234,
      interest: 2345,
      comment: "Comment",
      children: this.children,
    })
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.skill instanceof Skill)
    })
  })

  describe("name", () => {
    it("should be return initial param", () => {
      assert.equal(this.skill.name, "Name")
    })
  })

  describe("experience", () => {
    it("should be return initial param", () => {
      assert.equal(this.skill.experience, 1234)
    })
  })

  describe("interest", () => {
    it("should be return initial param", () => {
      assert.equal(this.skill.interest, 2345)
    })
  })

  describe("comment", () => {
    it("should be return initial param", () => {
      assert.equal(this.skill.comment, "Comment")
    })
  })

  describe("children", () => {
    it("should be return initial param", () => {
      assert.deepEqual(this.skill.children, this.children)
    })
    it("should be return copy", () => {
      const children = this.skill.children
      assert.notEqual(children, this.tags)
      assert.ok(children.shift() instanceof Skill)
      assert.equal(children.length, 1)
      assert.equal(this.skill.children.length, 2)
    })
  })
})
