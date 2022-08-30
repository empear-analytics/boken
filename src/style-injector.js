/**
 * Factory for a style injector object. Each object creates a new style element and populates the content with
 * the added style.
 *
 * @class StyleInjector
 * @memberof book
 * @param {string} id The unique identifier of the injector. It is used as part of the ID of the corresponding style
 * element.
 * @ignore
 */
export default (() => {
  const ID = 'the-book--style'
  const EMPTY_MEDIA = '_none'

  // Private members.
  const _ = {
    styles: new Map()
  }

  function getElem() {
    return document.querySelector(`head style#${ID}`)
  }

  function getMedia (media) {
    if (!_.styles.has(media)) {
      _.styles.set(media, new Map())
    }
    return _.styles.get(media)
  }

  function getOrCreateElem () {
    let elem = getElem()
    if (elem === null) {
      elem = document.createElement('style')
      elem.id = ID
      document.head.appendChild(elem)
    }
    return elem
  }

  function getSortedEntries (map) {
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
  }

  function compile () {
    return getSortedEntries(_.styles)
      .map(([media, styles]) => {
        // Build styles.
        let content = getSortedEntries(styles)
          .map(([key, value]) => `${key}{${Object.entries(value).map(d => `${d[0]}:${d[1]}`).join(';')}}`)
          .join('')

        // Wrap them in media query.
        if (media !== EMPTY_MEDIA) {
          content = `${media}{${content}}`
        }

        return content
      })
      .join('')
  }

  function add (selector, style, media) {
    // Add or update style.
    const mediaQuery = getMedia(media)
    const currentStyle = mediaQuery.get(selector) || {}
    mediaQuery.set(selector, Object.assign(currentStyle, style))
  }

  const api = {}

  /**
   * Adds a new style to the page. If the style already exists for the specified media and selector, it is not added.
   *
   * @method add
   * @memberof book.StyleInjector
   * @param {string} selector The CSS query selector to add the style for.
   * @param {Object} style An object representing the style (name: value) pairs.
   * @param {string?} media The media to add style for.
   * @returns {StyleInjector} Reference to the current style injector.
   * @ignore
   */
  api.add = (selector, style, media = EMPTY_MEDIA) => {
    if (!getMedia(media).has(selector) || getElem() === null) {
      add(selector, style, media)
      getOrCreateElem().textContent = compile()
    }
    return api
  }

  /**
   * Adds a new style or updates an existing one.
   *
   * @method update
   * @memberof book.StyleInjector
   * @param {string} selector The CSS query selector to add the style for.
   * @param {Object} style An object representing the style (name: value) pairs.
   * @param {string?} media The media to add style for.
   * @returns {StyleInjector} Reference to the current style injector.
   * @ignore
   */
  api.update = (selector, style, media = EMPTY_MEDIA) => {
    add(selector, style, media)
    getOrCreateElem().textContent = compile()
    return api
  }

  return api
})()
