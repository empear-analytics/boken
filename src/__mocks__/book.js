import Margins from './margins'

export default function () {
  let numPages = 4

  return {
    pages: {
      all: {
        length: 4
      }
    },
    leftPageMargins: () => Margins('left'),
    rightPageMargins: () => Margins('right'),
    header: () => () => '<div>HEADER</div>',
    footer: () => () => '<div>FOOTER</div>',
    addPage: () => numPages++,
    numberOfPages: () => numPages,
    height: () => 10
  }
}
