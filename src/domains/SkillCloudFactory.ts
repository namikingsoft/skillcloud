import Skill from 'domains/Skill'
import SkillNode, {SkillLink} from 'domains/SkillNode'
import SkillCloud from 'domains/SkillCloud'

export default class SkillCloudFactory
{
  static create(root: Skill): SkillCloud {
    let idSeq = 0
    const nodes = new Array<SkillNode>()
    const links = new Array<SkillLink>()
    const rootNode = new SkillNode({
      id: ++idSeq,
      group: 0,
      depth: 0,
      skill: root,
      active: true,
    })
    const buildNodes = (children: Skill[], parentNode: SkillNode) => {
      let groupSeq = 0
      for (const skill of children) {
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
        nodes.push(node)
        links.push(link)
        if (skill.children) {
          buildNodes(skill.children, node)
        }
      }
    }
    nodes.push(rootNode)
    buildNodes(root.children, rootNode)
    return new SkillCloud({nodes, links})
  }
}
