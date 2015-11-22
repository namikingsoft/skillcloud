import {Map} from 'immutable'

const image = Map<string, string>({
  mongodb: require('assets/logo/mongodb.png'),
})

export default class ImageRepository {
  static get(key: string): string {
    return image.get(key)
  }
}
