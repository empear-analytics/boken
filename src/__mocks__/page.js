export default function () {
  return {
    addHeader: jest.fn(),
    addFooter: jest.fn(),

    // Just return a paragraph with one word less.
    addParagraph: paragraph => {
      const text = paragraph.text().split(' ').slice(1).join(' ').trim()
      return text === ''
        ? undefined
        : {
            text: () => text
          }
    }
  }
}
