import {Map} from 'immutable'

const image = Map<string, string>({
  mongodb: require('assets/logo/mongodb.png'),
  crawl: require('assets/logo/crawl.png'),
  arduino: require('assets/logo/arduino.png'),
})

export default class ImageRepository {
  static get(key: string): string {
    return image.get(key)
  }
}
