import Paragraph from '../src/paragraph'
import Book from '../src/book'
import Page from '../src/page'
import './utils'

jest.mock('../src/paragraph')
jest.mock('../src/book')

describe('Page', () => {

  describe('Page', () => {
    test('should add page style for left page', () => {
      Page(Book('foo'))
      expect(document.getElementById('the-book--style').innerHTML)
        .toBe('.the-book--page-content{position:absolute;top:0;left:0;overflow:hidden}.the-book--page-outer{display:block;position:relative;width:210mm;height:297mm;margin:50px;overflow:hidden;background:#fff;box-shadow:0 0 30px #bbb;page-break-after:always}@media print{.the-book--page-outer{margin:0;width:210mm;height:296mm;overflow:hidden;padding-bottom:3px;box-shadow:none;page-break-after:always}}')
    })

    test('should add page style for right page', () => {
      const book = Book('foo')
      book.addPage()
      Page(book)
      expect(document.getElementById('the-book--style').innerHTML)
        .toBe('.the-book--page-content{position:absolute;top:0;left:0;overflow:hidden}.the-book--page-outer{display:block;position:relative;width:210mm;height:297mm;margin:50px;overflow:hidden;background:#fff;box-shadow:0 0 30px #bbb;page-break-after:always}@media print{.the-book--page-outer{margin:0;width:210mm;height:296mm;overflow:hidden;padding-bottom:3px;box-shadow:none;page-break-after:always}}')
    })

    test('should add page elements', () => {
      Page(Book('foo'))
      expect(document.getElementsByClassName('the-book--page-outer').length)
        .toBe(1)
      expect(document.getElementsByClassName('the-book--page-content').length)
        .toBe(1)
      expect(document.getElementsByClassName('the-book--page-inner').length)
        .toBe(1)
    })
  })

  describe('addHeader', () => {
    test('should add the header to the page', () => {
      Page(Book('foo')).addHeader()
      expect(document.getElementsByClassName('the-book--header')[0].innerHTML)
        .toBe('<div>HEADER</div>')
    })
  })

  describe('addFooter', () => {
    test('should add the footer to the page', () => {
      Page(Book('foo')).addFooter()
      expect(document.getElementsByClassName('the-book--footer')[0].innerHTML)
        .toBe('<div>FOOTER</div>')
    })
  })

  describe('addParagraph', () => {
    test('should add paragraph', () => {
      expect(Page(Book('foo')).addParagraph(Paragraph('Foo bar')).text())
        .toBe('bar')
    })
  })
})
