"use strict";
function MakeSlideShow(parms) {


    var myobjlist = parms.myobjlist;
    var style = parms.style || "slideShow";
    var fontsize = parms.fontsize || "font-size: 20px";
    var fontcolor = parms.fontcolor || "color:  red";

    if (!myobjlist[0].fileName || !myobjlist[0].caption) {
        throw ("MakeSlideShow expects an array of objects, each having an 'image' and a 'caption' property");
    }

    var slideShow = document.createElement("div");
    slideShow.classList.add(style);

    // add a div that will hold the image
    var div = document.createElement("div");
    slideShow.appendChild(div);

    var captiondiv = document.createElement("div");
    slideShow.appendChild(captiondiv);
    captiondiv.style = fontsize;
    captiondiv.style = fontcolor;
    captiondiv.classList.add("caption");

    // add image into the div & set the image's src attribute to show picture
    var myImage = document.createElement("img");
    div.append(myImage);

    var buttonDiv = document.createElement("div");
    slideShow.appendChild(buttonDiv);

    // add back button under the image (and empty paragraph)
    var backButton = document.createElement("button");
    backButton.innerHTML = " &lt; ";
    buttonDiv.appendChild(backButton);

    // add forward button under the image (and empty paragraph)
    var fwdButton = document.createElement("button");
    fwdButton.innerHTML = " &gt; ";
    buttonDiv.appendChild(fwdButton);

    var enlarge = document.createElement("button");
    enlarge.innerHTML = " Enlarge ";
    buttonDiv.appendChild(enlarge); 
    var reduce = document.createElement("button");
    reduce.innerHTML = " Reduce ";
    buttonDiv.appendChild(reduce);
    var reset = document.createElement("button");
    reset.innerHTML = " Reset ";
    buttonDiv.appendChild(reset);

    
    function large() {
        myImage.style = "width: 80%";
    }
    function smaller() {
        myImage.style = "width: 20%";
    }
    function normal() {
        myImage.style = "width: 50%";
        
    }


    // private variable that keeps track of which image is showing
    var picNum = 0;
    setPic();
    function setPic() {
        myImage.src = myobjlist[picNum].fileName;
        
        captiondiv.innerHTML = myobjlist[picNum].caption;
    }

    // Advance to next image in the picture list
    function nextPic() {

        if (picNum < myobjlist.length - 1) {
            picNum++;
        }
        setPic();
    }

    // Go to the previous image in the picture list
    function prevPic() {

        if (picNum > 0) {
            picNum--;
        }
        setPic();
    }

    // add next and previous funcionality to next and previous buttons
    backButton.onclick = prevPic;
    fwdButton.onclick = nextPic;
    enlarge.onclick = large;
    reduce.onclick = smaller;
    reset.onclick = normal;
    

    slideShow.setPicNum = function (newNum) {
        if ((newNum >= 0) && (newNum < myobjlist.length)) {
            picNum = newNum;
            // change the src attribute of the image element to the desired new image)				
            setPic();
        }
    };

    return slideShow;
}