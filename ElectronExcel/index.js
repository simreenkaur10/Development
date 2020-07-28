const $ = require("jquery");
const dialog = require("electron").remote.dialog;
let fs = require("fs");
$(document).ready(
    function (){
        let db;
        let lsc;
        $(".grid .cell").on("click", function (){
            if(lsc){
    // if there is a last selected cell, then simply remove the selected class from it
            $(lsc).removeClass("selected-cell")
            }
            $(this).addClass("selected-cell");
    // add the selected class to the current cell 
    // and update the lsc with the current one....
            lsc = this;
            let rid = Number($(this).attr("rid"));
            let cid = Number($(this).attr("cid"));
            if(db[rid][cid].bold=="normal"){
                $("#bold").removeClass("highlight");
            }
            else if(db[rid][cid].bold=="bold"){
                $("#bold").addClass("highlight");
            }
            if(db[rid][cid].underline=="none"){
                $("#bold").removeClass("highlight2");
            }
            else if(db[rid][cid].underline=="underline"){
                $("#bold").addClass("highlight2");
            }
            if(db[rid][cid].italic=="normal"){
                $("#bold").removeClass("highlight3");
            }
            else if(db[rid][cid].italic=="italic"){
                $("#bold").addClass("highlight3");
            }
            let calpha = String.fromCharCode(cid + 65);
            $("#address-container").val(calpha + (rid + 1));
        })

        $(".menu-item").on("click", function (){
            $(".menu-options-item").removeClass("selected");
            let id = $(this).attr("id");
            // clicked attribute id
            $(`#${id}-options`).addClass("selected");
        })

        $(".new").on("click", function(){
        let rows = $(".row");
        let q = 0;
        let prev = []
        if(db){
            q = 1;
        prevdb = db;
        }
        db=[];
        for(let i=0;i<rows.length;i++){
            let row = [];
            let cells = $(rows[i]).find(".cell")
            for(let j=0;j<cells.length;j++){
                let cell = {
                        val:"" ,
                        formula:"",
                        bold : "normal",
                        underline : "none",
                        italic : "normal",
                        textcolor : "black",
                        bgcolor : "white",
                        align : "left",
                        children:[],
                        parent:[]
                           };
                row.push(cell);
                $(cells[j]).html("");
                $(cells[j]).css("font-weight","normal");
                $(cells[j]).css("text-decoration","none");
                $(cells[j]).css("font-style","normal");
                $(cells[j]).css("color","black");
                $(cells[j]).css("background-color","white");
                $(cells[j]).css("text-align","left");
                if( q==1 && prevdb[i][j].val!=""){
                    $(cells[j]).keydown();
                }
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
                let cellObject = dbs[i][j];
                $(cells[j]).html(cellObject.val);
                $(cells[j]).css("font-weight",cellObject.bold);
                $(cells[j]).css("text-decoration",cellObject.underline);
                $(cells[j]).css("font-style",cellObject.italic);
                $(cells[j]).css("text-align",cellObject.align);
                if(dbs[i][j].val!=""){
                $(cells[j]).keydown();
                }
            }
        }
        
         })
        $(".cell-container").on("scroll",function(){
        //scroll left fn....(this gives us the value(in pxl)scrolled in the horizontal direction)
        let horizontalScroll = $(this).scrollLeft();
        //scroll top fn....(this gives us the pixels scrolled in vertical direction)
        let verticalScroll = $(this).scrollTop();
        $(".top-left-cell, .left-col").css("left",horizontalScroll+"px")
        $(".top-left-cell, .top-row").css("top",verticalScroll + "px")
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
        $("#bold").on("click",function(){
        $(this).toggleClass("highlight");
        // if the class is already added, then it is removed and vice versa
        let isBold = $(this).hasClass("highlight")
        // it returns whether the bold is already pressed or not
        // if it is true this means bold has to be applied on the text
        $(".grid .cell.selected-cell").css("font-weight",(isBold)?"bold":"normal")
        let ele = $(".grid .cell.selected-cell")
        let {rowid,colid} = getrcFromElement(ele); 
        let cellObject = db[rowid][colid]
        cellObject.bold = (isBold)?"bold":"normal"
        })   
        $("#underline").on("click",function(){
            $(this).toggleClass("highlight2");
            let isUnderline = $(this).hasClass("highlight2");
            $(".grid .cell.selected-cell").css("text-decoration",(isUnderline)?"underline":"none")
            let ele = $(".grid .cell.selected-cell")
            let {rowid,colid} = getrcFromElement(ele); 
            let cellObject = db[rowid][colid]
            cellObject.underline = (isUnderline)? "underline":"none";
        })
        $("#italic").on("click",function(){
            $(this).toggleClass("highlight3");
            let isItalic = $(this).hasClass("highlight3");
            $(".grid .cell.selected-cell").css("font-style",(isItalic)?"italic":"normal")
            let ele = $(".grid .cell.selected-cell")
            let {rowid,colid} = getrcFromElement(ele); 
            let cellObject = db[rowid][colid]
            cellObject.italic = (isItalic)? "italic":"normal";
        })
        
        $(".grid .cell").on("keydown",function(){
            let height = $(this).outerHeight();
            let rowid = $(this).attr("rid");
            let leftcol = $(".left-col .cell");
            let mycol = leftcol[rowid];
            $(mycol).css("height",height);
        })
        function getrcFromElement(ele){
        let rowid = $(ele).attr("rid")
        let colid = $(ele).attr("cid")
        return {rowid,colid}
        }
        // underline ----> same as bold
        // italic ---->  "  "  "  "  "  "
        // select -----on change .val set
        //color -----on click .val
        function init(){
            $("#file").click();
            $(".new").trigger("click");
        }
        init();

   
    });