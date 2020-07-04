const $=require("jquery")
const electron = require("electron");
const fs = require("fs");
const dialog = require("electron").remote.dialog;
$(document).ready(
    function(){
        let db;
        $("#grid .cell").on("click",function(){
            let rid=Number($(this).attr("row-id"));
            let cid=Number($(this).attr("col-id"));
            let ciAdrr = String.fromCharCode(cid + 65);
            $("#address-container").val(ciAdrr +(rid));
        })
        $(".menu-items").on("click",function(){
            $(".menu-options-item").removeClass("selected");
            let id = $(this).attr("id");
            $(`#${id}-options`).addClass("selected");
        })
        
        $("#New").on("click",function(){
        db = [];
            $("#grid").find(".row").each(function(){
                let row=[];
                $(this).find(".cell").each(function(){
                    let cell = false;
                    row.push(cell);
                    $(this).html("false");
                })
                db.push(row);
            })
        })

        $("#grid .cell").on("keyup",function(){
            //update db
            let rowId = $(this).attr("row-id");
            let colId = $(this).attr("col-id");
            db[rowId][colId] = $(this).html();
            console.log(db);
        })

        $("#Save").on("click",function(){
            let sdb = dialog.showOpenDialogSync();
            console.log(sdb)
            let jsonData = JSON.stringify(db);
            fs.writeFileSync(sdb[0], jsonData);
        })
        $("#Open").on("click", async function () {
            let odb = await dialog.showOpenDialog();
            let fp = odb.filePaths[0];
            let content = await  fs.promises.readFile(fp);
            db = JSON.parse(content);
            // loop 
            let rows = $("#grid").find(".row");
            console.log(db);
            for (let i = 0; i < rows.length; i++) {
                let cRowCells = $(rows[i]).find(".cell");
                for (let j = 0; j < cRowCells.length; j++) {
                    $(cRowCells[j]).html(db[i][j]);
                }
            }
        })

        function init(){
            $("#File").trigger("click");
            $("#New").click();
        }
        init();
        // https://developer.mozilla.org/en-US/docs/Web/Events
        //     let rows = $("#grid").find(".row");
        //     for(let i=0;i<rows.length;i++){
        //         let row=[];
        //         let cRowCells = $(rows[i]).find(".cell");
        //         for(let j=0;j<cRowCells.length;j++){
        //             //DB
        //             let cell = false;
        //             row.push(cell);
        //             // UI
        //             $(cRowCells[j]).html("false");
        //         }
        //         db.push(row);
        //     }
        //     console.log(db);
        // })

    }  
);