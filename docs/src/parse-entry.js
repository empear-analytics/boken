const DescParser = require('./desc-parser')
const ParamParser = require('./param-parser')
const TypeParser = require('./type-parser')
const ThrowsParser = require('./throws-parser')
const hljs = require("highlight.js/lib/core");


module.exports = function parseEntry (entry) {
    const name = ((entry.memberof ? entry.memberof + '.' : '') + entry.name).split('.').slice(1).join('.')
    const params = entry.params.map(ParamParser)
    const throws = entry.throws.map(ThrowsParser)

    return {
        name,
        index: name.replace(/\./g, '-') + '--' + params.map(d => d.name).join('-'),
        signature: `${name}(${params.map((d, i) => `${d.optional ? '[' : ''}${i > 0 ? ', ' : ''}${d.name}`)
            .join('')}${params.filter(d => d.optional).map(() => ']').join('')})`,
        desc: DescParser(entry),
        params: params.length > 0 ? params : undefined,
        returns: (() => {
            let ret = entry.returns[0]
            return ret && {
                desc: DescParser(ret),
                type: TypeParser(ret.type)
            }
        })(),
        throws: throws.length > 0 ? throws : undefined,
        examples: entry.examples.length > 0
            ? hljs.highlight(entry.examples[0].description, {language: 'javascript'}).value
            : undefined,
        members: entry.members.static ? entry.members.static.map(parseEntry) : undefined
    }
}
