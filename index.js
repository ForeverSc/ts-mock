const path = require('path')
const TJS = require('typescript-json-schema')
const JSF = require('json-schema-faker')
const commander = require('commander')
const { mkdirAndCreatFile } = require('./lib/util')

commander
  .version('0.0.1')
  .option('-f, --filepath <filepath>', 'filepath')
  .option('-o, --outdir <outdir>', 'outdir')
  .parse(process.argv)

const filepath = commander.filepath
const filename = path.basename(filepath, '.ts')
const outdir = commander.outdir || process.cwd()

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

function genMockData (filName, schema) {
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

genMockData(filepath, genSchemaFile(outdir, filename))

exports.genMockData = genMockData
exports.genSchemaFile = genSchemaFile
