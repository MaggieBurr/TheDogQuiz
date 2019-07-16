let questionNumber = 0;
let score = 0;
function generateQuestionForm() {

  if (questionNumber < STORE.length) {
    return `<h3>${STORE[questionNumber].question}</h3>
    <form>
    <fieldset>
    <label class="answerOption" for="answer-1">
    <input type="radio" value="${STORE[questionNumber].answer[0]}" name="answer" id="answer-1" required>
    <span>${STORE[questionNumber].answer[0]}</span></label>
   
    <label class="answerOption" for="answer-2">
    <input type="radio" value="${STORE[questionNumber].answer[1]}" name="answer" id="answer-2" required>
    <span>${STORE[questionNumber].answer[1]}</span></label>

    <label class="answerOption" for="answer-3">
    <input type="radio" value="${STORE[questionNumber].answer[2]}" name="answer" id="answer-2" required>
    <span>${STORE[questionNumber].answer[2]}</span></label>

    <label class="answerOption" for="answer-4">
    <input type="radio" value="${STORE[questionNumber].answer[3]}" name="answer" id="answer-4" required>
    <span>${STORE[questionNumber].answer[3]}</span></label>
    
    </form>
    </fieldset>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
}

else {
  renderResults();
  startOver();
  $('.question-number').text(10);
  }
}

function changeQuestionNumber() {
  questionNumber++;
  $('.question-number').text(questionNumber+1);

}

function addScore() {
  score++;
}


function startQuiz() {

  $('.quiz-start').on('click','.start-button', function(event){
    $('.quiz-start').remove();
    $('.questionAnswerForm').css('display', 'block');
    renderQuestion();
  });
  console.log('`startQuiz` ran');
}

function renderQuestion () {
$('.questionAnswerForm').html(generateQuestionForm());
}


function handleUserSelect() {
  $("form").on('submit', function(event){
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer){
      answerIsCorrect();
    } else {
      answerIsWrong();
    }
  });
  console.log('`handleUserSelect` ran');
}

  function answerIsCorrect() {
    correctAnswerFeedback();
    updateScore();
  }

  function answerIsWrong() {
    wrongAnswerFeedback();
  }


function correctAnswerFeedback() {
  let correctAnswer =`${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="feedback"><h1><span class="correct-answer">${correctAnswer}</span><br>Is Correct!<br></h1>
  <button class="nextButton">next question</button></div>`);
}


function wrongAnswerFeedback() {
  let correctAnswer =`${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="feedback"><h1>Incorrect. The Answer is: <br><span class="correct-answer">${correctAnswer}</span></h1>
  <button class="nextButton">next question</button></div>`);
}


function updateScore() {
  addScore();
  $('.score-number').text(score);
}


function renderResults() {
  $('.questionAnswerForm').html(`<div class="result-page"><p>You Scored:${score} /10 </p></div><button class="restart-button">Give it another try!"</button>`);
  console.log('`renderResults` ran'); 
}

function renderNextQuestion() {
// this function is responsible for rendering the next quiz question in the DOM
$('main').on('click', '.nextButton', function (event){
  changeQuestionNumber();
  renderQuestion();
  handleUserSelect(); 
  });
  console.log('`renderNextQuestion` ran');
}

function startOver(){
  // this function starts the quiz over when the user clicks on the 'Give it another try!' button
  $('.start-page').on('click', '.restart-button', function (event){
  location.reload();

  });
  console.log('`startOver` ran');
}


function handleQuiz() {
  startQuiz(); 
  handleUserSelect();
  renderNextQuestion();
  startOver();
}

$(document).ready(function() {
  handleQuiz();
  });
