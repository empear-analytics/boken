import StyleInjector from './style-injector'
import create from './create'
import CLASS_NAMES from './class-names'

/**
 * Factory representing a margin note.
 *
 * @class MarginNote
 * @memberof boken
 */
export default function (content, options = {}) {
  // Add relevant style.
  StyleInjector.add('.' + CLASS_NAMES.marginNote, {
    position: 'absolute',
    margin: '5mm'
  })

  // Private members.
  const _ = {
    // DOM element.
    el: create({
      tag: 'div',
      classNames: [CLASS_NAMES.marginNote],
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

  api.appendTo = parent => {
    parent.appendChild(_.el)
    return api
  }

  return api
}
