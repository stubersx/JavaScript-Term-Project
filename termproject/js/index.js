$(document).ready(function()
{
    $("#tabs").tabs({
        event: "mouseover"
    });

    addEventListener("scroll", function()
    {
       $("#header").animate({"background-color":"rgba(0,0,0,1)"}, 1000);
       $("#header").animate({"color":"rgba(225,225,225,1)"}, 1000);
    });

    document.getElementById("header").addEventListener("mouseover", function()
    {
        $("#cover1").animate({"opacity":"0.1"}, 500);
    });
    document.getElementById("content1").addEventListener("mouseover", function()
    {
        $("#cover1").animate({"opacity":"1"}, 1000);
        $("#cover2").animate({"opacity":"0.1"}, 500);
    });
    document.getElementById("content2").addEventListener("mouseover", function()
    {
        $("#cover2").animate({"opacity":"1"}, 1000);
        $("#cover1").animate({"opacity":"0.1"}, 500);
        $("#cover3").animate({"opacity":"0.1"}, 500);
    });
    document.getElementById("content3").addEventListener("mouseover", function()
    {
        $("#cover3").animate({"opacity":"1"}, 1000);
        $("#cover2").animate({"opacity":"0.1"}, 500);
        $("#footer").animate({"background-color":"black"}, 500);
    });

    /*footer styling v2
    document.getElementById("footer").addEventListener("mouseover", function()
    {
        $("#footer").animate({"background-color":"white"}, 1500);
        $("#cover3").animate({"opacity":"0.1"}, 500);
    });

    if I decided to use local storage
    localStorage.setItem("score", x);
    document.getElementById("data").innerHTML = localStorage.getItem("score");
    */
});

function openTab(url)
{
    window.open(url);
}
