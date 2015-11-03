import SkillNode, {SkillLink} from 'domains/SkillNode'
import Skill from 'domains/Skill'
import {filter} from 'lodash'

export default class SkillCloud
{
  constructor(private param: {
    nodes: SkillNode[],
    links: SkillLink[],
  }) {}

  get nodes(): SkillNode[] {
    return this.param.nodes
  }

  get links(): SkillLink[] {
    return this.param.links
  }

  filter(selected: SkillNode) {
    const nodes = filter<SkillNode>(this.nodes, node => {
      if (!selected || selected.group == node.group || node.depth < 2) {
        return true
      } else {
        return false
      }
    })
    const links = filter<SkillLink>(this.links, link => {
      let includeTarget, includeSource = false
      for (const node of nodes) {
        if (node == link.target) {
          includeTarget = true
        }
        if (node == link.source) {
          includeSource = true
        }
      }
      return includeTarget && includeSource
    })
    for(const node of this.nodes) {
      if (node.skill.hasChildren && (!selected || selected.group == node.group)) {
        node.active = true
      } else {
        node.active = false
      }
    }
    return new SkillCloud({nodes, links})
  }

  findNodeBySkill(skill: Skill): SkillNode {
    for (const node of this.nodes) {
      if (node.skill === skill) {
        return node
      }
    }
    return null
  }
}
