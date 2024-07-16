"use strict";
function homeContent() {
// ` this is a "back tick". You can use it to define multi-line strings in JavaScript.
// 
// NetBeans menu option "Source - Format" will not work with the text inside of a 
// String, so you have to do this indentation manually with the editor. 
    //<img class="image"
   // src = "/img/html/vangogh-lg.jpg"
   // alt = "Van Gogh, Self-portrait." >
var content = `
 <img class = "mainImg"
src = pics/pcfixer.jpg>
        <h2>Description</h2>

        <p>
            Have you had a hard day time with your PC? Is is not working? Do you think it broken?
            Then this is the site for you! This is a site full of tips and tickets on how to fix and diagnosis your PC so that you can get it working!
            If you are a IT you know how important making sure your PC is up to date is so come here to learn the newest tech and learn tricks you many not have known before.
            Don't be afraid to ask any questions we won't judge after all we all started somewhere we were once just like you. It's fine to not know how thing work but we are here to help!
            This site is a hub for all PC enthusiasts.
        </p>


      
        <p>
  <h2>About Us</h2>
            PCporium has been in busniess since 1984 we have a lot of experices so we've seen a lot in the past decade.
            At this company we strive to be as best as we can to help others fix issues relating to PC or to answers the questions you have.
            We apperciate the workers of this company and strive for the best PC support we can give to those who wish for it.
            We are a no tolarance for bullying and or any type of abuse on this site please read our terms and agreements on our blog.

        </p>
        <h2>Location, Open Hours, & Phone Number</h2>
        <p>
            264 Strawberry St. Fenton, MI 48430
            <br>
            <br>
            Mon-Fri : 9:00am-5:00pm EST
            <br>
            Sat-Sun : 9:00am-4:00pm EST
            <br>
            <br>
            Call 860-828-8250 for our customer support to help you!
        </p>

            <p>
            <h3>Helpful External link:</h3>
                 <a href="https://pcpartpicker.com/"> Build a PC with PC Parts Builder</a>

            </p>


    `;
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;
};
      