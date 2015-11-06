import Skill from 'domains/Skill'

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
    switch (this.depth) {
      case 0: return 11
      case 1: return 20
      case 2: return 16
      case 3: return 11
    }
    return 12
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
}

export interface SkillLink {
  source: SkillNode
  target: SkillNode
}
