var startBtn = document.querySelector('.start');
startBtn.addEventListener('click', function () {
    startBtn.remove();
    quiz.loadQuestion();
});

$(document).on('click', '.answer-button', function (e) {
    quiz.clicked(e);
})
$(document).on('click', '#reset', function () {
    quiz.reset();    
});

$(document).on('click' , '#submit-btn' , function() {
    quiz.addInitials();
});

var questions = [{
    question: "What is the state tree of California?",
    answers: ["Redwood", "Sequoia", "Oak", "Kind"],
    correctAnswer: "Redwood",

}, {
    question: "California grows the most what in the nation?",
    answers: ["Tomatoes", "Sweet Potatoes", "Broccoli", "Soybeans"],
    correctAnswer: "Tomatoes",

}, {
    question: "What is the state bird?",
    answers: ["Bald Eagle", "Blue Jay", "California Quil", "Wild Turkey"],
    correctAnswer: "California Quil",

}, {
    question: "What is the capital of california",
    answers: ["San Francisco", "Sacramento", "San Jose"],
    correctAnswer: "Sacramento"
},
];
var quiz = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function () {
        quiz.counter--;
        $('.counter').html(quiz.counter);
        if (quiz.counter <= 0) {
            console.log("TIME UP!")
            quiz.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(quiz.countdown, 1000);
        $('#subwrapper').html("<h2> Time to Guess: <span class ='counter'>" + quiz.counter + "</span> Seconds</h2>");
        $('#subwrapper').append('<h2>' + questions[quiz.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[quiz.currentQuestion].answers.length; i++) {
            $('#subwrapper').append('<button class="answer-button btn btn-primary id="button- ' + i + '" data-name="' + questions[quiz.currentQuestion].answers[i] + '">' + questions[quiz.currentQuestion].answers[i] + '</button> </br>');
        }
    },
    nextQuestion: function () {

        $('#counter').html(quiz.counter);
        quiz.currentQuestion++;
        quiz.loadQuestion();
    },
    timeUp: function () {
        clearInterval(timer);
        quiz.counter = 0;
        quiz.unanswered++;
        $('#subwrapper').html('<h2>Out of time!<h2>');
        $('#subwrapper').append('<h3>The correct answer was: ' + questions[quiz.currentQuestion].correctAnswer + '</h3>');
        if (quiz.currentQuestion == questions.length - 1) {
            setTimeout(quiz.results, 3 * 1000);
        } else {
            setTimeout(quiz.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);
        $('#game-over').removeClass("d-none");
        $('#subwrapper').html('<h2>Complete!</h2>')
        $('#subwrapper').append(" Correct: " + quiz.correct + '<br/>');
        $('#subwrapper').append(" Incorrect: " + quiz.incorrect + '<br/>');
        $('#subwrapper').append(" Unanswered: " + quiz.unanswered + '<br/>');
        $('#subwrapper').append("<button id= reset>Try again?</button>")
        $('#subwrapper').append()
    
    },

    addInitials: function(){
        var initials = $("#initials").val()
        var existingInitials = JSON.parse(localStorage.getItem('initials')) || [];
        existingInitials.push(initials);
        localStorage.setItem('initials' , JSON.stringify(existingInitials));
        $("game-over").addClass("d-none");
    },

    clicked: function (e) {
        clearInterval(timer);
        if ($(e.target).data("name") == questions[quiz.currentQuestion].correctAnswer) {
            quiz.answeredCorrectly();
        } else {
            quiz.answeredIncorrectly();
        }
    },
    answeredCorrectly: function () {
        console.log("right!")
        
        quiz.correct++;
        $('#subwrapper').html('<h2> CORRECT!</h2>');
        if (quiz.currentQuestion == questions.length - 1) {
            setTimeout(quiz.results, 2 * 1000);
        } else {
            setTimeout(quiz.nextQuestion, 2 * 1000);
        }
    },
    answeredIncorrectly: function () {
        console.log("wrong")
        if (this) {
            quiz.counter -= 5;
        }
        quiz.incorrect ++;

        $('#subwrapper').html('<h2> Wrong!</h2>');
        $('#subwrapper').append('<h3>The correct answer was: ' + questions[quiz.currentQuestion].correctAnswer + '</h3>');
        if (quiz.currentQuestion == questions.length - 1) {
            setTimeout(quiz.results, 2 * 1000);
        } else {
            setTimeout(quiz.nextQuestion, 2 * 1000);
        }
    },
    reset: function () {
        quiz.currentQuestion = 0;
        quiz.counter = 0;
        quiz.correct = 0;
        quiz.incorrect = 0;
        quiz.unanswered = 0;
        quiz.loadQuestion();
    }
    
};