const $ = require("jquery");
const dialog = require("electron").remote.dialog;
let fs = require("fs");
$(document).ready(
    function () {
        let db;
        $(".grid .cell").on("click", function () {
            let rid = Number($(this).attr("rid"));
            let cid = Number($(this).attr("cid"));
            let calpha = String.fromCharCode(cid + 65);
            $("#address-container").val(calpha + (rid + 1));
        })

        $(".menu-item").on("click", function () {
            $(".menu-options-item").removeClass("selected");
            let id = $(this).attr("id");
            //clicked attribute id
            $(`#${id}-options`).addClass("selected");
        })
       
        $(".new").on("click", function(){
        let rows = $(".row");
        db=[];
        for(let i=0;i<rows.length;i++){
            let row = [];
            let cells = $(rows[i]).find(".cell")
            for(let j=0;j<cells.length;j++){
                $(cells[j]).html("");
                let cell = { val:"" ,
                        formula:"",
                        children:[],
                        parent:[]
                           };
                row.push(cell);
            }
            db.push(row);
        }
        })
        $(".save").on("click",function(){
        let path = dialog.showSaveDialogSync();
        fs.writeFileSync(path,JSON.stringify(db))
        })
        $(".open").on("click",function(){
        let path = dialog.showOpenDialogSync();
        let content = fs.readFileSync(path[0]);
        let dbs = JSON.parse(content);
        let rows = $(".row");
        for(let i=0;i<rows.length;i++){
            let cells = $(rows[i]).find(".cell");
            for(let j=0;j<cells.length;j++){
                $(cells[j]).html(dbs[i][j].val);
            }
        }
         })
        
        $(".grid .cell").on("blur",function(){
        //updated db
        let ri = $(this).attr("rid");
        let ci = $(this).attr("cid");
        let cellObject = db[ri][ci];
        if($(this).html()== cellObject.val){
            return;
        }
        if(cellObject.formula){
        // if formula's length exists , it returns true
        // if we click a new cell, it never has any formula
        // so there is no need of removal of the formula
        removeFormula(ri,ci);
        }
        updateCellInformation(cellObject,$(this).html(),ri,ci);
        })
        $("#formula-container").on("blur",function(){
        //fetch the formula
        let formula = $(this).val();
        //find the cell 
        //on which you want to apply the formula    
        let cellAddress = $("#address-container").val();
        // with the cellAddress we fetch its row id and col id
        let {rowid,colid} = getRowColFromAlphabet(cellAddress);
        let cellObject = db[rowid][colid];
        if(formula==cellObject.formula){
            return;
        }
        removeFormula(rowid,colid)
        // fetch the cell object from database
        cellObject.formula = formula;
        //set formula
        fillParentAndChildren(formula,rowid,colid);
        let ans = evaluate(cellObject);
        updateCellInformation(cellObject,ans,rowid,colid);
        })
        function fillParentAndChildren(formula,rowid,colid){
        // ( A1 + A2 )
        //we will split it and then we will get these tokens
        // [ ( , A1 , + , A2 , ) ]
        let components = formula.split(" ");
        for(let i=0;i<components.length;i++){
        let charCode = components[i].charCodeAt(0);
        if(charCode>=65 && charCode<=90){
            let parentRC = getRowColFromAlphabet(components[i]);
            let parentObject = db[parentRC.rowid][parentRC.colid];
            parentObject.children.push({rowid,colid});
            let cellObject = db[rowid][colid]
            cellObject.parent.push(parentRC);
                }
            }
        }
        function updateCellInformation(cellObject,ans,rowid,colid){
        
        cellObject.val = ans;
        $(`.row .cell[rid=${rowid}][cid=${colid}]`).html(ans);

        for(let i=0;i<cellObject.children.length;i++){
        //update your children
        let childRowCol = cellObject.children[i];
        let childObject = db[childRowCol.rowid][childRowCol.colid];
        let newAnsOfChild = evaluate(childObject);
        updateCellInformation(childObject,newAnsOfChild,childRowCol.rowid,childRowCol.colid);
        }
        return;
        }
        function evaluate(cellObject){
        // ( A1 + A2 )
        //we will split it and then we will get these tokens
        // [ ( , A1 , + , A2 , ) ]
        let formula = cellObject.formula
        let components = formula.split(" ");
        for(let i=0;i<components.length;i++){
            let charCode = components[i].charCodeAt(0);
        if(charCode>=65 && charCode<=90){
            let {rowid,colid}= getRowColFromAlphabet(components[i]);
            let parentObject = db[rowid][colid];
            let value = parentObject.val;
            formula = formula.replace(components[i],value);
        }
        }
        console.log(formula);
        return eval(formula);
        }
        
        function getRowColFromAlphabet(cellAddress){
            let colid =  cellAddress.charCodeAt(0)-65;
            let rowid =  Number(cellAddress.substring(1)) - 1;
            return {rowid,colid};
        }
        function removeFormula(rowid,colid){
            let cellObject = db[rowid][colid];
            for(let i=0;i<cellObject.parent.length;i++){
                let parentIRC = cellObject.parent[i];
                let parentObject = db[parentIRC.rowid][parentIRC.colid];
               let updatedParent = parentObject.children.filter(function(x){
            // filter is used for filtering the children array
                return !(x.rowid==rowid && x.colid==colid)
                //filter filters on the basis of the given condition
                })
                parentObject.children = updatedParent;
            }
            cellObject.formula = "" ;
            // set the formula empty
            cellObject.parent = [];
            } 
        function init(){
            $("#file").click();
            $(".new").trigger("click");
        }
        init();

   
    });