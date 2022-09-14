import Margins from '../src/margins'
import './utils'

describe('Margins', () => {
  describe('Margins', () => {
    test('should add margin style', () => {
      Margins('left')
      expect(document.getElementById('boken--style').textContent)
        .toBe('.boken--margins--left-page{width:150mm;height:237mm;margin:30mm}')
    })
  })

  describe('update', () => {
    test('should update margin style', () => {
      Margins('left')
        .update({ left: 10, right: 20, top: 40 })
      expect(document.getElementById('boken--style').textContent)
        .toBe('.boken--margins--left-page{width:180mm;height:227mm;margin:40mm 20mm 30mm 10mm}')
    })
  })
})
