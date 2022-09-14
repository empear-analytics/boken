import MarginNote from '../src/margin-note'

describe('MarginNote', () => {
  describe('MarginNote', () => {
    test('should add paragraph style', () => {
      MarginNote('Some margin note')
      expect(document.getElementById('boken--style').textContent)
        .toBe('.boken--margin-note{position:absolute;margin:5mm}')
    })
  })

  describe('appendTo', () => {
    test('should append paragraph to an element', () => {
      MarginNote('Another margin note').appendTo(document.body)
      expect(document.body.innerHTML).toBe('<div class="boken--margin-note">Another margin note</div>')
    })
  })
})
