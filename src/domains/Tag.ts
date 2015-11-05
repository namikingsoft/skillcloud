import {List} from 'immutable'

export default class Tag
{
  constructor(private param: {
    name: string,
    experience: number,
    interest: number,
    comment?: string,
    children?: List<Tag>,
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

  get children(): List<Tag> {
    return this.param.children
  }

  get hasChildren(): boolean {
    return this.children && this.children.size > 0
  }

  toString(): string {
    return `${this.name}:${this.experience}:${this.interest}`
  }
}
