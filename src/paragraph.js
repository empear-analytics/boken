import create from './create'
import StyleInjector from './style-injector'

/**
 * Factory representing a paragraph in the book.
 *
 * @class Paragraph
 * @memberof boken
 * @param {string} content The paragraph content. Can be HTML formatted.
 * @param {Object=} options Paragraph options.
 */
export default function Paragraph (content, options = {}) {
  // Add relevant style.
  StyleInjector.add('p', {
    padding: '3mm 0'
  })

  // Private members.
  const _ = {
    el: create({
      tag: 'p',
      style: {
        margin: 0,
        'text-indent': options?.indent || null
      },
      html: content
    })
  }

  // Public methods.
  const api = {}

  /* test-code */
  api.__test__ = {
    content: () => _.el.innerHTML
  }
  /* end-test-code */

  /**
   * Appends the paragraph to a parent node.
   *
   * @method appendTo
   * @memberof boken.Paragraph
   * @param {HTMLElement} parent Parent node to append paragraph to.
   * @returns {Paragraph} Reference to the paragraph.
   */
  api.appendTo = parent => {
    parent.appendChild(_.el)
    return api
  }

  /**
   * Calculates the overflown paragraph.
   *
   * @method calculateOverflow
   * @memberof boken.Paragraph
   * @param {number} innerHeight The current height to be used to determine overflow.
   * @returns {(Paragraph|undefined)} Paragraph containing the overflow if any, undefined otherwise.
   */
  api.calculateOverflow = innerHeight => {
    const tokens = _.el.innerHTML.split(' ')
    const parent = _.el.parentNode
    let start = 0
    let end = tokens.length
    let index = end

    // Find bisection.
    do {
      _.el.innerHTML = tokens.slice(0, index).join(' ')
      if (parent.scrollHeight > innerHeight) {
        end = index
        index = Math.floor((start + end) / 2)
      } else {
        start = index
        index = Math.floor((start + end) / 2)
      }
    } while (index !== start && index !== end)

    // Trace back until content fits in page.
    while (parent.scrollHeight > innerHeight) {
      index--
      _.el.innerHTML = tokens.slice(0, index).join(' ')
    }

    // Return the overflown paragraph.
    return index < tokens.length
      ? Paragraph(tokens.slice(index).join(' '), Object.assign(options, { indent: null }))
      : undefined
  }

  return api
}
