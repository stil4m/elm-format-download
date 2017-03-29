var fs = require('fs');
var download = require('download');
var unzip = require('unzip');
var targz = require('tar.gz');


module.exports = function(platform, elmVersion, version, path) {
    var extension = platform === 'win' ? 'zip' : 'tgz';
    var chipset = platform === 'win' ? 'i386' : 'x64';
    var downloadFileName = "elm-format-" + elmVersion + "-" + version + "-" + platform + "-" + chipset + "." + extension;
    var downloadUrl = "https://github.com/avh4/elm-format/releases/download/" + version + "/" + downloadFileName;
    console.log(downloadUrl);
    console.log("Downloading: " + downloadFileName);
    download(downloadUrl, path).then(() => {
      if (platform === 'win') {
          fs.createReadStream(path + '/' + downloadFileName).pipe(unzip.Extract({ path: path }));
      } else {
          fs.createReadStream(path + '/' + downloadFileName).pipe(targz().createWriteStream(path));
      }
      console.log('done!');
      console.log('Elm format is located at:', path);
    });
}
