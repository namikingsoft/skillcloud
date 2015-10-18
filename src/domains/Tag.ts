export default class Tag
{
  constructor(private param: {
    name: string,
    experience: number,
    interest: number,
    children?: Tag[],
  }) {}

  get name(): string {
    return this.param.name
  }

  get experience(): number {
    return this.param.experience
  }

  get interest(): number {
    return this.param.interest
  }

  get children(): Tag[] {
    return new Array<Tag>().concat(this.param.children)
  }
}
