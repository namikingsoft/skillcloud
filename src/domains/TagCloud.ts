import TagNode from 'domains/TagNode'

export default class TagCloud
{
  constructor(private param: {
    nodes: TagNode[],
  }) {}

  get nodes(): TagNode[] {
    return this.param.nodes
  }
}
