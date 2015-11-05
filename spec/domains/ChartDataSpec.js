import ChartData from 'domains/ChartData'
import ChartDatum from 'domains/ChartDatum'
import ChartValue from 'domains/ChartValue'
import {List} from 'immutable'

describe("ChartData", function() {

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
    this.datumList = List.of(this.datum)
    this.data = new ChartData(this.datumList)
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.data instanceof ChartData)
    })
  })

  describe("list", () => {
    it("should be return initial param", () => {
      assert.equal(this.data.list, this.datumList)
    })
  })

  describe("forNVD3", () => {
    it("should be return data for nvd3", () => {
      assert.deepEqual(
        this.data.forNVD3,
        this.datumList.map(datum => datum.toObject).toArray()
      )
    })
  })
})
