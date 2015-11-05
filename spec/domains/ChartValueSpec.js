import ChartValue from 'domains/ChartValue'
import {Map} from 'immutable'

describe("ChartValue", function() {

  before(() => {
    this.source = Map({
      label: "Label",
      value: 1234,
    })
    this.object = {
      label: this.source.get('label'),
      value: this.source.get('value'),
      source: this.source,
    }
    this.row = new ChartValue(this.object)
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.row instanceof ChartValue)
    })
  })

  describe("label", () => {
    it("should be return initial param", () => {
      assert.equal(this.row.label, "Label")
    })
  })

  describe("value", () => {
    it("should be return initial param", () => {
      assert.equal(this.row.value, 1234)
    })
  })

  describe("source", () => {
    it("should be return initial param", () => {
      assert.equal(this.row.source, this.source)
    })
  })
})
