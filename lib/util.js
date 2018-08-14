const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

exports.readJSONFile = function readJSONFile(filepath) {
  const fileContentStr = fs.readFileSync(path.resolve(filepath), 'utf-8')

  try {
    return JSON.parse(fileContentStr)
  } catch (error) {
    throw error;
  }
}

exports.mkdirAndCreatFile = function mkdirAndCreatFile (outDirName, fileName, fileData) {
  const outDir = path.resolve(outDirName)

  if (!fs.existsSync(outDir)) {
    mkdirp.sync(outDir)
    console.log(`---create ${outDirName} dir---`)
    console.log(`outDir:` + outDir)
  }

  const outFilePath = outDir + `/${fileName}.json`
  fs.writeFile(outFilePath, JSON.stringify(fileData, null, 2), function (error) {
    if (error) throw error
    console.log(`---write ${fileName} complete---`)
    console.log(`outJSON: ${fileName}.json`)
  })
}