import Paragraph from '../src/paragraph'
import './utils'

describe('Paragraph', () => {
  describe('Paragraph', () => {
    test('should add paragraph style', () => {
      Paragraph('Lorem ipsum')
      expect(document.getElementById('boken--style').textContent)
        .toBe('p{padding:3mm 0}')
    })
  })

  describe('appendTo', () => {
    test('should append paragraph to an element', () => {
      Paragraph('Some text', '3mm').appendTo(document.body)
      expect(document.body.innerHTML).toBe('<p style="margin: 0px; text-indent: 3mm;">Some text</p>')
    })
  })

  describe('text', () => {
    test('should return the paragraph text', () => {
      const p = Paragraph('Some text')
        .appendTo(document.body)
      expect(p.content()).toBe('Some text')
      expect(document.getElementsByTagName('p')[0].innerHTML).toBe('Some text')
    })

    test('should update paragraph text', () => {
      const p = Paragraph('Some text')
        .appendTo(document.body)
        .content('Another text')
      expect(p.content()).toBe('Another text')
      expect(document.getElementsByTagName('p')[0].innerHTML).toBe('Another text')
    })
  })

  describe('calculateOverflow', () => {
    // Mock container.
    const container = document.createElement('div')
    Object.defineProperty(container, 'scrollHeight', {
      get: function () {
        return Math.ceil(this.children[0].textContent.length / 10)
      }
    })

    test('should fit a short text in container', () => {
      container.innerHTML = ''
      const overflow = Paragraph('foo bar')
        .appendTo(container)
        .calculateOverflow(3)
      expect(overflow).toBe(undefined)
    })

    test('should overflow the container', () => {
      container.innerHTML = ''
      const overflow = Paragraph('a b c d e f g h i j')
        .appendTo(container)
        .calculateOverflow(1)
      expect(overflow.content()).toBe('e f g h i j')
    })
  })
})
