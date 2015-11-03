import ChartValue from 'domains/ChartValue'

describe("ChartValue", function() {

  before(() => {
    this.object = {
      label: "Label",
      value: 1234,
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

  describe("toObject", () => {
    it("should be return initial param", () => {
      assert.deepEqual(this.row.toObject, this.object)
    })
    it("should be another object instance", () => {
      assert.notEqual(this.row.toObject, this.object)
    })
  })
})
