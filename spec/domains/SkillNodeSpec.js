import SkillNode, {SkillNodeMode} from 'domains/SkillNode'
import Skill from 'domains/Skill'

describe("SkillNode", function() {

  before(() => {
    this.skill = new Skill({
      name: "Name",
      experience: 1,
      interest: 2,
      comment: "Comment"
    })
    this.node = new SkillNode({
      id: 1,
      group: 2,
      depth: 3,
      skill: this.skill,
    })
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.node instanceof SkillNode)
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

  describe("skill", () => {
    it("should be return initial param", () => {
      assert.equal(this.node.skill, this.skill)
    })
  })

  describe("fontSize", () => {
    it("should be return node's font size", () => {
      assert.ok(this.node.fontSize > 0)
    })
  })

  describe("classes", () => {
    it("should be return node's class name", () => {
      assert.equal(this.node.classes, "node root active grandchild")
    })
  })
})
