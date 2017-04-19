### Installation
yarn add bugzilla-jsonrpc

### Usage
```
const bugzilla = require('bugzilla-jsonrpc');

const bz=new bugzilla();

bz.init({"username":"chale","password":"","url":"https://bugzilla.redhat.com/jsonrpc.cgi"});

bz.get_bug(1381706).then(function(data){
  //  console.log(data);
});
const params=[{ "component": "Test","product":"Test" }];

bz.search(params).then(function(data){
    console.log(data);
});

```