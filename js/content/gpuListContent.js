"use strict";
function gpuListContent() {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
      <h4>Gpu List</h4>
      <p>
        Gpu for sale. 
      </p>
    `;

   

    var ele = document.createElement("div");
    ele.innerHTML = content;

  

    var myCarListDiv = MakeGpuList({
        gpuObjArray: [
            { name: "3090 ti", condition: "Great", price: 3500, imgURL:"pics/3090ti.jpg" },
            {}, // this "gpu object" should receive default values for condition and price...
            { name: "3080", condition: "Poor", price: 1500, imgURL: "pics/3080.jpg"  }
        ],
        updated: "09/09/2024"
        , title: "3000 Series"
        , shipment: "10/09/2024"
    });
    ele.appendChild(myCarListDiv);

    var yourGpuListDiv = MakeGpuList({
        gpuObjArray: [
            { name: "980 ti", condition: "Poor", price: 150, imgURL: "pics/980ti.jpeg" },
            { condition: "Ok", price: 2500 }
        ],
        updated: "09/09/2024"
        , title: "900 Series"
    });
    ele.appendChild(yourGpuListDiv);

    return ele;
}