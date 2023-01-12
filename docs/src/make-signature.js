module.exports = (name, params) => {
  return `${name}(${params.map((d, i) => `${d.optional ? '[' : ''}${i > 0 ? ', ' : ''}${d.name}`)
        .join('')}${params.filter(d => d.optional).map(() => ']').join('')})`
}
