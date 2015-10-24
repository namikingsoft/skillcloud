import SkillFactory from 'domains/SkillFactory'
import Skill from 'domains/Skill'

describe("SkillFactory", function() {

  describe("create", () => {
    before(() => {
      this.skill = SkillFactory.create({
        name: "Name",
        experience: 1,
        interest: 2,
        comment: 'Comment',
        children: [
          {
            name: "Name1",
            experience: 3,
            interest: 4,
            comment: 'Comment1',
          },
          {
            name: "Name2",
            experience: 5,
            interest: 6,
            comment: 'Comment2',
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
      assert.ok(this.skill instanceof Skill)
    })
    it("should be has children", () => {
      assert.equal(this.skill.children.length, 2)
      for (const child of this.skill.children) {
        assert.ok(child instanceof Skill)
      }
    })
    it("should be has grandson", () => {
      assert.equal(this.skill.children[1].children.length, 1)
      for (const child of this.skill.children[1].children) {
        assert.ok(child instanceof Skill)
      }
    })
  })
})
