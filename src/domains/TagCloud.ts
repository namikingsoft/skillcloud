import TagNode, {TagNodeMode} from 'domains/TagNode'
import {List} from 'immutable'

export default class TagCloud
{
  constructor(private param: {
    nodes: List<TagNode>,
  }) {}

  get nodes(): List<TagNode> {
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
    this.nodes.forEach(node => {
      node.setMode(tagNodeMode)
    })
    return this
  }
}
