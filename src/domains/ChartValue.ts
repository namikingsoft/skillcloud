export default class ChartValue
{
  constructor(private param: {
    label: string,
    value: number,
    source?: any,
  }) {}

  get label(): string {
    return this.param.label
  }

  get value(): number {
    return this.param.value
  }

  get source(): any {
    return this.param.source
  }
}
