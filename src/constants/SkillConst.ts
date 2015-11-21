import SkillFactory from 'domains/SkillFactory'
import SkillCloudFactory from 'domains/SkillCloudFactory'
import ChartDataFactory from 'domains/ChartDataFactory'
import {Map} from 'immutable'

export const rootCloud = SkillCloudFactory.create(
  SkillFactory.create(require('data/skill.yaml'))
)
export const rootChart = ChartDataFactory.createBySkillList(
  rootCloud.nodes.get(0).skill.children
)
export const initialSkill = rootCloud.rootNode.skill
