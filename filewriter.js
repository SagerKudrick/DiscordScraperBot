const fs = require('fs');
const { filereader } = require('./filereader')
const filewriter = (file, newdata) =>
{
    filereader(file)
    // "all.json"
    let data = fs.readFileSync(file)

    if(data <= 0)
    {
        console.log("No/empty file. Creating it")
        fs.appendFileSync(file, "[]");
        filewriter(file, newdata)
    }
    else
    {
        var parsedFile = JSON.parse(data);
        parsedFile.push(newdata);
        fs.writeFileSync(file, JSON.stringify(parsedFile))
    }
}

exports.filewriter = filewriter;
