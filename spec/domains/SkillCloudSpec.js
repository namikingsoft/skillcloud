import SkillCloud from 'domains/SkillCloud'
import SkillNode, {SkillLink} from 'domains/SkillNode'
import Skill from 'domains/Skill'
import {List} from 'immutable'

describe("SkillCloud", function() {

  before(() => {
    this.source = new SkillNode({
      id: 1,
      group: 1,
      depth: 1,
      skill: new Skill({
        name: "Name1",
        experience: 1,
        interest: 2,
        comment: "Comment1",
      })
    })
    this.target = new SkillNode({
      id: 2,
      group: 1,
      depth: 2,
      skill: new Skill({
        name: "Name2",
        experience: 3,
        interest: 4,
        comment: "Comment2",
      })
    })
    this.other = new SkillNode({
      id: 3,
      group: 2,
      depth: 2,
      skill: new Skill({
        name: "Name3",
        experience: 3,
        interest: 4,
        comment: "Comment3",
      })
    })
    this.dummy = new SkillNode({
      id: 3,
      group: 2,
      depth: 2,
      skill: new Skill({
        name: "Name3",
        experience: 3,
        interest: 4,
        comment: "Comment3",
      })
    })
    this.nodes = List.of(this.source, this.target, this.other)
    this.links = List.of({
      target: this.target,
      source: this.source,
    })
    this.cloud = new SkillCloud({
      nodes: this.nodes,
      links: this.links,
    })
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.cloud instanceof SkillCloud)
    })
  })

  describe("nodes", () => {
    it("should be return initial param", () => {
      assert.equal(this.cloud.nodes.size, 3)
      assert.equal(this.cloud.nodes.get(0), this.nodes.get(0))
      assert.equal(this.cloud.nodes.get(1), this.nodes.get(1))
      assert.equal(this.cloud.nodes.get(2), this.nodes.get(2))
    })
  })

  describe("links", () => {
    it("should be return initial param", () => {
      assert.equal(this.cloud.links.size, 1)
      assert.equal(this.cloud.links.get(0).target, this.target)
      assert.equal(this.cloud.links.get(0).source, this.source)
    })
  })

  describe("filter", () => {
    context("case normal", () => {
      before(() => {
        this.selectedCloud = this.cloud.filter(this.source)
      })
      it("should be return selected group's cloud", () => {
        assert.ok(this.selectedCloud instanceof SkillCloud)
        assert.equal(this.selectedCloud.nodes.size, 2)
        assert.equal(this.selectedCloud.links.size, 1)
      })
    })
    context("case null", () => {
      before(() => {
        this.selectedCloud = this.cloud.filter(null)
      })
      it("should be return all group's cloud", () => {
        assert.ok(this.selectedCloud instanceof SkillCloud)
        assert.equal(this.selectedCloud.nodes.size, 3)
        assert.equal(this.selectedCloud.links.size, 1)
      })
    })
  })

  describe("findNodeBySkill", () => {
    context("case exists", () => {
      before(() => {
        this.foundedNode = this.cloud.findNodeBySkill(this.target.skill)
      })
      it("should be return founded node", () => {
        assert.equal(this.foundedNode, this.target)
      })
    })
    context("case not exists", () => {
      before(() => {
        this.foundedNode = this.cloud.findNodeBySkill(this.dummy.skill)
      })
      it("should be return undefined", () => {
        assert.equal(this.foundedNode, undefined)
      })
    })
  })
})
