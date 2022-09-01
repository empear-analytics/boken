import StyleInjector from './style-injector'
import CLASS_NAMES from './class-names'

/**
 * Factory for margins.
 *
 * @function Margins
 * @memberof boken
 */
export default function (side) {
  // Add relevant style.
  StyleInjector
    .add('.' + CLASS_NAMES.margins[side], {
      width: (210 - 30 - 30) + 'mm',
      height: (297 - 30 - 30) + 'mm',
      margin: '30mm'
    })

  // Private members.
  const _ = {
    margins: {
      left: 30,
      right: 30,
      top: 30,
      bottom: 30
    }
  }

  /**
   * Returns a calculated inner width for a page based on the current margins.
   *
   * @method innerWidth
   * @memberof boken.Margins
   * @param {number} pageWidth Original width of the page.
   * @returns {number} The calculated inner width.
   */
  function innerWidth (pageWidth = 210) {
    return pageWidth - _.margins.left - _.margins.right
  }

  /**
   * Returns a calculated inner height for a page based on the current margins.
   *
   * @method innerHeight
   * @memberof boken.Margins
   * @param {number} pageHeight Original height of the page.
   * @returns {number} The calculated inner height.
   */
  function innerHeight (pageHeight = 297) {
    return pageHeight - _.margins.top - _.margins.bottom
  }

  /**
   * Returns the margins as a CSS style value.
   *
   * @method toStyle
   * @memberof boken.Margins
   * @returns {string} String representing the margins as CSS style.
   */
  function toStyle () {
    return `${_.margins.top}mm ${_.margins.right}mm ${_.margins.bottom}mm ${_.margins.left}mm`
  }

  return {
    getWidth: innerWidth,
    getHeight: innerHeight,
    toStyle,

    /**
     * Updates the margin values on some sides.
     *
     * @method update
     * @memberof boken.Margins
     * @param {Object} margins Object containing the values for the sides that should be updated.
     */
    update (margins) {
      // Update margins and related style.
      _.margins = Object.assign(_.margins, margins)
      StyleInjector.update('.' + CLASS_NAMES.margins[side], {
        width: innerWidth() + 'mm',
        height: innerHeight() + 'mm',
        margin: toStyle()
      })
    }
  }
}
