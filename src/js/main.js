//Javascript function that enables the hamburger menu to be activated.
"use strict";
document.getElementById("menu-hamburger").addEventListener("click",function(){
    const links=document.getElementById("links");

    links.classList.toggle("active");

});

/*Javascript function that means that when the button is pressed, 
the text box can be switched between being opened and closed*/
document.getElementById("click-button").addEventListener("click", function(){
const messageText=document.getElementById("message");

messageText.classList.toggle("notShown");

});
