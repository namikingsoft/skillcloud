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
        image: {
          key: "key1",
          url: "http://www.example.com",
          width: 100,
          height: 200,
        },
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
      assert.equal(this.skill.children.size, 2)
      this.skill.children.forEach(child => {
        assert.ok(child instanceof Skill)
      })
    })
    it("should be has grandson", () => {
      assert.equal(this.skill.children.get(1).children.size, 1)
      this.skill.children.get(1).children.forEach(child => {
        assert.ok(child instanceof Skill)
      })
    })
  })
})
