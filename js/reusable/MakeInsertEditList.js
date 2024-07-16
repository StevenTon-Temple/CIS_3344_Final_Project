"use strict"; 

function MakeInsertEditList(objList, inputSpecs, displayTemplate) {

    // Declarations that need to be at the MakeUserList level.

    var editArea; // declare at the MakeUserList level it can be accessed by insert as well
    // as update. This will be the div that gets appended to the editContainer above. 

    // we want only one child div at a time to be edited. 
    // so, control this (at the list/container level, not at the 
    // object/child div level) -- with a boolean.
    var isEditing = false;
    

    /* Apply a template to an object. Example:
     *    template: "My id is ${obj.userId} and my email is ${obj.userEmail}",
     *    obj:      {userId: 123, userEmail: "sallyk@temple.edu"}
     * returns this: "My id is 123 and my email is sallyk@temple.edu"                 */
    function applyTemplate(template, obj) {
        // Surround 'template' with back ticks and then 'eval' that. eval is a 
        // JS function that runs a string as if it were code. Then return the 
        // result of applying the template to object 'obj'.
         
        //console.log("applyTemplate obj on next line");
        //console.log(obj);
        //console.log("template: ["+template+"]");
        var result = eval("`" + template + "`");
        //console.log("result is "+result);
        return result;
    }


    // creates a user child div (to be added into the user list div) based on the 
    // user obj that's been passed in. The obj passed in is expected to have the 
    // fields specified in userInputSpects (userEmail, image, birthday, membershipFee). 
    // When the user clicks on the user child div, the user object values are shown 
    // (editable in input tags) in an editArea div.
    function MakeChildEle(obj, inputSpecs, displayTemplate) {

        // defensive (prodvider style) coding. Make sure that obj has all the fields 
        // it needs (as specified in inputSpecs).
        for (var spec of inputSpecs) { // spec represents inputSpecd[i]
            //console.log("fieldName "+spec.fieldName);
            if (!obj.hasOwnProperty(spec.fieldName)) {
                var errorMsg = "function MakeUserEle needs an 'obj' that has all the \n" +
                    "properties as specified in 'inputSpecs.fieldname'. 'obj' \n" +
                    "does not have property " + spec.fieldName;
                alert(errorMsg);
                throw new Error(errorMsg);
                // this should stop execution on the page... 
            }
        }

        var eleDiv = MakeTag({
            htmlTag: "div",
            cssClass: "ele"
        });

        function refreshChildEle() {

            var deleteIcon = MakeTag({
                htmlTag: "div",
                cssClass: "x",
                innerHTML: "&times;",
                parent: eleDiv
            });

            deleteIcon.onclick = function () {
                var indx = objList.indexOf(obj);
                //alert("You are trying to delete object with index value " + indx);


                objList.splice(indx, 1);


                var eleToDelete = deleteIcon.parentElement;
                eleToDelete.remove();


            };
            var eleInfo = MakeTag({
                htmlTag: "div",
                parent: eleDiv
            });

            eleInfo.onclick = function () {
                if (!isEditing) {
                    editArea = MakeEditArea({
                        inputSpecs: inputSpecs,
                        successCallBack: editSuccess,
                        cancelCallBack: cancel,
                        editObj: obj // this is the object from which the child div is being made
                    });
                    editContainer.appendChild(editArea);
                    isEditing = true;
                }
            };

            eleInfo.innerHTML = applyTemplate(displayTemplate, obj);
        }
        refreshChildEle();

        function editSuccess(inpObj) {
            // inpObj not really needed since MakeEditArea updates the same object 
            // that was passed to it (the same obj that was passed to this MakeEle). 
            isEditing = false;
            deleteEditArea();
            refreshChildEle(); // update the ele in the list div based on the new input values 
        }

        return eleDiv;
    } // MakeChildEle


    // This function is declared at the MakeUserList level so it can be called by 
    // by edit sucess, insert success, and cancel... 
    function deleteEditArea() {
        var parent = editArea.parentNode;
        parent.removeChild(editArea);
    }

    // This function is declared at the MakeUserList level since it will be called by insert cancel 
    // as well as edit cancel. 
    function cancel() {
        isEditing = false;
        deleteEditArea();
    }

    // ENTRY POINT for MakeUserList
    var listDiv = MakeTag({// req'd: htmlTag, opt'l: cssClass, innerHTML, src, parent
        htmlTag: "div",
        cssClass: "insertEditList"
    });

    // create a div that will hold the edit area
    var editContainer = MakeTag({
        htmlTag: "div",
        parent: listDiv
    });

    var insertButton = MakeTag({
        htmlTag: "button",
        innerHTML: "Insert",
        parent: listDiv,
        cssClass: "button"
    });

    insertButton.onclick = function () {

        // Create an object with all the editable fields having value "".
        // The "" values will show in the input tags after the user clicks Insert. 
        let obj = {};
        for (var spec of inputSpecs) {
            obj[spec.fieldName] = "";
        };
        if (!isEditing) {
            editArea = MakeEditArea({
                inputSpecs: inputSpecs,
                successCallBack: insertSuccess,
                cancelCallBack: cancel,
                editObj: obj // this is the object from which the child div is being made
                        // and that will hold the validated user data. 
            });
            editContainer.appendChild(editArea);
            isEditing = true;
        }
    };

    function insertSuccess(newObj) {
        // newObj contains all the validated input entered by the user.

        // free up editing area for next edit/insert
        isEditing = false;

        // make teh edit area disapper
        deleteEditArea();

        // make a new user child div and add it to the user list div.
        var newDiv = MakeChildEle(newObj, inputSpecs, displayTemplate);
        listDiv.appendChild(newDiv);
    }

    // create one (editable) child div per user object in objList
    for (var myObj of objList) {
        listDiv.appendChild(MakeChildEle(myObj, inputSpecs, displayTemplate));
    }

    return listDiv;

} // MakeInsertEditList