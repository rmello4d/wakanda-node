﻿/**
 * @class Process
 * @see http://nodejs.org/api/process.html
 **/

/**
 * @experimental not implemented
 * @property argv
 * @type {Array}
 * @see http://nodejs.org/api/process.html#process_process_argv
 **/
if (!process.argv) {
    Object.defineProperty(process, 'argv', {
        get: function process_argv_getter() {
            var argv, cmd, line, path;
            argv = [];
            if (os.isWindows) {
                return argv;
            }
            cmd = 'ps xuwww -p ' + process.pid;
            line = SystemWorker.exec(cmd).output.toString().split(os.EOL).pop();
            path = line.trim().split(' ').pop();
            argv.push(path);
            return argv;
        },
        enumerable: true
    });
}


/**
 * @property binding
 * @type {Object}
 * @see http://nodejs.org/api/process.html#process_process_binding
 **/
process.binding = function binding(id) {
    return require('../binding/' + id);
};


/**
 * @experimental
 * @property platform
 * @type {string}
 * @see http://nodejs.org/api/process.html#process_process_platform
 **/
 Object.defineProperty(process, 'platform', {
    // Wakanda makes no difference between freebsd, linux and sunos
    // sunos probably not supported 
    // diff between linux and freebsd should be checked via SystemWorker.exec()
    get: function process_platform_getter() {
        return os.isWindows ? 'win32' : (os.isMac ? 'darwin' : 'freebsd');
    }
});


/**
 * An object containing the user environment. See environ(7).
 *
 * @property platform
 * @type {string}
 * @see http://nodejs.org/api/process.html#process_process_env
 **/
 if (!process.env) {
    Object.defineProperty(process, 'env', {
        get: function process_env_getter() {
            var env = {};
            var os = require('os');
            var cmd = os.isWindows ? 'cmd set' : '/usr/bin/env';
            SystemWorker.exec(cmd).output.toString().split(os.EOL).forEach(function parseEnvVariable(line) {
                var parts = line.split('=');
                if (!parts.length) return;
                env[parts[0]] = parts[1];
            });
            return env;
        },
        enumerable: true
    });
}


/**
 * @experimental not implemented
 * @property execArgv
 * @type {Array}
 * @see http://nodejs.org/api/process.html#process_process_execArgv
 **/
process.execArgv = process.execArgv || [];


/**
 * What processor architecture you're running on: 'arm', 'ia32', or 'x64'.
 *
 * @experimental no arm support - no windows support
 * @property arch
 * @type {Array}
 * @see http://nodejs.org/api/process.html#process_process_arch
 **/
function process_arch_getter() {
    var arch;
    var cmd = os.isWindows ? 'uname -a' : 'NOT IMPLEMENTED';
    arch = SystemWorker.exec(cmd).output.toString().split(' ').pop();
    arch = arch.indexOf('_64') ? 'x64' : 'x32';
    return arch;
}

if (!process.arch) {
    Object.defineProperty(process, 'arch', {
        get: process_arch_getter,
        enumerable: true
    });
}


/**
 * @experimental this is just a hack, not a real implementation
 * @method nextTick
 * @param {function} callback
 * @see http://nodejs.org/api/process.html#process_process_nexttick_callback
 **/
process.nextTick = function nextTick(callback) {
    setTimeOut(callback, 0);
};


/**
 * @property versions
 * @type {Object}
 * @experimental this is just a hack, not a real implementation
 * @todo change static values for dynamic ones?
 * @see http://nodejs.org/api/process.html#process_process_versions
 * @see https://github.com/Wakanda/core-Wakanda/wiki/branches
 **/
var wakandaVersion = process.version.split(' ').pop();
var majorVersion = wakandaVersion.split('.').shift();
process.versions = {
    openssl: ({
        '8': '1.0.0d',
        '7': '1.0.0d',
        '6': '1.0.0d',
        '5': '1.0.0d',
        '4': '1.0.0d',
        '3': '1.0.0d',
        '2': '1.0.0d'
    })[majorVersion],
    zlib: ({
        '8': '1.2.5',
        '7': '1.2.5',
        '6': '1.2.5',
        '5': '1.2.5',
        '4': '1.2.5',
        '3': '1.2.5',
        '2': '1.2.5'
    })[majorVersion],
    // NODE SPECIFIC - version numbers match to the expected API version support
    //http_parser: '1.0',
    node: '0.10.12',
    // v8: '3.14.5.9', 
    //ares: '1.9.0-DEV',
    //uv: '0.10.11',
    //modules: '11',
    // WAKANDA SPECIFIC
    wakanda: wakandaVersion,
    webkit: ({
        '8': '534.53',
        '7': '534.53.W7',
        '6': '534.53',
        '5': '534.53.W5',
        '4': '534.53.W4',
        '3': '534.53',
        '2': '534.53'
    })[majorVersion],
    curl: ({
        '8': '7.19.7',
        '7': '7.19.7',
        '6': '7.19.7',
        '5': '7.19.7',
        '4': '7.19.7',
        '3': '7.19.7',
        '2': '7.19.7'
    })[majorVersion],
    icu: ({
        '8': '4.8',
        '7': '4.8',
        '6': '4.8',
        '5': '4.8',
        '4': '4.8',
        '3': '4.8',
        '2': '4.8'
    })[majorVersion],
    libzip: ({
        '8': '0.10',
        '7': '0.10',
        '6': '0.10',
        '5': '0.10',
        '4': '0.10',
        '3': '0.10',
        '2': '0.10'
    })[majorVersion],
    xerces: ({
        '8': '3.0.1',
        '7': '3.0.1',
        '6': '3.0.1',
        '5': '3.0.1',
        '4': '3.0.1',
        '3': '3.0.1',
        '2': '3.0.1'
    })[majorVersion]
};
if (os.isWindows) {
    process.versions.pthreads = ({
        '8': '2.9.1',
        '7': '2.9.1',
        '6': '2.9.1',
        '5': '2.9.1',
        '4': '2.9.1',
        '3': '2.9.1',
        '2': '2.8.0'
    })[majorVersion]
}


/**
 * @property config
 * @type {Object}
 * @experimental this is just a hack, not a real implementation
 * @todo change static values for dynamic ones?
 * @see http://nodejs.org/api/process.html#process_process_config
 **/
process.config = {};
Object.defineProperty(process.config.variables,  'host_arch',  {
    get: process_arch_getter,
    enumerable: true
});
Object.defineProperty(process.config.variables,  'target_arch',  {
    get: process_arch_getter,
    enumerable: true
});


/***************************************************************************/
/*                 LOW LEVEL API USED BY "src/node.js"                     */
/***************************************************************************/

// -> NativeModule.require()
process.moduleLoadList = [];

// -> startup()
// Not null If User passed '-e' or '--eval' arguments to Node.
process._eval = null;

// -> startup()
// Not null If -i or --interactive were passed, or stdin is a TTY.
process._forceRepl = null;

// -> startup.processNextTick()
Process._needTickCallback = function(){};
process._tickInfoBox = {};

// -> startup.processNextTick() -> evalScript()
process._print_eval = false;



// -> startup.processKillAndExit()
var LINUX_SIGNALS = {
    1:	 'HUP', // (hang up)
    2:	 'INT', // (interrupt)
    3:	 'QUIT', // (quit)
    6:	 'ABRT', // (abort)
    9:	 'KILL', // (non-catchable, non-ignorable kill)
    14:	 'ALRM', // (alarm clock)
    15:	 'TERM' // (software termination signal)
};
process._errno = 0;
    
/**
 * @method process.kill
 * @param {number} pid process id
 * @param {string} signal string describing the signal to send
 * @returns mixed
 *
 * @see http://nodejs.org/api/process.html#process_process_kill_pid_signal
 * @see http://nodejs.org/api/process.html#process_signal_events
 **/
process._kill = function process_kill(pid, signal) {
    var
        cmd,
        cmdSignal,
        result;

    process._errno = 0;

    if (os.isWindows) {
        throw new Error('kill() is not yet implemented on Windows');
    }
    
    cmdSignal = constants[signal];
    if (!cmdSignal || !LINUX_SIGNALS.hasOwnProperty(cmdSignal)) {
        throw new Error('signal "' + signal + '" is not supported by process.kill()');
    }
    
    pid = Number(pid);
    cmd = 'kill -' + cmdSignal + ' ' + pid;
    result = SystemWorker.exec(cmd).output.toString();
};