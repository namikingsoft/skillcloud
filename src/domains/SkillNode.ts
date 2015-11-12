import Skill from 'domains/Skill'
import match from 'match-case'

export default class SkillNode
{
  constructor(private param: {
    id: number,
    group: number,
    depth: number,
    skill: Skill,
  }) {}

  get id(): number {
    return this.param.id
  }

  get group(): number {
    return this.param.group
  }

  get depth(): number {
    return this.param.depth
  }

  get skill(): Skill {
    return this.param.skill
  }

  get fontSize(): number {
    return match<number,number>(this.depth).
      caseOf(0, 11).
      caseOf(1, 20).
      caseOf(2, 16).
      caseOf(3, 11).
      caseOfElse(12).
    end()
  }

  get classes(): string {
    let classes = 'node'
    if (this.id == 1) {
      classes += ' root'
    }
    if (this.depth > 1) {
      classes += ' grandchild'
    }
    return classes
  }

  // position for d3.js
  x: number
  y: number
  px: number
  py: number
}

export interface SkillLink {
  source: SkillNode
  target: SkillNode
}
