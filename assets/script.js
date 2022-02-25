var containerQuestionEl = document.getElementById("question-container");
var startInfoEl = document.getElementById("start-info");
var endGameEl = document.getElementById("end-game")
var finalScoreEl = document.getElementById("final-score")
var formInitials = document.getElementById("initials-form")
var highscoreEl = document.getElementById("highscore-container")
var viewHighscoreEl = document.getElementById("view-highscores")
var highscoreListEl = document.getElementById("highscore-list")
var correctEl = document.getElementById("correct")
var wrongEl = document.getElementById("wrong")

var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back")
var btnClearScoresEl = document.querySelector("#clear-highscores")
      


var questionEl = document.getElementById("question")
var optionsbtnEl = document.getElementById("options-btn")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeLeft;
var gameover

var HighScores = [];

var arrayShuffledQuestions
var QuestionIndex = 0

    
      
var questions = [
    { quest: "Commonly used data types DO NOT include:", 
    opts: ["strings", "booleans", "alerts", "numbers"],
    answr: "alerts"},

    { quest: "The condition in an if / else statement is enclosed within what?",
    opts: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answr: "parenthesis" },

    { quest: "Arrays in JavaScript can be used to store what?",
    opts: ["numbers and strings", "other arrays", "booleans", "all the above"],
    answr: "all the above"
     },

    { quest: "String values must be enclosed within ___ when being assigned to variables.",
    opts: ["commas", "curly brackets", "quotes", "parenthesis"],
    answr: "quotes"}
];


    var startPage = function () {
        highscoreEl.classList.add("hide")
        highscoreEl.classList.remove("display")
        startInfoEl.classList.remove("hide")
        startInfoEl.classList.add("display")
        finalScoreEl.removeChild(finalScoreEl.lastChild)
        QuestionIndex = 0
        gameover = ""
        timerEl.textContent = 0 
        score = 0

        if (correctEl.className = "display") {
            correctEl.classList.remove("display");
            correctEl.classList.add("hide")
        }
        if (wrongEl.className = "display") {
            wrongEl.classList.remove("display");
            wrongEl.classList.add("hide");
        }
    }

    
    var setTime = function () {
        timeLeft = 50;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeLeft;
        timeLeft--

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeLeft < 0) {
            displayScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

        }, 1000)
    }

    var startGame = function() {
   
        startInfoEl.classList.add('hide');
        startInfoEl.classList.remove('display');
        containerQuestionEl.classList.remove('hide');
        containerQuestionEl.classList.add('display');
      
        arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
        setTime()
        setQuestion()
      }
    

    var setQuestion = function() {
        resetAnswers()
        displayQuestion(arrayShuffledQuestions[QuestionIndex])
    }

    var resetAnswers = function() {
        while (optionsbtnEl.firstChild) {
            optionsbtnEl.removeChild(optionsbtnEl.firstChild)
        };
    };


    var displayQuestion = function(index) {
        questionEl.innerText = index.q
        for (var i = 0; i < index.choices.length; i++) {
            var answerbutton = document.createElement('button')
            answerbutton.innerText = index.choices[i].choice
            answerbutton.classList.add('btn')
            answerbutton.classList.add('answerbtn')
            answerbutton.addEventListener("click", answerCheck)
            optionsbtnEl.appendChild(answerbutton)
            }
        };
   
    var answerCorrect = function() {
        if (correctEl.className = "hide") {
            correctEl.classList.remove("hide")
            correctEl.classList.add("banner")
            wrongEl.classList.remove("banner")
            wrongEl.classList.add("hide")
            }
        }  
 
    var answerWrong = function() {
        if (wrongEl.className = "hide") {
            wrongEl.classList.remove("hide")
            wrongEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hide")
        }
    }

    
    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
                answerCorrect()
                score = score + 7
            }

            else {
              answerWrong()
              score = score - 1;
              timeLeft = timeLeft - 3;
          };

        
          QuestionIndex++
            if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
                setQuestion()
            }   
            else {
               gameover = "true";
               displayScore();
                }
    }


    var displayScore = function () {
        containerQuestionEl.classList.add("hide");
        endGameEl.classList.remove("hide");
        endGameEl.classList.add("display");

        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Your final score is " + score + "!");
        finalScoreEl.appendChild(scoreDisplay);
    }       
    
    
    var createHighScore = function(event) { 
        event.preventDefault() 
        var initials = document.querySelector("#initials").value;
        if (!initials) {
          alert("Enter your intials!");
          return;
        }

      formInitials.reset();

      var HighScore = {
      initials: initials,
      score: score
      } 

     
      HighScores.push(HighScore);
      HighScores.sort((a, b) => {return b.score-a.score});

   

    while (highscoreListEl.firstChild) {
       highscoreListEl.removeChild(highscoreListEl.firstChild)
    }
  

    for (var i = 0; i < HighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
      highscoreListEl.appendChild(highscoreEl);
    }

      saveHighScore();
      displayHighScores();

    }

    var saveHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(HighScores))
            
    }

    var loadHighScore = function () {
        var LoadedHighScores = localStorage.getItem("HighScores")
            if (!LoadedHighScores) {
            return false;
        }

        LoadedHighScores = JSON.parse(LoadedHighScores);
        LoadedHighScores.sort((a, b) => {return b.score-a.score})
 

        for (var i = 0; i < LoadedHighScores.length; i++) {
            var highscoreEl = document.createElement("li");
            highscoreEl.ClassName = "high-score";
            highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
            highscoreListEl.appendChild(highscoreEl);

            HighScores.push(LoadedHighScores[i]);
            
        }
    }  

   
    var displayHighScores = function() {

        highscoreEl.classList.remove("hide");
        highscoreEl.classList.add("display");
        gameover = "true"

        if (endGameEl.className = "display") {
            endGameEl.classList.remove("display");
            endGameEl.classList.add("hide");
            }
        if (startInfoEl.className = "display") {
            startInfoEl.classList.remove("display");
            startInfoEl.classList.add("hide");
            }
            
        if (containerQuestionEl.className = "display") {
            containerQuestionEl.classList.remove("display");
            containerQuestionEl.classList.add("hide");
            }

        if (correctEl.className = "display") {
            correctEl.classList.remove("display");
            correctEl.classList.add("hide");
        }

        if (wrongEl.className = "display") {
            wrongEl.classList.remove("display");
            wrongEl.classList.add("hide");
            }
        
    }
   
    var clearScores = function () {
        HighScores = [];

        while (highscoreListEl.firstChild) {
            highscoreListEl.removeChild(highscoreListEl.firstChild);
        }

        localStorage.clear(HighScores);

    } 

    loadHighScore()
        
     
      btnStartEl.addEventListener("click", startGame)
    
      formInitials.addEventListener("submit", createHighScore)
     
      viewHighscoreEl.addEventListener("click", displayHighScores)
     
      btnGoBackEl.addEventListener("click", startPage)
     
      btnClearScoresEl.addEventListener("click", clearScores)