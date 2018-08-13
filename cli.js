const commander = require('commander')
const {
  genSchemaFileAndMockData,
  genMockData,
  genSchemaFile
} = require('./index');

function run() {
  commander
    .version('0.0.1')
    .option('-f, --filepath <filepath>', 'filepath')
    .option('-o, --outdir <outdir>', 'outdir')
    .option('-t, --type <type>', 'type')
    .parse(process.argv)

  const filepath = commander.filepath
  const outdir = commander.outdir || process.cwd()
  const type = commander.type || 'all'

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
