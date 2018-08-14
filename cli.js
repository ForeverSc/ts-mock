const commander = require('commander')
const {
  genSchemaFileAndMockData,
  genMockData,
  genSchemaFile,
  genMockDataByExistSchemaFile
} = require('./index');

function run() {
  commander
    .version('0.0.1')
    .option('-f, --filepath <filepath>', 'filepath')
    .option('-o, --outdir <outdir>', 'outdir | mean outpath when gj')
    .option('-t, --type <type>', 'generate types: all | schema | mock')
    .option('-g, --genJson', 'generate json by exist schema')
    .parse(process.argv)

  const filepath = commander.filepath
  const outdir = commander.outdir || process.cwd()
  const type = commander.type || 'all'

  if (commander.genJson) {
    genMockDataByExistSchemaFile(filepath, outdir)
    return
  }

  switch (type) {
    case 'all':
      genSchemaFileAndMockData(filepath, outdir)
      break;
    case 'schema':
      genSchemaFile(filepath, outdir)
      break;
    case 'mock':
      genMockData(filepath, outdir, genSchemaFile(filepath, outdir, false))
      break;
    default:
      genSchemaFileAndMockData(filepath, outdir)
      break;
  }
}

exports.run = run
