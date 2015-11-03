import {clone} from 'lodash'

export default class ChartValue
{
  constructor(private param: {
    label: string,
    value: number,
  }) {}

  get label(): string {
    return this.param.label
  }

  get value(): number {
    return this.param.value
  }

  get toObject(): Object {
    return clone(this.param)
  }
}
