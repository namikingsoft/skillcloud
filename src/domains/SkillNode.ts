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
      caseOf(0, 14).
      caseOf(1, 20).
      caseOf(2, 16).
      caseOf(3, 11).
      caseOfElse(12).
    end()
  }

  get classes(): string {
    let classes = 'node'
    if (this.isRoot) {
      classes += ' root'
    }
    if (this.isGrandChild) {
      classes += ' grandchild'
    }
    return classes
  }

  get isRoot(): boolean {
    return this.id === 1
  }

  get isGrandChild(): boolean {
    return this.depth > 1
  }

  radius(isActive: boolean = false): number {
    return match<SkillNode,number>(this).
      caseOf(n => n.isRoot, v => 100).
      caseOf(n => isActive && n.isGrandChild, v => 60).
      caseOf(n => isActive, v => 100).
      caseOfElse(5).
    end()
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
