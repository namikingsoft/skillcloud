import SkillImage from 'domains/SkillImage'

describe("SkillImage", function() {

  before(() => {
    this.image = new SkillImage({
      key: "key1",
      href: "http://www.example.com",
      width: 100,
      height: 200,
    })
  })

  describe("new", () => {
    it("should be return new instance", () => {
      assert.ok(this.image instanceof SkillImage)
    })
  })

  describe("key", () => {
    it("should be return initial param", () => {
      assert.equal(this.image.key, "key1")
    })
  })

  describe("href", () => {
    it("should be return initial param", () => {
      assert.equal(this.image.href, "http://www.example.com")
    })
  })

  describe("width", () => {
    it("should be return initial param", () => {
      assert.equal(this.image.width, 100)
    })
  })

  describe("height", () => {
    it("should be return initial param", () => {
      assert.equal(this.image.height, 200)
    })
  })

  describe("data", () => {
    it("should be return data scheme encoded base64")
  })
})
