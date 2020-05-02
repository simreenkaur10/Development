let { view } = require("./commands/view")
let helping = require("./commands/help")
let {untreefy} = require("./commands/untreefy")
let {treefy} = require("./commands/treefy")
let input = process.argv;
// console.log(input);
let cmd = process.argv[2];
switch(cmd){
    case "view":
        view(process.argv[3],process.argv[4]);
        break;
        case "treefy":
        treefy(process.argv[3],process.argv[4]);
        break;
        case "untreefy":
        untreefy(process.argv[3],process.argv[4]);
        break;
        case "help":
        helping.help();
        break;
        default:
        console.log("wrong command")
        break;
}