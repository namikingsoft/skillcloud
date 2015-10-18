import Skill from 'domains/Skill'
import {map} from 'lodash'

export default class SkillFactory
{
  static create(data: Param): Skill {
    const children = map<Param, Skill>(data.children, child => {
      return SkillFactory.create(child)
    })
    return new Skill({
      name: data.name,
      experience: data.experience,
      interest: data.interest,
      comment: data.comment,
      children,
    })
  }
}

interface Param {
  name: string
  experience: number
  interest: number
  comment?: string
  children?: Param[]
}
