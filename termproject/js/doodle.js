$(document).ready(function()
{
    $("#q").draggable();
    $("#w").draggable();

});

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dictionary API</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            background-image: url("media/book.jpg");
            background-repeat: no-repeat;
            background-size: cover;
            background-attachment: fixed;
            color: white;
            padding: 3%;
        }
        section {
            color: black;
            background-color: rgba(255, 255, 255, 0.8);
            width: 80%;
            margin: 3% 10%;
            padding: 3%;
            border: 5px solid darkblue;
        }
        #word, #submit {
            background-color: white;
            font-family: 'Times New Roman', Times, serif;
            font-size: 1em;
            font-weight: bold;
            outline: none;
        }
    </style>
</head>
<body>
    <h1>Dictionary API</h1>
    <p>Please type any word.</p>
    <input id="word" type="text">
    <button id="submit" type="button">Submit</button>
    <section id="dic"></section>
    <script>
        let part1 = "https://dictionaryapi.com/api/v3/references/collegiate/json/";
        let part2;
        let part3 = "?key=95500600-c512-4a41-96dc-f8bbaf0a7767"
        let URL;
        document.getElementById("dic").style.visibility = "hidden";

        document.getElementById("submit").addEventListener("click", function()
        {
            part2 = document.getElementById("word").value;
            if(part2 == "")
                part2 = "test";
            URL = part1 + part2 + part3;

            $.getJSON(URL, function(response)
            {
                console.log(response);
                document.getElementById("dic").innerHTML = "<h2>" + response[0].hwi.hw + "<span> (" +
                response[0].fl + ")</span></h2><p>Definition:</p>";
                for(let i = 0; i < response[0].shortdef.length; i++)
                {
                    document.getElementById("dic").innerHTML += "<p>" + (i + 1) + " - " + response[0].shortdef[i] + "</p>";
                }
            });
            document.getElementById("dic").style.visibility = "visible";
        });
        /*
        .catch(error => console.log(error));
        response[0].uros[0][0][0]
        */
    </script>
</body>
</html>
