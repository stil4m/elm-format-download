# elm-format-download

Simple downloader for the elm-format binaries

## How to use:

Install with:

```
npm install --save elm-format-download
```

To download `elm-format` execute the following command:

```
./node_modules/.bin/elm-format-download
```

The executable will be located at:

```
$CWD/node_modules/elm-format-download/downloads/elm-format
```

## Options

* `--target` / `-t`: Set other location to save the executable.
* `--platform` / `-p`: The operating system for which `elm-format` should be downloaded.
* `--elm-version` / `-e`: The version of elm for which `elm-format` should be targeted.
* `--version` / `-v`: The version of `elm-format` itself.
* `--help`: Shows the help dialog.
