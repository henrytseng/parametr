# parametr
A parameter management utility.

[![Build Status](https://travis-ci.org/henrytseng/parametr.svg?branch=master)](https://travis-ci.org/henrytseng/parametr)

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

The API is designed around a decorator pattern and includes chainable methods to define constructs.  `parametr` does not mutate objects.  

### Required properties

```
params(myconfig).require('abc')
```

A property which is required will throw errors when they are missing.  All `required` properties are also `permitted`.  

### Permitted properties

```
params(myconfig).permit('abc')
```

Any properties which are permitted will be picked and all other properties omitted.  



