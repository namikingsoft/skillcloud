import ChartDatum from 'domains/ChartDatum'
import ChartValue from 'domains/ChartValue'
import {List} from 'immutable'

describe("ChartDatum", function() {

  before(() => {
    this.values = List.of(
      new ChartValue({
        label: "Label1",
        value: 1234,
      }),
      new ChartValue({
        label: "Label2",
        value: 2345,
      })
    )
    this.datum = new ChartDatum({
      key: "Key",
      color: "#f00",
      values: this.values,
    })
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.datum instanceof ChartDatum)
    })
  })

  describe("key", () => {
    it("should be return initial param", () => {
      assert.equal(this.datum.key, "Key")
    })
  })

  describe("color", () => {
    it("should be return initial param", () => {
      assert.equal(this.datum.color, "#f00")
    })
  })

  describe("values", () => {
    it("should be return initial param", () => {
      assert.equal(this.datum.values, this.values)
    })
  })

  describe("toObject", () => {
    it("should be return initial param", () => {
      assert.deepEqual(this.datum.toObject, {
        key: "Key",
        color: "#f00",
        values: this.values.toArray(),
      })
    })
  })
})
