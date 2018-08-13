const path = require('path')
const TJS = require('typescript-json-schema')
const JSF = require('json-schema-faker')
const { mkdirAndCreatFile } = require('./lib/util')

function genSchemaFromTs (tsFilePath) {
  const settings = {
    required: true
  }

  const compilerOptions = {
    strictNullChecks: true
  }

  const basePath = process.cwd()

  const program = TJS.getProgramFromFiles([path.resolve(tsFilePath)], compilerOptions, basePath)

  const generator = TJS.buildGenerator(program, settings)
  const symbols = generator.getUserSymbols()
  const schema = generator.getSchemaForSymbols(symbols)

  return schema
}

function genMockData (filName, outdir, schema) {
  return new Promise((resolve, reject) => {
    JSF.resolve(schema.definitions).then(function (object) {
      resolve(object)
      mkdirAndCreatFile(path.resolve(outdir, 'mock'), filName, object)
    })
  })
}

function genSchemaFile (outdir, filename) {
  const schema = genSchemaFromTs(`${filename}.ts`)

  mkdirAndCreatFile(path.resolve(outdir, 'schema'), `${filename}-schema`, schema.definitions)

  return schema
}

function genSchemaFileAndMockData(filepath, outdir) {
  const filename = path.basename(filepath, '.ts')

  genMockData(filepath, outdir, genSchemaFile(outdir, filename))
}

exports.genSchemaFileAndMockData = genSchemaFileAndMockData
exports.genMockData = genMockData
exports.genSchemaFile = genSchemaFile
