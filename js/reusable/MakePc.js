// External Script file:
"use strict";
function MakePc(params) {
    if (!params) {
        throw "Error: MakePc Require a parameter object";
    }
    var pcObj = document.createElement("div");

    pcObj.seller = params.seller || "Unkown Name";
    var location = params.location || "Unknown location";
    var cost = params.cost || "Call for cost";
    var imgSeller = params.imgSeller || "";
    //var imgSeller = params.imgSeller || "No Seller Profile Picture available"; 
    var imgComputer = params.imgComputer || "";
    //var imgComputer = params.imgComputer || "No PC Picture available";
    var specs = params.specs || "No specs available";




    // link the styling of pcObj to all the styles that start with ".car"
    // which (if following our CSS naming convention) are all in file: "car.css"
    pcObj.classList.add("pc");

    // first use of “.condition” creates custom (public) property in pcObj.


    // price is private (a variable declared normally in the MakeCar function)

    // create an Info div where condition and price can be displayed
    // (separate from the rest of the UI, e.g., input boxes and buttons)
    var Pcinfo = document.createElement("div");
    pcObj.appendChild(Pcinfo);
    pcObj.setseller = function (newSeller) {
        pcObj.seller = newSeller;
        display();
    }

    var imgdom;
    //add pic of the seller
    if (imgSeller === "") {
        imgdom = document.createElement("div");
        imgdom.innerHTML = "No Seller Image Avaliable";
    } else {
        imgdom = document.createElement("img");
        imgdom.src = imgSeller;
    }
    pcObj.appendChild(imgdom);

    //add pic of a computer
    if (imgComputer === "") {
        imgdom = document.createElement("div");
        imgdom.innerHTML = "No Computer Image Avaliable";
    } else {
        imgdom = document.createElement("img");
        imgdom.src = imgComputer;
    }
    pcObj.appendChild(imgdom);

    // private method display, populates the Info div with current values for 
    // condition and price. 
    var display = function () {
        Pcinfo.innerHTML = "Seller name: " + pcObj.seller + "<br/>Location: " + location + "<br/>Specs: " + specs + "<br/> Cost: " +
            formatCurrency(cost);
            //"<br/>Seller img: "+ imgSeller + "<br/>Computer img: " + imgComputer;

    };



    function setlocation(newlocation) {
        location = newlocation;
        display();
    }

    function setspecs(newspecs) {
        specs = newspecs;
        display();
    }


    // public method to modify price 
    pcObj.changecost = function (changeRate) {
        var n = Number(changeRate);
        console.log("changing cost by this rate " + n);
        cost = cost * (1 + n);
        display(); // show updated price on the page
    };



    // Create User Interface for setting condition
    var sellerButton = document.createElement("button");
    sellerButton.innerHTML = "Change seller to: ";
    pcObj.appendChild(sellerButton);

    var newsellerinput = document.createElement("input");
    pcObj.appendChild(newsellerinput);

    sellerButton.onclick = function () {
        pcObj.setseller(newsellerinput.value);
    };


    pcObj.appendChild(document.createElement("br")); // new line

    // create User interface for changing price
    var locationbutton = document.createElement("button");
    locationbutton.innerHTML = "Click to change location ";
    pcObj.appendChild(locationbutton);

    var locationinput = document.createElement("input");
    pcObj.appendChild(locationinput);

    locationbutton.onclick = function () {
        setlocation(locationinput.value);
    };

    pcObj.appendChild(document.createElement("br"));


    var specsbutton = document.createElement("button");
    specsbutton.innerHTML = "Change specs to: ";
    pcObj.appendChild(specsbutton);

    var specsinput = document.createElement("input");
    pcObj.appendChild(specsinput);

    specsbutton.onclick = function () {
        setspecs(specsinput.value);
    };

    pcObj.appendChild(document.createElement("br"));
    // private function, can only be used within MakeCar
    function formatCurrency(num) {
        return num.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
    }

    var costButton = document.createElement("button");
    costButton.innerHTML = "Change cost by this rate: ";
    pcObj.appendChild(costButton);

    var Newcost = document.createElement("input");
    pcObj.appendChild(Newcost);

    costButton.onclick = function () {
        pcObj.changecost(Newcost.value);
    };



    display(); // show initial properties on the page 
    return pcObj;

}