import data from 'data/skill.yaml'
import Skill from 'domains/Skill'
import SkillNode, {SkillLink} from 'domains/SkillNode'
import SkillCloud from 'domains/SkillCloud'
import SkillFactory from 'domains/SkillFactory'
import SkillCloudFactory from 'domains/SkillCloudFactory'

describe("SkillYaml", function() {

  describe("SkillFactory", () => {
    before(() => {
      this.skill = SkillFactory.create(data)
    })
    it("should be create skill", () => {
      assert.ok(this.skill instanceof Skill)
    })
    it("should be create skill has children", () => {
      assert.ok(this.skill instanceof Skill)
      assert.ok(this.skill.children.size > 0)
      this.skill.children.forEach(child => {
        assert.ok(child instanceof Skill)
      })
    })
  })

  describe("SkillCloudFactory", () => {
    before(() => {
      const skill = SkillFactory.create(data)
      this.cloud = SkillCloudFactory.create(data)
    })
    it("should be create skill cloud", () => {
      assert.ok(this.cloud instanceof SkillCloud)
    })
    it("should be create skill cloud has nodes", () => {
      assert.ok(this.cloud.nodes.size > 0)
      this.cloud.nodes.forEach(node => {
        assert.ok(node instanceof SkillNode)
      })
    })
    it("should be create skill cloud has links", () => {
      assert.ok(this.cloud.links.size > 0)
      this.cloud.links.forEach(link => {
        assert.ok(link.source instanceof SkillNode)
        assert.ok(link.target instanceof SkillNode)
      })
    })
  })
})
