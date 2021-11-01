// var timesheetCard = document.getElementsByClassName('card__timesheet');
// var timesheetHeaderTitle = document.getElementsByClassName('timesheet__details__title');
// var timesheetHeaderImage = document.getElementsByClassName('card__timesheet__header__image');
// var timesheetTime = document.getElementsByClassName('timesheet__details__time');
// var timesheetPrevious = document.getElementsByClassName('timesheet__details__previous');

let requestFile = 'data/data.json'

let request = new XMLHttpRequest();

request.open('GET', requestFile);

request.responseType = 'json';
request.send();

request.onload = function(){    
    var timesheets = request.response;

    for (let index = 0; index < timesheets.length; index++) {
        //const element = timesheets[index];
        const myArticle = document.createElement("article");
        myArticle.classList.add("card__timesheet");
        myArticle.style.setProperty('background-color', 'var(--' + timesheets[index].title.toLowerCase() + ')');
        
        const timeSheetHeader = document.createElement("div")
        timeSheetHeader.classList.add("card__timesheet__header");

        const timeSheetHeaderImage = document.createElement("img");
        timeSheetHeaderImage.classList.add("card__timesheet__header__image");
        timeSheetHeaderImage.src = "images/icon-" + timesheets[index].title + ".svg";
        
        const timeSheetDetails = document.createElement("div");
        timeSheetDetails.classList.add("timesheet__details");

        const timeSheetDetailsTitle = document.createElement("div");
        timeSheetDetailsTitle.classList.add("timesheet__details__title");
        timeSheetDetailsTitle.innerHTML = timesheets[index].title;

        const timeSheetDetailsTime = document.createElement("div");
        timeSheetDetailsTime.classList.add("timesheet__details__time");
        timeSheetDetailsTime.innerHTML = timesheets[index].timeframes['weekly'].current + "hrs";

        const timeSheetDetailsElipses = document.createElement("div");
        timeSheetDetailsElipses.classList.add("timesheet__details__elipses");
        timeSheetDetailsElipses.innerHTML = "...";

        const timeSheetDetailsPrevious = document.createElement("div");
        timeSheetDetailsPrevious.classList.add("timesheet__details__previous");
        timeSheetDetailsPrevious.innerHTML = "Last Week - " + timesheets[index].timeframes['weekly'].previous + "hrs";
        
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