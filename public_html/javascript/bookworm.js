/* 
 * This is the JavaScript code for The open2 Engine "Bookworm"
 */


//function to load all the jQuery UI elements
function jQueryUIsetup (){
    $( "#tabs" ).tabs();
};


//Set a click handler for the <body> on anything with the attribute of "data-goto"
function setGotoListener() {
    $('body').on('click', '[data-goto]', function (event) {
    //get the data-goto value and convert to a CSS Selector
    let sGoto = "#" + $(this).attr('data-goto');
    //hide the current Passage and show the goto Passage
    $(this).parent('div').hide();
    $(sGoto).show();
    });
};

//Function to load the file and append it to the reader div
function loadFileAsText()
{
    var fileToLoad = document.getElementById("fileToLoad").files[0];
 
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) 
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("reader").innerHTML = textFromFileLoaded;
        $('#load').hide();
        $('#reader').show();
        $('#btnLoadReturn').show();
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}

//button to hide loaded file and show load div
function backToLoad () {
    $('#reader').hide();
    $('#btnLoadReturn').hide();
    $('#load').show();
}

//everything defined, so run setup functions
jQueryUIsetup();
setGotoListener();
