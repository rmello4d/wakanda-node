﻿var os = global.os;

var hw, hwLabels;
var EOL = os.isWindows ? '\r\n' : '\n'; 

function getHw() {
    var hwStr;
    if (!hw) {
        hwStr = SystemWorker.exec('sysctl -a').output.toString();
        hw = {};
        hwStr.split(EOL).forEach(function (line) {
            line = line.split(' = ');
            if (!hwLabels[line[0]]) return;
            hw[hwLabels[line[0]]] = line[1];
        });
    }
    return hw;
}

hwLabels = {
    'kern.ostype': 'type',
    'kern.osrelease': 'release',
    'kern.osrevision': 'revision',
    'kern.hostname': 'hostname',
    'hw.memsize': 'totalmem',
    'hw.byteorder': 'byteorder'
};


exports.getOSType = function getOSType() {
    // Returns the operating system name.
    return getHw().type;
};

exports.getOSRelease = function getOSRelease() {
    // Returns the operating system release.
    return getHw().release;
};

exports.getHostname = function getHostname() {
    // Returns the hostname of the operating system.
    return getHw().hostname;
};

exports.getTotalMem = function getTotalMem() {
    // Returns the total amount of system memory in bytes.
    return getHw().totalmem;
};

exports.getEndianness = function getEndianness() {
    // TBD
    // Returns the endianness of the CPU. Possible values are "BE" or "LE".
    return getHw().byteorder === '1234' ? 'LE' : 'BE';
};

exports.getLoadAvg = function getLoadAvg() {
    
//    Returns an array containing the 1, 5, and 15 minute load averages.
//    The load average is a measure of system activity, calculated by the operating system and expressed as a fractional number. 
//    As a rule of thumb, the load average should ideally be less than the number of logical CPUs in the system.
//    The load average is a very UNIX-y concept; there is no real equivalent on Windows platforms. 
//    That is why this function always returns [0, 0, 0] on Windows.
    
    if (os.isWindows) return [0, 0, 0];

    var result = SystemWorker.exec('/usr/sbin/iostat -n0').output.toString();
    var detail = result.split(EOL)[2].replace(/\s+/g,' ').trim().split(' ');
    var data = {
        //user: parseInt(detail[0]),
        //system: parseInt(detail[1]),
        //idle: parseInt(detail[2]),
        one_mn: parseFloat(detail[3]),
        five_mn: parseFloat(detail[4]),
        fifteen_mn: parseFloat(detail[5])
    };

    return [data.one_mn, data.five_mn, data.fifteen_mn];
};


exports.getUptime = function getUptime() {
    // TBD
    // Returns the system uptime in seconds.
    return SystemWorker.exec('uptime').output.toString();
};

exports.getFreeMem = function getFreeMem() {
    // TBD
    // Returns the amount of free system memory in bytes.
    return;
};

exports.getCPUs = function getCPUs() {
    // TBD
    return [];
};

exports.getInterfaceAddresses = os.networkInterfaces;


global.os = require('os');

global.os.isWindows = os.isWindows;
global.os.isMac = os.isMac;
global.os.isLinux = os.isLinux;