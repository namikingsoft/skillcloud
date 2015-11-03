export default class Skill
{
  constructor(private param: {
    name: string,
    experience: number,
    interest: number,
    comment?: string,
    children?: Skill[],
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

  get comment(): string {
    return this.param.comment
  }

  get children(): Skill[] {
    return new Array<Skill>().concat(this.param.children)
  }

  get hasChildren(): boolean {
    return this.children && this.children.length > 0
  }
}
