#!/usr/bin/env node

var filePath = null;

const program = require("commander");
program.name("csv2ht");
program.option("--no-border", "don't set attribute border=1 to table element");
program.option("--utf8", "use utf8 encoding to read csv file");
program.option("--header", "use first row as header(th) cells");
program.arguments('<csvfile>').action(function(csvfile) {
    filePath = csvfile;
})
program.parse();

const options = program.opts();

var useHeaderCell = options.header;
var useUtf8 = options.utf8;
var border = options.border;

const csv = require('csv-parser')
const fs = require('fs')
const iconv = require('iconv-lite')
const results = [];

if (!fs.existsSync(filePath)) {
    console.log("csvfile is not found!");
    console.log("file:" + filePath);
    return;
}


var strm = fs.createReadStream(filePath);

if (!useUtf8) {
  strm = strm.pipe(iconv.decodeStream('Windows932'));
}

  strm.pipe(csv({headers: false}))
  .on('data', (data) => results.push(data))
  .on('end', () => {
      if (!border) {
        console.log("<table>");
      } else {
        console.log("<table border=1>");
      }

        for(var rc = 0; rc < results.length; rc++) {
            var output = "<tr>";
            var row = results[rc];
            var len = Object.keys(row).length;

            for(var i = 0; i < len; i++) {
                var cell = row[i];
                cell = cell.replace(/[\r\n]+/g,"<br>");
                var cellHtml = useHeaderCell ?  "<th>" + cell + "</th>" : "<td>" + cell + "</td>";
                output += cellHtml;
            }

            useHeaderCell = false;
            output += "</tr>";
            console.log(output);
        }
        console.log("</table>");
  });