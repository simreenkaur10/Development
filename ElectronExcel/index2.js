const $ = require("jquery");
const dialog = require("electron").remote.dialog;
let fs = require("fs");
$(document).ready(
    function(){
        let db;
$("#grid .cell").on("click",function(){
    let rid = Number($(this).attr("rid"));
    let cid = Number($(this).attr("cid"));
    let cellObject = db[rid][cid];
    $("#formula-bar").val(cellObject.formula);
    cid = String.fromCharCode(cid + 65);
    $("#cell-address").val( cid + ( rid + 1 ) );
})

$(".menu").on("click",function(){
    $(".menu-options").removeClass("selected");
    let id = $(this).attr("id");
    $(`#${id}-menu-options`).addClass("selected");
})

$("#new").on("click",function(){
db = [];
let rows = $(".row");
for(let i =0;i<rows.length;i++){
    let row = []
    let cells = $(rows[i]).find(".cell");
    for(let j = 0; j<cells.length;j++){
        $(cells[j]).html("");
        let cell = {
                    val : "",
                    formula : "",
                    children : [],
                    parents :[]
                }
        row.push(cell);
    }
    db.push(row);
}
})
$("#open").on("click",function(){
    let path = dialog.showOpenDialogSync();
    let content = fs.readFileSync(path[0]);
    let dbs = JSON.parse(content);
    let rows = $(".row");
    for(let i =0;i<rows.length;i++){
        let cols = $(rows[i]).find(".cell");
        for(let j =0 ;j<cols.length;j++){
            $(cols[j]).html(dbs[i][j]);
        }
    }
})
$("#save").on("click",function(){
    let path = dialog.showSaveDialogSync();
    fs.writeFileSync(path,JSON.stringify(db));
})
$("#grid .cell").on("blur",function(){
    let rid = Number($(this).attr("rid"));
    let cid = Number($(this).attr("cid"));
    let value = $(this).html();
    if(value==db[rid][cid].val){
    return;
    }
    if(db[rid][cid].formula){
    removeFormula(rid,cid);
    }
    update(rid,cid,value);
})
$("#formula-bar").on("blur",function(){
    // we will get the formula
    let formula = $(this).val();
    // we will get the cell on which formula is being applied
    let cellAddress = $("#cell-address").val();
    let {rowid,colid} = rcFromCellAddress(cellAddress);
    if(formula==db[rowid][colid].formula){
        return;
    }
    //remove the previous formula and parent child relationships
    if(db[rowid][colid].formula){
    removeFormula(rowid,colid)
    }
    //set the formula
    setformula(formula,rowid,colid);
    // then we will evaluate the formula
    let ans = evaluate(formula); 
    // then updation -- we will reflect the changes on UI and db as well
    update(rowid,colid,ans);
})
function removeFormula(rowid,colid){
    //remove current cell's formula
    db[rowid][colid].formula = "";
    let parents = db[rowid][colid].parents;
    for(let i=0;i<parents.length;i++){
        let parentrc = parents[i];
        let parentObject = db[parentrc.rowid][parentrc.colid];
    let updatedParentchildren = parentObject.children.filter(function(x){
        return !(x.rowid==rowid && x.colid==colid);
    })
    parentObject.children = updatedParentchildren;
    }
    db[rowid][colid].parents = [];
}
function setformula(formula,rowid,colid){
db[rowid][colid].formula = formula;
let comps = formula.split(" ");
for(let i = 0;i<comps.length;i++){
    let ccode = comps[i].charCodeAt(0);
    if(ccode>=65 && ccode<=90){
        // we got the parents
        let  parentrc = rcFromCellAddress(comps[i]);
        let parentObject = db[parentrc.rowid][parentrc.colid];
        parentObject.children.push({rowid,colid});
        let cellObject = db[rowid][colid];
        cellObject.parents.push(parentrc);
        //the current cell is stored in the children's array of its parents
    }
}
}
function update(rowid,colid,ans){
    // change on the UI
    $(`#grid .cell[rid=${rowid}][cid=${colid}]`).html(ans);
    //change in the db
    db[rowid][colid].val = ans;
    let children = db[rowid][colid].children;
    for(let i = 0;i<children.length;i++){
        let childrc = children[i];
        let childObject = db[childrc.rowid][childrc.colid];
        let cans = evaluate(childObject.formula);
        update(childrc.rowid,childrc.colid,cans);
    }
}
function evaluate(formula){
    let comps = formula.split(" ");
    for(let i = 0;i<comps.length;i++){
        let charCode = comps[i].charCodeAt(0);
        if(charCode>=65 && charCode<=90){
            // then it is a valid parent 
            let {rowid,colid} = rcFromCellAddress(comps[i]);
            // we get the parent's address
            let pval = db[rowid][colid].val;
            formula = formula.replace(comps[i],pval);
        }
    }
    let ans = eval(formula);
    return ans;
}
function rcFromCellAddress(address){
    let rowid = Number(address.substring(1))-1;
    let colid = address.charCodeAt(0) - 65;
    return {rowid,colid};
}
$("#grid .cell").on("keydown",function(){
    let height = $(this).outerHeight();
    let rowid = $(this).attr("rid");
    let leftcol = $("#left-col .cell");
    let mycol = leftcol[rowid];
    $(mycol).css("height",height);
})

function init(){
    $("#file").click();
    $("#new").trigger("click");
}
init();
    }
)