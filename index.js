#!/usr/bin/env node

var filePath = null;

const program = require("commander");
program.name("csv2ht");
program.option("--head", "use first row as th cells");
program.arguments('<csvfile>').action(function(csvfile) {
    filePath = csvfile;
})
program.parse();

const options = program.opts();

var useHeaderCell = options.head;

const csv = require('csv-parser')
const fs = require('fs')
const results = [];

if (!fs.existsSync(filePath)) {
    console.log("csvfile is not found!");
    console.log("file:" + filePath);
    return;
}


fs.createReadStream(filePath)
  .pipe(csv({headers: false}))
  .on('data', (data) => results.push(data))
  .on('end', () => {
        console.log("<table>");

        for(var rc = 0; rc < results.length; rc++) {
            var output = "<tr>";
            var row = results[rc];
            var len = Object.keys(row).length;

            for(var i = 0; i < len; i++) {
                var cell = useHeaderCell ?  "<th>" + row[i] + "</th>" : "<td>" + row[i] + "</td>";
                output += cell;
            }
            useHeaderCell = false;
            output += "</tr>";
            console.log(output);
        }
        console.log("</table>");
  });