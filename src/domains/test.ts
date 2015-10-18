import {forEach} from 'lodash'

export default class Test
{
  constructor() {
    const test = [1,2,3,4,5]
    forEach<number>(test, num => console.log(num))
  }
}
