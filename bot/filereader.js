const fs = require('fs');
let fileTitles = [];


const fileparser = (file) =>
{
    let exist = fs.existsSync(file)

    if(!exist) { console.log("Doesn't exist") }
    else
    {
        try
        {
            let data = fs.readFileSync(file);
            let parsedFile = JSON.parse(data);
            for(i = 0; i < parsedFile.length; i++)
            {
                fileTitles[i] = parsedFile[i].title;
            }
            return fileTitles;
        }
        catch(error)
        {
            let data = fs.readFileSync(file);
            if(data.length <= 0)
                {
                    fs.appendFileSync(file, "[]");
                    fileparser(file)
                }
        }
    }
}

exports.filereader = fileparser;
