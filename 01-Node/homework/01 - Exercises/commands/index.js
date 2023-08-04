const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");
const { error } = require("console");
const { request } = require("http");

function pwd(print) {
    print(process.cwd())
}

function date(print) {
    const currentDate = Date();
    print(currentDate);
}

function echo(print, args) {
    print(args);
}

function ls(print) {
    fs.readdir(".", (error, files) => {
        if (error) throw Error (error);

        print(files.join(" "));
    });
    
}

function cat(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        if(error) {
            throw error;
        }
        print(data);
    });
  
}

function head(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        if(error) {
            throw error;
        }
    let lines = data.split("\n");
    print(lines[0])
    });
    
}

function tail(print, args) {
    fs.readFile(args, 'utf-8', (error, data) => {
        if(error) {
            throw error;
        }
        let lines = data.split("\n");
        print(lines[lines.length -1].trim())
    });
    
}

function curl(print, args) {
    utils.request(args, (error, res) => {
        if(error) throw new Error(error);
        print(res);
    })
}

module.exports = {
    pwd, date, echo, ls, cat, head, tail, curl,
};
