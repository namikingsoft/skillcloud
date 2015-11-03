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
    if (this.param.children) {
      return new Array<Tag>().concat(this.param.children)
    } else {
      return undefined
    }
  }

  get hasChildren(): boolean {
    return this.children && this.children.length > 0
  }

  toString(): string {
    return `${this.name}:${this.experience}:${this.interest}`
  }
}
