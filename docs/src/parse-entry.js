const DescParser = require('./desc-parser')
const ParamParser = require('./param-parser')
const ThrowsParser = require('./throws-parser')
const parseReturns = require('./parse-returns')
const parseExamples = require('./parse-examples')
const makeSignature = require('./make-signature')


module.exports = function parseEntry(entry) {
    const name = ((entry.memberof ? entry.memberof + '.' : '') + entry.name).split('.').slice(1).join('.')
    const params = entry.params.map(ParamParser)
    const throws = entry.throws.map(ThrowsParser)

    return {
        name,
        index: name.replace(/\./g, '-') + '--' + params.map(d => d.name).join('-'),
        signature: makeSignature(name, params),
        desc: DescParser(entry),
        params: params.length > 0 ? params : undefined,
        returns: parseReturns(entry),
        throws: throws.length > 0 ? throws : undefined,
        examples: parseExamples(entry),
        members: entry.members.static ? entry.members.static.map(parseEntry) : undefined
    }
}
