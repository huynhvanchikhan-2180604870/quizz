// Quiz App Logic
class QuizApp {
  constructor() {
    this.currentExerciseType = null; // 'grammar' hoặc 'transformation'
    this.allQuestions = []; // Tất cả câu hỏi của loại hiện tại
    this.grammarQuestions = [];
    this.sentenceQuestions = [];
    this.speakingTopics = [];
    this.writingTopics = [];
    this.listeningTests = [];
    this.questions = []; // Câu hỏi của bài đang chọn
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.currentScore = 0;
    this.startTime = null;
    this.timerInterval = null;
    this.isAnswered = false;
    this.currentLessonId = null;
    this.currentAudio = null;
    this.autoNext = false;
    this.init();
  }

  // Khởi tạo ứng dụng
  async init() {
    try {
      // Load cả 2 loại data
      this.grammarQuestions = questionsData.questions;
      this.sentenceQuestions = sentenceData.questions;
      this.speakingTopics = speakingData.topics;
      this.writingTopics = writingData.topics;
      this.listeningTests = listeningData.tests;
      // Hiện màn hình chọn dạng bài
      this.showScreen("exerciseTypeScreen");
      this.hideHeaderAndProgress();
      // Ẩn quiz info ban đầu
      document.querySelector(".container").classList.add("hide-quiz-info");

      document
        .getElementById("autoNextCheckbox")
        .addEventListener("change", (e) => {
          this.autoNext = e.target.checked;
        });

      this.setupEventListeners();
      console.log("Quiz app initialized");
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  }

  hideHeaderAndProgress() {
    document.querySelector(".header").style.display = "none";
    document.querySelector(".progress-container").style.display = "none";
  }

  showHeaderAndProgress() {
    document.querySelector(".header").style.display = "block";
    document.querySelector(".progress-container").style.display = "block";
  }

  // Chọn dạng bài tập
  selectExerciseType(type) {
    this.currentExerciseType = type;

    if (type === "grammar") {
      this.allQuestions = this.grammarQuestions;
      this.setupGrammarLessons();
    } else if (type === "transformation") {
      this.allQuestions = this.sentenceQuestions;
      this.setupTransformationLessons();
    } else if (type === "speaking") {
      this.allQuestions = this.speakingTopics;
      this.setupSpeakingTopics();
    } else if (type === "writing") {
      this.allQuestions = this.writingTopics;
      this.setupWritingTopics();
    } else if (type === "listening") {
      this.allQuestions = this.listeningTests;
      this.setupListeningTests();
    }

    this.hideHeaderAndProgress();
    this.showScreen("lessonSelectScreen");
  }

  setupListeningTests() {
    const lessonGrid = document.getElementById("lessonGrid");
    const lessonTitle = document.getElementById("lessonTitle");

    lessonTitle.textContent = "🎧 Listening Practice - Chọn bài test";
    lessonGrid.innerHTML = "";

    this.listeningTests.forEach((test) => {
      const lessonBtn = document.createElement("button");
      lessonBtn.className = "lesson-btn";
      lessonBtn.onclick = () => this.selectListeningTest(test.id);
      lessonBtn.innerHTML = `
      <span class="lesson-number">${test.icon} Test ${test.id}</span>
      <span class="lesson-range">${test.questions.length} câu hỏi</span>
    `;
      lessonGrid.appendChild(lessonBtn);
    });
  }

  selectListeningTest(testId) {
    const test = this.listeningTests.find((t) => t.id === testId);
    if (!test) return;

    this.questions = test.questions;
    this.currentTest = test;
    this.currentExerciseType = "listening"; // Đảm bảo set đúng type

    document.querySelector(
      ".header-content h1"
    ).textContent = `🎧 ${test.title}`;

    document.getElementById(
      "welcomeText"
    ).innerHTML = `Bạn sẽ nghe và trả lời ${test.questions.length} câu hỏi.<br>
     Có thể nghe lại nhiều lần. Chọn đáp án đúng nhất.`;

    // Hiện header cho Listening
    this.showHeaderAndProgress();
    this.showScreen("startScreen");

    // Reset các giá trị
    this.currentQuestionIndex = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);
    this.currentScore = 0;
    this.isAnswered = false;

    // Cập nhật UI
    this.updateTotalQuestions();
    document.getElementById("elapsedTime").textContent = "00:00";
    document.getElementById("currentScore").textContent = "0";
  }

  // Cập nhật loadListeningQuestion để quản lý audio
  loadListeningQuestion(question) {
    const questionText = document.getElementById("questionText");
    const optionsContainer = document.getElementById("optionsContainer");

    // Dừng audio cũ nếu có
    this.stopCurrentAudio();

    // Thêm audio player nếu có
    let audioHtml = "";
    if (this.currentTest && this.currentTest.audioUrl) {
      audioHtml = `
      <div class="audio-player">
        <audio controls id="listeningAudio">
          <source src="${this.currentTest.audioUrl}" type="audio/mpeg">
          Trình duyệt không hỗ trợ audio.
        </audio>
        <p class="audio-note">💡 Bạn có thể nghe lại nhiều lần</p>
      </div>
    `;
    }

    questionText.innerHTML = audioHtml + question.question;

    // Lưu reference đến audio element
    setTimeout(() => {
      this.currentAudio = document.getElementById("listeningAudio");
    }, 100);

    this.createOptions(question);
  }

  stopCurrentAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    // Dừng tất cả audio elements trên trang (backup)
    const allAudios = document.querySelectorAll("audio");
    allAudios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  setupWritingTopics() {
    const lessonGrid = document.getElementById("lessonGrid");
    const lessonTitle = document.getElementById("lessonTitle");
    this.hideHeaderAndProgress();
    lessonTitle.textContent = "✍️ Writing Practice - Chọn chủ đề";
    lessonGrid.innerHTML = "";

    this.writingTopics.forEach((topic) => {
      const lessonBtn = document.createElement("button");
      lessonBtn.className = "lesson-btn";
      lessonBtn.onclick = () => this.selectWritingTopic(topic.id);
      lessonBtn.innerHTML = `
            <span class="lesson-number">${topic.icon} Topic ${topic.id}</span>
            <span class="lesson-range">${topic.title}</span>
        `;
      lessonGrid.appendChild(lessonBtn);
    });
  }

  selectWritingTopic(topicId) {
    const topic = this.writingTopics.find((t) => t.id === topicId);
    if (!topic) return;

    this.hideHeaderAndProgress();
    this.showScreen("writingScreen");
    this.loadWritingTopic(topic);
  }

  loadWritingTopic(topic) {
    const writingTitle = document.getElementById("writingTitle");
    const writingBody = document.getElementById("writingBody");

    writingTitle.innerHTML = `${topic.icon} Topic ${topic.id}`;

    writingBody.innerHTML = `
        <div class="writing-prompt">
            <h3>📝 Đề bài:</h3>
            <div class="prompt-english">${topic.prompt}</div>
            <div class="prompt-vietnamese" style="display: none;">${topic.promptVietnamese}</div>
            <button class="toggle-translation" onclick="togglePromptTranslation()">
                🔄 Xem bản dịch
            </button>
        </div>
        
        <div class="sample-letter">
            <h3>✉️ Bài mẫu:</h3>
            <div class="letter-english">${topic.sampleLetter}</div>
            <div class="letter-vietnamese" style="display: none;">${topic.vietnameseTranslation}</div>
            <button class="toggle-translation" onclick="toggleLetterTranslation()">
                🔄 Xem bản dịch
            </button>
        </div>
    `;
  }

  setupSpeakingTopics() {
    const lessonGrid = document.getElementById("lessonGrid");
    const lessonTitle = document.getElementById("lessonTitle");

    lessonTitle.textContent = "🎤 Speaking Practice - Chọn chủ đề";
    lessonGrid.innerHTML = "";

    this.speakingTopics.forEach((topic, index) => {
      const lessonBtn = document.createElement("button");
      lessonBtn.className = "lesson-btn";
      lessonBtn.onclick = () => this.selectSpeakingTopic(topic.id);
      lessonBtn.innerHTML = `
      <span class="lesson-number">${topic.icon} Topic ${topic.id}</span>
      <span class="lesson-range">${topic.title}</span>
    `;
      lessonGrid.appendChild(lessonBtn);
    });
  }

  selectSpeakingTopic(topicId) {
    const topic = this.speakingTopics.find((t) => t.id === topicId);
    if (!topic) return;

    // Ẩn header và progress cho speaking
    document.querySelector(".header").style.display = "none";
    document.querySelector(".progress-container").style.display = "none";
    this.hideHeaderAndProgress();
    this.showScreen("speakingScreen");
    this.loadSpeakingTopic(topic);
  }

  loadSpeakingTopic(topic) {
    const speakingTitle = document.getElementById("speakingTitle");
    const speakingBody = document.getElementById("speakingBody");

    speakingTitle.innerHTML = `${topic.icon} Topic ${topic.id}`;

    let content = `
    <div class="topic-title">
      ${topic.title}
    </div>
  `;

    topic.questions.forEach((qa, index) => {
      content += `
      <div class="qa-item">
        <div class="question">
          <span class="question-number">${index + 1}</span>
          <span>${qa.question}</span>
        </div>
        <div class="answer">${qa.answer}</div>
      </div>
    `;
    });

    speakingBody.innerHTML = content;
  }

  // Setup bài học Grammar (4 bài x 25 câu)
  setupGrammarLessons() {
    const lessonGrid = document.getElementById("lessonGrid");
    const lessonTitle = document.getElementById("lessonTitle");

    lessonTitle.textContent = "📝 Grammar Quiz - Chọn bài học";
    lessonGrid.innerHTML = "";

    for (let i = 1; i <= 4; i++) {
      const startIndex = (i - 1) * 25 + 1;
      const endIndex = i * 25;

      const lessonBtn = document.createElement("button");
      lessonBtn.className = "lesson-btn";
      lessonBtn.onclick = () => this.selectLesson(i);
      lessonBtn.innerHTML = `
        <span class="lesson-number">Bài ${i}</span>
        <span class="lesson-range">Câu ${startIndex}-${endIndex}</span>
      `;
      lessonGrid.appendChild(lessonBtn);
    }
  }

  // Setup bài học Transformation (5 bài x 5 câu)
  setupTransformationLessons() {
    const lessonGrid = document.getElementById("lessonGrid");
    const lessonTitle = document.getElementById("lessonTitle");

    lessonTitle.textContent = "🔄 Sentence Transformation - Chọn bài học";
    lessonGrid.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
      const startIndex = 72 + (i - 1) * 5 + 1; // 73, 78, 83, 88, 93
      const endIndex = startIndex + 4; // 77, 82, 87, 92, 97

      const lessonBtn = document.createElement("button");
      lessonBtn.className = "lesson-btn";
      lessonBtn.onclick = () => this.selectLesson(i);
      lessonBtn.innerHTML = `
        <span class="lesson-number">Bài ${i}</span>
        <span class="lesson-range">Câu ${startIndex}-${endIndex}</span>
      `;
      lessonGrid.appendChild(lessonBtn);
    }
  }

  // Chọn bài học
  selectLesson(lessonId) {
    this.currentLessonId = lessonId;

    if (this.currentExerciseType === "grammar") {
      const startIndex = (lessonId - 1) * 25;
      const endIndex = startIndex + 25;
      this.questions = this.allQuestions.slice(startIndex, endIndex);

      document.querySelector(
        ".header-content h1"
      ).textContent = `📝 Grammar - Bài ${lessonId} (Câu ${
        startIndex + 1
      }-${endIndex})`;

      document.getElementById(
        "welcomeText"
      ).innerHTML = `Bạn sẽ trả lời 25 câu hỏi trắc nghiệm với 4 lựa chọn A, B, C, D.<br>
       Điểm số sẽ được cập nhật ngay khi bạn chọn đáp án.`;

      // Hiện header cho Grammar
      this.showHeaderAndProgress();
    } else if (this.currentExerciseType === "transformation") {
      const startIndex = (lessonId - 1) * 5;
      const endIndex = startIndex + 5;
      this.questions = this.allQuestions.slice(startIndex, endIndex);

      const questionStart = 73 + startIndex;
      const questionEnd = questionStart + 4;

      document.querySelector(
        ".header-content h1"
      ).textContent = `🔄 Transformation - Bài ${lessonId} (Câu ${questionStart}-${questionEnd})`;

      document.getElementById(
        "welcomeText"
      ).innerHTML = `Bạn sẽ làm 5 câu chuyển đổi câu.<br>
       Nhập đáp án vào ô trống để hoàn thành câu.`;

      // Hiện header cho Transformation
      this.showHeaderAndProgress();
    }

    // Ẩn màn hình chọn bài, hiện màn hình start
    this.showScreen("startScreen");

    // Reset các giá trị
    this.currentQuestionIndex = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);
    this.currentScore = 0;
    this.isAnswered = false;

    // Cập nhật UI
    this.updateTotalQuestions();
    document.getElementById("elapsedTime").textContent = "00:00";
    document.getElementById("currentScore").textContent = "0";
  }

  // Hiển thị màn hình
  showScreen(screenId) {
    const screens = [
      "exerciseTypeScreen",
      "lessonSelectScreen",
      "startScreen",
      "questionScreen",
      "resultScreen",
      "reviewScreen",
      "speakingScreen",
      "writingScreen",
    ];
    screens.forEach((id) => {
      document.getElementById(id).style.display =
        id === screenId ? "block" : "none";
    });
  }

  // Quay lại chọn bài
  backToLessons() {
    this.stopCurrentAudio();
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

    // Ẩn header cho tất cả loại bài tập khi quay về màn hình chọn bài
    this.hideHeaderAndProgress();

    // Reset tiêu đề
    document.querySelector(".header-content h1").textContent =
      "🎓 Quiz Trắc Nghiệm";

    // Hiện màn hình chọn bài
    this.showScreen("lessonSelectScreen");

    // Reset progress
    document.getElementById("progressFill").style.width = "0%";
    document.getElementById("progressText").textContent = "0/0";
    document.getElementById("elapsedTime").textContent = "00:00";
    document.getElementById("autoNextCheckbox").checked = false;
    this.autoNext = false;
    this.updateScore();
  }

  // Quay lại chọn dạng bài
  backToExerciseTypes() {
    this.currentExerciseType = null;
    this.hideHeaderAndProgress();
    this.showScreen("exerciseTypeScreen");
    document.querySelector(".header-content h1").textContent =
      "🎓 Quiz Trắc Nghiệm";
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
      if (this.currentExerciseType === "grammar") {
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
        }
      }

      switch (e.key) {
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

    this.showScreen("questionScreen");
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
      // Cập nhật số câu hỏi
      document.getElementById("currentQuestion").textContent =
        this.currentQuestionIndex + 1;

      // Cập nhật progress bar
      const progress =
        ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
      document.getElementById("progressFill").style.width = progress + "%";
      document.getElementById("progressText").textContent = `${
        this.currentQuestionIndex + 1
      }/${this.questions.length}`;

      // Tạo nội dung câu hỏi theo loại
      if (this.currentExerciseType === "listening") {
        this.loadListeningQuestion(question);
      } else if (this.currentExerciseType === "grammar") {
        this.loadGrammarQuestion(question);
      } else {
        this.loadTransformationQuestion(question);
      }

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

  loadListeningQuestion(question) {
    const questionText = document.getElementById("questionText");
    const optionsContainer = document.getElementById("optionsContainer");

    // Thêm audio player nếu có
    let audioHtml = "";
    if (this.currentTest && this.currentTest.audioUrl) {
      audioHtml = `
      <div class="audio-player">
        <audio controls>
          <source src="${this.currentTest.audioUrl}" type="audio/mpeg">
          Trình duyệt không hỗ trợ audio.
        </audio>
        <p class="audio-note">💡 Bạn có thể nghe lại nhiều lần</p>
      </div>
    `;
    }

    questionText.innerHTML = audioHtml + question.question;
    this.createOptions(question);
  }

  // Load câu hỏi Grammar
  loadGrammarQuestion(question) {
    document.getElementById("questionText").textContent = question.question;
    this.createOptions(question);
  }

  // Load câu hỏi Transformation
  loadTransformationQuestion(question) {
    const questionText = document.getElementById("questionText");
    const optionsContainer = document.getElementById("optionsContainer");

    questionText.innerHTML = `<strong>Câu gốc:</strong> ${question.question}`;

    optionsContainer.innerHTML = `
      <div class="transformation-container">
        <div class="transformation-input">
          <span class="transformation-start">${
            question.transformationStart
          }</span>
          <textarea class="answer-input" id="transformationInput" 
          placeholder="nhập đáp án vào đây..." 
          rows="2"
          ${this.isAnswered ? "disabled" : ""}></textarea>

          <button class="submit-btn" id="submitBtn" onclick="quizApp.submitTransformation()" 
                  ${this.isAnswered ? "disabled" : ""}>
            Kiểm tra
          </button>
        </div>
      </div>
    `;

    // Nếu đã trả lời, hiển thị đáp án
    if (this.isAnswered) {
      const input = document.getElementById("transformationInput");
      const userAnswer = this.userAnswers[this.currentQuestionIndex];
      input.value = userAnswer;

      const isCorrect = this.checkTransformationAnswer(
        userAnswer,
        question.correctAnswer
      );
      input.classList.add(isCorrect ? "correct" : "incorrect");
    }
    // Auto-resize textarea
    setTimeout(() => {
      const textarea = document.getElementById("transformationInput");
      if (textarea) {
        textarea.addEventListener("input", function () {
          this.style.height = "auto";
          this.style.height = Math.min(this.scrollHeight, 120) + "px";
        });

        // Set initial height if there's existing content
        if (textarea.value) {
          textarea.style.height = "auto";
          textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
        }
      }
    }, 100);
  }

  // Tạo các lựa chọn cho Grammar
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
        <div class="option-letter">${String.fromCharCode(65 + index)}</div>
        <div class="option-text">${option}</div>
      `;

      if (!this.isAnswered) {
        optionDiv.onclick = () => this.selectOption(index);
      }

      optionsContainer.appendChild(optionDiv);
    });
  }

  // Chọn lựa chọn (Grammar)
  selectOption(optionIndex) {
    if (this.isAnswered) return;

    const question = this.questions[this.currentQuestionIndex];
    this.userAnswers[this.currentQuestionIndex] = optionIndex;
    this.isAnswered = true;

    const isCorrect = optionIndex === question.correct;
    if (isCorrect) {
      this.currentScore++;
    }

    this.showFeedback(isCorrect, question.explanation, question.tip);
    this.updateOptionsAfterAnswer(optionIndex, question.correct);
    this.updateScore();
    this.updateQuestionStatus();
    this.updateNavigationButtons();

    if (
      this.autoNext &&
      this.currentQuestionIndex < this.questions.length - 1
    ) {
      setTimeout(() => {
        this.nextQuestion();
      }, 1500);
    } else if (this.currentQuestionIndex === this.questions.length - 1) {
      setTimeout(() => {
        document.getElementById("finishBtn").classList.add("pulse");
      }, 1000);
    }
  }

  // Submit transformation answer
  submitTransformation() {
    if (this.isAnswered) return;

    const input = document.getElementById("transformationInput");
    const userAnswer = input.value.trim();

    if (!userAnswer) {
      alert("Vui lòng nhập đáp án!");
      return;
    }

    const question = this.questions[this.currentQuestionIndex];
    this.userAnswers[this.currentQuestionIndex] = userAnswer;
    this.isAnswered = true;

    const isCorrect = this.checkTransformationAnswer(
      userAnswer,
      question.correctAnswer
    );
    if (isCorrect) {
      this.currentScore++;
    }

    // Update UI
    input.disabled = true;
    input.classList.add(isCorrect ? "correct" : "incorrect");
    document.getElementById("submitBtn").disabled = true;

    this.showFeedback(isCorrect, question.explanation, question.tip);
    this.updateScore();
    this.updateQuestionStatus();
    this.updateNavigationButtons();

    if (
      this.autoNext &&
      this.currentQuestionIndex < this.questions.length - 1
    ) {
      setTimeout(() => {
        this.nextQuestion();
      }, 1500);
    } else if (this.currentQuestionIndex === this.questions.length - 1) {
      setTimeout(() => {
        document.getElementById("finishBtn").classList.add("pulse");
      }, 1000);
    }
  }

  // Kiểm tra đáp án transformation
  checkTransformationAnswer(userAnswer, correctAnswer) {
    // Normalize answers (remove extra spaces, convert to lowercase)
    const normalizeAnswer = (answer) => {
      return answer
        .toLowerCase()
        .replace(/[.,!?;:"']/g, "") // Remove punctuation
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .trim();
    };

    const normalizedUser = normalizeAnswer(userAnswer);
    const normalizedCorrect = normalizeAnswer(correctAnswer);

    // Check if answers match (allowing for minor variations)
    return normalizedUser === normalizedCorrect;
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
  showFeedback(isCorrect, explanation, tip) {
    const feedback = document.getElementById("answerFeedback");
    const feedbackContent = feedback.querySelector(".feedback-content");
    const tipContent = feedback.querySelector(".tip-content");

    feedback.className = `answer-feedback ${
      isCorrect ? "correct" : "incorrect"
    }`;

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

    if (tip) {
      tipContent.innerHTML = `
        <div class="tip-icon">💡</div>
        <div class="tip-text">${tip}</div>
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
      let isCorrect;

      if (this.currentExerciseType === "grammar") {
        isCorrect = userAnswer === question.correct;
      } else {
        isCorrect = this.checkTransformationAnswer(
          userAnswer,
          question.correctAnswer
        );
      }

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

    prevBtn.disabled = this.currentQuestionIndex === 0;

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
    this.stopCurrentAudio();
    clearInterval(this.timerInterval);
    this.showResults();
  }

  // Hiển thị kết quả
  showResults() {
    this.showScreen("resultScreen");

    let correctCount = 0;
    let answeredCount = 0;

    // Đảm bảo userAnswers có đủ length
    while (this.userAnswers.length < this.questions.length) {
      this.userAnswers.push(null);
    }

    this.userAnswers.forEach((answer, index) => {
      if (answer !== null && answer !== undefined) {
        answeredCount++;
        const question = this.questions[index];
        let isCorrect;

        if (
          this.currentExerciseType === "grammar" ||
          this.currentExerciseType === "listening"
        ) {
          isCorrect = answer === question.correct;
        } else {
          isCorrect = this.checkTransformationAnswer(
            answer,
            question.correctAnswer
          );
        }

        if (isCorrect) {
          correctCount++;
        }
      }
    });

    const percentage = Math.round((correctCount / this.questions.length) * 100);
    const wrongCount = answeredCount - correctCount;
    const skippedCount = this.questions.length - answeredCount;

    // Cập nhật UI kết quả
    setTimeout(() => {
      document.getElementById("scorePercentage").textContent = percentage + "%";
    }, 500);

    setTimeout(() => {
      document.getElementById("correctAnswers").textContent = correctCount;
      let wrongText = wrongCount.toString();
      if (skippedCount > 0) {
        wrongText += ` (${skippedCount} câu bỏ qua)`;
      }
      document.getElementById("wrongAnswers").textContent = wrongText;
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

    this.animateScoreRing(percentage);
  }

  // Animate score ring
  animateScoreRing(percentage) {
    const ring = document.getElementById("scoreRing");
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (percentage / 100) * circumference;

    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference;

    setTimeout(() => {
      ring.style.transition =
        "stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)";
      ring.style.strokeDashoffset = offset;

      if (percentage >= 80) {
        ring.style.stroke = "#10b981";
      } else if (percentage >= 60) {
        ring.style.stroke = "#f59e0b";
      } else {
        ring.style.stroke = "#ef4444";
      }
    }, 800);
  }

  // Làm lại quiz
  restartQuiz() {
    this.stopCurrentAudio();
    this.currentQuestionIndex = 0;
    this.userAnswers = [];
    this.currentScore = 0;
    this.startTime = null;
    this.isAnswered = false;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.showScreen("startScreen");

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
    this.showScreen("reviewScreen");
    this.createReviewContent();
  }

  // Kết thúc sớm
  endEarly() {
    const modal = document.getElementById("confirmModal");
    modal.classList.add("show");
  }

  confirmEndEarly() {
    this.stopCurrentAudio();
    // Đảm bảo userAnswers có đủ length cho tất cả câu hỏi
    while (this.userAnswers.length < this.questions.length) {
      this.userAnswers.push(null);
    }

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    closeConfirmModal();
    this.showResults();
  }

  // Tạo nội dung review
  createReviewContent() {
    const container = document.getElementById("reviewContainer");
    container.innerHTML = "";

    // Đảm bảo userAnswers có đủ length
    while (this.userAnswers.length < this.questions.length) {
      this.userAnswers.push(null);
    }

    this.questions.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      let isCorrect = false;

      if (userAnswer !== null && userAnswer !== undefined) {
        if (
          this.currentExerciseType === "grammar" ||
          this.currentExerciseType === "listening"
        ) {
          isCorrect = userAnswer === question.correct;
        } else {
          isCorrect = this.checkTransformationAnswer(
            userAnswer,
            question.correctAnswer
          );
        }
      }

      const reviewItem = document.createElement("div");
      reviewItem.className = `review-item ${
        isCorrect ? "correct" : "incorrect"
      }`;

      if (
        this.currentExerciseType === "grammar" ||
        this.currentExerciseType === "listening"
      ) {
        reviewItem.innerHTML = this.createGrammarReview(
          question,
          index,
          userAnswer,
          isCorrect
        );
      } else {
        reviewItem.innerHTML = this.createTransformationReview(
          question,
          index,
          userAnswer,
          isCorrect
        );
      }

      reviewItem.style.animationDelay = `${index * 0.05}s`;
      reviewItem.classList.add("review-animate");

      container.appendChild(reviewItem);
    });
  }

  // Tạo review cho Grammar
  createGrammarReview(question, index, userAnswer, isCorrect) {
    return `
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
          if (
            userAnswer !== null &&
            userAnswer !== undefined &&
            optIndex === userAnswer
          ) {
            if (userAnswer === question.correct) {
              className += " user-correct";
            } else {
              className += " user-answer";
              icon = "❌ ";
            }
          }

          return `
          <div class="${className}">
            <strong>${String.fromCharCode(65 + optIndex)}.</strong>
            ${icon}${option}
          </div>
        `;
        })
        .join("")}
    </div>
    <div class="review-result ${isCorrect ? "correct" : "incorrect"}">
      ${
        userAnswer !== null && userAnswer !== undefined
          ? isCorrect
            ? "✅ Đúng"
            : "❌ Sai"
          : "⚪ Chưa trả lời"
      }
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
  }

  // Tạo review cho Transformation
  createTransformationReview(question, index, userAnswer, isCorrect) {
    const hasAnswer = userAnswer !== null && userAnswer !== undefined;
    const userAnswerText = hasAnswer ? userAnswer : "(Chưa trả lời)";
    const userAnswerClass = hasAnswer
      ? isCorrect
        ? "user-correct"
        : "user-answer"
      : "";

    return `
    <div class="review-question">
      <strong>Câu ${index + 1}:</strong> ${question.question}
    </div>
    <div class="review-options">
      <div class="review-option">
        <strong>Bắt đầu:</strong> ${question.transformationStart}
      </div>
      <div class="review-option ${userAnswerClass}">
        <strong>Bạn trả lời:</strong> ${userAnswerText}
      </div>
      <div class="review-option correct-answer">
        <strong>Đáp án đúng:</strong> ${question.correctAnswer}
      </div>
      <div class="review-option">
        <strong>Câu hoàn chỉnh:</strong> ${question.fullCorrectSentence}
      </div>
    </div>
    <div class="review-result ${isCorrect ? "correct" : "incorrect"}">
      ${hasAnswer ? (isCorrect ? "✅ Đúng" : "❌ Sai") : "⚪ Chưa trả lời"}
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
  }

  // Quay lại kết quả
  backToResults() {
    this.stopCurrentAudio();
    this.showScreen("resultScreen");
  }
}

// Global functions for HTML onclick events
let quizApp;

function selectExerciseType(type) {
  quizApp.selectExerciseType(type);
}

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

function backToExerciseTypes() {
  quizApp.backToExerciseTypes();
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

// Global functions for translation toggle
function togglePromptTranslation() {
  const english = document.querySelector(".prompt-english");
  const vietnamese = document.querySelector(".prompt-vietnamese");
  const button = document.querySelector(".writing-prompt .toggle-translation");

  if (vietnamese.style.display === "none") {
    english.style.display = "none";
    vietnamese.style.display = "block";
    button.textContent = "🔄 Xem tiếng Anh";
  } else {
    english.style.display = "block";
    vietnamese.style.display = "none";
    button.textContent = "🔄 Xem bản dịch";
  }
}

function toggleLetterTranslation() {
  const english = document.querySelector(".letter-english");
  const vietnamese = document.querySelector(".letter-vietnamese");
  const button = document.querySelector(".sample-letter .toggle-translation");

  if (vietnamese.style.display === "none") {
    english.style.display = "none";
    vietnamese.style.display = "block";
    button.textContent = "🔄 Xem tiếng Anh";
  } else {
    english.style.display = "block";
    vietnamese.style.display = "none";
    button.textContent = "🔄 Xem bản dịch";
  }
}

// Khởi tạo app khi DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  quizApp = new QuizApp();
});
