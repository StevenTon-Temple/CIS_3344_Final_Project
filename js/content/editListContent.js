"use strict";
function editListContent() {
    var userListDiv = document.createElement("div");

    ajax("json/pcparts.json", processPcPartList, userListDiv);
    function processPcPartList(pcPartsList) {

        // Defining the edit area and how values will be validated.
        var pcPartsInputSpecs = [
            {
                "prompt": "Name: ",
                "fieldName": "name",
                "dataType": "string",
                "minLen": 1, // required field
                "maxLen": 50
            },
            {
                "prompt": "User Image (URL): ",
                "fieldName": "image",
                "dataType": "string",
                "minLen": 0, // empty string is OK
                "maxLen": 500
            },
            {
                "prompt": "Price: ",
                "fieldName": "price",
                "dataType": "number",
                "minLen": 0 // means optional
            },
            {
                "prompt": "Release Date: ",
                "fieldName": "releasedate",
                "dataType": "date",
                "minLen": 0, // means optional

            },
            {
                "prompt": "Stock: ",
                "fieldName": "stock",
                "dataType": "string",
                "inputType": "radio",
                "choices": [
                    { showOption: "In Stock", value: "In Stock" },
                    { showOption: "Out Of Stock", value: "Out Of Stock" }

            ]}
           
        ];
        var displayTemplate = "<img src='${obj.image}'/> <span>${obj.name}</span> <span>${obj.price}</span>";
        userListDiv.appendChild(MakeInsertEditList(pcPartsList, pcPartsInputSpecs, displayTemplate));
    }


    ajax("json/users.json", processUserList, userListDiv);

    function processUserList(userList) {

        // Defining the edit area and how values will be validated.
        var userInputSpecs = [
            {
                "prompt": "User Email: ",
                "fieldName": "userEmail",
                "dataType": "string",
                "minLen": 1, // required field
                "maxLen": 50
            },
            {
                "prompt": "User Image (URL): ",
                "fieldName": "image",
                "dataType": "string",
                "minLen": 0, // empty string is OK
                "maxLen": 500
            },
            {
                "prompt": "Birthday: ",
                "fieldName": "birthday",
                "dataType": "date",
                "minLen": 0 // means optional
            },
            {
                "prompt": "Membership Fee: ",
                "fieldName": "membershipFee",
                "dataType": "number",
                "minLen": 0, // means optional
                "maxLen": 10 // 10 characters including decimal point
            }
        ];

        
            // defining how you want the objects shown in the child elements within the list
            var displayTemplate = "<img src='${obj.image}'/> <span>${obj.userEmail}</span>";
            userListDiv.appendChild(MakeInsertEditList(userList, userInputSpecs, displayTemplate));

            //userListDiv.appendChild(MakeInsertEditList(pcPartsList, pcPartsInputSpecs, displayTemplate));
    }
   
        return userListDiv;

    }
