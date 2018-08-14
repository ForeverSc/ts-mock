const path = require('path')
const TJS = require('typescript-json-schema')
const JSF = require('json-schema-faker')
const { mkdirAndCreatFile, readJSONFile } = require('./lib/util')

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

function genMockData (filepath, outdir, schema) {
  return new Promise((resolve, reject) => {
    JSF.resolve(schema.definitions).then(function (object) {
      resolve(object)
      const filename = path.basename(filepath, '.ts')
      mkdirAndCreatFile(path.resolve(outdir, 'mock'), filename, object)
    })
  })
}

function genSchemaFile (filepath, outdir, isCreateSchema = true) {
  const filename = path.basename(filepath, '.ts')
  const schema = genSchemaFromTs(filepath)

  if (isCreateSchema) {
    mkdirAndCreatFile(
      path.resolve(outdir, 'schema'),
      `${filename}-schema`,
      schema.definitions
    )
  }

  return schema
}

function genSchemaFileAndMockData(filepath, outdir) {
  genMockData(filepath, outdir, genSchemaFile(filepath, outdir))
}

function genMockDataByExistSchemaFile(existSchemaFilepath, outPath) {
    const schema = readJSONFile(existSchemaFilepath)

    JSF.resolve(schema).then(function (object) {
      const outFileName = path.basename(outPath, '.json')
      const outdir = path.dirname(outPath)

      mkdirAndCreatFile(path.resolve(outdir), outFileName, object)
    })
}

exports.genSchemaFileAndMockData = genSchemaFileAndMockData
exports.genMockData = genMockData
exports.genSchemaFile = genSchemaFile
exports.genMockDataByExistSchemaFile = genMockDataByExistSchemaFile
