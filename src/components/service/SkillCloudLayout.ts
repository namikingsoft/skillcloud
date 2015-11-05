import SkillCloud from 'domains/SkillCloud'

const d3 = require('d3')
const color = d3.scale.category20()

export default class SkillCloudLayout
{
  private force: any
  private tick: ()=>void

  constructor() {
    this.force = d3.layout.force()
    .charge(-7500)
    .gravity(0.5)
    .friction(0.7)
    .linkDistance(50)
    .linkStrength(3)
    .theta(0.8)
    .on("tick", ()=>this.tick())
    this.tick = ()=>{}
  }

  drag(): any {
    return this.force.drag()
    .on("dragstart", function() {
      d3.event.sourceEvent.stopPropagation()
    })
  }

  onTick(tick: ()=>void): SkillCloudLayout {
    this.tick = tick
    return this
  }

  resize(width: number, height: number): SkillCloudLayout {
    this.force.size([width, height])
    return this
  }

  update(cloud: SkillCloud): SkillCloudLayout {
    this.force
    .nodes(cloud.nodes.toArray())
    .links(cloud.links.toArray())
    .start()
    return this
  }
}
