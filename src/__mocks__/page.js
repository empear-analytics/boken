export default function () {
  return {
    addHeader: jest.fn(),
    addFooter: jest.fn(),

    // Just return a paragraph with one word less.
    addParagraph: paragraph => {
      const content = paragraph.__test__.content().split(' ').slice(1).join(' ').trim()
      return content === ''
        ? undefined
        : { __test__: { content: () => content } }
    },
    addMarginNote: marginNote => {
      document.body.innerHTML = marginNote.__test__.content()
    }
  }
}
