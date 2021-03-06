# wakanda-node


## About

### Wakanda

Wakanda is a Web Application platform that propose a sever at its core with a NoSQL Object JS/REST database engine, some HTTP services, a facultative front-end framework, and a development tool suite. It integrates nicely with third party frameworks and dev tools and is highly customisable.

To make its **Server-Side JavaScript** as most standard and compatible with Client-Side JavaScript as possible, [Wakanda](http://wakanda.org) has been mostly based on the native support of **CommonJS** and **HTML5 API on the server** like

* [W3C Blob](http://doc.wakanda.org/BLOB/BLOB.100-866245.en.html)
* [W3C FileSystem](http://doc.wakanda.org/Files-and-Folders/Files-and-Folders.100-588941.en.html)
* [W3C Web Sockets](http://doc.wakanda.org/WebSocket-Client/WebSocket-Client.100-1038292.en.html) (from Wakanda 9)
* [W3C Web Storage](http://doc.wakanda.org/Storage/Storage.100-941570.en.html)
* [W3C Web Workers](http://doc.wakanda.org/Web-Workers/Web-Workers.100-688487.en.html)
* [W3C XMLHttpRequest](http://doc.wakanda.org/XMLHttpRequest/XMLHttpRequest.100-867248.en.html)

but it still already support some **node.js API** including:

* [Assertion Testing](http://doc.wakanda.org/Unit-Testing/Unit-Testing.100-1019075.en.html)
* [Buffer](http://doc.wakanda.org/Buffer/Buffer.100-805374.en.html)
* [Crypto](http://doc.wakanda.org/Crypto/Crypto.100-1052580.en.html) (partial)
* [Events](http://doc.wakanda.org/Events/Events.100-967582.en.html)
* [Net](http://doc.wakanda.org/Net/Net.100-967781.en.html)
* [Process](http://doc.wakanda.org/Global-Application/Application/process.303-933138.en.html) (partial & partial documentation)
* [TLS](http://doc.wakanda.org/TLS-SSL/TLS-SSL.100-967962.en.html) (partial)

### wakanda-node

This [wakanka-node](https://github.com/AMorgaut/wakanda-node) package is meant to add more [node.js](http://nodejs.org) API support to [Wakanda Server](http://wakanda.org) to make more node.js modules compatible with Wakanda (and to also directly bring additionnal nice features for your own code).

This is mostly done using some **original node.js JavaScript source files** from its [official github repository](https://github.com/joyent/node/) (MIT licensed), but also includes some patches and polyfils to make Wakanda even more node compliant.

Current wakanda-node version is based on Wakanda 8 & node.js 0.11.13

## Additional Node.js API


This version of the package add the following API:

* [Globals](http://nodejs.org/api/globals.html) ([local node doc](./doc_node/globals.markdown)) (partial support)
	* **`global`** (ok)
* **[Os](http://nodejs.org/api/os.html)** ([local node doc](./doc_node/os.markdown)) (partial support)
	* used via the global `os` variable or via `require('os')`
	* works on MacOS, should work on Linux, not yet on Windows (in progress)
	* only miss `os.cpus()`, `os.freemem()`, and `os.uptime()`
* [Punycode](http://nodejs.org/api/punycode.html): ([local node doc](./doc_node/punycode.markdown)) (experimental)
	* used via `require('punnycode')` 
	* **unit tests: UNSTABLE** (fail first, then pass)
* **[Path](http://nodejs.org/api/path.html)** ([local node doc](./doc_node/path.markdown))
* [Process](http://nodejs.org/api/process.html) ([local node doc](./doc_node/process.markdown)) (partial support)
	* used via the global `process` variable
	* **`process.arch`** (ok)
	* **`process.platform`** (ok)
	* **`process.env`** (ok)
	* **`process.versions`** (partial, wakanda don't have all the same components)
	* **`process.binding`** (ok to load internal modules ported in JS, may also use `requireNative()` in the future)
* **[Query Strings](http://nodejs.org/api/querystring.html):** ([local node doc](./doc_node/querystring.markdown))
	* used via `require('querystring')`
	* **unit tests: PASSED**
* **[Url](http://nodejs.org/api/url.html):** ([local node doc](./doc_node/url.markdown))
	* used via `require('url')`
	* **unit tests: PASSED**
* **[Utilities](http://nodejs.org/api/util.html):** ([local node doc](./doc_node/util.markdown))
	* used via `require('util')`
	* **unit tests: PASSED**

## How to use

Once installed, just start your code with this simple line

```javascript
require('wakanda-node');
```

All code that will then be executed in this thread, either from the same file, included files, or modules loaded with `require()`), will have access to the additionnal Node.js API. 

If you call a dedicated or shared worker that need such additionnal node.js API, make sure to initialize them with this line too

__TIPS:__ 

This code be added to the **required.js** file at the [project](http://doc.wakanda.org/Architecture-of-Wakanda-Applications/Project.200-1022680.en.html#1022932) or [solution](http://doc.wakanda.org/Architecture-of-Wakanda-Applications/Solution.200-1022674.en.html#1022744) level to automatically initialise all of their Wakanda threads with **wakanda-node**


## Architecture

### [index.js](./index.js)

* Add *[lib_node](./lib_node)*  and *[lib](./lib)*  to the `require()` paths so it can find the additionnal core node modules
* Load polyfils for `global` and `process`

### [binding](./binding)

* Polyfils written in JS of [C node.js modules](https://github.com/joyent/node/tree/master/src) called from JavaScript via `process.binding(id)`

### [doc_node](./doc_node)

* Contains conform copies of some **node.js Markdown doc files** from the [**"doc/api"**](https://github.com/joyent/node/tree/master/doc/api) folder of its [official github repository](https://github.com/joyent/node/) 

### [lib](./lib)

* Polyfil files to extend current Wakanda support of some node.js API

### [lib_node](./lib_node)

* Contains conform copies of some **node.js JavaScript source files** from the [**"lib"**](https://github.com/joyent/node/tree/master/lib) folder of its [official github repository](https://github.com/joyent/node/) 

### [test](./test)

* Script used to launch the official node.js unit tests (see folder [test_node](#test_node))

### [test_node](./test_node)

* Contains conform copies of the  **node.js test suite files** from the [**"test"**](https://github.com/joyent/node/tree/master/test) folder of its [official github repository](https://github.com/joyent/node/) 

## What next?

### wakanda-node future

One of the goals of wakanda node (as is the one of Apache Cordova), is to become useless because of future full native node API support. In a perfect world such package would also make wakanda 100% node.js compliant, as perfect  polyfill. Unfortunatly few things can not be done that easily like `__filename`and `__dirname` (I'd recommend modules authors to use `module.filename` instead).

There is still few interestings things that could potentially be done in pure JS in this package

* integration of [String Decoder](http://nodejs.org/api/string_decoder.html), [Stream](http://nodejs.org/api/stream.html) (in progress)
* an alternative `require()` version to support `nodes_modules` folders and a node specific caching mechanism
* a [File System](http://nodejs.org/api/fs.html) (`fs`) polyfil via the Wakanda/W3C Filesystem API 
	* -> may also partially work client-side
* a [Child Processes](http://nodejs.org/api/child_process.html) (`child_process`) polyfil via the Wakanda/W3C Web Worker API
	* -> may also partially work client-side
* few more...

Might be interesting to see if [emscripten](https://github.com/kripken/emscripten) could convert some of the node.js C modules into some working JS ones, but I must confess I don't put much hope in that (worth at least a try for fun).

### wakanda future

In the meantime, the Wakanda team will probably add more node.js API support too.
It looks like the command line API is going to get better in Wakanda 9, potentially via more node.js `process` API support (`stdin`, `stdout`, `stderr`, and `env` ?)

## Contributions

Any contribution is welcome :-)

### Communication

If it looks interesting to you, don't hesitate to watch it, start it, and share it with your communities via twitter, G+, linkedin, facebook, your forums, mailing lists, or blog. The more people use it, the more I will be able to enhance it.

### Feedbacks

Please if you need it, or want to have fun, test it, use it, and [post me issues](https://github.com/AMorgaut/wakanda-node/issues), either to give your own implementation priorities (**feature requests**) or some **bug reports**.

Feel free to participate to the [wakanda-node community wiki](https://github.com/AMorgaut/wakanda-node/wiki) to share a **list of node modules you successfully used on wakanda**, with or without wakanda-node (some working without wakanda-node are already listed in the [Wakanda-Packages/wakanda-modules](https://github.com/Wakanda-Packages/wakanda-modules) github repository)

### Pull Requests

You know node.js, or wakanda, or JavaScript, or some of the internal libraries used by node (ares, uv, http_parser, ...)?
You can probably participate, make a fork, and [send Pull Requests](https://github.com/AMorgaut/wakanda-node/pulls). Please consider creating dedicated branches, integrating unit tests and documentation, by I still will look at anything you'll submit (as long as it is pertinent). **By sending "Pull Requests", you give permissions to use your code under the wakanda-node MIT License.**



## License

Copyright (c) 2014 Alexandre Morgaut

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.