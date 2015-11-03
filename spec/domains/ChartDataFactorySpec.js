import ChartDataFactory from 'domains/ChartDataFactory'
import ChartDatum, {ChartData} from 'domains/ChartDatum'
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
          interesta: 4567,
          comment: "Comment2",
        })
      )
      this.data = ChartDataFactory.createBySkillList(this.skills)
    })
    it("should be return List of ChartDatum instance", () => {
      this.data.forEach(datum => {
        assert.ok(datum instanceof ChartDatum)
      })
    })
    it("should be return two data", () => {
      assert.equal(this.data.get(0).key, "経験")
      assert.equal(this.data.get(1).key, "興味")
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
          interesta: 4567,
        })
      )
      this.data = ChartDataFactory.createByTagList(this.tags)
    })
    it("should be return List of ChartDatum instance", () => {
      this.data.forEach(datum => {
        assert.ok(datum instanceof ChartDatum)
      })
    })
    it("should be return two data", () => {
      assert.equal(this.data.get(0).key, "経験")
      assert.equal(this.data.get(1).key, "興味")
    })
  })
})
