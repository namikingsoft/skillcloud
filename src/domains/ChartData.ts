import ChartDatum from 'domains/ChartDatum'
import {List} from 'immutable'

export default class ChartData
{
  constructor(
    private data: List<ChartDatum>
  ) {}

  get list(): List<ChartDatum> {
    return this.data
  }

  get forNVD3(): Array<Object> {
    return this.data.map<Object>(datum => datum.toObject).toArray()
  }
}
