import create from './create.js'
import toPixel from './to-pixel.js'
import CLASS_NAMES from './class-names'
import StyleInjector from './style-injector'

/**
 * The page class.
 *
 * @class Page
 * @memberof boken
 * @param {Book} book The book that the page belongs to.
 */
export default function (book) {
  // Add relevant style.
  StyleInjector
    .add('.' + CLASS_NAMES.page.outer, {
      display: 'block',
      position: 'relative',
      width: '210mm',
      height: '297mm',
      margin: '50px',
      overflow: 'hidden',
      background: '#fff',
      'box-shadow': '0 0 30px #bbb',
      'page-break-after': 'always'
    })
    .add('.' + CLASS_NAMES.page.outer, {
      margin: 0,
      width: '210mm',
      height: '296mm',
      overflow: 'hidden',
      // Some random correction for the bottom of the page.
      'padding-bottom': '3px',
      'box-shadow': 'none',
      'page-break-after': 'always'
    }, '@media print')
    .add('.' + CLASS_NAMES.page.content, {
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden'
    })

  // Private members.
  const _ = (() => {
    // Page side.
    const side = book.numberOfPages() % 2 === 0 ? 'left' : 'right'

    // Page outer.
    const outer = document.body.appendChild(create({ classNames: [CLASS_NAMES.page.outer] }))

    // Add content wrapper.
    const contentWrapper = outer.appendChild(create({
      classNames: [
        CLASS_NAMES.page.content,
        CLASS_NAMES.margins[side]
      ]
    }))

    // Add page inner.
    const inner = contentWrapper.appendChild(create({ classNames: [CLASS_NAMES.page.inner] }))

    return {
      side,
      outer,
      inner,

      // Current page margins.
      margins: side === 'left' ? book.leftPageMargins() : book.rightPageMargins(),

      // Position of the caret.
      caret: {
        height: 0
      }
    }
  })()

  // Public methods.
  const api = {}

  /**
     * Adds the header to the page.
     *
     * @method addHeader
     * @memberof boken.Page
     * @returns {Page} Reference to the current page.
     */
  api.addHeader = () => {
    const header = book.header()
    _.outer.appendChild(create({
      classNames: [CLASS_NAMES.header],
      html: header({
        number: book.numberOfPages()
      })
    }))
    return api
  }

  /**
     * Adds the footer to the page.
     *
     * @method addFooter
     * @memberof boken.Page
     * @returns {Page} Reference to the current page.
     */
  api.addFooter = () => {
    const footer = book.footer()
    _.outer.appendChild(create({
      classNames: [CLASS_NAMES.footer],
      html: footer({
        number: book.numberOfPages()
      })
    }))
    return api
  }

  /**
   * Adds a paragraph to the page. If the paragraph content does not fit in the page, the overflow content is returned
   * as a paragraph.
   *
   * @method addParagraph
   * @memberof boken.Page
   * @param {Paragraph} paragraph The paragraph to add.
   * @returns {(Paragraph|undefined)} A paragraph containing the overflown content if any, or undefined.
   */
  api.addParagraph = paragraph => {
    // Update caret height.
    _.caret.height = _.inner.scrollHeight

    // Add paragraph to page and return any overflown paragraph.
    return paragraph.appendTo(_.inner)
      .calculateOverflow(toPixel(_.margins.getHeight(book.height())))
  }

  api.addMarginNote = marginNote => {
    // TODO Add side and position to options.
    return marginNote.appendTo(_.outer)
  }

  return api
}
