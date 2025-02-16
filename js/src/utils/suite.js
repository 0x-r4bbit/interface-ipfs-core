'use strict'

function createSuite (tests, parent) {
  const suite = (createCommon, options) => {
    Object.keys(tests).forEach(t => {
      const opts = Object.assign({}, options)
      const suiteName = parent ? `${parent}.${t}` : t

      if (Array.isArray(opts.skip)) {
        const skip = opts.skip
          .map((s) => s && typeof s === 'object' ? s : { name: s })
          .find((s) => s.name === suiteName)

        if (skip) {
          opts.skip = skip
        }
      }

      if (Array.isArray(opts.only)) {
        if (opts.only.includes(suiteName)) {
          opts.only = true
        }
      }

      tests[t](createCommon, opts)
    })
  }

  return Object.assign(suite, tests)
}

module.exports.createSuite = createSuite
