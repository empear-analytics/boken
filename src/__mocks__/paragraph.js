export default function Paragraph (text) {
  const api = {}

  api.text = () => text

  api.appendTo = () => api

  // Return a paragraph with one word less.
  api.calculateOverflow = () => Paragraph(text.split(' ').slice(1).join(' '))

  return api
}
