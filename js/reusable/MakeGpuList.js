"use strict";

// Each element of gpuObjArray is expected to have properties: 
//      name, condition, price, imgURL

function MakeGpuList(params) {

   

    function MakeGpu(gpuObj) {
       
        var gpuimg = document.createElement("div");
        var name = gpuObj.name || "No name found";
        var condition = gpuObj.condition || "Unknown Condition";
        var price = gpuObj.price || "Call for Price";
        var imgURL = gpuObj.imgURL || "";
        var numReserve = Math.floor(Math.random() * 101);
        var imgdom;

        if (imgURL === "") {
            imgdom = document.createElement("div");
            imgdom.innerHTML = "No Gpu Image Avaliable";
        } else {
            imgdom = document.createElement("img");
            imgdom.src = imgURL;
        }
        gpuimg.appendChild(imgdom);

        // Create p DOM element to hold condition and price
       

        var gpuDiv = document.createElement("div");
        gpuDiv.classList.add("gpu"); // link returned object to ".car" styling
        // that (if you followed our css naming convention) is in file: "car.css"
        // Notice car.css has more complexity, styling sub-elements of the car.

        var infoDiv = document.createElement("div");
        gpuDiv.appendChild(infoDiv);

        // Create h3 DOM element to hold the name
        var gpuHeader = document.createElement("h3");
        gpuHeader.innerHTML = name;
        gpuDiv.appendChild(gpuHeader);

        var reserveSpan = document.createElement("span");
        

        function display() {
            infoDiv.innerHTML = "GPU condition: " + condition + "<br/> price: " +
                formatCurrency(price);
            if (name == "No name found") {
                numReserve = 0;
            }
            reserveSpan.innerHTML = numReserve + " People reserved ";

           
        }

        display();


       
        gpuDiv.appendChild(reserveSpan);

        

        var reserveImg = document.createElement("img");
        reserveImg.src = "pics/reserve.png";
        reserveImg.classList.add("reserveImage");
        gpuDiv.appendChild(reserveImg);

        reserveImg.onclick = function () {
            numReserve++;
            reserveImg.src = "pics/reservedgpu.png";
            display();
        };

      

        // create img DOM element and set it's src attribute
        var gpulmg = document.createElement("img");
        gpulmg.src = imgURL;
        gpuDiv.appendChild(gpulmg);

        // private function, can only be used within MakeGpu
        function formatCurrency(num) {
            if (isNaN(num)) {
                return num;
            } else {
                var numNum = parseFloat(num);
                return numNum.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
            }
        }

        return gpuDiv;
    }

    // check input parameter object...
    if (!params || !params.gpuObjArray || !params.gpuObjArray[0]) {
        throw "function MakeGpuList requires a paramter object that has a property " +
        "named 'gpuObjArray' which is an array with at least one element.";
        // stops execution after the above message appears in Chrome's console (in red)
    }

    // entry point of MakeGpuList
    var containerDiv = document.createElement("div");
    containerDiv.classList.add("gpuList");

    // create local variables to hold what's come in from the parameter object 
    // (providing default values if appropriate). 
    var gpuObjArray = params.gpuObjArray;
    var updateDate = params.updated || "Unknown";
    var title = params.title || "Untitled";
    var shipment = params.shipment || "Unknown";

    

    var updateMsg = document.createElement("h4");
    updateMsg.classList.add("updatedOn");
    updateMsg.innerHTML = "This list last updated: " + updateDate;
    containerDiv.appendChild(updateMsg);

    var updatetitle = document.createElement("h4");
    updatetitle.classList.add("Untitled");
    updatetitle.innerHTML = "GPU Series: " + title;
    containerDiv.appendChild(updatetitle);

    var updateshipment = document.createElement("h4");
    updateshipment.classList.add("Shipment");
    updateshipment.innerHTML = "The next shipment is: " + shipment;
    containerDiv.appendChild(updateshipment);


    // You can iterate over the objects in the array without having to use index values...
    for (var theGpuObj of gpuObjArray) {
        containerDiv.appendChild(MakeGpu(theGpuObj));
    }
    return containerDiv;

}