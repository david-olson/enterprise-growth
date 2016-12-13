window.onload = main();

var panel1Height,
    panel2Height,
    panel3Height,
    panel4Height,
    panel5Height,
    panel1Active = false,
    panel2Active = false,
    panel3Active = false,
    panel4Active = false,
    panel5Active = false,
    activePanels = [false, false, false, false, false],
    activeHistory = [-1],
    running = false;

var timer;

$(window).bind('scroll', function () {
    clearTimeout(timer);
    timer = setTimeout(setActivePanel, 250);
});

var refresh = function () {
    console.log('stopped');
}

//$(window).scroll(function () {
//    if (running === false) {
//        setActivePanel();
//    }
//});

function main() {

    var radios = document.getElementsByClassName('answer_button'),
        submitButtons = document.getElementsByClassName('submit_answer'),
        backButtons = document.getElementsByClassName('back_button'),
        introButton = document.getElementById('intro-button'),
        windowH = window.innerHeight;
    introButton.addEventListener('click', function() {
       var firstQuestion = document.getElementById('question-1');
        
        firstQuestion.style.display = 'block';
        setTimeout(function() {
            var firstQuestionOffset = firstQuestion.offsetTop;
            $('html, body').animate({
                scrollTop: firstQuestionOffset + 'px'
            });
        }, 250);
        
    });
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
    for (a = 0; a < backButtons.length; a++) {
        backButtons[a].addEventListener('click', function () {
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
        scrollSpeed,
        soundNumber,
        theRadios,
        i;
    aId = elem.id;
    thisQuestion = aId.substr(-1, 1);
    nextQuestion = parseInt(thisQuestion) + 1;
    nextQuestionId = 'question-' + nextQuestion;
    nextQuestionObject = document.getElementById(nextQuestionId);
    theRadios = document.getElementsByName('question' + thisQuestion);

    for (i = 0; i < theRadios.length; i++){
        if(theRadios[i].checked){
            nextQuestionObject.style.display = 'block';
            setTimeout(function () {
                nextQuestionOffsetTop = nextQuestionObject.offsetTop;
                $('html, body').animate({
                    scrollTop: nextQuestionOffsetTop + 'px'
                });
            }, 150);
            //    updatePercentage(thisQuestion);
            //    newUpdatePercentage(thisQuestion);
            //    brickDrop(thisQuestion);
            min = Math.ceil(1);
            max = Math.floor(4);
            soundNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            var theSound = new Audio('./assets/audio/' + soundNumber + '.mp3');
            theSound.play();
            break;
        } else if(i === (theRadios.length - 1)) {
            alert('Not so fast');
        }
    }
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
    //    newUpdatePercentage((lastQuestion - 1));
    //    brickUp(thisQuestion - 1);
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

    panel1Height = document.getElementById('question-1').offsetTop;
    panel2Height = document.getElementById('question-2').offsetTop;
    panel3Height = document.getElementById('question-3').offsetTop;
    panel4Height = document.getElementById('question-4').offsetTop;
    panel5Height = document.getElementById('question-5').offsetTop;

    setTimeout(function () {

        for (y = 0; y < questionHolders.length; y++) {
            questionHolders[y].style.height = theHeight + 'px';
        }
        for (w = 0; w < questions.length; w++) {
            questions[w].style.display = 'none';
        }
    }, 50);
}

function updatePercentage(questionNumber) {
    var percentage = (questionNumber / 5),
        thePercentage = document.getElementById('percentage');
    percentage = percentage * 100;

    thePercentage.innerHTML = percentage;
}

function newUpdatePercentage(questionNumber) {
    var percentage = (questionNumber / 5),
        thePercentage = document.getElementById('percentage'),
        currentVal = thePercentage.innerHTML;
    percentage = percentage * 100;
    $(thePercentage).prop('number', currentVal).animateNumber({
        number: percentage
    });
}

function brickDrop(questionNumber) {
    var color,
        nextColor,
        brick,
        nextBrick;
    running = true;
    questionNumber = parseInt(questionNumber);
    switch (questionNumber) {
    case 0:
        color = false;
        nextColor = 'red';
        break;
    case 1:
        color = 'red';
        nextColor = 'orange'
        break;
    case 2:
        color = 'orange';
        nextColor = 'green';
        break;
    case 3:
        color = 'green';
        nextColor = 'yellow';
        break;
    case 4:
        color = 'yellow';
        nextColor = 'blue';
        break;
    case 5:
        color = 'blue';
        nextColor = false;
        break;
    }

    brick = document.getElementById(color);
    nextBrick = document.getElementById(nextColor);

    if (brick !== null) {
        TweenLite.to(brick, .25, {
            y: '0%'
        });
    }
    setTimeout(function () {
        if (nextBrick !== null) {
            TweenLite.to(nextBrick, .25, {
                y: '-105%'
            });
        }
        running = false;
    }, 500);
}

function brickUp(questionNumber) {
    var color,
        lastColor,
        brick,
        lastBrick;
    running = true;
    questionNumber = parseInt(questionNumber);
    switch (questionNumber) {
    case 0:
        color = 'red';
        lastColor = false;
        break;
    case 1:
        color = 'orange';
        lastColor = 'red';
        break;
    case 2:
        color = 'green';
        lastColor = 'orange'
        break;
    case 3:
        color = 'yellow';
        lastColor = 'green';
        break;
    case 4:
        color = 'blue';
        lastColor = 'yellow';
        break;
    case 5:
        color = false;
        lastColor = 'blue';
        break;
    }
    brick = document.getElementById(color);
    lastBrick = document.getElementById(lastColor);

    if (brick !== null) {
        TweenLite.to(brick, .25, {
            y: '-900%'
        });
    }
    setTimeout(function () {
        if (lastBrick !== null) {
            TweenLite.to(lastBrick, .25, {
                y: '-105%'
            });
        }
        running = false;
    }, 500);
}

function setActivePanel() {
    var scroll = $(window).scrollTop(),
        y;

    if (scroll > panel1Height - 100 && scroll < panel2Height - 100 && activePanels[0] === false) {
        console.log("Panel 1 is Active");
        y = activeHistory.slice(-1)[0];
        togglePanelStates(0, y);
        newUpdatePercentage(0);
        positionBricks(1);
    } else if (scroll > panel2Height - 100 && scroll < panel3Height - 100 && activePanels[1] === false) {
        console.log("Panel 2 is Active");
        y = activeHistory.slice(-1)[0];
        togglePanelStates(1, y);
        newUpdatePercentage(1);
        positionBricks(2);
    } else if (scroll > panel3Height - 100 && scroll < panel4Height - 100 && activePanels[2] === false) {
        console.log('Panel 3 is Active');
        y = activeHistory.slice(-1)[0];
        togglePanelStates(2, y);
        newUpdatePercentage(2);
        positionBricks(3);
    } else if (scroll > panel4Height - 100 && scroll < panel5Height - 100 && activePanels[3] === false) {
        console.log('Panel 4 is Active');
        y = activeHistory.slice(-1)[0];
        togglePanelStates(3, y);
        newUpdatePercentage(3);
        positionBricks(4);
    } else if (scroll > panel5Height - 100 && activePanels[4] === false) {
        console.log('Panel 5 is Active');
        y = activeHistory.slice(-1)[0];
        togglePanelStates(4, y);
        newUpdatePercentage(4);
        positionBricks(5);
    }

    function togglePanelStates(activePanel, lastPanel) {

        for (x = 0; x < 5; x++) {

            if (x === activePanel) {
                activePanels[x] = true;
//                if (activePanel > lastPanel) {
//                    //                    brickDrop(activePanel);
//                    setTimeout(function () {
//                        activeHistory.push(activePanel);
//                    }, 100);
//                } else {
//                    //                    brickUp(activePanel + 1);
//                    activeHistory.push(activePanel);
//                }
            } else {
                activePanels[x] = false;
            }
        }
    }

    function positionBricks(panelActive) {
        var red = document.getElementById('red'),
            orange = document.getElementById('orange'),
            green = document.getElementById('green'),
            yellow = document.getElementById('yellow'),
            blue = document.getElementById('blue');

        switch (panelActive) {
        case 1:
            TweenLite.to(red, .25, {
                y: '-105%'
            });
            TweenLite.to([orange, green, yellow, blue], .25, {
                y: '-900%'
            });
            break;
        case 2:
            TweenLite.to(red, .25, {
                y: '0%'
            });
            TweenLite.to(orange, .25, {
                y: '-105%'
            });
            TweenLite.to([green, yellow, blue], .25, {
                y: '-900%'
            });
            break;
        case 3:
            TweenLite.to([red, orange], .25, {
                y: '0%'
            });
            TweenLite.to(green, .25, {
                y: '-105%'
            });
            TweenLite.to([yellow, blue], .25, {
                y: '-900%'
            });
            break;
        case 4:
            TweenLite.to([red, orange, green], .25, {
                y: '0%'
            });
            TweenLite.to(yellow, .25, {
                y: '-105%'
            });
            TweenLite.to(blue, .25, {
                y: '-900%'
            });
            break;
        case 5:
            TweenLite.to([red, orange, green, yellow], .25, {
                y: '0%'
            });
            TweenLite.to(blue, .25, {
                y: '-105%'
            });
            break;
        }
    }

}