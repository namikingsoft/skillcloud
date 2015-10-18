import SkillFactory from 'domains/SkillFactory'
import Skill from 'domains/Skill'
import data from 'data/skill.yaml'

describe("SkillYaml", function() {

  before(() => {
    this.skill = SkillFactory.create(data)
  })
  it("should be read correctly", () => {
    assert.ok(this.skill instanceof Skill)
  })
  it("should be has children", () => {
    assert.ok(this.skill.children.length > 0)
    for (const child of this.skill.children) {
      assert.ok(child instanceof Skill)
    }
  })
})
