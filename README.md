# Typescript Mock
a tool to generate mock json data by typescript interface file

# Install
```
npm i -D ts-mock
```

# Usage
## Basic
```
ts-mock -f test -o out
```

test.ts
``` ts
interface Test {
  name: string;
  age: number;
}
```

Will generate schema file in `out/schema`

test-schema.json
``` json
{
  "Test": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "age": {
        "type": "number"
      }
    },
    "required": [
      "age",
      "name"
    ]
  }
}
```

And generate mock data from schema file in `out/mock`

test.json
``` json
{
  "Test": {
    "age": -66275044.7116502,
    "name": "quis commodo occaecat"
  }
}
```

## Generate JSON File With Exist Schema File
```
ts-mock -g -f test/out/schema/interface-schema.json -o test/out/mock/interface.json
```

# Commands
```
Usage: ts-mock [options]

  Options:

    -V, --version              output the version number
    -f, --filepath <filepath>  filepath
    -o, --outdir <outdir>      outdir | mean outpath when gj
    -t, --type <type>          generate types: all | schema | mock
    -g, --genJson              generate json by exist schema
    -h, --help                 output usage informationnformation
```