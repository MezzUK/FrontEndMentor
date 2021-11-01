let timeSpan = 'weekly';

let requestFile = 'data/data.json'

let request = new XMLHttpRequest();

var timesheets = '';

readJSON(requestFile);

request.onload = function(){    
    timesheets = request.response;
    console.log(timesheets);
    showTimeSheets(timesheets);
}

function showTimeSheets(timesheets){
    for (let index = 0; index < timesheets.length; index++) {
        const myArticle = document.createElement("article");
        myArticle.classList.add("card__timesheet");
        myArticle.style.backgroundColor = 'var(--' + timesheets[index].title.toLowerCase().replace(" ", "-") + ')';
        
        const timeSheetHeader = document.createElement("div")
        timeSheetHeader.classList.add("card__timesheet__header");

        const timeSheetHeaderImage = document.createElement("img");
        timeSheetHeaderImage.classList.add("card__timesheet__header__image");
        timeSheetHeaderImage.src = "images/icon-" + timesheets[index].title.replace(" ", "-") + ".svg";
        
        const timeSheetDetails = document.createElement("div");
        timeSheetDetails.classList.add("timesheet__details");

        const timeSheetDetailsTitle = document.createElement("div");
        timeSheetDetailsTitle.classList.add("timesheet__details__title");
        timeSheetDetailsTitle.innerHTML = timesheets[index].title;

        const timeSheetDetailsTime = document.createElement("div");
        timeSheetDetailsTime.classList.add("timesheet__details__time");
        timeSheetDetailsTime.innerHTML = timesheets[index].timeframes[timeSpan].current + "hrs";

        const timeSheetDetailsElipses = document.createElement("div");
        timeSheetDetailsElipses.classList.add("timesheet__details__elipses");
        timeSheetDetailsElipses.innerHTML = "...";

        const timeSheetDetailsPrevious = document.createElement("div");
        timeSheetDetailsPrevious.classList.add("timesheet__details__previous");
        var period;
        switch(timeSpan){
            case "daily":
                period = "Yesterday - ";
                break;
            case "weekly":
                period = "Last Week - ";
                break;
            case "monthly":
                period = "Last Month - ";
                break;
        }

        timeSheetDetailsPrevious.innerHTML = period + timesheets[index].timeframes[timeSpan].previous + "hrs";
        
        myArticle.appendChild(timeSheetHeader);
        timeSheetHeader.appendChild(timeSheetHeaderImage);
        myArticle.appendChild(timeSheetDetails);
        timeSheetDetails.appendChild(timeSheetDetailsTitle);
        timeSheetDetails.appendChild(timeSheetDetailsTime);
        timeSheetDetails.appendChild(timeSheetDetailsElipses);
        timeSheetDetails.appendChild(timeSheetDetailsPrevious);

        const footer = document.getElementsByClassName("attribution")[0];
        document.body.insertBefore(myArticle, footer);
    }
}

function updateTimeSheets(){
    var cards = document.getElementsByClassName("card__timesheet");
    while(cards.length > 0){
        cards[0].parentNode.removeChild(cards[0]);
    }
    showTimeSheets(timesheets);
}

function filterTime(time){
    timeSpan = time;
    document.getElementsByClassName("active")[0].classList.remove("active");
    document.getElementsByName(timeSpan)[0].classList.add("active");
    updateTimeSheets();
    console.log(timeSpan)
}

function readJSON(requestFile){
    request.open('GET', requestFile);
    request.responseType = 'json';
    request.send();
}