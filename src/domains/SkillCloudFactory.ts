import Skill from 'domains/Skill'
import SkillNode, {SkillLink} from 'domains/SkillNode'
import SkillCloud from 'domains/SkillCloud'
import {List} from 'immutable'

export default class SkillCloudFactory
{
  static create(root: Skill): SkillCloud {
    let idSeq = 0
    let nodes = List<SkillNode>()
    let links = List<SkillLink>()
    const rootNode = new SkillNode({
      id: ++idSeq,
      group: 0,
      depth: 0,
      skill: root,
    })
    const buildNodes = (children: List<Skill>, parentNode: SkillNode) => {
      let groupSeq = 0
      children.forEach(skill => {
        const group = parentNode.group ? parentNode.group : ++groupSeq
        const depth = parentNode.depth + 1
        const node = new SkillNode({
          id: ++idSeq,
          group,
          depth,
          skill,
        })
        const link = {
          source: parentNode,
          target: node,
        }
        nodes = nodes.push(node)
        links = links.push(link)
        if (skill.children) {
          buildNodes(skill.children, node)
        }
      })
    }
    nodes = nodes.push(rootNode)
    buildNodes(root.children, rootNode)
    return new SkillCloud({nodes, links})
  }
}
