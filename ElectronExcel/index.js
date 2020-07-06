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
            $("#address-container").val(calpha + rid);
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
                let cell = "";
                row.push(cell);
            }
            db.push(row);
        }
        })
        $(".save").on("click",function(){
        let path = dialog.showOpenDialogSync();
        fs.writeFileSync(path[0],JSON.stringify(db));
        })
        $(".open").on("click",function(){
        let path = dialog.showOpenDialogSync();
        let content = fs.readFileSync(path[0]);
        let dbs = JSON.parse(content);
        let rows = $(".row");
        for(let i=0;i<rows.length;i++){
            let cells = $(rows[i]).find(".cell");
            for(let j=0;j<cells.length;j++){
                $(cells[j]).html(dbs[i][j]);
            }
        }
         })
        
         $(".grid .cell").on("blur",function(){
            //updated db
        console.log("cell fn")
        let {rowId , colId} = getRc(this);
        let cellObject = getCellObject(rowId,colId);
        if($(this).html()==cellObject.value ){
            return
        }
        cellObject.value = $(this).html();
        //updateCell => update self // children(UI changes)
        updateCell(rowId,colId,$(this).html(),cellObject);
        //console.log(db)
        } )
        $("#formula-container").on("blur", function (){
        let address = $("#address-container").val();
        //gives us the selected cell
        let { rowId, colId } = getRcFromAddress(address);
        //getting the row id & col id

        let cellObject = getCellObject(rowId, colId);
        let formula = $(this).val();
        cellObject.formula = formula;
        // set formula
        let eValuatedVal = evaluate(cellObject);
        updateCell(rowId, colId, eValuatedVal, cellObject);

        // setUpFormula(rowId, colId, formula);
        // evaluate
        // update cell
    })

        function evaluate(cellObject) {
        let formula = cellObject.formula;
        // ( A1 + A2 )
        let formulaComponent = formula.split(" ");
        // [( ,A1,+,A2,)]
        for (let i = 0; i < formulaComponent.length; i++) {
            let code = formulaComponent[i].charCodeAt(0);
            if (code >= 65 && code <= 90) {
                let parentRc = getRcFromAddress(formulaComponent[i]);

                let fParent = db[parentRc.rowId][parentRc.colId];
                let value = fParent.value;
                formula = formula.replace(formulaComponent[i], value)
            }

        }
        // ( 10 + 20 )
        console.log(formula);
        let ans = eval(formula);
        console.log(ans);
        return ans;
        // console.log(formula)
        // for (let i = 0; i < cellObject.upstream.length; i++) {
        //     let suo = cellObject.upstream[i];
        //     let fParentObject = db[suo.rowId][suo.colId];
        //     let val = fParentObject.value;
        //     // formula => replace A1 => 10
        //     let colAlpha = String.fromCharCode(suo.colId + 65);
        //     let rowNumber = suo.rowId + 1;
        //     let charMeParent = colAlpha + rowNumber;
        //     formula = formula.replace(charMeParent, val);
        // }
        // console.log(formula);
        // let ans = eval(formula);
        // console.log(ans);
        // return ans;
    }
        function updateCell(rowId, colId, val, cellObject) {
        // update yourself
        $(`.grid .cell[rid=${rowId}][cid=${colId}]`).html(val);
        cellObject.value = val;

        // dependent 
        // let cellObject = getCellObject(rowId, colId);
        // for (let i = 0; i < cellObject.downstream.length; i++) {
        //     let schild = cellObject.downstream[i];
        //     let fChildObj = db[schild.rowId][schild.colId];
        //     let eValuatedVal = evaluate(fChildObj);
        //     updateCell(schild.rowId, schild.colId, eValuatedVal)

        // }
    }

        function getRc(elem) {
        let rowId = $(elem).attr("rid");
        let colId = $(elem).attr("cid");
        return {
            rowId,
            colId
        }
    }
        function getCellObject(rowId, colId) {
        return db[rowId][colId];
    }
        function getRcFromAddress(address){
        let colId = address.charCodeAt(0) - 65;
        let rowId = Number(address.substring(1)) - 1;
        return { colId, rowId };

    }

        function init(){
            $("#file").click();
            $(".new").trigger("click");
        }
        init();

   
    });
  
























    

// const $=require("jquery")
// const electron = require("electron");
// const fs = require("fs");
// const dialog = require("electron").remote.dialog;
// $(document).ready(
//     function(){
//         let db;
//         $("#grid .cell").on("click",function(){
//             let rid=Number($(this).attr("row-id"));
//             let cid=Number($(this).attr("col-id"));
//             let ciAdrr = String.fromCharCode(cid + 65);
//             $("#address-container").val(ciAdrr +(rid));
//         })
//         $(".menu-items").on("click",function(){
//             $(".menu-options-item").removeClass("selected");
//             let id = $(this).attr("id");
//             $(`#${id}-options`).addClass("selected");
//         })

//         $("#New").on("click",function(){
//         db = [];
//             $("#grid").find(".row").each(function(){
//                 let row=[];
//                 $(this).find(".cell").each(function(){
//                     let cell = false;
//                     row.push(cell);
//                     $(this).html("false");
//                 })
//                 db.push(row);
//             })
//         })

//         $("#grid .cell").on("keyup",function(){
//             //update db
//             let rowId = $(this).attr("row-id");
//             let colId = $(this).attr("col-id");
//             db[rowId][colId] = $(this).html();
//             console.log(db);
//         })

//         $("#Save").on("click",function(){
//             let sdb = dialog.showOpenDialogSync();
//             console.log(sdb)
//             let jsonData = JSON.stringify(db);
//             fs.writeFileSync(sdb[0], jsonData);
//         })
//         $("#Open").on("click", async function () {
//             let odb = await dialog.showOpenDialog();
//             let fp = odb.filePaths[0];
//             let content = await  fs.promises.readFile(fp);
//             db = JSON.parse(content);
//             // loop 
//             let rows = $("#grid").find(".row");
//             console.log(db);
//             for (let i = 0; i < rows.length; i++) {
//                 let cRowCells = $(rows[i]).find(".cell");
//                 for (let j = 0; j < cRowCells.length; j++) {
//                     $(cRowCells[j]).html(db[i][j]);
//                 }
//             }
//         })

//         function init(){
//             $("#File").trigger("click");
//             $("#New").click();
//         }
//         init();
//         // https://developer.mozilla.org/en-US/docs/Web/Events
//         //     let rows = $("#grid").find(".row");
//         //     for(let i=0;i<rows.length;i++){
//         //         let row=[];
//         //         let cRowCells = $(rows[i]).find(".cell");
//         //         for(let j=0;j<cRowCells.length;j++){
//         //             //DB
//         //             let cell = false;
//         //             row.push(cell);
//         //             // UI
//         //             $(cRowCells[j]).html("false");
//         //         }
//         //         db.push(row);
//         //     }
//         //     console.log(db);
//         // })

//     }  
// );