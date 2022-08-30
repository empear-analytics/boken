const DescParser = require("./desc-parser");
const TypeParser = require("./type-parser");

module.exports = entry => {
    let ret = entry.returns[0]
    return ret && {
        desc: DescParser(ret),
        type: TypeParser(ret.type)
    }
}
