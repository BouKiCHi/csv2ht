# csv2ht

csv2ht is a program to convert CSV to HTML table.

## Installation
```sh
npm install -g csv2ht
```

## Usage

```
Usage: csv2ht [options] <csvfile>

Options:
  --no-border  don't set attribute border=1 to table element
  --utf8       use utf8 encoding to read csv file
  --header     use first row as header(th) cells
```

## Example

```sh
csv2ht data.csv > table.html
```

