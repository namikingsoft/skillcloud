export default class SingleValue<T> {
  /**
   * コンストラクタ
   * @param value 値の実体
   */
  constructor(
    private value: T
  ) {}

  /**
   * 値を返す
   * @return 値
   */
  valueOf(): T {
    return this.value;
  }

  /**
   * 値を文字列化したものを返す
   * @return 値を文字列化したもの
   */
  toString(): string {
    return String(this.value);
  }

  /**
   * 値が一致するかを調べる
   * @param 他の値
   * @return 値が一致したか
   */
  equals(target: SingleValue<T>): boolean {
    return this.value == target.valueOf();
  }
}
