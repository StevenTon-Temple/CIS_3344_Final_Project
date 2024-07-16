"use strict";
function blogContent() {


    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
<p>
            Homework 8<br>
I am not going to lie this was the most fustrating homewwork out of all of the 8 homeworks.
The instructions were not really clear and made it hard for me to know what to do.
However it was also because it was end of year so i got lazy and did some dumb mistakes like forgeting to write a blog for this hw.
I felt other than that it was a very fustrating time working on this after break because all my classes piled work on me.
However I had fun in this class and wish you a good break and thanks for the fun times :).

            </p>
<p>
            Homework 7<br>
I thought the Homework was okay but I did get confused a little with the instructions.
It didnt take me long to do it however.
To me because of how i did it i was doing it I did things by accident and finished it early because I did things I didnt think was nessarly but was which helped me in the long run.
It was a okay homework but fustrating sometimes.
 <p>
            Homework 6<br>
I thought the homework was okay but I did get confused a lot in the instructions sometime such as what to do with auto increment primary key.
I also didn't know if we had to do a prameter like we did in pervious HW because it wasn't explicitly explained.
It took me about 5-6 hours to do but if we cut out the hours where I was stuck on what to do it more like 3-4 hours.
I was fustrates me so much that most of the time my code works it just stupid mistake such as miscapitalizing a word such as objlist instead of objList.
Overall when I started to findout what to do it all clicked and it wasn't hard to finish it after. 
            </p>

            <p>
            Homework 5<br>
I thought that the homeowork was fine but I did get stuck in a lot of places.
Mostly was just me thinking about what to do really and when I found out it was pretty easy.
I took me long to do because I was at multiple weddings over the weekend and so I didn't have long to think about it.
It took me around 2-4 hours to finish this homework.
I got really fustrated during the paramerters part on what to do.
            </p>
        <p>
            Homework 4<br>
            I thought that the homework was okay it didn't take me long.
            The hard part for me was to think about what to do for my event handler.
            Otherwise it wasnt so bad but I spent sometime on my stylesheet.
            It took me about 2-3 hours to work on it but most of it was thinking about what to do.
            I was confused for a little when I started but I was okay after a while.

</p>
      <p>
             Homework 3<br>
             I think that this homework wasn't too bad.
             However I got very confused with things so it took a while to finsish.
             This took me about 2-3 hours to complete it was mostly just waiting to ask for questions for instructions other than that it was not to hard.
             I really found fustrating with my thoughts were how the style was to make it look good but because I had so much going on I could not do it and it fustrates me.
             The terminolgy kinda got me for a while before it was able to understand it.
        </p>
        <p>
             Homework 2<br>
             I thought this homework was reaasonable and easy to understand.
             It did take a little to understand though because I was very tired when I first tried to understand it but when I did it when I wasn't tired it was fine.
             I did have a little hard time trying to make my colors look good and easy to read and understand with my background.
             I actually enjoyed this homework because it helped with my ADHD.
             The time to complete this wasn't as bad as I thought it would be.
         </p>

      

        <p>
            Homework 1<br>
            I found this HW pretty easier expect for the database subject part of it because I was confused.
            I learned how to wrap text around an image and what external style sheet is.
            In addition, I discovered that if you have position fixed in the title it will break the white space nowrap.
            I think that some of the confusing things in this HW was the database and what an external sheet was.
        </p>

        <p>
            My Web development expeirence is not bad it dosen't seem to too hard right now.
            I don't have much experiene yet however so I don't know if it will become harder or not.
            However, from what I've done so far is not bad and kinda fun.
            I does get fustrating sometimes when you see something of center and you can't fix it.
        </p>

        <h2>Comment_table</h2>
<p> I changed this info from HW1 to fit HW6 </p>
        <ul>
            <li>
                processor_id (Primary key, db auto-increment)
            </li>
            <li>
                processor_name (Unique, char 50)
            </li>
            <li>
                processor_pic (String 200) https://dissolve.com/stock-photo/repairman-using-tongs-while-fixing-royalty-free-image/101-D2115-264-951
            </li>
            <li>
                processor_price(Double,0...1000)
            </li>
            <li>
                processor_email(String, from user_table)
                processor_webid(int, from user_table)
            </li>
            <li>
                processor_releasedate(date)
            </li>
            <li>
                processor_stock(String, 200)
            </li>
        </ul>
    `;

    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;
}