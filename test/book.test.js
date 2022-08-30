import Page from '../src/page'
import Book from '../src/book'

jest.mock('../src/page')

describe('Book', () => {
  describe('Book', () => {
    test('should add book style', () => {
      Book('foo')
      expect(document.getElementById('the-book--style').innerHTML)
        .toBe('.the-book--footer{position:absolute;bottom:0;left:0;width:100%}.the-book--header{position:absolute;top:0;left:0;width:100%}.the-book--margins--side-left{width:150mm;height:237mm;margin:30mm}.the-book--margins--side-right{width:150mm;height:237mm;margin:30mm}html,body{margin:0;padding:0;background:#ddd;-webkit-print-color-adjust:exact;-webkit-filter:opacity(1)}@media print{html,body{margin:0 !important;padding:0;box-shadow:none}}')
    })
  })

  describe('numberOfPages', () => {
    test('should return the number of pages', () => {
      document.body.innerHTML = ''
      expect(Book('foo').addPage().numberOfPages()).toBe(1)
    })
  })

  describe('height', () => {
    test('should return the book height', () => {
      expect(Book('foo').height()).toBe(297)
    })
  })

  describe('width', () => {
    test('should return the book width', () => {
      expect(Book('foo').width()).toBe(210)
    })
  })

  describe('leftPageMargins', () => {
    test('should set or return the current left page margins', () => {
      expect(Book('foo').leftPageMargins().toStyle())
        .toBe('30mm 30mm 30mm 30mm')
      expect(Book('foo').leftPageMargins({left: 50, bottom: 20})
        .leftPageMargins().toStyle())
        .toBe('30mm 30mm 20mm 50mm')
    })
  })

  describe('rightPageMargins', () => {
    test('should set or return the current right page margins', () => {
      expect(Book('foo').rightPageMargins().toStyle())
        .toBe('30mm 30mm 30mm 30mm')
      expect(Book('foo').rightPageMargins({right: 50, top: 20})
        .rightPageMargins().toStyle())
        .toBe('20mm 50mm 30mm 30mm')
    })
  })

  describe('header', () => {
    test('should set or return the current header', () => {
      expect(Book('foo').header()).toBe(undefined)
      expect(Book('foo').header(() => '<div>HEADER</div>')
        .header()()).toBe('<div>HEADER</div>')
    })
  })

  describe('footer', () => {
    test('should set or return the current footer', () => {
      expect(Book('foo').footer()).toBe(undefined)
      expect(Book('foo').footer(() => '<div>FOOTER</div>')
        .footer()()).toBe('<div>FOOTER</div>')
    })
  })

  describe('addPage', () => {
    test('should add a page', () => {
      document.body.innerHTML = ''
      const book = Book('foo')
        .header(() => '<div>HEADER</div>')
        .footer(() => '<div>FOOTER</div>')
        .addPage()
      expect(book.page(0).addHeader.mock.calls.length).toBe(1)

    })
  })

  describe('writeParagraph', () => {
    test('should write paragraph on two pages', () => {
      const book = Book('foo')
      expect(book.writeParagraph('Lorem ipsum').numberOfPages()).toBe(2)
      expect(book.writeParagraph('Foo bar').numberOfPages()).toBe(3)
    })
  })
})
