import TagCloudFactory from 'domains/TagCloudFactory'
import TagCloud from 'domains/TagCloud'
import Tag from 'domains/Tag'
import {List} from 'immutable'

describe("TagCloudFactory", function() {

  describe("create", () => {
    before(() => {
      this.tag = new Tag({
        name: "Name",
        experience: 1,
        interest: 2,
        children: List.of(
          new Tag({
            name: "Name1",
            experience: 3,
            interest: 4,
          }),
          new Tag({
            name: "Name2",
            experience: 5,
            interest: 6,
            children: List.of(
              new Tag({
                name: "Name3",
                experience: 7,
                interest: 8,
              }),
              new Tag({
                name: "Name4",
                experience: 9,
                interest: 0,
              }),
            ),
          }),
        ),
      })
      this.cloud = TagCloudFactory.create(this.tag)
    })
    it("should be return new instance", () => {
      assert.ok(this.cloud instanceof TagCloud)
    })
    it("should be return correctly", () => {
      assert.equal(this.cloud.nodes.size, 3)
      assert.equal(
        this.cloud.nodes.get(0).tag, this.tag.children.get(0)
      )
      assert.equal(
        this.cloud.nodes.get(1).tag, this.tag.children.get(1).children.get(0)
      )
      assert.equal(
        this.cloud.nodes.get(2).tag, this.tag.children.get(1).children.get(1)
      )
    })
  })
})
