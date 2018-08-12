const fs = require('fs')
const { resolve } = require('path')
const mkdirp = require('mkdirp')

function mkdirAndCreatFile (outDirName, fileName, fileData) {
  const outDir = resolve(outDirName)

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

exports.mkdirAndCreatFile = mkdirAndCreatFile
