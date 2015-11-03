import Tag from 'domains/Tag'
import TagNode from 'domains/TagNode'
import TagCloud from 'domains/TagCloud'

export default class TagCloudFactory
{
  static create(tag: Tag): TagCloud {
    let idSeq = 0
    let groupSeq = 0
    let groupHash = {}
    function buildNodes(tag: Tag, parentTag?: Tag): TagNode[] {
      if (tag.hasChildren) {
        let nodes = new Array<TagNode>()
        for (const child of tag.children) {
          nodes = nodes.concat(
            buildNodes(child, tag)
          )
        }
        return nodes
      } else {
        if (!groupHash[parentTag.toString()]) {
          groupHash[parentTag.toString()] = ++groupSeq
        }
        return [
          new TagNode({
            id: ++idSeq,
            group: groupHash[parentTag.toString()],
            tag, parentTag,
          })
        ]
      }
    }
    const nodes = buildNodes(tag)
    return new TagCloud({nodes})
  }
}
