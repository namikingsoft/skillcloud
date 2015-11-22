import Skill from 'domains/Skill'
import SkillImage from 'domains/SkillImage'
import {List} from 'immutable'
import {map} from 'lodash'
import match from 'match-case'

interface Param {
  name: string
  experience: number
  interest: number
  comment?: string
  image?: {
    key: string,
    href?: string,
    width: number,
    height: number,
  },
  children?: Param[]
}

export default class SkillFactory
{
  static create(data: Param): Skill {
    const image = match<SkillImage>(data.image).
      caseOfNone(v => undefined).
      caseOfElse(v => new SkillImage(v)).
    end()
    const children = map<Param, Skill>(data.children, child => {
      return SkillFactory.create(child)
    })
    return new Skill({
      name: data.name,
      experience: data.experience,
      interest: data.interest,
      comment: data.comment,
      image,
      children: List<Skill>(children),
    })
  }
}
