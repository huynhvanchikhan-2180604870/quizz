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
      this.grammarQuestions = questionsData.questions;
      this.sentenceQuestions = sentenceData.questions;
      this.speakingTopics = speakingData.topics;
      this.writingTopics = writingData.topics;
      this.listeningTests = listeningData.tests;
      this.clozeTests = clozeData.tests; // Thêm dòng này

      this.showScreen("exerciseTypeScreen");
      this.hideHeaderAndProgress();
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

  createClozeReview(question, index, userAnswer, isCorrect) {
    const hasAnswer = userAnswer !== null && userAnswer !== undefined;
    const userAnswerText = hasAnswer
      ? question.options[userAnswer]
      : "(Chưa trả lời)";
    const correctAnswerText = question.options[question.correct];

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
          if (hasAnswer && optIndex === userAnswer) {
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
    } else if (type === "cloze") {
      // Thêm case này
      this.allQuestions = this.clozeTests;
      this.setupClozeTests();
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
    this.currentExerciseType = "listening";

    document.querySelector(
      ".header-content h1"
    ).textContent = `🎧 ${test.title}`;

    document.getElementById(
      "welcomeText"
    ).innerHTML = `Bạn sẽ nghe và trả lời ${test.questions.length} câu hỏi.<br>
     Có thể nghe lại nhiều lần. Chọn đáp án đúng nhất.`;

    // Ẩn header cho Test 17
    if (testId === 17) {
      this.hideHeaderAndProgress();
    } else {
      this.showHeaderAndProgress();
    }

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
    console.log("=== loadListeningQuestion START ===");
    console.log("this.currentTest:", this.currentTest);
    console.log("this.currentTest.passage:", this.currentTest.passage);

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

    // Thêm passage cho Test 15
    let passageHtml = "";
    if (this.currentTest.id === 15 && this.currentTest.passage) {
      passageHtml = `
      <div class="listening-passage">
        <h4>📄 Đoạn văn tham khảo:</h4>
        <div class="passage-content">${this.currentTest.passage}</div>
      </div>
    `;
    }

    questionText.innerHTML =
      audioHtml +
      passageHtml +
      `<div class="question-text-content">${question.question}</div>`;
    console.log("HTML updated successfully");

    this.createOptions(question);
    console.log("=== loadListeningQuestion END ===");
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
    this.removeAudioPlayer();
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

  createAudioPlayer() {
    if (this.currentTest && this.currentTest.audioUrl) {
      const existingPlayer = document.getElementById("audioPlayerContainer");
      if (existingPlayer) return;

      const audioContainer = document.createElement("div");
      audioContainer.className = "audio-player-container";
      audioContainer.id = "audioPlayerContainer";
      audioContainer.innerHTML = `
      <div class="mobile-audio-player">
        <div class="audio-wave">
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
          <div class="wave-bar"></div>
        </div>
        
        <div class="audio-info">
          <div class="audio-title">🎧 Audio bài nghe</div>
          <div class="audio-time">
            <span id="currentTime">0:00</span> / <span id="totalTime">0:00</span>
          </div>
        </div>
        
        <div class="audio-progress">
          <div class="progress-track" id="progressTrack">
            <div class="progress-fill" id="progressFill"></div>
            <div class="progress-thumb" id="progressThumb"></div>
          </div>
        </div>
        
        <div class="audio-controls">
          <button class="control-btn replay-btn" id="replayBtn">⏮</button>
          <button class="control-btn play-btn" id="playBtn">
            <div class="play-icon" id="playIcon">▶</div>
          </button>
          <button class="control-btn forward-btn" id="forwardBtn">⏭</button>
        </div>
        
        <div class="audio-tip">
          <span class="tip-pulse">💡</span>
          Chạm để phát/dừng • Kéo thanh để tua
        </div>
        
        <audio id="listeningAudio" preload="metadata">
          <source src="${this.currentTest.audioUrl}" type="audio/mpeg">
        </audio>
      </div>
    `;

      const questionScreen = document.getElementById("questionScreen");
      questionScreen.insertBefore(audioContainer, questionScreen.firstChild);

      this.currentAudio = document.getElementById("listeningAudio");
      this.setupMobileAudioControls();
    }
  }

  setupMobileAudioControls() {
    const audio = this.currentAudio;
    const playBtn = document.getElementById("playBtn");
    const playIcon = document.getElementById("playIcon");
    const replayBtn = document.getElementById("replayBtn");
    const forwardBtn = document.getElementById("forwardBtn");
    const progressTrack = document.getElementById("progressTrack");
    const progressFill = document.getElementById("progressFill");
    const progressThumb = document.getElementById("progressThumb");
    const currentTime = document.getElementById("currentTime");
    const totalTime = document.getElementById("totalTime");

    let isPlaying = false;

    // Play/Pause
    playBtn.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
        playIcon.textContent = "▶";
        playBtn.classList.remove("playing");
        this.stopWaveAnimation();
      } else {
        audio.play();
        playIcon.textContent = "⏸";
        playBtn.classList.add("playing");
        this.startWaveAnimation();
      }
      isPlaying = !isPlaying;
    });

    // Replay/Forward buttons
    replayBtn.addEventListener("click", () => {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
      this.createRipple(replayBtn);
    });

    forwardBtn.addEventListener("click", () => {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
      this.createRipple(forwardBtn);
    });

    // Progress update
    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + "%";
        currentTime.textContent = this.formatTime(audio.currentTime);
      }
    });

    // Load metadata
    audio.addEventListener("loadedmetadata", () => {
      totalTime.textContent = this.formatTime(audio.duration);
    });

    // Progress bar interaction - sử dụng passive: false để có thể preventDefault
    progressTrack.addEventListener(
      "touchstart",
      (e) => {
        this.handleProgressStart(e);
      },
      { passive: false }
    );

    progressTrack.addEventListener("mousedown", (e) => {
      this.handleProgressStart(e);
    });

    // Audio ended
    audio.addEventListener("ended", () => {
      playIcon.textContent = "▶";
      playBtn.classList.remove("playing");
      this.stopWaveAnimation();
      isPlaying = false;
    });
  }

  handleProgressStart(e) {
    const audio = this.currentAudio;
    const progressTrack = document.getElementById("progressTrack");
    const progressFill = document.getElementById("progressFill");
    const progressThumb = document.getElementById("progressThumb");
    let isDragging = true;

    // Ngăn scroll khi đang kéo progress bar
    const preventScroll = (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const updateProgress = (e) => {
      if (!isDragging) return;

      const rect = progressTrack.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const progress = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );

      progressFill.style.width = progress * 100 + "%";
      progressThumb.style.left = progress * 100 + "%";
      progressThumb.style.opacity = "1";

      if (audio.duration) {
        audio.currentTime = progress * audio.duration;
      }
    };

    const stopDrag = () => {
      isDragging = false;
      progressThumb.style.opacity = "0";

      // Remove all event listeners
      document.removeEventListener("touchmove", updateProgress, {
        passive: false,
      });
      document.removeEventListener("mousemove", updateProgress);
      document.removeEventListener("touchend", stopDrag);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", preventScroll, {
        passive: false,
      });
    };

    // Prevent default behavior and add event listeners
    if (e.type === "touchstart") {
      document.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("touchmove", updateProgress, {
        passive: false,
      });
      document.addEventListener("touchend", stopDrag);
    } else {
      document.addEventListener("mousemove", updateProgress);
      document.addEventListener("mouseup", stopDrag);
    }

    updateProgress(e);
  }

  startWaveAnimation() {
    const waveBars = document.querySelectorAll(".wave-bar");
    waveBars.forEach((bar) => bar.classList.add("active"));
  }

  stopWaveAnimation() {
    const waveBars = document.querySelectorAll(".wave-bar");
    waveBars.forEach((bar) => bar.classList.remove("active"));
  }

  createRipple(button) {
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // Load câu hỏi hiện tại
  loadQuestion() {
    const question = this.questions[this.currentQuestionIndex];
    const questionScreen = document.getElementById("questionScreen");

    this.isAnswered = this.userAnswers[this.currentQuestionIndex] !== null;

    questionScreen.style.opacity = "0.7";
    questionScreen.style.transform = "translateY(10px)";

    setTimeout(() => {
      document.getElementById("currentQuestion").textContent =
        this.currentQuestionIndex + 1;

      const progress =
        ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
      document.getElementById("progressFill").style.width = progress + "%";
      document.getElementById("progressText").textContent = `${
        this.currentQuestionIndex + 1
      }/${this.questions.length}`;

      // Load question based on type
      if (this.currentExerciseType === "cloze") {
        this.loadClozeQuestion(question);
      } else if (this.currentExerciseType === "listening") {
        // existing listening logic...
      } else if (this.currentExerciseType === "grammar") {
        this.loadGrammarQuestion(question);
      } else {
        this.loadTransformationQuestion(question);
      }

      this.updateQuestionStatus();
      this.updateNavigationButtons();
      document.getElementById("answerFeedback").style.display = "none";

      questionScreen.style.opacity = "1";
      questionScreen.style.transform = "translateY(0)";
    }, 150);
  }

  loadListeningQuestion(question) {
    const questionText = document.getElementById("questionText");
    const optionsContainer = document.getElementById("optionsContainer");

    // Không tạo audio HTML nữa, chỉ tạo passage và question content
    let passageHtml = "";
    switch (this.currentTest.id) {
      case 13:
      case 35:
        // Test 13 không có passage
        break;
      case 15:
      case 19:
        passageHtml = `
        <div class="listening-passage">
          <h4>📄 Đoạn văn tham khảo:</h4>
          <div class="passage-content">${this.currentTest.passage}</div>
        </div>
      `;
        break;
      default:
        passageHtml = `
        <div class="listening-passage">
          <h4>🚧 Đang phát triển</h4>
          <div class="passage-content">Bài test này đang được phát triển...</div>
        </div>
      `;
        break;
    }

    questionText.innerHTML =
      passageHtml +
      `<div class="question-text-content">${question.question}</div>`;
    this.createOptions(question);
  }

  loadTrueFalseQuestion(question) {
    const questionText = document.getElementById("questionText");
    const optionsContainer = document.getElementById("optionsContainer");

    // Không tạo audio HTML nữa, chỉ tạo passage
    let passageHtml = "";
    if (this.currentTest.passage) {
      passageHtml = `
      <div class="listening-passage">
        <h4>📄 Hướng dẫn:</h4>
        <div class="passage-content">${this.currentTest.passage}</div>
      </div>
    `;
    }

    questionText.innerHTML = passageHtml;

    // Phần còn lại giữ nguyên...
    const userAnswer = this.userAnswers[this.currentQuestionIndex];
    const questionNumber = this.currentQuestionIndex + 1;

    optionsContainer.innerHTML = `
    <div class="true-false-container">
      <div class="question-statement">
        <strong>${questionNumber}.</strong> ${question.question}
      </div>
      <div class="true-false-options">
        <div class="tf-option">
          <input type="radio" id="true_${questionNumber}" name="tf_${questionNumber}" value="0" 
                 ${this.isAnswered ? "disabled" : ""} ${
      userAnswer === 0 ? "checked" : ""
    }>
          <label for="true_${questionNumber}" class="tf-label ${
      this.isAnswered && userAnswer === 0
        ? question.correct === 0
          ? "correct"
          : "incorrect"
        : ""
    }">
            <span class="tf-letter">A</span>
            <span class="tf-text">True</span>
          </label>
        </div>
        <div class="tf-option">
          <input type="radio" id="false_${questionNumber}" name="tf_${questionNumber}" value="1" 
                 ${this.isAnswered ? "disabled" : ""} ${
      userAnswer === 1 ? "checked" : ""
    }>
          <label for="false_${questionNumber}" class="tf-label ${
      this.isAnswered && userAnswer === 1
        ? question.correct === 1
          ? "correct"
          : "incorrect"
        : ""
    }">
            <span class="tf-letter">B</span>
            <span class="tf-text">False</span>
          </label>
        </div>
      </div>
    </div>
  `;

    // Thêm event listeners cho radio buttons
    if (!this.isAnswered) {
      const radioButtons = optionsContainer.querySelectorAll(
        'input[type="radio"]'
      );
      radioButtons.forEach((radio) => {
        radio.addEventListener("change", (e) => {
          this.selectTrueFalseOption(parseInt(e.target.value));
        });
      });
    }

    // Hiển thị đáp án đúng nếu đã trả lời
    if (this.isAnswered) {
      const correctLabel = optionsContainer.querySelector(
        `label[for="${
          question.correct === 0 ? "true" : "false"
        }_${questionNumber}"]`
      );
      if (correctLabel && userAnswer !== question.correct) {
        correctLabel.classList.add("show-correct");
      }
    }
  }

  selectTrueFalseOption(optionValue) {
    if (this.isAnswered) return;

    const question = this.questions[this.currentQuestionIndex];
    this.userAnswers[this.currentQuestionIndex] = optionValue;
    this.isAnswered = true;

    const isCorrect = optionValue === question.correct;
    if (isCorrect) {
      this.currentScore++;
    }

    // Cập nhật UI
    const questionNumber = this.currentQuestionIndex + 1;
    const selectedLabel = document.querySelector(
      `label[for="${optionValue === 0 ? "true" : "false"}_${questionNumber}"]`
    );
    const correctLabel = document.querySelector(
      `label[for="${
        question.correct === 0 ? "true" : "false"
      }_${questionNumber}"]`
    );

    selectedLabel.classList.add(isCorrect ? "correct" : "incorrect");
    if (!isCorrect) {
      correctLabel.classList.add("show-correct");
    }

    // Disable radio buttons
    const radioButtons = document.querySelectorAll(
      `input[name="tf_${questionNumber}"]`
    );
    radioButtons.forEach((radio) => (radio.disabled = true));

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

  // Thêm vào class QuizApp, sau method loadListeningQuestion
  loadFillInBlanksQuestion(question) {
    const questionText = document.getElementById("questionText");
    const optionsContainer = document.getElementById("optionsContainer");

    // Không tạo audio HTML nữa, chỉ tạo passage
    let passageHtml = "";
    if (this.currentTest.passage) {
      passageHtml = `
      <div class="listening-passage">
        <h4>📄 Đoạn văn tham khảo:</h4>
        <div class="passage-content">${this.currentTest.passage}</div>
      </div>
    `;
    }

    questionText.innerHTML = passageHtml;

    // Phần còn lại giữ nguyên...
    optionsContainer.innerHTML = `
    <div class="fill-blanks-container">
      <div class="blanks-grid">
        ${Array.from(
          { length: 10 },
          (_, i) => `
          <div class="blank-item">
            <label>${i + 1}.</label>
            <input type="text" id="blank${i + 1}" class="blank-input" 
                   ${this.isAnswered ? "disabled" : ""}>
          </div>
        `
        ).join("")}
      </div>
      <div class="submit-center">
        <button class="submit-btn" id="submitBlanksBtn" onclick="quizApp.submitFillInBlanks()" 
                ${this.isAnswered ? "disabled" : ""}>
          Kiểm tra
        </button>
      </div>
    </div>
  `;

    // Nếu đã trả lời, hiển thị đáp án
    if (this.isAnswered) {
      const userAnswers = this.userAnswers[this.currentQuestionIndex];
      if (userAnswers) {
        userAnswers.forEach((answer, index) => {
          const input = document.getElementById(`blank${index + 1}`);
          if (input) {
            input.value = answer || "";
            const isCorrect = this.checkTransformationAnswer(
              answer,
              this.questions[index].correctAnswer
            );
            input.classList.add(isCorrect ? "correct" : "incorrect");
          }
        });
      }
    }
  }

  removeAudioPlayer() {
    const existingPlayer = document.getElementById("audioPlayerContainer");
    if (existingPlayer) {
      existingPlayer.remove();
    }
    this.currentAudio = null;
  }

  // Thêm vào class QuizApp
  submitFillInBlanks() {
    if (this.isAnswered) return;

    const userAnswers = [];
    let hasEmptyAnswer = false;

    // Lấy tất cả đáp án
    for (let i = 1; i <= 10; i++) {
      const input = document.getElementById(`blank${i}`);
      const answer = input.value.trim();
      userAnswers.push(answer);
      if (!answer) hasEmptyAnswer = true;
    }

    if (hasEmptyAnswer) {
      this.showEmptyAnswerModal();
      return;
    }

    this.userAnswers[this.currentQuestionIndex] = userAnswers;
    this.isAnswered = true;

    // Tính điểm
    let correctCount = 0;
    userAnswers.forEach((answer, index) => {
      const correctAnswer = this.questions[index].correctAnswer;
      if (this.checkTransformationAnswer(answer, correctAnswer)) {
        correctCount++;
      }
    });

    this.currentScore += correctCount;

    // Cập nhật UI
    userAnswers.forEach((answer, index) => {
      const input = document.getElementById(`blank${index + 1}`);
      input.disabled = true;
      const correctAnswer = this.questions[index].correctAnswer;
      const isCorrect = this.checkTransformationAnswer(answer, correctAnswer);
      input.classList.add(isCorrect ? "correct" : "incorrect");
    });

    document.getElementById("submitBlanksBtn").disabled = true;

    this.showFeedback(
      correctCount === 10,
      `Bạn đã điền đúng ${correctCount}/10 từ.`,
      "Nghe kỹ và chú ý ngữ cảnh của từng câu."
    );

    this.updateScore();
    this.updateQuestionStatus();
    this.updateNavigationButtons();

    if (
      this.autoNext &&
      this.currentQuestionIndex < this.questions.length - 1
    ) {
      setTimeout(() => {
        this.nextQuestion();
      }, 2000);
    } else if (this.currentQuestionIndex === this.questions.length - 1) {
      setTimeout(() => {
        document.getElementById("finishBtn").classList.add("pulse");
      }, 1000);
    }
  }

  // Thêm vào class QuizApp
  showEmptyAnswerModal() {
    const modal = document.getElementById("confirmModal");
    const modalIcon = modal.querySelector(".modal-icon");
    const modalTitle = modal.querySelector("h3");
    const modalText = modal.querySelector("p");
    const modalBtn = modal.querySelector(".btn-end-early");

    modalIcon.textContent = "📝";
    modalTitle.textContent = "Chưa hoàn thành";
    modalText.innerHTML =
      "Bạn chưa điền đủ tất cả các ô trống.<br>Vui lòng điền đầy đủ trước khi kiểm tra.";
    modalBtn.innerHTML = `
    <span class="btn-icon">✏️</span>
    <span class="btn-text">Tiếp tục điền</span>
  `;
    modalBtn.onclick = () => this.closeEmptyAnswerModal();

    modal.classList.add("show");
  }

  closeEmptyAnswerModal() {
    const modal = document.getElementById("confirmModal");
    const modalIcon = modal.querySelector(".modal-icon");
    const modalTitle = modal.querySelector("h3");
    const modalText = modal.querySelector("p");
    const modalBtn = modal.querySelector(".btn-end-early");

    // Reset về trạng thái ban đầu
    modalIcon.textContent = "⚠️";
    modalTitle.textContent = "Xác nhận kết thúc";
    modalText.innerHTML =
      "Bạn có chắc muốn kết thúc sớm bài làm?<br>Các câu chưa trả lời sẽ bị tính là sai.";
    modalBtn.innerHTML = `
    <span class="btn-icon">⚡</span>
    <span class="btn-text">Kết thúc sớm</span>
  `;
    modalBtn.onclick = () => confirmEndEarly();

    modal.classList.remove("show");
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
    if (userAnswer == null || correctAnswer == null) {
      return false;
    }

    const normalizeAnswer = (answer) => {
      return String(answer)
        .toLowerCase()
        .replace(/['']/g, "’") // Chuyển cả ' và ' thành '
        .replace(/[.,!?;:\"]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };

    const normalizedUser = normalizeAnswer(userAnswer);
    const normalizedCorrect = normalizeAnswer(correctAnswer);

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

    if (userAnswer !== null && userAnswer !== undefined) {
      const question = this.questions[this.currentQuestionIndex];
      let isCorrect;

      if (
        this.currentExerciseType === "grammar" ||
        this.currentExerciseType === "cloze"
      ) {
        isCorrect = userAnswer === question.correct;
      } else if (this.currentExerciseType === "transformation") {
        isCorrect = this.checkTransformationAnswer(
          userAnswer,
          question.correctAnswer
        );
      } else if (
        this.currentExerciseType === "listening" &&
        this.currentTest.format === "fill_in_blanks"
      ) {
        if (Array.isArray(userAnswer)) {
          let correctCount = 0;
          userAnswer.forEach((answer, index) => {
            if (
              this.checkTransformationAnswer(
                answer,
                this.questions[index].correctAnswer
              )
            ) {
              correctCount++;
            }
          });
          isCorrect = correctCount >= 7;
        }
      } else {
        isCorrect = userAnswer === question.correct;
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
    const autoNextCheckbox = document.getElementById("autoNextCheckbox");

    // Ẩn tất cả nút điều hướng cho Test 17
    if (this.currentTest && this.currentTest.id === 17) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      finishBtn.style.display = "none";
      autoNextCheckbox.parentElement.style.display = "none";
      return;
    }

    // Logic bình thường cho các test khác
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
          this.currentExerciseType === "listening" ||
          this.currentExerciseType === "cloze"
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

    while (this.userAnswers.length < this.questions.length) {
      this.userAnswers.push(null);
    }

    this.questions.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      let isCorrect = false;

      if (userAnswer !== null && userAnswer !== undefined) {
        if (this.currentExerciseType === "cloze") {
          isCorrect = userAnswer === question.correct;
        } else if (
          this.currentExerciseType === "grammar" ||
          this.currentExerciseType === "listening"
        ) {
          // Kiểm tra format
          if (
            this.currentTest &&
            this.currentTest.format === "fill_in_blanks"
          ) {
            if (Array.isArray(userAnswer)) {
              isCorrect = this.checkTransformationAnswer(
                userAnswer[index] || "",
                question.correctAnswer
              );
            }
          } else if (
            this.currentTest &&
            this.currentTest.format === "true_false"
          ) {
            isCorrect = userAnswer === question.correct;
          } else {
            // Multiple choice format
            isCorrect = userAnswer === question.correct;
          }
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

      // Kiểm tra format để tạo review phù hợp
      if (this.currentExerciseType === "cloze") {
        reviewItem.innerHTML = this.createClozeReview(
          question,
          index,
          userAnswer,
          isCorrect
        );
      } else if (
        this.currentTest &&
        this.currentTest.format === "fill_in_blanks"
      ) {
        reviewItem.innerHTML = this.createFillInBlanksReview(
          question,
          index,
          userAnswer,
          isCorrect
        );
      } else if (this.currentTest && this.currentTest.format === "true_false") {
        reviewItem.innerHTML = this.createTrueFalseReview(
          question,
          index,
          userAnswer,
          isCorrect
        );
      } else if (
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

  createTrueFalseReview(question, index, userAnswer, isCorrect) {
    const hasAnswer = userAnswer !== null && userAnswer !== undefined;
    const userAnswerText = hasAnswer
      ? userAnswer === 0
        ? "True"
        : "False"
      : "(Chưa trả lời)";
    const correctAnswerText = question.correct === 0 ? "True" : "False";

    return `
    <div class="review-question">
      <strong>Câu ${index + 1}:</strong> ${question.question}
    </div>
    <div class="review-options">
      <div class="review-option ${
        hasAnswer ? (isCorrect ? "user-correct" : "user-answer") : ""
      }">
        <strong>Bạn chọn:</strong> ${userAnswerText}
      </div>
      <div class="review-option correct-answer">
        <strong>Đáp án đúng:</strong> ${correctAnswerText}
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

  createFillInBlanksReview(question, index, userAnswer, isCorrect) {
    const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [];
    const userAnswerText = userAnswerArray[index] || "(Chưa trả lời)";
    const hasAnswer =
      userAnswerArray[index] && userAnswerArray[index].trim() !== "";

    return `
    <div class="review-question">
      <strong>Câu ${index + 1}:</strong> ${question.question}
    </div>
    <div class="review-options">
      <div class="review-option ${
        hasAnswer ? (isCorrect ? "user-correct" : "user-answer") : ""
      }">
        <strong>Bạn trả lời:</strong> ${userAnswerText}
      </div>
      <div class="review-option correct-answer">
        <strong>Đáp án đúng:</strong> ${question.correctAnswer}
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
  setupClozeTests() {
    const lessonGrid = document.getElementById("lessonGrid");
    const lessonTitle = document.getElementById("lessonTitle");

    lessonTitle.textContent = "📄 Cloze Test - Chọn bài test";
    lessonGrid.innerHTML = "";

    this.clozeTests.forEach((test) => {
      const lessonBtn = document.createElement("button");
      lessonBtn.className = "lesson-btn";
      lessonBtn.onclick = () => this.selectClozeTest(test.id);
      lessonBtn.innerHTML = `
            <span class="lesson-number">${test.icon} Test ${test.id}</span>
            <span class="lesson-range">${test.questions.length} câu hỏi</span>
        `;
      lessonGrid.appendChild(lessonBtn);
    });
  }

  selectClozeTest(testId) {
    const test = this.clozeTests.find((t) => t.id === testId);
    if (!test) return;

    this.questions = test.questions;
    this.currentTest = test;
    this.currentExerciseType = "cloze";

    document.querySelector(
      ".header-content h1"
    ).textContent = `📄 ${test.title}`;
    document.getElementById(
      "welcomeText"
    ).innerHTML = `Bạn sẽ đọc đoạn văn và chọn từ phù hợp điền vào ${test.questions.length} chỗ trống.<br>
         Đọc kỹ đoạn văn trước khi chọn đáp án.`;

    this.showHeaderAndProgress();
    this.showScreen("startScreen");

    // Reset values
    this.currentQuestionIndex = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);
    this.currentScore = 0;
    this.isAnswered = false;

    this.updateTotalQuestions();
    document.getElementById("elapsedTime").textContent = "00:00";
    document.getElementById("currentScore").textContent = "0";
  }

  loadClozeQuestion(question) {
    const questionText = document.getElementById("questionText");

    const passageWithBlanks = this.currentTest.passage.replace(
      /\((\d+)\)\s*______/g,
      (match, num) => `<span class="blank-number">${num}</span>______`
    );

    questionText.innerHTML = `
        <div class="cloze-passage">
            ${passageWithBlanks}
        </div>
        <div class="question-text-content">
            <strong>Câu ${this.currentQuestionIndex + 1}:</strong> ${
      question.question
    }
        </div>
    `;

    this.createOptions(question);
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
  // Kiểm tra nếu đang ở Test 17 và modal đang hiện thông báo chưa điền đủ
  if (quizApp.currentTest && quizApp.currentTest.id === 17) {
    const modalTitle = document.querySelector("#confirmModal h3");
    if (modalTitle && modalTitle.textContent === "Chưa hoàn thành") {
      quizApp.closeEmptyAnswerModal();
      return;
    }
  }

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
