/* 
 * This is the JavaScript code for The open2 Engine "Bookworm"
 */


//function to load all the jQuery UI elements
function jQueryUIsetup (){
    $( "#tabs" ).tabs({
        heightStyle: "content"
    });
    $( "#accordion" ).accordion({
        collapsible: true,
        heightStyle: "content",
        icons: { "header": "ui-icon-pencil", "activeHeader": "ui-icon-pencil" }
    });
    $('#btnSaveNotes').button ({
        disabled: true,
        icon: "ui-icon-disk"
    });
    $('#btnLoadReturn').button ({
        icon: "ui-icon-refresh"
    });
    $('#ThemeSelect').selectmenu ({
        change: function () {
        $("#uistyle").attr("href", $('#ThemeSelect').find(":selected").val());
        $('body, textarea').removeClass("light dark");
        $('body, textarea').addClass($('#ThemeSelect').find(":selected").attr('data-background'));
        }
    });
    $('#tabs').show();
};


//Set all of the event listeners
function setEventListeners() {
    
    //listener for data-goto text navigation
    $('body').on('click', '[data-goto]', function (event) {
    //get the data-goto value and convert to a CSS Selector
    let sGoto = "#" + $(this).attr('data-goto');
    //hide the current Passage and show the goto Passage
    $(this).parent('div').hide();
    $(sGoto).show();
    });
};

//Function to load the file and append it to the reader div
function loadDocumentText()
{
    var fileToLoad = document.getElementById("documentToLoad").files[0];
 
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) 
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("display").innerHTML = textFromFileLoaded;
        $('#load').hide();
        $('#reader').show();
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}

//Function to load text file in notes textarea
function loadNotesText()
{
    var fileToLoad = document.getElementById("notesToLoad").files[0];
 
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) 
    {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("txtDocumentNotes").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
    $('#btnSaveNotes').button( "option", "disabled", false );
}

//Function to save textarea as text file
function saveNotesFile()
{
    var textToSave = document.getElementById("txtDocumentNotes").value;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("notesToLoad").value.substr(12);
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
}

//Destroy triggering element, used to remove hidden link for download
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

//button to hide loaded file and show load div
function backToLoad () {
    $('#reader').hide();
    $('#load').show();
}

//everything defined, so run setup functions
jQueryUIsetup();
setEventListeners();
