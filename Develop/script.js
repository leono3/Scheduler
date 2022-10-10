displaySchedule();
updateCards();

setInterval(function () {
    $("#currentDay").text(moment().format("dddd MMM Do, YYYY h:mm:ss a"));
    },1000);

function updateCards() {
    setInterval(function () {
        let tileArr = $("[id=events]");
        for (i = 0; i < tileArr.length; i++) {
            let currentHour = parseInt(moment().format('H'));
            let time = $(tileArr[i]).parent().data('time');
            if (time === currentHour) {
                $(tileArr[i]).parent().attr("data-when", "present");
            }
            else if (time < currentHour) {
                $(tileArr[i]).parent().attr("data-when", "past");
            }
            else {
                $(tileArr[i]).parent().attr("data-when", "future");
            }
        }
    }(), 30000);
};


function scheduleStore (parentId, events) {
    let scheduleObj = JSON.parse(localStorage.getItem("mySchedule"));
    if (!scheduleObj) {
        scheduleObj = {};
    }
    scheduleObj[parentId] = events;
    localStorage.setItem("mySchedule", JSON.stringify(scheduleObj));
    displaySchedule();
}

function displaySchedule () {
    let scheduleObj = JSON.parse(localStorage.getItem("mySchedule"));
    if (!scheduleObj) {
        return;
    }
    let tileArr = $("[id=events]");
    for (i=0; i<tileArr.length; i++) {
        let hour = $(tileArr[i]).parent().parent().attr('id');
        if (scheduleObj[hour]) {
            $(tileArr[i]).val(scheduleObj[hour]);
        };
    };
};

$('.container').on("click", "#saveBtn", function (event) {
    let btnEl = event.target;
    let events = $('#events', $(this).closest("div.row")).val().trim();
    let parentId = $(btnEl).closest("div.row").attr('id');
    scheduleStore(parentId, events);        

});