import TagNode from 'domains/TagNode'
import {List} from 'immutable'

export default class TagCloud
{
  constructor(private param: {
    nodes: List<TagNode>,
  }) {}

  get nodes(): List<TagNode> {
    return this.param.nodes
  }
}
