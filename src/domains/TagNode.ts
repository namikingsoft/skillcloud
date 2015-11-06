import Tag from 'domains/Tag'

export default class TagNode
{
  constructor(private param: {
    id: number,
    group: number,
    tag: Tag,
    parentTag: Tag,
  }) {}

  get id(): number {
    return this.param.id
  }

  get group(): number {
    return this.param.group
  }

  get tag(): Tag {
    return this.param.tag
  }

  get parentTag(): Tag {
    return this.param.parentTag
  }

  fontSize(mode: string): number {
    return this.factor(mode) * 0.5
  }

  radius(mode: string): number {
    return this.factor(mode) * 1.5
  }

  private factor(mode: string): number {
    switch (mode) {
      case "experience": return this.tag.experience
      case "interest": return this.tag.interest
      default: return 0
    }
  }
}
