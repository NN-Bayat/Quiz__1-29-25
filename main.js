const questions = [
  {
    question: "پایتخت افغانستان چیست؟",
    answers: [
      { text: "کندهار", correct: false },
      { text: "هرات", correct: false },
      { text: "کابل", correct: true },
      { text: "مزار شریف", correct: false },
    ]
  },
  {
    question: "زبان رسمی افغانستان چیست؟",
    answers: [
      { text: "فارسی", correct: false },
      { text: "دری و پشتو", correct: true },
      { text: "اردو", correct: false },
      { text: "عربی", correct: false },
    ]
  },
  {
    question: "واحد پول افغانستان چیست؟",
    answers: [
      { text: "تاکا", correct: false },
      { text: "افغانی", correct: true },
      { text: "روپیه", correct: false },
      { text: "دینار", correct: false },
    ]
  },
  {
    question: "کدام ولایت افغانستان به خاطر معادن زمرد مشهور است؟",
    answers: [
      { text: "پکتیا", correct: false },
      { text: "بدخشان", correct: true },
      { text: "غزنی", correct: false },
      { text: "هرات", correct: false },
    ]
  },

  {
    question: "بزرگ‌ترین ولایت افغانستان از نظر مساحت کدام است؟",
    answers: [
      { text: "کندهار", correct: false },
      { text: "هلمند", correct: true },
      { text: "هرات", correct: false },
      { text: "بلخ", correct: false },
    ]
  },
  {
    question: "کدام شهر افغانستان به عنوان شهر گل‌ها شناخته می‌شود؟",
    answers: [
      { text: "کابل", correct: false },
      { text: "هرات", correct: true },
      { text: "کندهار", correct: false },
      { text: "مزار شریف", correct: false },
    ]
  },
  {
    question: "ورزش ملی افغانستان چیست؟",
    answers: [
      { text: "کریکت", correct: false },
      { text: "فوتبال", correct: false },
      { text: "بزکشی", correct: true },
      { text: "کشتی", correct: false },
    ]
  },
  {
    question: "کدام یکی از این کشورها هم‌مرز با افغانستان است؟",
    answers: [
      { text: "پاکستان", correct: true },
      { text: "ترکیه", correct: false },
      { text: "هند", correct: false },
      { text: "ایران", correct: false },
    ]
  },
  {
    question: "کدام مکان تاریخی در افغانستان دارای مجسمه‌های بزرگ بودا بود که در سال ۲۰۰۱ تخریب شدند؟",
    answers: [
      { text: "بودای بامیان", correct: true },
      { text: "منار جام", correct: false },
      { text: "مسجد آبی", correct: false },
      { text: "گذرگاه خیبر", correct: false },
    ]
  },
  {
    question: "کدام شهر به عنوان پایتخت فرهنگی افغانستان شناخته می‌شود؟",
    answers: [
      { text: "هرات", correct: true },
      { text: "کندهار", correct: false },
      { text: "جلال‌آباد", correct: false },
      { text: "غزنی", correct: false },
    ]
  }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "سوال بعدی";

  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");

    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  questionElement.innerHTML = `شما ${score * 10} از ${questions.length * 10} امتیاز گرفتید!`
    ;

  nextButton.innerHTML = "شروع مجدد";
  nextButton.style.display = "block"
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})

startQuiz();