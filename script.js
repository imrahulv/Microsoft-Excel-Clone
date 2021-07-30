let defaultProperties={
    text:"",
    "font-weight":"",
    "font-style":"",
    "text-decoration":"",
    "text-align":"left",
    "background-color":"#ffffff",
    "color":"#000000",
    "font-family":"Noto Sans",
    "font-size":"14px"
}

let cellData = {
    "Sheet1":{}
}

let selectedSheet="Sheet1";
let totalSheets=1;
let lastlyAddedSheet=1;

$(document).ready(function(){
    let cellContainer=$(".input-cell-container");

    for(let i=1;i<100;i++){
        let ans="";

        let n=i;
        
        while(n>0){
            let rem=n%26;
            if(rem==0){
                ans="Z"+ans;
                n=Math.floor(n/26)-1;
            }
            else{
               ans=String.fromCharCode(rem-1+65)+ans;
               n=Math.floor(n/26); 
            }
        }

        let column=$(`<div class="column-name colId-${i}" id="colCod-${ans}">${ans}</div>`);

        $(".column-name-container").append(column);

        let row=$(`<div class="row-name" id="rowId-${i}">${i}</div>`)

        $(".row-name-container").append(row);
    }

    for(let i=1;i<=100;i++){
        let row=$(`<div class="cell-row"></div>`);
        for(let j=1;j<=100;j++){
            // let colCode=$(`.colId-${j}`).attr("id").split("-")[1]; 
            //column code "ans" mil gaya [1] se

            let colCode=$(`.colId-${j}`).attr("id");
            if(colCode){
                colCode.split("-")[1];
            }

            

            let column=$(`<div class="input-cell" contenteditable="false" id="row-${i}-col-${j}" data="code-${colCode}"></div>`);

            row.append(column);
        }

        $(".input-cell-container").append(row);
    }

    $(".align-icon").click(function(){
        $(".align-icon.selected").removeClass("selected");
        $(this).addClass("selected");
    })

    $(".style-icon").click(function(){
        $(this).toggleClass("selected")
    })


    $(".input-cell").click(function (e) {
        //for selecting multiple cells
        if(e.ctrlKey) {
            let [rowId,colId] = getRowCol(this);
            if(rowId > 1) {
                let topCellSelected = $(`#row-${rowId-1}-col-${colId}`).hasClass("selected");
                if(topCellSelected) {
                    $(this).addClass("top-cell-selected");
                    $(`#row-${rowId-1}-col-${colId}`).addClass("bottom-cell-selected");
                }
            }
            if(rowId < 100) {
                let bottomCellSelected = $(`#row-${rowId+1}-col-${colId}`).hasClass("selected");
                if(bottomCellSelected) {
                    $(this).addClass("bottom-cell-selected");
                    $(`#row-${rowId+1}-col-${colId}`).addClass("top-cell-selected");
                }
            }
            if(colId > 1) {
                let leftCellSelected = $(`#row-${rowId}-col-${colId-1}`).hasClass("selected");
                if(leftCellSelected) {
                    $(this).addClass("left-cell-selected");
                    $(`#row-${rowId}-col-${colId-1}`).addClass("right-cell-selected");
                }
            }
            if(colId < 100) {
                let rightCellSelected = $(`#row-${rowId}-col-${colId+1}`).hasClass("selected");
                if(rightCellSelected) {
                    $(this).addClass("right-cell-selected");
                    $(`#row-${rowId}-col-${colId+1}`).addClass("left-cell-selected");
                }
            }
        }
        else {
            $(".input-cell.selected").removeClass("selected");
        }
        $(this).addClass("selected");

        changeHeader(this);

    })

    //this function is for two way binding means jis cell ko select kre usse related propetirs header me highlight ho jaaye
    function changeHeader(ele){
        let [rowId,colId]=getRowCol(ele);
        let cellInfo=defaultProperties;

        if(cellData[selectedSheet][rowId] && cellData[selectedSheet][rowId][colId]){
            cellInfo=cellData[selectedSheet][rowId][colId];
        }
        
        cellInfo["font-weight"] ? $(".icon-bold").addClass("selected"):$(".icon-bold").removeClass("selected");

        cellInfo["font-style"] ? $(".icon-italic").addClass("selected"):$(".icon-italic").removeClass("selected");

        cellInfo["text-decoration"] ? $(".icon-underline").addClass("selected"):$(".icon-underline").removeClass("selected");

        let alignment=cellInfo["text-align"];
        $(".align-icon.selected").removeClass("selected");
        $(".icon-align-"+alignment).addClass("selected");

        $(".background-color-picker").val(cellInfo["background-color"]);
        $(".text-color-picker").val(cellInfo["color"]);

        $(".font-family-selector").val(cellInfo["font-family"]);
        $(".font-family-selector").css("font-family" , cellInfo["font-family"]);

        $(".font-size-selector").val(cellInfo["font-size"]);
    }

    $(".input-cell").dblclick(function(){
        $(".input-cell.selected").removeClass("selected");
        $(this).addClass("selected");
        $(this).attr("contenteditable","true");
        $(this).focus();
    })

    $(".input-cell").blur(function(){
        $(".input-cell.selected").attr("contenteditable","false");

        //for text 
        // console.log($(this).text());
        updateCell("text",$(this).text());
    })

    $(".input-cell-container").scroll(function(){
        $(".column-name-container").scrollLeft(this.scrollLeft);
        $(".row-name-container").scrollTop(this.scrollTop);
    })
    
    
    
});


function getRowCol(ele) {
    let idArray = $(ele).attr("id").split("-");
    let rowId = parseInt(idArray[1]);
    let colId = parseInt(idArray[3]);
    return [rowId,colId];
}

//ek se jyada cell pe property lgaane k liye .each loop  k through laga rhe
function updateCell(property,value,defaultPossible){
    $(".input-cell.selected").each(function(){
        $(this).css(property,value);
        let [rowId,colId]=getRowCol(this);
        if(cellData[selectedSheet][rowId]){
            if(cellData[selectedSheet][rowId][colId]){
                cellData[selectedSheet][rowId][colId][property]=value;
            }
            else{
                //agar column nhi tha sirf row tha to col bana k uske andar spread operator se sara default property de dia and then uske particular property ko value se update kr dia
                 cellData[selectedSheet][rowId][colId]={...defaultPossible};
                 cellData[selectedSheet][rowId][colId][property]=value;
            }
        }
        else{
            //yaha row aur column dono bana k property de rhe
            cellData[selectedSheet][rowId]={};
            cellData[selectedSheet][rowId][colId]={...defaultPossible};
            cellData[selectedSheet][rowId][colId][property]=value;
        }

        //yaha check kr lia if cell data k properties ki value sb default jaisi "" ho gyi empty to us cell k info (column ko and jab sb column delete ya default value k ho jaaye to us row ko v hata do) ko cell data se delete kr do
        if(defaultPossible && (JSON.stringify(cellData[selectedSheet][rowId][colId])===JSON.stringify(defaultProperties))){
            delete cellData[selectedSheet][rowId][colId];
            if(Object.keys(cellData[selectedSheet][rowId]).length==0){
                delete cellData[selectedSheet][rowId];
            }
        }
    })

    console.log(cellData);
}

//selected cell pe font-weight bold ki property de rhe
$(".icon-bold").click(function(){
    if($(this).hasClass("selected")){
        updateCell("font-weight","",true);
    }
    else{
        updateCell("font-weight","bold",false);
    }
})

//selected cell k font ko italic krne k liye
$(".icon-italic").click(function(){
    if($(this).hasClass("selected")){
        updateCell("font-style","",true);
    }
    else{
        updateCell("font-style","italic",false);
    }
})

//selected cell k font ko underline property dene k liye
$(".icon-underline").click(function(){
    if($(this).hasClass("selected")){
        updateCell("text-decoration","",true);
    }
    else{
        updateCell("text-decoration","underline",false);
    }
})

$(".icon-align-left").click(function(){
    if(!$(this).hasClass("selected")){
        updateCell("text-align","left",true);
    }
})

$(".icon-align-center").click(function(){
    if(!$(this).hasClass("selected")){
        updateCell("text-align","center",true);
    }
})

$(".icon-align-right").click(function(){
    if(!$(this).hasClass("selected")){
        updateCell("text-align","right",true);
    }
})

$(".color-fill-icon").click(function(){
    $(".background-color-picker").click();
})

$(".color-fill-text").click(function(){
    $(".text-color-picker").click();
})

//when we select background color change icon the selected cell must update the value and we do this by giving property "background-color"
$(".background-color-picker").change(function(){
    updateCell("background-color",$(this).val())
})

//when we select background text change icon the selected cell must update the value and we do this by giving property "color"
$(".text-color-picker").change(function(){
    updateCell("color",$(this).val());
})

//font family update method
$(".font-family-selector").change(function(){
    updateCell("font-family",$(this).val());

    //font-family selected me v update kraane k lie ki kon sa select kia hu font family ek particular cell pe
    $(".font-family-selector").css("font-family" , $(this).val());
})

$(".font-size-selector").change(function(){
    updateCell("font-size",$(this).val());
})

function emptySheet(){
    let sheetInfo=cellData[selectedSheet];
    console.log("sheetinfo ",sheetInfo);
    for(let i of Object.keys(sheetInfo)){
        console.log("sheet ",i);
        for(let j of Object.keys(sheetInfo[i])){
            $(`#row-${i}-col-${j}`).text("");
            $(`#row-${i}-col-${j}`).css("background-color","#ffffff");
            $(`#row-${i}-col-${j}`).css("color","#000000");
            $(`#row-${i}-col-${j}`).css("text-align","left");
            $(`#row-${i}-col-${j}`).css("font-weight","");
            $(`#row-${i}-col-${j}`).css("font-style","");
            $(`#row-${i}-col-${j}`).css("text-decoration","");
            $(`#row-${i}-col-${j}`).css("font-family","Noto Sans");
            $(`#row-${i}-col-${j}`).css("font-size","14px");

        }
    }
}

function loadSheet(){
    let sheetInfo=cellData[selectedSheet];
    console.log("sheetinfo ",sheetInfo);
    for(let i of Object.keys(sheetInfo)){
        console.log("sheet ",i);
        for(let j of Object.keys(sheetInfo[i])){
            let cellInfo=cellData[selectedSheet][i][j];
            $(`#row-${i}-col-${j}`).text(cellInfo["text"]);
            $(`#row-${i}-col-${j}`).css("background-color",cellInfo["background-color"]);
            $(`#row-${i}-col-${j}`).css("color",cellInfo["color"]);
            $(`#row-${i}-col-${j}`).css("text-align",cellInfo["text-align"]);
            $(`#row-${i}-col-${j}`).css("font-weight",cellInfo["font-weight"]);
            $(`#row-${i}-col-${j}`).css("font-style",cellInfo["font-style"]);
            $(`#row-${i}-col-${j}`).css("text-decoration",cellInfo["text-decoration"]);
            $(`#row-${i}-col-${j}`).css("font-family",cellInfo["font-family"]);
            $(`#row-${i}-col-${j}`).css("font-size",cellInfo["font-size"]);

        }
    }
}

//adding sheet by clicking on icon add button
$(".icon-add").click(function(){
    emptySheet();
    $(".sheet-tab.selected").removeClass("selected");
    let sheetName="Sheet"+(lastlyAddedSheet+1);
    cellData[sheetName]={};
    totalSheets+=1;
    lastlyAddedSheet+=1;
    selectedSheet=sheetName;
    $(".sheet-tab-container").append(`<div class="sheet-tab selected">${sheetName}</div>`);
    $(".sheet-tab.selected").click(function(){
        if(!$(this).hasClass("selected")){
           selectSheet(this);
        }
    })
})

$(".sheet-tab").click(function(){
    if(!$(this).hasClass("selected")){
       selectSheet(this);
    }
})

function selectSheet(ele){
   //already selected sheet pe se selected class remove kr dega
   $(".sheet-tab.selected").removeClass("selected");
   //aur current element jo pass kia hi uspe selected class laga dega
   $(ele).addClass("selected");

   emptySheet();
   selectedSheet = $(ele).text();
   loadSheet();


}
