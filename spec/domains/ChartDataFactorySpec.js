import ChartDataFactory from 'domains/ChartDataFactory'
import ChartData from 'domains/ChartData'
import ChartDatum from 'domains/ChartDatum'
import Skill from 'domains/Skill'
import Tag from 'domains/Tag'
import {List} from 'immutable'

describe("ChartDataFactory", function() {

  describe("createBySkillList", () => {
    before(() => {
      this.skills = List.of(
        new Skill({
          name: "Name1",
          experience: 1234,
          interest: 2345,
          comment: "Comment1",
        }),
        new Skill({
          name: "Name2",
          experience: 3456,
          interest: 4567,
          comment: "Comment2",
        })
      )
      this.data = ChartDataFactory.createBySkillList(this.skills)
    })
    it("should be return new instance", () => {
      assert.ok(this.data instanceof ChartData)
    })
    it("should be include List of ChartDatum instance", () => {
      this.data.list.forEach(datum => {
        assert.ok(datum instanceof ChartDatum)
      })
    })
    it("should be include two data", () => {
      assert.equal(this.data.list.get(0).key, "経験")
      assert.equal(this.data.list.get(1).key, "興味")
    })
    it("should be include skill's values", () => {
      const experiences = this.data.list.get(0).values
      assert.equal(experiences.get(0).source, this.skills.get(0))
      assert.equal(experiences.get(1).source, this.skills.get(1))
      const interests = this.data.list.get(1).values
      assert.equal(interests.get(0).source, this.skills.get(0))
      assert.equal(interests.get(1).source, this.skills.get(1))
    })
  })

  describe("createByTagList", () => {
    before(() => {
      this.tags = List.of(
        new Tag({
          name: "Name1",
          experience: 1234,
          interest: 2345,
        }),
        new Tag({
          name: "Name2",
          experience: 3456,
          interest: 4567,
        })
      )
      this.data = ChartDataFactory.createByTagList(this.tags)
    })
    it("should be return new instance", () => {
      assert.ok(this.data instanceof ChartData)
    })
    it("should be include List of ChartDatum instance", () => {
      this.data.list.forEach(datum => {
        assert.ok(datum instanceof ChartDatum)
      })
    })
    it("should be include two data", () => {
      assert.equal(this.data.list.get(0).key, "経験")
      assert.equal(this.data.list.get(1).key, "興味")
    })
    it("should be include tag's values", () => {
      const experiences = this.data.list.get(0).values
      assert.equal(experiences.get(0).source, this.tags.get(0))
      assert.equal(experiences.get(1).source, this.tags.get(1))
      const interests = this.data.list.get(1).values
      assert.equal(interests.get(0).source, this.tags.get(0))
      assert.equal(interests.get(1).source, this.tags.get(1))
    })
  })
})
