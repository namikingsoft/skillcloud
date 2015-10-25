import TagNode, {TagNodeMode} from 'domains/TagNode'

export default class TagCloud
{
  constructor(private param: {
    nodes: TagNode[],
  }) {}

  get nodes(): TagNode[] {
    return this.param.nodes
  }

  setMode(mode: string): TagCloud {
    const tagNodeMode: TagNodeMode = (() => {
      switch (mode) {
        case 'experience': return TagNodeMode.experience
        case 'interest': return TagNodeMode.interest
        default: return TagNodeMode.experience
      }
    })()
    for (const node of this.nodes) {
      node.setMode(tagNodeMode)
    }
    return this
  }
}
