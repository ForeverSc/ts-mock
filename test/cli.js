const assert = require('assert')
const { describe, it } = require('mocha')
const { exec } = require('child_process')
const fs = require('fs')

describe('run cli', function () {
  it('ts-mock -f test/interface -o test/out', function (done) {
    exec('ts-mock -f test/interface -o test/out', function (error) {
      if (error) {
        throw error
      }
      const outDir = fs.readdirSync('test/out')

      assert.ok(outDir)
      assert.ok(outDir.length === 2)
      assert.ok(outDir.includes('mock'))
      assert.ok(outDir.includes('schema'))

      const mockDir = fs.readdirSync('test/out/mock')
      assert.ok(mockDir.includes('interface.json'))

      const schemaDir = fs.readdirSync('test/out/schema')
      assert.ok(schemaDir.includes('interface-schema.json'))
      done()
    })
  })
})
