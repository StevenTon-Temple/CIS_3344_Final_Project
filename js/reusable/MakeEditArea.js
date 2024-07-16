"use strict";

function MakeEditArea(params) {

    // defensive (provider style) programming. First check if params has everything we need...
    if (!params.inputSpecs || !params.inputSpecs[0]) {
        var errorMsg = "MakeEditArea did not receive a parameter property named 'inputSpecs'\n" +
            "that has at least one object (that defines one input field).";
        alert(errorMsg); // this would generally be a programmer error, not user error
        throw errorMsg;
        return;
    }
    var inputSpecs = params.inputSpecs;


    if (!params.successCallBack || !(params.successCallBack instanceof Function)) {
        var errorMsg = "MakeEditArea did not receive a parameter property named 'successCallBack',\n" +
            "a Consumer function that will be called (passing an object full of user entered data)\n" +
            "if the user clicks 'Submit' and all the inputs validate.";
        alert(errorMsg); // this would generally be a programmer error, not user error
        throw errorMsg;
        return;
    }
    var successCallBack = params.successCallBack;


    if (!params.cancelCallBack || !(params.cancelCallBack instanceof Function)) {
        var errorMsg = "MakeEditArea did not receive a parameter property named 'cancelCallBack',\n" +
            "a Consumer function that will be called if the user clicks 'Cancel'.\n" +
            "(no input will be passed to the cancel call back function).";
        alert(errorMsg); // this would generally be a programmer error, not user error
        throw errorMsg;
        return;
    }
    var cancelCallBack = params.cancelCallBack;


    // Now that input params have been checked (with any issues throwing an
    // exception and halting execution), begin making the editArea div.
    var editDiv = MakeTag({
        htmlTag: "div",
        cssClass: "editArea"
    }); // MakeTag req'd property: htmlTag, opt'l properties: innerHTML, cssClass, src, parent

    MakeTag({
        htmlTag: "h1",
        innerHTML: params.title || "Untitled",
        parent: editDiv
    })
    // create one row per input field. This row shall contain prompt, 
    // input box, and possible error msg.
    for (var spec of inputSpecs) {
      

        var rowDiv = MakeTag({
                htmlTag: "div",
                parent: editDiv,
                cssClass: "row"
            });

            // Add prompt for field...
            MakeTag({// dont need a reference to this span tag.
                htmlTag: "span",
                cssClass: "prompt",
                innerHTML: spec.prompt,
                parent: rowDiv
            });

        if (spec.inputType === "textArea") {
            spec.inputTag = MakeTag({
                htmlTag: "textArea",
                cssClass: "textArea",
                parent: rowDiv
            });
        } else if (spec.inputType === "radio") {
            const radio = MakeRadio({
                objList: spec.choices,
                selected: params.editObj[spec.fieldName].toLowerCase()
            });
            rowDiv.appendChild(radio);
            spec.inputTag = radio;
        } else {
            spec.inputTag = MakeTag({
                htmlTag: "input",
                parent: rowDiv
            });
        }

            // Pre-populate the input tags of the edit area with editObj values (if editObj was supplied). 
            if (params.editObj) {
                spec.inputTag.value = params.editObj[spec.fieldName];
            }

            // Add span tag to hold error Msg for this field. We need to access this later, so save it
            // right into the inputSpecs object that it relates to.
            spec.errorMsg = MakeTag({
                htmlTag: "span",
                cssClass: "error",
                innerHTML: "&nbsp;", // a blank, keeps it's space vertically
                parent: rowDiv
            });
        } //  for (var spec of inputSpecs

        // Add a new line before the submit and cancel buttons
        MakeTag({// dont need a reference to this tag (so not saving MakeTag's return value).
            htmlTag: "br",
            parent: editDiv
        });

        var submitButton = MakeTag({
            htmlTag: "button",
            innerHTML: "Submit",
            parent: editDiv
        });

        var cancelButton = MakeTag({
            htmlTag: "button",
            innerHTML: "Cancel",
            parent: editDiv
        });

        editDiv.recordLevelMsg = MakeTag({
            htmlTag: "span",
            cssClass: "recLevelMsg",
            parent: editDiv
        });
        submitButton.onclick = function () {
            var allGood = true;
            for (var spec of inputSpecs) {
                var datas = spec.inputTag.value;
                if (spec.inputTag.value.length < spec.minLen) {
                    console.log("Error: input must have at least " + spec.minLen + " character(s).");
                    spec.errorMsg.innerHTML = "Error: input must have at least " + spec.minLen + " character(s).";
                    allGood = false;
                }
                else if (spec.inputTag.value.length > spec.maxLen) {
                    spec.errorMsg.innerHTML = "Error: input must have atleast " + spec.maxLen + " character(s).";
                    allGood = false;
                }

                else if (spec.dataType === "string" && spec.inputTag.value != "") { //did the revese of above checked if it is was datatype was correct and if not throw an error
                    if (isNaN(spec.inputTag.value) && typeof datas === 'string') {
                        spec.errorMsg.innerHTML = "&nbsp;"
                        console.log("string data if work")
                    }
                }
                else if (spec.dataType === "number") {
                    if (isNaN(spec.inputTag.value)) {
                        spec.errorMsg.innerHTML = "Error: input must be a number.";
                        allGood = false;
                    }

                }
                else if (spec.dataType === "date") {
                    try {
                        var ifdate = new Date(spec.inputTag.value).toISOString();
                        spec.errorMsg.innerHTML = "&nbsp;"
                    } catch (e) {
                        spec.errorMsg.innerHTML = "Error: input must be a date in YYYY-MM-DD format or MM-DD-YYYY ";
                        allGood = false;

                    }
                }
                else {
                    spec.errorMsg.innerHTML = "&nbsp;"; // wipe any previous error message that might be there.
                }

            }
            if (!allGood) {
                editDiv.recordLevelMsg.innerHTML = "Please Try Again";
                return;
            }


            editDiv.recordLevelMsg.innerHTML = "Data Accepted !";

            
            if (!params.editObj) {
                params.editObj = {};
            }

            // Put user's validated input the editObj (the same object that may have been passed in). 
            for (var spec of inputSpecs) {
                params.editObj[spec.fieldName] = spec.inputTag.value;
            }

            // call the success call back function, passing to it the validated user input (in an object). 
            successCallBack(params.editObj);
        }; // submit onclick function 

        function clearAll() {
            // Blank out all input tags and also the record level message.
            for (var spec of inputSpecs) {
                spec.inputTag.value = "";
            }
            editDiv.recordLevelMsg.innerHTML = "";
        }

        cancelButton.onclick = function () {
            // Since the user is cancelling, clear out all inputs and record level msg. 
            clearAll();

            // inform the consumer that the user cancelled (let them do what they want about that). 
            cancelCallBack();
        };

        return editDiv;
    }

