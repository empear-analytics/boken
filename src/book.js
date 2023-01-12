import Margin from './margins.js'
import Page from './page.js'
import StyleInjector from './style-injector.js'
import Paragraph from './paragraph'
import CLASS_NAMES from './class-names'

/**
 * Factory for the book object.
 *
 * @class Book
 * @memberof boken
 * @param {string} name Title of the book as shown in the browser's page tab. This is also used as the default
 * file name when printing.
 */
export default function (name) {
  // Set title.
  document.title = name

  // Add relevant style.
  StyleInjector
    .add('html,body', {
      margin: 0,
      padding: 0,
      background: '#ddd',
      '-webkit-print-color-adjust': 'exact',
      '-webkit-filter': 'opacity(1)'
    })
    .add('html,body', {
      margin: '0 !important',
      padding: 0,
      'box-shadow': 'none'
    }, '@media print')
    .add('.' + CLASS_NAMES.header, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
    .add('.' + CLASS_NAMES.footer, {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%'
    })

  // Private members.
  const _ = {
    margins: {
      leftPage: Margin('left'),
      rightPage: Margin('right')
    },
    width: 210,
    height: 297,
    pages: {
      all: [],
      current: undefined
    },
    header: undefined,
    footer: undefined
  }

  // Public methods.
  const api = {
    write: {},
    margins: {}
  }

  api.page = index => _.pages.all[index]

  /**
   * Returns the current margins for left side pages.
   *
   * @method margins.leftPage
   * @memberof boken.Book
   * @returns {Margin} The margin for the left side pages.
   */
  /**
   * Sets the page margins for left side pages.
   *
   * @method margins.leftPage
   * @memberof boken.Book
   * @param {Margin} margins Object containing the margins that should be updated for the left side pages.
   * @returns {Book} Reference to the book.
   */
  api.margins.leftPage = margins => {
    if (typeof margins === 'undefined') {
      return _.margins.leftPage
    }
    _.margins.leftPage.update(margins)
    return api
  }

  /**
   * Returns the current margins for right side pages.
   *
   * @method margins.rightPage
   * @memberof boken.Book
   * @returns {Margin} The margin for the right side pages.
   */
  /**
   * Sets the page margins for right side pages.
   *
   * @method margins.rightPage
   * @memberof boken.Book
   * @param {Margin} margins Object containing the margins that should be updated for the right side pages.
   * @returns {Book} Reference to the book.
   */
  api.margins.rightPage = margins => {
    if (typeof margins === 'undefined') {
      return _.margins.rightPage
    }
    _.margins.rightPage.update(margins)
    return api
  }

  /**
   * Returns the page header.
   *
   * @method header
   * @memberof boken.Book
   * @returns {Function} The current header.
   */
  /**
   * Sets the page header.
   *
   * @method header
   * @memberof boken.Book
   * @param {Function} callback Function that takes some parameters and returns an HTML string representing the page
   * header. If not specified, the current header function is returned.
   * @returns {Book} Reference to the current book.
   */
  api.header = callback => {
    if (typeof callback === 'undefined') {
      return _.header
    }
    _.header = callback
    return api
  }

  /**
   * Returns or sets the page footer.
   *
   * @method footer
   * @memberof boken.Book
   * @returns {Function} The current footer (if called without any parameters) or reference to the current book.
   */
  /**
   * Returns or sets the page footer.
   *
   * @method footer
   * @memberof boken.Book
   * @param {Function} callback Function that takes some parameters and returns an HTML string representing the page
   * footer. If not specified, the current footer function is returned.
   * @returns {Book} Reference to the current book.
   */
  api.footer = callback => {
    if (typeof callback === 'undefined') {
      return _.footer
    }
    _.footer = callback
    return api
  }

  /**
   * Returns the book width.
   *
   * @method width
   * @memberof boken.Book
   * @returns {number} The book width.
   */
  api.width = () => _.width

  /**
   * Returns the book height.
   *
   * @method height
   * @memberof boken.Book
   * @returns {number} The book height.
   */
  api.height = () => _.height

  /**
   * Adds a new page to the book.
   *
   * @method addPage
   * @memberof boken.Book
   * @param {Object} options Page options.
   * @returns {Page} The newly added page.
   */
  api.addPage = (options = {
    header: true,
    footer: true
  }) => {
    // Add page.
    _.pages.current = Page(api)
    _.pages.all.push(_.pages.current)

    // Add header.
    if (options?.header && _.header) {
      _.pages.current.addHeader()
    }

    // Add footer.
    if (options?.footer && _.footer) {
      _.pages.current.addFooter()
    }

    return api
  }

  /**
   * Writes a paragraph in the book.
   *
   * @method write.p
   * @memberof boken.Book
   * @param {string} text The paragraph text to write in the book.
   * @returns {Book} Reference to the book.
   */
  api.write.p = text => {
    // Create paragraph.
    let paragraph = Paragraph(text, '5mm')

    // If no pages created yet, add one with header and footer (assuming regular page).
    if (_.pages.all.length === 0) {
      api.addPage()
    }

    do {
      // Spawn new paragraphs until all text is added.
      paragraph = _.pages.current.addParagraph(paragraph)
      if (typeof paragraph !== 'undefined') {
        api.addPage()
      }
    } while (typeof paragraph !== 'undefined')

    return api
  }

  /**
   * Returns the current number of pages in the book.
   *
   * @method numberOfPages
   * @memberof boken.Book
   * @returns {number} Number of pages.
   */
  api.numberOfPages = () => _.pages.all.length

  return api
}
