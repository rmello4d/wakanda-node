﻿require('wakanda-node');API = [    'os',    //    'punycode', // fail    'querystring',     'url',     'util']API.forEach(function(api) {    try {        require('../test_node/simple/test-' + api);        console.info('PASSED - ' + api);    }    catch (e) {        console.error('FAILED - ' + api, e);    }});console.content;