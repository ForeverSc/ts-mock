# Typescript Mock
a tool to generage mock json data by typescript interface file

# Install
```
npm i -D ts-mock
```

# Use
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