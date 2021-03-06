import Tag from 'domains/Tag'
import {List} from 'immutable'
import {map} from 'lodash'

export default class TagFactory
{
  static create(data: Param): Tag {
    const children = map<Param, Tag>(data.children, child => {
      return TagFactory.create(child)
    })
    return new Tag({
      name: data.name,
      experience: data.experience,
      interest: data.interest,
      comment: data.comment,
      children: List<Tag>(children),
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
