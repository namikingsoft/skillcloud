import Tag from 'domains/Tag'
import TagNode from 'domains/TagNode'
import TagCloud from 'domains/TagCloud'
import {List} from 'immutable'

export default class TagCloudFactory
{
  static create(tag: Tag): TagCloud {
    let idSeq = 0
    let groupSeq = 0
    let groupHash = {}
    function buildNodes(tag: Tag, parentTag?: Tag): List<TagNode> {
      if (tag.hasChildren) {
        let nodes = List<TagNode>()
        tag.children.forEach(child => {
          nodes = nodes.concat(
            buildNodes(child, tag)
          ).toList()
        })
        return nodes
      } else {
        if (!groupHash[parentTag.toString()]) {
          groupHash[parentTag.toString()] = ++groupSeq
        }
        return List.of<TagNode>(
          new TagNode({
            id: ++idSeq,
            group: groupHash[parentTag.toString()],
            tag, parentTag,
          })
        )
      }
    }
    const nodes = buildNodes(tag)
    return new TagCloud({nodes})
  }
}
