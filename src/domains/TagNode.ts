import Tag from 'domains/Tag'

export default class TagNode
{
  constructor(private param: {
    id: number,
    group: number,
    tag: Tag,
    parentTag: Tag,
    mode?: TagNodeMode,
  }) {
    if (this.mode === undefined) {
      this.param.mode = TagNodeMode.experience
    }
  }

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

  get mode(): TagNodeMode {
    return this.param.mode
  }

  get fontSize(): number {
    return this.weight * 0.5
  }

  get radius(): number {
    return this.weight * 1.5
  }

  private get weight(): number {
    switch (this.mode) {
      case TagNodeMode.experience: return this.tag.experience
      case TagNodeMode.interest: return this.tag.interest
      default: return 0
    }
  }

  setMode(mode: TagNodeMode): TagNode {
    this.param.mode = mode
    return this
  }
}

export enum TagNodeMode
{
  experience,
  interest,
}
