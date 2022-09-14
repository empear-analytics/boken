export default function Paragraph (content) {
  const api = {}

  api.__test__ = {
    content: () => content
  }

  api.appendTo = () => api

  // Return a paragraph with one word less.
  api.calculateOverflow = () => Paragraph(content.split(' ').slice(1).join(' '))

  return api
}
