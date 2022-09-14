import StyleInjector from './style-injector'
import create from './create'
import CLASS_NAMES from './class-names'

/**
 * Factory representing a margin note.
 *
 * @class MarginNote
 * @memberof boken
 */
export default function (page) {
  // Add relevant style.
  StyleInjector.add('.' + CLASS_NAMES.marginNote, {
    position: 'absolute',
    // TODO Expose this to API.
    margin: '5mm'
  })

  // Private members.
  const _ = {
    // DOM element.
    el: create({
      tag: 'div',
      classNames: [CLASS_NAMES.marginNote]
    })
  }

  // Add DOM element.
  page.outer.appendChild(_.el)

  // Public methods.
  const api = {}

  api.content = content => {
    _.el.innerHTML = content
    return api
  }

  api.side = side => {
    _.el.style[side] = 0
    // TODO Use private member _ of Margins instead of accessing it directly.
    _.el.style.width = `calc(${page.margins[side]()}mm - 10mm)`
    return api
  }

  api.position = position => {
    _.el.style.top = position
    return api
  }

  return api
}
