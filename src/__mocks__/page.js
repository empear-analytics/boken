export default function () {
  return {
    addHeader: jest.fn(),
    addFooter: jest.fn(),

    // Just return a paragraph with one word less.
    addParagraph: paragraph => {
      const content = paragraph.content().split(' ').slice(1).join(' ').trim()
      return content === ''
        ? undefined
        : { content: () => content }
    }
  }
}
