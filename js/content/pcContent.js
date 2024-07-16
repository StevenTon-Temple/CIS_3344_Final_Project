"use strict";
function pcContent() {
   

    var content = ` 
      <h4>Computers</h4>
      <p>
        Personal Computer to be sold information with info. 
      </p>
    `;

    var ele = document.createElement("div");
    ele.innerHTML = content;

    var pcContainer = document.createElement("div");
    ele.appendChild(pcContainer);

    var emp1 = MakePc({seller: "James Du", cost: 10000, location: "36 Fulton Road, Plainfield, NJ 07060", specs: "Corsair Vengeance i7300 (Liquid Cooled Intel® Core™ i5 12600K CPU, NVIDIA® GeForce RTX™ 3070 Graphics, 16GB CORSAIR Vengeance RGB PRO DDR4 Memory, 1TB M.2 NVMe SSD) Black" ,imgSeller: "pics_users/james_du.jpg", imgComputer:"pics_pc/cosairwatercooledgamingpc.png"});
    pcContainer.appendChild(emp1);

    var emp2 = MakePc({ seller: "Karl", cost: 3000, location: "38 Sherman Court, Mount Juliet, TN 37122", specs:"ASUS ROG Strix Gaming Desktop, (AMD Ryzen 7 3700X 8-Core Processor, NVIDIA GeForce GTX 1650 Super Graphics, 16GB RAM, 1TB SSD + 2TB HDD, HDMI, DisplayPort, DVI, Wi-Fi 5, Windows 10 Home, Grey)",  imgSeller: "pics_users/karl.jpg", imgComputer: "pics_pc/asusgamingpc.jpg" });
    pcContainer.appendChild(emp2);

    var emp3 = MakePc({ seller: "Jamie", cost: 2500, location: "974 Myers St. Shelbyville, TN 37160", specs:"Liquid Cooling Gaming PC Desktop (Intel 11th Gen Core i7 11700KF, GeForce RTX 3060 Ti 8GB, 16GB 3200 MHz DDR4, 1TB M.2 NVMe SSD)" ,imgSeller: "pics_users/jamie.jpg", imgComputer: "pics_pc/razerwatercooledpc.jpg" });
    pcContainer.appendChild(emp3);

    var emp4 = MakePc({});
    pcContainer.appendChild(emp4);

    return ele;
}