/* 
 * Any JS code that we have stored under folder "js/components" is code that will 
 * output content that the router will inject into the content area. 
 * 
 * These functions take no input parameters (router is not supplying any) and 
 * they output a single DOM element (usually a div) that the router willl 
 * inject into the content area.
 * 
 * These functions ARE ALLOWED to know everything about the HTML page and any 
 * CSS rules that are available to the HTML page. They are non-reusable components 
 * written by the HTML coder.
 */

"use strict";
function slideShowContent() {

    var content = `
    <style>
        .slideShowContainer {
            display:flex; 
            flex-direction: row;
        }
        .slideShow {
            box-sizing: border-box; 
            width: 50%;
        }
    </style>
`;

    var container = document.createElement("div");
    container.innerHTML = content;
    container.classList.add("slideShowContainer");


    ajax("json/waterFun.json", processFunList, document.getElementById("content"));
    function processFunList(funList) {


        // MakeSlideShow expects a property called "image", so provide that...
        for (var i = 0; i < funList.length; i++) {
            funList[i].fileName = funList[i].pic;
            funList[i].caption = funList[i].item + " $" + funList[i].price;
            console.log("image " + i + " " + funList[i].image);
        }


        console.log("funList after setting image properties");
        console.log(funList);
        var ss = MakeSlideShow({
            myobjlist: funList,
            style: "slideShow",
            fontsize: "font-size: 30px",
            fontcolor: "color: black"
        });
        container.appendChild(ss);

        ss.setPicNum(1);
    }


    // Example showing why you need to get the ss reference, so the HTML page can invoke 
    // any public methods that may be available from the returned slide show object.

    // create second slideshow object
    ajax("json/users.json", processuserList, document.getElementById("content"));

    function processuserList(userList) {
        for (var i = 0; i < userList.length; i++) {
            userList[i].fileName = userList[i].image;
            userList[i].caption = userList[i].userEmail;
        }

        console.log("userList after setting image properties");
        console.log(userList);
        var ss = MakeSlideShow({
            myobjlist: userList,
            style: "slideShow",
            fontsize: ""
        });
        container.appendChild(ss);
        ss.setPicNum(1);
    }



    return container;
}