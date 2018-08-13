# Typescript Mock
a tool to generage mock json data by typescript interface file

# Install
```
npm i -D ts-mock
```

# Usage
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

# Commands
```
 Usage: ts-mock [options]

  Options:

    -V, --version              output the version number
    -f, --filepath <filepath>  filepath
    -o, --outdir <outdir>      outdir
    -t, --type <type>          type: all | schema | json
    -h, --help                 output usage information
```