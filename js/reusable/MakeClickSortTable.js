"use strict";

// This version of MakeTable expects objList to hold an array of objects 
// in which all the properties are already "td" tags which may contain images, 
// alignment, etc. 

function MakeClickSortTable(parms) {
    var title = parms.title;
    var objList = parms.objList;
    var sortOrderPropName = parms.sortOrderPropName;
    var sortIcon = parms.sortIcon;
    var sortCurrent = "foward";


    // This function sorts the array of objects in "list" by object property "byProperty". 
    // Think of list as an I/O parameter (gets changed by the fn).
    //var ss = MakeClickSortTable({
    //    title: "User List",
    //    objlist: newUserList,
    //    sortOrderPropName: "Birthdate",
    //    sortIcon: "icons/ sortUpDown16.png"
    //});


    function isToShow(obj, searchKey) {

        // show the object if searchKey is empty
        if (!searchKey || searchKey.length === 0) {
            return true;
        }

        // convert search key to upper case (will convert values also to upper case before comparing).
        var searchKeyUpper = searchKey.toUpperCase();

        for (var prop in obj) {

            // Do not try to find a match for Table cells that hold images. 
            if (prop[0] !== "_") {

                // pull out the innerHTML because all properties of obj are actually <td> tags, not just text.
                var propVal = obj[prop].innerHTML; // associative array, using property name as if index. 
                var propValUpper = propVal.toUpperCase(); // convert to upper case to match searchKey.

                console.log("checking if " + searchKeyUpper + " is in " + propValUpper);

                if (propValUpper.includes(searchKeyUpper)) {
                    console.log("Yes it is inside");
                    return true;
                }
            } // excluding image tds
        }
        console.log("no it is not inside");
        return false;
    } // isToShow 

    function jsSort(objList, byProperty) {

        if (!objList || !objList[0]) {
            var message = "Cannot sort. Need an objList with at least one object";
            console.log(message);
            alert(message);
            return;  // early return -- dont try to sort.
        }

        var obj = objList[0];
        if (!obj[byProperty]) {
            var message = "objList does not have property " + byProperty + " -- cannot sort by that property.";
            console.log(message);
            alert(message);
            return;  // early return -- dont try to sort.
        }

        if (!obj[byProperty].sortOrder || obj[byProperty].sortOrder === null) {
            var message = "Cannot sort objList by property " + byProperty +
                    " because this property never had it's sortOrder set (by a method in SortableTableUtils.js).";
            console.log(message);
            alert(message);
            return;  // early return -- dont try to sort.
        }

        // q and z are just elements in the array and the funcction has to return negative or positive or zero 
        // depending on the comparison of q and z.
        // using JS associative array notation (property name char string used inside square brackets 
        // as it if was an index value). 

        objList.sort(function (q, z) {  // in line (and anonymous) def'n of fn to compare list elements. 
            // the function you create is supposed to return positive (if first bigger), 0 if equal, negative otherwise.

            // using JS associative array notation, extract the 'byProperty' property from the two
            // list elements so you can compare them.
            var qVal = q[byProperty].sortOrder;
            var zVal = z[byProperty].sortOrder;


            var c = 0;

            if (sortCurrent === "reverse") {
                if (qVal > zVal) {
                    c = -1;
                } else if (qVal < zVal) {
                    c = 1;
                }
            }
            else {
                if (qVal > zVal) {
                    c = 1;
                } else if (qVal < zVal) {
                    c = -1;
                }

            }
           
            console.log("comparing " + qVal + " to " + zVal + " is " + c);

            //var sortmethod = "forward";
            //if (sortmethod === "forward") {
            //    c = -c;
            //    sortmethod = "reverse";
            //}

            return c;


        });

    } // jsSort
 
    // remove the tbody from 'table' (if there is one). 
    // sort 'list' by 'sortOrderPropName'. 
    // add a new tbody to table, inserting rows from the sorted list.
    function addTableBody(table, list, sortOrderPropName, filterValue) {

        // remove old tbody element if there is one (else you'll get the new sorted rows 
        // added to end of what's there).
        var oldBody = table.getElementsByTagName("tbody");
        if (oldBody[0]) {
            console.log("ready to remove oldBody");
            table.removeChild(oldBody[0]);
        }

        jsSort(list, sortOrderPropName);

        // Add one row (to HTML table) per element in the array.
        // Each array element has a list of properties that will become 
        // td elements (Table Data, a cell) in the HTML table. 
        var tableBody = document.createElement("tbody");
        table.appendChild(tableBody);

        // To the tbody, add one row (to HTML table) per object in the object list.
        // To each row, add a td element (Table Data, a cell) that holds the object's 
        // property values. 
        for (var i in objList) {
            if (isToShow(objList[i], filterValue)) {
                var tableRow = document.createElement("tr");
                tableBody.appendChild(tableRow);


                // create one table data <td> content matching the property name
                var obj = objList[i];
                for (var prop in obj) {

                    // **** THE ONLY CHANGE IS HERE ****
                    // obj[prop] should already hold a "td" tag
                    tableRow.appendChild(obj[prop]);
                    // **** END OF THE CHANGE       ****
                }
            }
        }


    } // addTableBody

    function makeHeader (propName, sortIcon) {
        
        var headingCell = document.createElement("th");

        // underscores in the property name will be replaced by space (in column headings).
        var headingText = propName.replace("_", " ");

        // if the first character of a property name starts with underscore then we assume that 
        // column should not be click sortable (maybe it is an image column). 
        if (propName[0] !== "_") {
            headingText = "<img src='" + sortIcon + "'/> " + headingText;
            headingCell.onclick = function () {
                
                console.log("WILL SORT ON " + propName);
                addTableBody(newTable, objList, propName);
                if (sortCurrent === "reverse") {
                    sortCurrent = "foward";
                }
                else {
                    sortCurrent = "reverse";
                }
            };
        }
        headingCell.innerHTML = headingText;
        return headingCell;
    } // end makeHeader


    // **** ENTRY POINT ****

    // Create a container to hold the title (heading) and the HTML table
    var container = document.createElement("div");
    container.classList.add("clickSort");

    var searchDiv = document.createElement("div");
    container.appendChild(searchDiv);
    searchDiv.innerHTML = "Filter by: ";

    // Add a heading (for the title) and add that to the container
    var heading = document.createElement("h3");
    heading.innerHTML = title;
    container.appendChild(heading);

    // Create a new HTML table tag (DOM object) and add that to the container.
    var newTable = document.createElement("table");
    container.appendChild(newTable);

    // To the HTML table, add a tr element to hold the headings of our table.
    var headerRow = document.createElement("tr");
    newTable.appendChild(headerRow);

  

    var searchInput = document.createElement("input");
    searchDiv.appendChild(searchInput);


    // ADD one column heading per property in the object list.
    var obj = objList[0];
    for (var propName in obj) {
        headerRow.appendChild(makeHeader(propName,sortIcon));
    }

    // After sorting objList by sortOrderPropName, create or replace the tbody 
    // populated with data from the sorted objList.
    addTableBody(newTable, objList, sortOrderPropName);

    searchInput.onkeyup = function () {
        
        addTableBody(newTable, objList, sortOrderPropName , searchInput.value);
    };


    return container;

}  // MakeTableBetter