// Quiz App Logic
class QuizApp {
  constructor() {
    this.allQuestions = []; // Tất cả câu hỏi
    this.questions = []; // Câu hỏi của bài đang chọn
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.currentScore = 0;
    this.startTime = null;
    this.timerInterval = null;
    this.isAnswered = false;
    this.currentLessonId = null;
    this.autoNext = false;
    this.init();
  }

  // Khởi tạo ứng dụng
  async init() {
    try {
      // Load tất cả câu hỏi
      this.allQuestions = questionsData.questions;

      // Hiện màn hình chọn bài, ẩn các màn hình khác
      document.getElementById("lessonSelectScreen").style.display = "block";
      document.getElementById("startScreen").style.display = "none";
      document.getElementById("questionScreen").style.display = "none";
      document.getElementById("resultScreen").style.display = "none";
      document.getElementById("reviewScreen").style.display = "none";

      // Đảm bảo quiz info bị ẩn khi khởi động
      document.querySelector(".container").classList.add("hide-quiz-info");
      document
        .getElementById("autoNextCheckbox")
        .addEventListener("change", (e) => {
          this.autoNext = e.target.checked;
        });

      this.setupEventListeners();
      console.log(
        "Quiz app initialized with",
        this.allQuestions.length,
        "total questions"
      );
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  }

  selectLesson(lessonId) {
    this.currentLessonId = lessonId;
    const startIndex = (lessonId - 1) * 25;
    const endIndex = startIndex + 25;

    // Lấy 25 câu hỏi cho bài được chọn
    this.questions = this.allQuestions.slice(startIndex, endIndex);

    // Hiển thị quiz info và progress bar
    document.querySelector(".container").classList.remove("hide-quiz-info");

    // Cập nhật tiêu đề
    document.querySelector(
      ".header-content h1"
    ).textContent = `🎓 Bài ${lessonId} (Câu ${startIndex + 1}-${endIndex})`;

    // Ẩn màn hình chọn bài, hiện màn hình start
    document.getElementById("lessonSelectScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "block";

    // Reset các giá trị
    this.currentQuestionIndex = 0;
    this.userAnswers = new Array(25).fill(null);
    this.currentScore = 0;
    this.isAnswered = false;

    // Cập nhật UI
    this.updateTotalQuestions();
    document.getElementById("elapsedTime").textContent = "00:00";
    document.getElementById("currentScore").textContent = "0";
  }

  // Quay lại chọn bài
  backToLessons() {
    // Xóa timer nếu đang chạy
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    // Reset state
    this.currentLessonId = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.currentScore = 0;
    this.startTime = null;
    this.isAnswered = false;

    // Ẩn quiz info và progress bar
    document.querySelector(".container").classList.add("hide-quiz-info");

    // Reset tiêu đề
    document.querySelector(".header-content h1").textContent =
      "🎓 Quiz Trắc Nghiệm";

    // Ẩn các màn hình khác, hiện màn hình chọn bài
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("questionScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "none";
    document.getElementById("reviewScreen").style.display = "none";
    document.getElementById("lessonSelectScreen").style.display = "block";

    // Reset progress
    document.getElementById("progressFill").style.width = "0%";
    document.getElementById("progressText").textContent = "0/25";
    document.getElementById("elapsedTime").textContent = "00:00";
    document.getElementById("autoNextCheckbox").checked = false;
    this.autoNext = false;
    this.updateScore();
  }

  // Cập nhật tổng số câu hỏi
  updateTotalQuestions() {
    const total = this.questions.length;
    document.getElementById("totalQuestions").textContent = total;
    document.getElementById("maxScore").textContent = total;
    document.getElementById("progressText").textContent = `0/${total}`;
  }

  // Setup event listeners
  setupEventListeners() {
    // Keyboard navigation
    document.addEventListener("keydown", (e) => this.handleKeyPress(e));

    // Touch gestures for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = Math.abs(touchStartY - touchEndY);

      // Chỉ xử lý swipe ngang nếu không phải scroll dọc
      if (Math.abs(diffX) > 50 && diffY < 100) {
        if (diffX > 0 && !document.getElementById("nextBtn").disabled) {
          this.nextQuestion();
        } else if (diffX < 0 && !document.getElementById("prevBtn").disabled) {
          this.previousQuestion();
        }
      }
    });
  }

  // Xử lý phím tắt
  handleKeyPress(e) {
    if (document.getElementById("questionScreen").style.display !== "none") {
      switch (e.key) {
        case "1":
        case "a":
        case "A":
          this.selectOption(0);
          break;
        case "2":
        case "b":
        case "B":
          this.selectOption(1);
          break;
        case "3":
        case "c":
        case "C":
          this.selectOption(2);
          break;
        case "4":
        case "d":
        case "D":
          this.selectOption(3);
          break;
        case "ArrowLeft":
          e.preventDefault();
          this.previousQuestion();
          break;
        case "ArrowRight":
        case "Enter":
          e.preventDefault();
          if (this.currentQuestionIndex === this.questions.length - 1) {
            this.finishQuiz();
          } else {
            this.nextQuestion();
          }
          break;
      }
    }
  }

  // Bắt đầu quiz
  startQuiz() {
    this.currentQuestionIndex = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);
    this.currentScore = 0;
    this.startTime = new Date();
    this.isAnswered = false;

    // Ẩn start screen, hiện question screen
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("questionScreen").style.display = "block";

    // Bắt đầu timer
    this.startTimer();
    this.loadQuestion();
    this.updateScore();
  }

  // Bắt đầu đếm thời gian
  startTimer() {
    this.timerInterval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now - this.startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      document.getElementById("elapsedTime").textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
  }

  // Load câu hỏi hiện tại
  loadQuestion() {
    const question = this.questions[this.currentQuestionIndex];
    const questionScreen = document.getElementById("questionScreen");

    this.isAnswered = this.userAnswers[this.currentQuestionIndex] !== null;

    // Animation fade
    questionScreen.style.opacity = "0.7";
    questionScreen.style.transform = "translateY(10px)";

    setTimeout(() => {
      // Cập nhật nội dung câu hỏi
      document.getElementById("questionText").textContent = question.question;
      document.getElementById("currentQuestion").textContent =
        this.currentQuestionIndex + 1;

      // Cập nhật progress bar
      const progress =
        ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
      document.getElementById("progressFill").style.width = progress + "%";
      document.getElementById("progressText").textContent = `${
        this.currentQuestionIndex + 1
      }/${this.questions.length}`;

      // Tạo options
      this.createOptions(question);

      // Cập nhật status nếu đã trả lời
      this.updateQuestionStatus();

      // Cập nhật buttons
      this.updateNavigationButtons();

      // Ẩn feedback
      document.getElementById("answerFeedback").style.display = "none";

      // Fade in
      questionScreen.style.opacity = "1";
      questionScreen.style.transform = "translateY(0)";
    }, 150);
  }

  // Tạo các lựa chọn
  createOptions(question) {
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "option";

      const userAnswer = this.userAnswers[this.currentQuestionIndex];

      if (this.isAnswered) {
        optionDiv.classList.add("disabled");
        if (userAnswer === index) {
          if (index === question.correct) {
            optionDiv.classList.add("correct");
          } else {
            optionDiv.classList.add("incorrect");
          }
        } else if (index === question.correct) {
          optionDiv.classList.add("correct");
          optionDiv.style.opacity = "0.8";
        }
      }

      optionDiv.innerHTML = `
                <div class="option-letter">${String.fromCharCode(
                  65 + index
                )}</div>
                <div class="option-text">${option}</div>
            `;

      if (!this.isAnswered) {
        optionDiv.onclick = () => this.selectOption(index);
      }

      // Add animation delay
      optionDiv.style.animationDelay = `${index * 0.1}s`;
      optionDiv.classList.add("option-animate");

      optionsContainer.appendChild(optionDiv);
    });
  }

  // Chọn lựa chọn
  selectOption(optionIndex) {
    if (this.isAnswered) return;

    const question = this.questions[this.currentQuestionIndex];

    // Lưu đáp án
    this.userAnswers[this.currentQuestionIndex] = optionIndex;
    this.isAnswered = true;

    // Cập nhật điểm số ngay lập tức
    const isCorrect = optionIndex === question.correct;
    if (isCorrect) {
      this.currentScore++;
    }

    // Hiển thị feedback
    this.showFeedback(isCorrect, question.explanation);

    // Cập nhật UI
    this.updateOptionsAfterAnswer(optionIndex, question.correct);
    this.updateScore();
    this.updateQuestionStatus();
    this.updateNavigationButtons();

    // Chỉ tự động chuyển câu nếu checkbox được chọn
    if (
      this.autoNext &&
      this.currentQuestionIndex < this.questions.length - 1
    ) {
      setTimeout(() => {
        this.nextQuestion();
      }, 1500);
    } else if (this.currentQuestionIndex === this.questions.length - 1) {
      // Highlight finish button nếu là câu cuối
      setTimeout(() => {
        document.getElementById("finishBtn").classList.add("pulse");
      }, 1000);
    }
  }

  // Cập nhật options sau khi trả lời
  updateOptionsAfterAnswer(userAnswer, correctAnswer) {
    const options = document.querySelectorAll(".option");

    options.forEach((option, index) => {
      option.classList.add("disabled");
      option.style.pointerEvents = "none";

      if (index === userAnswer) {
        setTimeout(() => {
          if (userAnswer === correctAnswer) {
            option.classList.add("correct");
          } else {
            option.classList.add("incorrect");
          }
        }, 100);
      } else if (index === correctAnswer) {
        setTimeout(() => {
          option.classList.add("correct");
          option.style.opacity = "0.8";
        }, 200);
      }
    });
  }

  // Hiển thị feedback
  // Cập nhật phương thức showFeedback trong class QuizApp
  showFeedback(isCorrect, explanation) {
    const feedback = document.getElementById("answerFeedback");
    const feedbackContent = feedback.querySelector(".feedback-content");
    const tipContent = feedback.querySelector(".tip-content");
    const question = this.questions[this.currentQuestionIndex];

    feedback.className = `answer-feedback ${
      isCorrect ? "correct" : "incorrect"
    }`;

    // Hiển thị feedback
    feedbackContent.innerHTML = `
        <div class="feedback-icon">${isCorrect ? "🎉" : "😞"}</div>
        <div class="feedback-text">
            <strong>${isCorrect ? "Chính xác!" : "Chưa đúng!"}</strong>
            ${
              explanation
                ? `<br><span class="explanation">${explanation}</span>`
                : ""
            }
        </div>
    `;

    // Hiển thị tip nếu có
    if (question.tip) {
      tipContent.innerHTML = `
            <div class="tip-icon">💡</div>
            <div class="tip-text">${question.tip}</div>
        `;
      tipContent.style.display = "flex";
    } else {
      tipContent.style.display = "none";
    }

    feedback.style.display = "block";
    feedback.classList.add("feedback-animate");
  }

  // Cập nhật trạng thái câu hỏi
  updateQuestionStatus() {
    const status = document.getElementById("questionStatus");
    const userAnswer = this.userAnswers[this.currentQuestionIndex];

    if (userAnswer !== null) {
      const question = this.questions[this.currentQuestionIndex];
      const isCorrect = userAnswer === question.correct;

      status.className = `question-status ${
        isCorrect ? "correct" : "incorrect"
      }`;
      status.textContent = isCorrect ? "✅ Đúng" : "❌ Sai";
    } else {
      status.className = "question-status";
      status.textContent = "";
    }
  }

  // Cập nhật điểm số
  updateScore() {
    document.getElementById("currentScore").textContent = this.currentScore;
  }

  // Cập nhật buttons điều hướng
  updateNavigationButtons() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const finishBtn = document.getElementById("finishBtn");

    // Previous button
    prevBtn.disabled = this.currentQuestionIndex === 0;

    // Next/Finish button
    if (this.currentQuestionIndex === this.questions.length - 1) {
      nextBtn.style.display = "none";
      finishBtn.style.display = "flex";
    } else {
      nextBtn.style.display = "flex";
      finishBtn.style.display = "none";
      nextBtn.disabled = !this.isAnswered;
    }
  }

  // Câu tiếp theo
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.loadQuestion();
    }
  }

  // Câu trước
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.loadQuestion();
    }
  }

  // Hoàn thành quiz
  finishQuiz() {
    clearInterval(this.timerInterval);
    this.showResults();
  }

  // Hiển thị kết quả
  showResults() {
    document.getElementById("questionScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "block";

    // Tính toán kết quả
    let correctCount = 0;
    this.userAnswers.forEach((answer, index) => {
      if (answer === this.questions[index].correct) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / this.questions.length) * 100);
    const wrongCount = this.questions.length - correctCount;
    const skippedCount = this.userAnswers.filter(
      (answer) => answer === -1
    ).length;

    // Cập nhật UI kết quả với animation
    setTimeout(() => {
      document.getElementById("scorePercentage").textContent = percentage + "%";
    }, 500);

    setTimeout(() => {
      document.getElementById("correctAnswers").textContent = correctCount;
      document.getElementById("wrongAnswers").textContent = wrongCount;
      if (skippedCount > 0) {
        document.getElementById(
          "wrongAnswers"
        ).textContent += ` (${skippedCount} câu bỏ qua)`;
      }
    }, 800);

    // Cập nhật thời gian tổng
    const endTime = new Date();
    const totalSeconds = Math.floor((endTime - this.startTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    setTimeout(() => {
      document.getElementById("totalTime").textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }, 1100);

    // Animate score ring
    this.animateScoreRing(percentage);
  }

  // Animate score ring
  animateScoreRing(percentage) {
    const ring = document.getElementById("scoreRing");
    const circumference = 2 * Math.PI * 90; // r = 90
    const offset = circumference - (percentage / 100) * circumference;

    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;

    setTimeout(() => {
      ring.style.transition =
        "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)";
      ring.style.strokeDashoffset = offset;

      // Change color based on score
      if (percentage >= 80) {
        ring.style.stroke = "#10b981"; // green
      } else if (percentage >= 60) {
        ring.style.stroke = "#f59e0b"; // yellow
      } else {
        ring.style.stroke = "#ef4444"; // red
      }
    }, 800);
  }

  // Làm lại quiz
  restartQuiz() {
    // Reset tất cả
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.currentScore = 0;
    this.startTime = null;
    this.isAnswered = false;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    // Reset UI
    document.getElementById("resultScreen").style.display = "none";
    document.getElementById("reviewScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "block";

    // Reset progress
    document.getElementById("progressFill").style.width = "0%";
    document.getElementById(
      "progressText"
    ).textContent = `0/${this.questions.length}`;
    document.getElementById("elapsedTime").textContent = "00:00";
    document.getElementById("autoNextCheckbox").checked = false;
    this.autoNext = false;

    this.updateScore();
  }

  // Xem lại đáp án
  reviewAnswers() {
    document.getElementById("resultScreen").style.display = "none";
    document.getElementById("reviewScreen").style.display = "block";
    this.createReviewContent();
  }

  endEarly() {
    const modal = document.getElementById("confirmModal");
    modal.classList.add("show");
  }

  confirmEndEarly() {
    // Đánh dấu các câu chưa trả lời là sai
    this.userAnswers = this.userAnswers.map((answer) =>
      answer === null ? -1 : answer
    );

    // Dừng timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    // Đóng modal
    closeConfirmModal();

    // Hiển thị kết quả
    this.showResults();
  }

  // Tạo nội dung review
  createReviewContent() {
    const container = document.getElementById("reviewContainer");
    container.innerHTML = "";

    this.questions.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      const isCorrect = userAnswer === question.correct;

      const reviewItem = document.createElement("div");
      reviewItem.className = `review-item ${
        isCorrect ? "correct" : "incorrect"
      }`;

      reviewItem.innerHTML = `
            <div class="review-question">
                <strong>Câu ${index + 1}:</strong> ${question.question}
            </div>
            <div class="review-options">
                ${question.options
                  .map((option, optIndex) => {
                    let className = "review-option";
                    let icon = "";

                    if (optIndex === question.correct) {
                      className += " correct-answer";
                      icon = "✅ ";
                    }
                    if (optIndex === userAnswer) {
                      if (userAnswer === question.correct) {
                        className += " user-correct";
                      } else {
                        className += " user-answer";
                        icon = "❌ ";
                      }
                    }

                    return `
                        <div class="${className}">
                            <strong>${String.fromCharCode(
                              65 + optIndex
                            )}.</strong>
                            ${icon}${option}
                        </div>
                    `;
                  })
                  .join("")}
            </div>
            <div class="review-result ${isCorrect ? "correct" : "incorrect"}">
                ${isCorrect ? "✅ Đúng" : "❌ Sai"}
            </div>
            <div class="review-feedback">
                ${
                  question.explanation
                    ? `
                    <div class="review-explanation">
                        <strong>💡 Giải thích:</strong> ${question.explanation}
                    </div>
                `
                    : ""
                }
                ${
                  question.tip
                    ? `
                    <div class="review-tip">
                        <strong>✨ Mẹo:</strong> ${question.tip}
                    </div>
                `
                    : ""
                }
            </div>
        `;

      // Add animation delay
      reviewItem.style.animationDelay = `${index * 0.05}s`;
      reviewItem.classList.add("review-animate");

      container.appendChild(reviewItem);
    });
  }

  // Quay lại kết quả
  backToResults() {
    document.getElementById("reviewScreen").style.display = "none";
    document.getElementById("resultScreen").style.display = "block";
  }
}

// Global functions for HTML onclick events
let quizApp;

function selectLesson(lessonId) {
  quizApp.selectLesson(lessonId);
}

function closeConfirmModal() {
  const modal = document.getElementById("confirmModal");
  modal.classList.remove("show");
}

function confirmEndEarly() {
  quizApp.confirmEndEarly();
}

function backToLessons() {
  quizApp.backToLessons();
}

function startQuiz() {
  quizApp.startQuiz();
}

function nextQuestion() {
  quizApp.nextQuestion();
}

function previousQuestion() {
  quizApp.previousQuestion();
}

function finishQuiz() {
  quizApp.finishQuiz();
}

function restartQuiz() {
  quizApp.restartQuiz();
}

function reviewAnswers() {
  quizApp.reviewAnswers();
}

function backToResults() {
  quizApp.backToResults();
}

function endEarly() {
  quizApp.endEarly();
}

// Khởi tạo app khi DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  quizApp = new QuizApp();
});
