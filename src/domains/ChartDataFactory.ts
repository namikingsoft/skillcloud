import ChartData from 'domains/ChartData'
import ChartDatum from 'domains/ChartDatum'
import ChartValue from 'domains/ChartValue'
import Skill from 'domains/Skill'
import Tag from 'domains/Tag'
import {List} from 'immutable'

export default class ChartDataFactory
{
  static createBySkillList(skills: List<Skill>): ChartData {
    return new ChartData(
      List.of<ChartDatum>(
        new ChartDatum({
          key: 'スキル経験値グラフ',
          color: '#fff',
          values: skills
            .map<ChartValue>(skill => {
              return new ChartValue({
                label: skill.name,
                value: skill.experience,
                source: skill,
              })
            })
            .sortBy(row => -row.value)
            .toList()
        })
        /* @todo for simple
        ,
        new ChartDatum({
          key: '興味',
          color: '#aaa',
          values: skills
            .map<ChartValue>(skill => {
              return new ChartValue({
                label: skill.name,
                value: skill.interest,
                source: skill,
              })
            })
            .toList()
        })
        */
      )
    )
  }

  static createByTagList(tags: List<Tag>): ChartData {
    return new ChartData(
      List.of<ChartDatum>(
        new ChartDatum({
          key: '経験',
          color: '#fff',
          values: tags
            .map<ChartValue>(tag => {
              return new ChartValue({
                label: tag.name,
                value: tag.experience,
                source: tag,
              })
            })
            .sortBy(row => -row.value)
            .toList()
        }),
        new ChartDatum({
          key: '興味',
          color: '#999',
          values: tags
            .map<ChartValue>(tag => {
              return new ChartValue({
                label: tag.name,
                value: tag.interest,
                source: tag,
              })
            })
            .toList()
        })
      )
    )
  }
}
