import SkillNode, {SkillLink} from 'domains/SkillNode'
import Skill from 'domains/Skill'
import {List} from 'immutable'

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

  filter(selected: SkillNode) {
    const nodes = this.nodes.filter(node => {
      if (!selected || selected.group == node.group || node.depth < 2) {
        return true
      } else {
        return false
      }
    }).toList()
    const links = this.links.filter(link => {
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
}
