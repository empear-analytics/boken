const hljs = require('highlight.js/lib/core');

module.exports = entry => {
    if (entry.examples.length > 0) {
        return hljs.highlight(entry.examples[0].description, {language: 'javascript'}).value
    }
}