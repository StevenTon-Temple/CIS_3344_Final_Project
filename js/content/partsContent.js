"use strict";
function partsContent() {
    //"processorId": 5,
    //"name": "Intel Core i9-12900K",
    //"image": "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51fd8tJsqCL._AC_SL1280_.jpg",
    //"price": "499.98",
    //"releasedate": "",
    //"stock": "In Stock",
    //"webUserId": 7,
    //"userEmail": "sally@temple.edu"

    var container = document.createElement("div");


    ajax("json/pcparts.json", processData, document.getElementById("content"));

    function processData(pcParts) {




        // print out JS object/array that was converted from JSON data by ajax function


        // build new list as we want the fields to appear in the HTML table
        // we can decide the order we want the fields to appear (first property defined is shown first)
        // we can combine, decide to exclude etc...
        var newPcList = [];

        // modify properties (image and price) of the array of objects so it will look 
        // better on the page.
        for (var i = 0; i < pcParts.length; i++) {



            newPcList[i] = {};
            newPcList[i].Item = SortableTableUtils.makeText(pcParts[i].name);
            newPcList[i].Image = SortableTableUtils.makeImage(pcParts[i].image, "5rem");
            newPcList[i].Price = SortableTableUtils.makeNumber(pcParts[i].price,true);
            newPcList[i].ReleaseDate = SortableTableUtils.makeDate(pcParts[i].releasedate);
            newPcList[i].Stock = SortableTableUtils.makeText(pcParts[i].stock);
            newPcList[i].Seller = SortableTableUtils.makeText(pcParts[i].userEmail);

            


        }

        var ss = MakeClickSortTable({
            title: "Parts List",
            objList: newPcList,
            sortOrderPropName: "Item",
            sortIcon: "icons/sortUpDown16.png"
        });
        container.appendChild(ss);

    }

    return container;
}