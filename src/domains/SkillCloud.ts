import SkillNode, {SkillLink} from 'domains/SkillNode'
import Skill from 'domains/Skill'
import {List} from 'immutable'
import match from 'match-case'

export default class SkillCloud
{
  constructor(private param: {
    nodes: List<SkillNode>,
    links: List<SkillLink>,
  }) {}

  get nodes(): List<SkillNode> {
    return this.param.nodes
  }

  get links(): List<SkillLink> {
    return this.param.links
  }

  get rootNode(): SkillNode {
    return this.nodes.find(d => d.id === 1)
  }

  filter(selected: SkillNode) {
    const nodes = this.nodes.
    filter(node =>
      (!selected && node.depth < 3) ||
      ((selected && selected.group == node.group) || node.depth < 2)
    ).toList()
    const links = this.links.
    filter(link => {
      let includeTarget, includeSource = false
      nodes.forEach(node => {
        if (node == link.target) {
          includeTarget = true
        }
        if (node == link.source) {
          includeSource = true
        }
      })
      return includeTarget && includeSource
    }).toList()
    return new SkillCloud({nodes, links})
  }

  findNodeBySkill(skill: Skill): SkillNode {
    return this.nodes.find(node => node.skill === skill)
  }

  findNodeByName(name: string): SkillNode {
    return this.nodes.find(node => node.skill.name === name)
  }

  isIncludeNode(node: SkillNode): boolean {
    return !!node.skill.children.find(skill => !!this.findNodeBySkill(skill))
  }

  adjustNodePosition(node: SkillNode) {
    const root = this.rootNode
    node.skill.children.
    map<SkillNode>(skill => this.findNodeBySkill(skill)).
    forEach(child => {
      // factor @todo magic number
      const dxRoot = (root.x - node.x) * 5
      const dyRoot = (root.y - node.y) * 5
      const dxNode = (node.x - child.x) / 10
      const dyNode = (node.x - child.y) / 10
      child.x = node.x + dxRoot + dxNode
      child.y = node.y + dyRoot + dyNode
      child.px = node.px + dxRoot + dxNode
      child.py = node.py + dyRoot + dyNode
      this.adjustNodePosition(child)
    })
  }
}
