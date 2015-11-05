import Tag from 'domains/Tag'
import {List} from 'immutable'

describe("Tag", function() {

  before(() => {
    this.children = List.of(
      new Tag({
        name: "Name1",
        experience: 1234,
        interest: 2345,
        comment: "Comment1",
      }),
      new Tag({
        name: "Name2",
        experience: 3456,
        interesta: 4567,
        comment: "Comment2",
      })
    )
    this.tag = new Tag({
      name: "Name",
      experience: 1234,
      interest: 2345,
      comment: "Comment",
      children: this.children,
    })
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.tag instanceof Tag)
    })
  })

  describe("name", () => {
    it("should be return initial param", () => {
      assert.equal(this.tag.name, "Name")
    })
  })

  describe("experience", () => {
    it("should be return initial param", () => {
      assert.equal(this.tag.experience, 1234)
    })
  })

  describe("interest", () => {
    it("should be return initial param", () => {
      assert.equal(this.tag.interest, 2345)
    })
  })

  describe("comment", () => {
    it("should be return initial param", () => {
      assert.equal(this.tag.comment, "Comment")
    })
  })

  describe("children", () => {
    it("should be return initial param", () => {
      assert.equal(this.tag.children, this.children)
    })
  })
})
