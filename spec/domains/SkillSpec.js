import Skill from 'domains/Skill'
import SkillImage from 'domains/SkillImage'
import {List} from 'immutable'

describe("Skill", function() {

  before(() => {
    this.image = new SkillImage({
      key: "key1",
      url: "http://www.example.com",
      width: 100,
      height: 200,
    })
    this.children = List.of(
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
    )
    this.skill = new Skill({
      name: "Name",
      experience: 1234,
      interest: 2345,
      comment: "Comment",
      image: this.image,
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

  describe("image", () => {
    it("should be return initial param", () => {
      assert.equal(this.skill.image, this.image)
    })
  })

  describe("children", () => {
    it("should be return initial param", () => {
      assert.equal(this.skill.children, this.children)
    })
  })
})
