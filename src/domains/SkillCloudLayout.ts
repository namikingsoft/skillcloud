import SkillCloud from 'domains/SkillCloud'

const d3 = require('d3')
const color = d3.scale.category20()

export default class SkillCloudLayout
{
  private force: any

  constructor(param: {
    tick: Function,
  }) {
    this.force = d3.layout.force()
    .charge(-7500)
    .gravity(0.5)
    .friction(0.7)
    .linkDistance(50)
    .linkStrength(3)
    .theta(0.8)
    .on("tick", param.tick)
  }

  resize(width: number, height: number) {
    this.force.size([width, height])
  }

  update(cloud: SkillCloud) {
    this.force
    .nodes(cloud.nodes)
    .links(cloud.links)
    .start()
  }

  drag(): any {
    return this.force.drag()
    .on("dragstart", function() {
      d3.event.sourceEvent.stopPropagation()
    })
  }
}
