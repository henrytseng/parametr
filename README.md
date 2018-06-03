# parametr
A parameter management utility.

This utility allows you to quickly validate and sanitize a configuration Object.  



## Installation

Using npm:

```
$ npm i --save parametr
```



## Usage

In Node.js

```
const params = require('parametr');

var exampleConfig = { 
	cipherKey: 'abcdefg', 
	hostname: 'xyz.com',
	seedValue: '12345'
};

var safeConfig = params(exampleConfig)
      .require('cipherKey')
      .permit('hostname');
      
// { cipherKey: 'abcdefg', hostname: 'xyz.com' }
```



