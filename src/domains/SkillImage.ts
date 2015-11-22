import Skill from 'domains/Skill'
import ImageRepository from 'domains/ImageRepository'

export default class SkillImage
{
  constructor(private param: {
    key: string,
    href?: string,
    width: number,
    height: number,
  }) {}

  get key(): string {
    return this.param.key
  }

  get href(): string {
    return this.param.href
  }

  get width(): number {
    return this.param.width
  }

  get height(): number {
    return this.param.height
  }

  get data(): string {
    return ImageRepository.get(this.key)
  }
}
