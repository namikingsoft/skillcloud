import Tag from 'domains/Tag'
import match from 'match-case'

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
    return match<string,number>(mode).
      caseOf("experience", this.tag.experience).
      caseOf("interest", this.tag.interest).
      caseOfElse(0).
    end()
  }

  // position for d3.js
  x: number
  y: number
  px: number
  py: number
}
