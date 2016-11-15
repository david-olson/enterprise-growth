window.onload = main();

function main() {
    var radios = document.getElementsByClassName('answer_button');
    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('click', function() {
            radioCheck(this);
        })
    }
}

function radioCheck(elem) {
    var theId,
        theQuestion,
        theAnswer,
        theRadio,
        theAnswerButtons,
        theButton;
    theId = elem.id;
    theQuestion = theId.charAt(1);
    theAnswer = theId.substr(-1, 1);
    theAnswerButtons = 'question' + theQuestion + '_buttons';
    theRadio = 'q' + theQuestion + 'a' + theAnswer;
    theRadio = document.getElementById(theRadio);
    $('.' + theAnswerButtons).removeClass('answerChecked');
    $(elem).addClass('answerChecked');
    theRadio.checked = true;
}