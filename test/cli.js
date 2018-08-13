const assert = require('assert')
const { describe, it } = require('mocha')
const { exec } = require('child_process')
const fs = require('fs')

describe('run cli', function () {
  it('ts-mock -f test -o out', function (done) {
    exec('ts-mock -f test -o out', function (error) {
      if (error) {
        throw error
      }
      const outDir = fs.readdirSync('out')

      assert.ok(outDir)
      assert.ok(outDir.length === 2)
      assert.ok(outDir.includes('mock'))
      assert.ok(outDir.includes('schema'))

      const mockDir = fs.readdirSync('out/mock')
      assert.ok(mockDir.includes('test.json'))

      const schemaDir = fs.readdirSync('out/schema')
      assert.ok(schemaDir.includes('test-schema.json'))
      done()
    })
  })
})
