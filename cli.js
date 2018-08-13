const commander = require('commander')
const { genSchemaFileAndMockData } = require('./index');

function run(params) {
  commander
    .version('0.0.1')
    .option('-f, --filepath <filepath>', 'filepath')
    .option('-o, --outdir <outdir>', 'outdir')
    .parse(process.argv)

  const filepath = commander.filepath
  const outdir = commander.outdir || process.cwd()

  genSchemaFileAndMockData(filepath, outdir)
}

exports.run = run
