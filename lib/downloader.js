var fs = require('fs');
var download = require('download');
var unzip = require('unzip');
var targz = require('tar.gz');


module.exports = function(platform, elmVersion, version, path) {
    var extension = platform === 'win' ? 'zip' : 'tgz';
    var downloadFileName = "elm-format-" + elmVersion + "-" + version + "-" + platform + "-x64." + extension;
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
