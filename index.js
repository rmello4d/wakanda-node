﻿var BASE_PATH = File(module.filename).parent.path;// add a path to require to find raw node modulesrequire.paths.push(BASE_PATH + 'lib_node/');// add a path to require to find patched node modulesrequire.paths.push(BASE_PATH + 'lib/');// autoload global related APIsrequire('./lib/global');require('./lib/process');