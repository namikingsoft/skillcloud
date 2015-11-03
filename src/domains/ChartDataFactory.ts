import ChartDatum from 'domains/ChartDatum'
import ChartValue from 'domains/ChartValue'
import Skill from 'domains/Skill'
import Tag from 'domains/Tag'
import {List} from 'immutable'

export default class ChartDataFactory
{
  static createBySkillList(skills: List<Skill>): List<ChartDatum> {
    return List.of<ChartDatum>(
      new ChartDatum({
        key: '経験',
        color: '#f00',
        values: skills.map<ChartValue>(skill => {
          return new ChartValue({
            label: skill.name,
            value: skill.experience,
          })
        }).toList()
      }),
      new ChartDatum({
        key: '興味',
        color: '#0f0',
        values: skills.map<ChartValue>(skill => {
          return new ChartValue({
            label: skill.name,
            value: skill.interest,
          })
        }).toList()
      })
    )
  }

  static createByTagList(tags: List<Tag>): List<ChartDatum> {
    return List.of<ChartDatum>(
      new ChartDatum({
        key: '経験',
        color: '#f00',
        values: tags.map<ChartValue>(tag => {
          return new ChartValue({
            label: tag.name,
            value: tag.experience,
          })
        }).toList()
      }),
      new ChartDatum({
        key: '興味',
        color: '#0f0',
        values: tags.map<ChartValue>(tag => {
          return new ChartValue({
            label: tag.name,
            value: tag.interest,
          })
        }).toList()
      })
    )
  }
}
