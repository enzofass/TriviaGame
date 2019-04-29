// array of objects to define questions and multiple choice answers also correct answer
const questions = [
  {
    question: "Which US President did NOT wear a mustache?",
    answers: [
      "Chester Arthur",
      "Grover Cleaveland",
      "William McKinley",
      "Theodore Roosevelt"
    ],
    correctAnswer: "William McKinley"
  },
  {
    question: "Why did Hitler choose the particular style mustache he wore?",
    answers: [
      "He was trying to cover up a cleft lip",
      "He was immitating a famous actor of his time",
      "He was drawing attention away from crooked teeth",
      "It allowed his gas mask to fit more snugly"
    ],
    correctAnswer: "It allowed his gas mask to fit more snugly"
  },
  {
    question:
      "What style mustache was worn by the magician in the classic, Frosty the Snowman?",
    answers: ["handlebar", "fu manchu", "dali", "lampshade"],
    correctAnswer: "handlebar"
  },
  {
    question:
      "The average man with a mustache touches it how many times per day?",
    answers: ["76", "360", "760", "3600"],
    correctAnswer: "760"
  },
  {
    question:
      "A mustache is capable of absorbing what percentage of its own weight in water?",
    answers: ["10%", "20%", "25%", "33%"],
    correctAnswer: "20%"
  },
  {
    question:
      "Which of The Beatles grew his mustache for the pragmatic reason of covering up the swollen lip he got in a moped accident?",
    answers: ["John Lenon", "Paul McCartney", "George Harrison", "Ringo Starr"],
    correctAnswer: "Paul McCartney"
  },
  {
    question:
      "Who wrote, “To a brave man, honour is dearer than life; and to the major, his whiskers were dearer than honour itself!”?",
    answers: ["Cassio", "Socrates", "Charles Dickens", "Mark Twain"],
    correctAnswer: "Cassio"
  },
  {
    question:
      "Which game show host stopped sporting his iconic mustache in 2001?",
    answers: ["Steve Harvey", "Alex Trebek", "Pat Sajak", "Peter Marshall"],
    correctAnswer: "Alex Trebek"
  },
  {
    question: "Which mustached cartoon character works as a plumber?",
    answers: ["Ned Flanders", "Yosemite Sam", "Mario Mario", "Dick Dasstardly"],
    correctAnswer: "Mario Mario"
  },
  {
    question:
      "According to the Guinness Book of Records, the world’s longest mustache was how long?",
    answers: ["3 ft", "7 ft", "10 ft", "14 ft"],
    correctAnswer: "14 ft"
  }
]; // end of quiz array of objects
// variables

// start quiz
function startQuiz() {
  $("#trivia-questions").show(500);
  $("#start-trivia").hide(1000);
  // calls the render function to populate page with html quiz structure
  renderQuiz(questions);
  // calls function to start timer
  jQuery(function($) {
    const tMinutes = 60 * 1,
      display = $("#main-timer");
    startTimer(tMinutes, display);
  });
}

// finish quiz
let timerEnd = false;
function finishQuiz() {
  clearInterval(quizTimer);
  checkQuiz();
  $("#results").show(1000);
  $("#trivia-questions").hide(5000);
  $("#resultDisplay").append(
    `You answered: <br> 
    ${correct} correct and <br>
    ${wrong} wrong`
  );

  if (timerEnd) {
    // display text time is up
    $(".timer-up").show(1000);
  } else {
    $(".timer-up").hide(1000);
  }
}

// render function to populate html with quiz questions
function renderQuiz(q) {
  const triviaDiv = $("#trivia-div");
  for (let i = 0; i < q.length; i++) {
    const questionDiv = `
    <h3>${q[i].question}</h3>
        <input
          type="radio"
          name="question-${i + 1}"
          class="multi-choice"
          value="${q[i].answers[0]}"
        />${q[i].answers[0]} <br />
        <input
          type="radio"
          name="question-${i + 1}"
          class="multi-choice"
          value="${q[i].answers[1]}"
        />${q[i].answers[1]} <br />
        <input
          type="radio"
          name="question-${i + 1}"
          class="multi-choice"
          value="${q[i].answers[2]}"
        />${q[i].answers[2]} <br />
        <input
          type="radio"
          name="question-${i + 1}"
          class="multi-choice"
          value="${q[i].answers[3]}"
        />${q[i].answers[3]} <br />
    `;
    triviaDiv.append(questionDiv);
  }
}

// start timer function
let quizTimer;
function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  quizTimer = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.text(minutes + ":" + seconds);

    if (--timer < 0) {
      timer = duration;
      timerEnd = true;
      finishQuiz();
    }
  }, 1000);
}

// check quiz function
let correct = 0;
let wrong = 0;
function checkQuiz() {
  correct = 0;
  wrong = 0;
  for (let i = 0; i < questions.length; i++) {
    const answer = $(`input[name=question-${i + 1}]:checked`).val();
    if (answer === questions[i].correctAnswer) {
      correct++;
    } else {
      wrong++;
    }
  }
  console.log("Answers Correct: ", correct, "-", "Answers Wrong: ", wrong);
}

// calls check quiz when timer runs out of user clicks finished button
$("#finished").on("click", finishQuiz);
$("#start").on("click", startQuiz);

$("#trivia-questions, #results").hide();
