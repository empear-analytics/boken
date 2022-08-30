


/**
 * Creates a new HTML element.
 *
 * @method create
 * @param {Object} attributes The attributes of the element.
 * @returns {HTMLDivElement} The created (but not yet appended) HTML element.
 */
export default function (attributes) {
  const div = document.createElement(attributes?.tag || 'div')
  if (attributes?.classNames) {
    div.classList.add(...attributes.classNames)
  }
  div.innerHTML = attributes?.html || ''
  Object.entries(attributes?.style || {}).forEach(([name, value]) => {
    div.style.setProperty(name, value)
  })
  return div
}
