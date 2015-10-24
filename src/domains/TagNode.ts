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
}
