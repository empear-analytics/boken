/**
 * Method that converts millimeters to pixels.
 *
 * @method toPixel
 * @param {number} mm Millimeter to convert to pixels.
 * @returns {number} The length in pixels.
 */
export default (() => {
  // Private members.
  const _ = {
    scale: undefined
  }

  function getScale () {
    if (typeof _.scale === 'undefined') {
      const div = document.createElement('div')
      div.style.position = 'absolute'
      div.style.visibility = 'hidden'
      div.style.width = '1mm'
      div.style.height = '100mm'
      document.body.appendChild(div)
      _.scale = div.getBoundingClientRect().height / 100
    }
    return _.scale
  }

  return mm => mm * getScale()
})()
