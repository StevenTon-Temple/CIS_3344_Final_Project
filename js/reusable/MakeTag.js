"use strict";

// Builds a DOM element, sets various properties, may appent his DOM element 
// to a parent. Returns the built DOM element. Properties of 'param's input parameter obj: 
// 
// htmlTag (required) the type of DOM element built
// innerHTML (opt'l), set this into the new DOM element
// cssClass (opt'l), add this css class to the new DOM element
// src (opt'l for img tags), set src attribut to this image file name.
// parent (opt'l) add this new DOM element to parent (also a DOM element)

/* Full usage example: 
 * 
 * var ele = MakeTag ({
 *      htmlTag: "div", 
 *      innerHTML: "hello", 
 *      cssClass: "divClass",
 *      src: picFileName, 
 *      parent: parentDiv
 *      });
 */
function MakeTag(params) {
    if (!params.htmlTag) {
        var errorMsg = "Function MakeTag requires a parameter object with an 'htmlTag' property.";
        alert(errorMsg);
        throw new Error(errorMsg);
        return;
    }
    var ele = document.createElement(params.htmlTag);

    if (params.innerHTML) {
        ele.innerHTML = params.innerHTML;
    }
    if (params.src) {
        ele.src = params.src;
    }
    if (params.cssClass) {
        ele.classList.add(params.cssClass);
    }
    if (params.parent) {
        params.parent.appendChild(ele);
    }

    return ele;
}