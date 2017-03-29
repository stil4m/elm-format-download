#!/usr/bin/env node

const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');
const os = require('os');
const downloader = require('../lib/downloader');
const allowedPlatforms = ['win', 'mac', 'linux'];
const allowedElmVersions = ['0.16', '0.17', '0.18'];

// Should this be more?
const allowedVersions = [
    '0.6.0-alpha',
    '0.5.2-alpha',
    '0.5.1-alpha',
    '0.5.0-alpha',
    '0.4.0-alpha',
    '0.3.1-alpha',
    '0.3.0-alpha'
];

const optionDefinitions = [{
    name: 'target',
    alias: 't',
    type: String,
    description: 'A folder to store elm-format and the archive. Defaults to the location `./node_modules/elm-format-download/downloads`.'
}, {
    name: 'platform',
    alias: 'p',
    type: String,
    description: 'The plafform for which elm-format should be downloaded. Defaults to the system. The available options are win/linux/mac.'
}, {
    name: 'elm-version',
    alias: 'e',
    type: String,
    description: 'The version of Elm for which elm-format should be downloaded. Available options: 0.16/0.17/0.18.'
}, {
    name: 'version',
    alias: 'v',
    type: String,
    description: 'The version of elm-format that should be downloaded. Defaults to 0.6.0-alpha'
},{
  name: 'help',
  description: 'Print this usage guide.'
}];

const sections = [
  {
    header: 'elm-format-download',
    content: 'Download a specific version of elm-format'
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  }
]
const usage = getUsage(sections);
const options = commandLineArgs(optionDefinitions);
if (options.help) {
    console.log(usage);
    process.exit(0);
}

const config = {
    platform: options.platform || getDefaultPlatform(),
    target: options.target || (__dirname + '/../downloads'),
    elmVersion: options['elm-version'] || '0.18',
    version: options['version'] || '0.6.0-alpha',
};

validateConfigs(config);
downloader(config.platform, config.elmVersion, config.version, config.target);


function validateConfigs() {
    const failed = !validateConfig('elm-version', 'elmVersion', allowedElmVersions, config) ||
        !validateConfig('version', 'version', allowedVersions, config) ||
        !validateConfig('platform', 'platform', allowedPlatforms, config);

    if (failed) {
        process.exit(1);
    }
}

function validateConfig(userProp, prop, options, config) {
    var index = options.indexOf(config[prop]);

    if (index == -1) {
        console.log(userProp, ' is invalid. It should be one of:');
        console.log(options);
        return false;
    }
    return true;
}

function getDefaultPlatform() {
    const p = os.platform();
    if (p === 'darwin') {
        return 'mac';
    }
    if (p === 'linux') {
        return 'linux';
    }
    if (p.indexOf('win') !== -1) {
        return 'win';
    }
    return null;
}
