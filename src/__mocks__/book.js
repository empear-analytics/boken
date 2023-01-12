import Margins from './margins'

export default function () {
  let numPages = 4

  return {
    addPage: () => numPages++,
    numberOfPages: () => numPages,
    margins: {
      leftPage: () => Margins(),
      rightPage: () => Margins()
    },
    height: () => 10,
    header: () => () => '<div>HEADER</div>',
    footer: () => () => '<div>FOOTER</div>'
  }
}
