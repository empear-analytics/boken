/**
 * Creates a new HTML element.
 *
 * @method create
 * @param {Object} attributes The attributes of the element.
 * @returns {HTMLDivElement} The created (but not yet appended) HTML element.
 */
export default function (attributes) {
  const el = document.createElement(attributes?.tag || 'div')
  if (attributes?.classNames) {
    el.classList.add(...attributes.classNames)
  }
  el.innerHTML = attributes?.html || ''
  Object.entries(attributes?.style || {}).forEach(([name, value]) => {
    el.style.setProperty(name, value)
  })
  return el
}
