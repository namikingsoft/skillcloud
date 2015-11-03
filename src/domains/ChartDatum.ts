import ChartValue from 'domains/ChartValue'
import {List} from 'immutable'

export default class ChartDatum
{
  constructor(private param: {
    key: string,
    color: string,
    values: List<ChartValue>,
  }) {}

  get key(): string {
    return this.param.key
  }

  get color(): string {
    return this.param.color
  }

  get values(): List<ChartValue> {
    return this.param.values
  }

  get toObject(): Object {
    return {
      key: this.key,
      color: this.color,
      values: this.values.map(value => value.toObject).toArray(),
    }
  }
}
