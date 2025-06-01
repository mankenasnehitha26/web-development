const quizData = [
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "What does CSS stand for?",
    answers: ["Central Style Sheets", "Cascading Style Sheets", "Coded Style System", "Custom Style Sheets"],
    correct: 1
  },
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "High Text Markup Language"],
    correct: 1
  },
  {
    question: "What year was JavaScript launched?",
    answers: ["1996", "1995", "1994", "none of the above"],
    correct: 1
  },
  {
    question: "Which of the following is not a programming language?",
    answers: ["Python", "HTML", "C++", "Java"],
    correct: 1
  },
  {
    question: "What tag is used to define an unordered list in HTML?",
    answers: ["<ol>", "<ul>", "<li>", "<list>"],
    correct: 1
  },
  {
    question: "Which CSS property controls the text size?",
    answers: ["font-style", "text-size", "font-size", "text-style"],
    correct: 2
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: ["var", "int", "let", "both var and let"],
    correct: 3
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Mozilla", "Netscape", "Google", "Microsoft"],
    correct: 1
  },
  {
    question: "How do you write a comment in JavaScript?",
    answers: ["<!-- comment -->", "// comment", "/* comment */", "both // and /* */"],
    correct: 3
  }
];

let currentQuestion = 0;
let userAnswers = Array(quizData.length).fill(null);

function showQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").textContent = `${currentQuestion + 1}. ${q.question}`;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.answers.forEach((ans, idx) => {
    const btn = document.createElement("button");
    btn.textContent = ans;

    if (userAnswers[currentQuestion] === idx) {
      btn.classList.add("selected");
    }

    btn.onclick = () => {
      userAnswers[currentQuestion] = idx;
      showQuestion();
    };

    answersDiv.appendChild(btn);
  });

  document.getElementById("score").textContent = "";
  document.querySelector(".buttons").style.display = "flex";
}

function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function showResults() {
  document.getElementById("question").textContent = "Quiz Completed!";
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  let finalScore = 0;

  quizData.forEach((q, qIdx) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${qIdx + 1}. ${q.question}</strong><br/>`;

    q.answers.forEach((ans, aIdx) => {
      const btn = document.createElement("button");
      btn.textContent = ans;

      if (aIdx === q.correct) {
        btn.classList.add("correct");
      }
      if (userAnswers[qIdx] === aIdx && aIdx !== q.correct) {
        btn.classList.add("selected");
      }

      btn.disabled = true;
      div.appendChild(btn);
    });

    if (userAnswers[qIdx] === q.correct) {
      finalScore++;
    }

    div.appendChild(document.createElement("br"));
    answersDiv.appendChild(div);
  });

  document.querySelector(".buttons").style.display = "none";
  document.getElementById("score").textContent = `🎉 Final Score: ${finalScore} out of ${quizData.length}`;
}

// Joke Section
function getJoke() {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      document.getElementById("joke").textContent = `${data.setup} - ${data.punchline}`;
    })
    .catch(() => {
      document.getElementById("joke").textContent = "Oops! Couldn't load a joke right now.";
    });
}

// Carousel Setup
const carouselImageUrls = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=600&q=80"
];

const carouselDiv = document.querySelector(".carousel");

carouselImageUrls.forEach((url, i) => {
  const img = document.createElement("img");
  img.src = url;
  img.className = "carousel-image";
  if (i === 0) img.classList.add("active");
  img.alt = `carousel image ${i + 1}`;
  carouselDiv.appendChild(img);
});

const carouselImages = document.querySelectorAll(".carousel-image");
let currentIndex = 0;

function showCarouselImage(index) {
  carouselImages.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

function startCarousel() {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    showCarouselImage(currentIndex);
  }, 3000);
}

window.onload = () => {
  showQuestion();
  getJoke();
  startCarousel();
};
