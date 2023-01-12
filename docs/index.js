const pug = require('pug')
const sass = require('node-sass')
const fs = require('fs')
const hljs = require('highlight.js/lib/core')
const parseEntry = require('./src/parse-entry')

// Register highlight languages.
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

(async () => {
  // Imports.
  const documentation = await import('documentation')

  // Compile style.
  console.log('Compiling style')
  const style = sass.renderSync({
    file: './docs/styles/index.scss',
    outputStyle: 'compressed'
  }).css.toString()

  // Parse code docstrings.
  console.log('Parsing docstrings.')
  const root = await documentation.build([
    './src/index.js'
  ], {})

  // Build API docs.
  console.log('Building API content')
  const docs = root[0].members.static
    .map(parseEntry)

  // Build menu.
  console.log('Building the menu')
  const menu = docs.map(entry => ({
    name: entry.name,
    members: [entry].concat(entry.members)
      .map(({ index, signature }) => ({ index, signature }))
      .sort((a, b) => a.index.localeCompare(b.index))
  }))

  // Build search list.
  console.log('Building the search list')
  const searchList = menu.reduce((arr, section) => arr.concat(section.members.map(d => d.index)), [])

  // Build API.
  const api = docs.map(d => [d, ...d.members]).flat()
    .sort((a, b) => a.index.localeCompare(b.index))

  // Compile index template.
  console.log('Compiling the template')
  const template = pug.compileFile('./docs/templates/index.pug', {})
  const page = template({
    // TODO Add demo page
    api,
    menu,
    style,
    name: 'boken',
    searchList: JSON.stringify(searchList),
    gitHubBanner: fs.readFileSync('./docs/templates/github-banner.html', { encoding: 'utf-8' }),
    install: {
      browser: hljs.highlight('<script type="text/javascript" src="boken.min.js"></script>', { language: 'xml' })
        .value,
      node: hljs.highlight('npm install --save boken', { language: 'bash' }).value
    }
  })

  // Save final page.
  fs.writeFileSync('./docs/index.html', page)
})()
