import toPixel from '../src/to-pixel'

describe('toPixel', () => {
  test('should create the measure div', () => {
    toPixel(10)
    toPixel(10)
    expect(document.body.innerHTML).toBe('<div style="position: absolute; visibility: hidden; width: 1mm; height: 100mm;"></div>')
  })
})
