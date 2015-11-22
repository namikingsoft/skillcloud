import Tag from 'domains/Tag'
import TagFactory from 'domains/TagFactory'
import TagCloudFactory from 'domains/TagCloudFactory'
import ChartDataFactory from 'domains/ChartDataFactory'

export const root = TagFactory.create(require('data/tag.yaml'))
export const rootCloud = TagCloudFactory.create(root)
export const rootChart = ChartDataFactory.createByTagList(root.children)
