window.onload = main();

function main() {
    var radios = document.getElementsByClassName('answer_button'),
        submitButtons = document.getElementsByClassName('submit_answer'),
        backButtons = document.getElementsByClassName('back_button'),
        windowH = window.innerHeight;
    for (i = 0; i < radios.length; i++) {
        radios[i].addEventListener('click', function () {
            radioCheck(this);
        })
    }
    for (n = 0; n < submitButtons.length; n++) {
        submitButtons[n].addEventListener('click', function () {
            answerSubmit(this);
        });
    }
    for (a = 0; a < backButtons.length; a++ ) {
        backButtons[a].addEventListener('click', function() {
            answerBack(this);
        });
    }
    $('section').css({
        minHeight: windowH + 'px'
    });
    setQuestionHeights();
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

function answerSubmit(elem) {
    var aId,
        thisQuestion,
        nextQuestion,
        nextQuestionId,
        nextQuestionObject,
        nextQuestionOffsetTop,
        scrollSpeed;
    aId = elem.id;
    thisQuestion = aId.substr(-1, 1);
    nextQuestion = parseInt(thisQuestion) + 1;
    nextQuestionId = 'question-' + nextQuestion;
    nextQuestionObject = document.getElementById(nextQuestionId);

    nextQuestionObject.style.display = 'block';
    setTimeout(function () {
        nextQuestionOffsetTop = nextQuestionObject.offsetTop;
        $('html, body').animate({
            scrollTop: nextQuestionOffsetTop + 'px'
        });
    }, 150);
    updatePercentage(thisQuestion);
//    setInterval(updatePercentage(thisQuestion), 1000);
}

function answerBack(elem) {
    var aId,
        thisQuestion,
        lastQuestion,
        lastQuestionId,
        lastQuestionObject,
        lastQuestionOffsetTop;
    aId = elem.id;
    thisQuestion = aId.substr(-1, 1);
    lastQuestion = parseInt(thisQuestion) - 1;
    lastQuestionId = 'question-' + lastQuestion;
    lastQuestionObject = document.getElementById(lastQuestionId);
    lastQuestionOffsetTop = lastQuestionObject.offsetTop;
    
    $('html, body').animate({
        scrollTop: lastQuestionOffsetTop + 'px'
    });
    updatePercentage((lastQuestion - 1));
}

function setQuestionHeights() {
    var questionHolders = document.getElementsByClassName('answer'),
        questions = document.getElementsByClassName('question'),
        submitButtons = document.getElementsByClassName('submit_answer'),
        backButtons = document.getElementsByClassName('back_button'),
        theHeight = 0;
    for (z = 0; z < questions.length; z++) {
        questions[z].style.display = 'block';
    }
    for (x = 0; x < questionHolders.length; x++) {
        if (theHeight < questionHolders[x].clientHeight) {
            theHeight = questionHolders[x].clientHeight;
        }
    }
    setTimeout(function () {
        for (y = 0; y < questionHolders.length; y++) {
            questionHolders[y].style.height = theHeight + 'px';
        }
        for (e = 0; e < backButtons.length; e++){
            backButtons[e].style.transform = 'translateY('+(theHeight/2 - 10)+'px)';
        }
        for (w = 0; w < questions.length; w++) {
            submitButtons[w].style.transform = 'translateY('+(theHeight/2 - 10)+'px)';
            questions[w].style.display = 'none';
        }
    }, 50);
}

function updatePercentage(questionNumber) {
    var percentage = (questionNumber / 5),
        thePercentage = document.getElementById('percentage');
    percentage = percentage * 100;

    thePercentage.innerHTML = percentage * 100;
} 