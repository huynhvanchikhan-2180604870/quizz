const questionsData = {
  metadata: {
    title: "Quiz Trắc Nghiệm - 100 Câu Hỏi",
    description: "Bộ câu hỏi trắc nghiệm tổng hợp",
    totalQuestions: 100,
    timeLimit: null,
    passingScore: 60,
    created: "2024-07-24",
    version: "1.0",
  },
  questions: [
    {
      id: 1,
      question: "Teddy ______________ of moving closer to the city centre.",
      options: [
        "A. thinks",
        "B. is thinking",
        "C. don't think",
        "D. aren't thinking",
      ],
      correct: 1,
      explanation:
        "Đây là câu hỏi về thì hiện tại tiếp diễn. 'Is thinking' được sử dụng cho hành động đang xảy ra xung quanh thời điểm nói hoặc kế hoạch tương lai.",
      tip: "Nhớ: think + of = suy nghĩ về việc gì đó. Với chủ ngữ số ít 'Teddy' dùng 'is thinking'.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 2,
      question: "We __________ giving you a lift home.",
      options: [
        "A. don't mind",
        "B. aren't minding",
        "C. doesn't mind",
        "D. isn't minding",
      ],
      correct: 0,
      explanation:
        "'Don't mind' được dùng để thể hiện sự sẵn lòng hoặc chấp nhận. 'Mind' được theo sau bởi V-ing.",
      tip: "Cụm 'don't mind + V-ing' = không phiền/sẵn lòng làm gì. Chủ ngữ 'We' dùng 'don't'.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 3,
      question: "The Potters ____________ to Dubai at 9:00 tomorrow morning.",
      options: [
        "A. is flying",
        "B. don't fly",
        "C. doesn't fly",
        "D. are flying",
      ],
      correct: 3,
      explanation:
        "Thì hiện tại tiếp diễn được dùng cho kế hoạch tương lai, đặc biệt với thời gian cụ thể ('tomorrow morning at 9:00').",
      tip: "Có thời gian cụ thể trong tương lai + chủ ngữ số nhiều 'The Potters' → 'are flying'.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 4,
      question: "__________ is your favorite European city?",
      options: ["A. When", "B. How", "C. Which", "D. Who"],
      correct: 2,
      explanation:
        "'Which' được dùng khi lựa chọn từ một số lượng có giới hạn (ví dụ: các thành phố châu Âu).",
      tip: "Which = lựa chọn từ nhóm có sẵn. European cities = nhóm có giới hạn → dùng 'Which'.",
      category: "Vocabulary",
      difficulty: "easy",
    },
    {
      id: 5,
      question:
        "__________ much do they charge for a single room with breakfast?",
      options: ["A. How", "B. Who", "C. What", "D. Where"],
      correct: 0,
      explanation: "'How much' được dùng để hỏi về giá cả hoặc số lượng.",
      tip: "How much = bao nhiêu tiền/số lượng. Thấy 'charge' (tính phí) → hỏi giá → 'How much'.",
      category: "Vocabulary",
      difficulty: "easy",
    },
    {
      id: 6,
      question: "__________ is your brother talking to?",
      options: ["A. When", "B. Who", "C. Whose", "D. How"],
      correct: 1,
      explanation: "'Who' được dùng để hỏi về người.",
      tip: "Talking to + người → dùng 'Who'. Who = ai đó (hỏi về người).",
      category: "Vocabulary",
      difficulty: "easy",
    },
    {
      id: 7,
      question:
        "The teacher ____________ believe his excuse for not coming to school yesterday.",
      options: ["A. didn't", "B. don't", "C. used to not", "D. use to"],
      correct: 0,
      explanation:
        "Đối với hành động phủ định trong quá khứ, 'didn't' là trợ động từ đúng.",
      tip: "Yesterday = quá khứ + chủ ngữ số ít 'teacher' → 'didn't' (did not).",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 8,
      question: "Bobby ____________ skinny when he was a child.",
      options: ["A. Was used to", "B. were", "C. used to be", "D. got used"],
      correct: 2,
      explanation:
        "'Used to be' mô tả trạng thái hoặc thói quen trong quá khứ không còn tồn tại.",
      tip: "Used to + V = đã từng làm gì trong quá khứ (giờ không còn). Skinny = tính từ → 'used to be'.",
      category: "Grammar",
      difficulty: "medium",
    },
    {
      id: 9,
      question:
        "I ____________ to contact Mr. Peterson twice, but didn't find him.",
      options: ["A. tried", "B. tries", "C. used to try", "D. try"],
      correct: 0,
      explanation:
        "Câu mô tả hành động đã hoàn thành trong quá khứ, nên thì quá khứ đơn 'tried' là đúng.",
      tip: "Có 'but didn't find' → hành động quá khứ đã xong → 'tried'.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 10,
      question:
        "After a couple of days, Sam finally ______________ up early in the morning.",
      options: [
        "A. used to wake",
        "B. Get used to wake",
        "C. wake",
        "D. got used to waking",
      ],
      correct: 3,
      explanation:
        "'Get used to' có nghĩa là trở nên quen với điều gì đó. Nó được theo sau bởi V-ing.",
      tip: "Get used to + V-ing = dần quen với việc gì. Finally = cuối cùng thì → 'got used to waking'.",
      category: "Grammar",
      difficulty: "medium",
    },
    {
      id: 11,
      question: "It took him a month to recover ______________ his illness.",
      options: ["A. for", "B. from", "C. of", "D. at"],
      correct: 1,
      explanation:
        "Cụm từ đúng là 'recover from an illness' (hồi phục sau bệnh tật).",
      tip: "Recover from = hồi phục từ (bệnh tật, chấn thương). From = từ, khỏi.",
      category: "Prepositions",
      difficulty: "easy",
    },
    {
      id: 12,
      question: "The book exhibition took ______________ at the Carlton Hotel.",
      options: ["A. part", "B. advantage", "C. it easy", "D. place"],
      correct: 3,
      explanation: "Thành ngữ 'take place' có nghĩa là xảy ra hoặc diễn ra.",
      tip: "Take place = diễn ra, xảy ra. Exhibition (triển lãm) diễn ra ở đâu đó.",
      category: "Vocabulary",
      difficulty: "easy",
    },
    {
      id: 13,
      question: "I didn't ______________ Jason to come on time.",
      options: ["A. expect", "B. remember", "C. wait", "D. reminded"],
      correct: 0,
      explanation:
        "'Expect' có nghĩa là nghĩ rằng điều gì đó sẽ xảy ra. Câu này ngụ ý một kỳ vọng thất bại.",
      tip: "Expect = mong đợi, kỳ vọng. Didn't expect = không mong đợi/nghĩ là sẽ xảy ra.",
      category: "Vocabulary",
      difficulty: "easy",
    },
    {
      id: 14,
      question: "I'm sorry but I can't find it ______________ the map.",
      options: ["A. over", "B. on", "C. between", "D. along"],
      correct: 1,
      explanation:
        "Khi cái gì đó được mô tả hoặc nằm trên bản đồ, giới từ 'on' được sử dụng.",
      tip: "On the map = trên bản đồ. Tất cả thông tin đều hiển thị 'trên' bản đồ.",
      category: "Prepositions",
      difficulty: "easy",
    },
    {
      id: 15,
      question:
        "They spent the whole day in Alexandria looking at the ______________.",
      options: ["A. tasks", "B. part", "C. jobs", "D. sights"],
      correct: 3,
      explanation:
        "'Sights' có nghĩa là những địa điểm thú vị để xem, thường được sử dụng trong ngữ cảnh du lịch ('sightseeing').",
      tip: "Sights = danh lam thắng cảnh. Alexandria + looking at → xem cảnh, tham quan.",
      category: "Vocabulary",
      difficulty: "medium",
    },
    {
      id: 16,
      question: "He was lucky to find that ______________ in their law firm.",
      options: ["A. job", "B. work", "C. site", "D. task"],
      correct: 0,
      explanation:
        "'Job' có nghĩa là vị trí việc làm cụ thể. 'Work' là thuật ngữ chung cho hoạt động.",
      tip: "Job = công việc cụ thể/vị trí. Law firm = công ty luật → tìm được 'job' (việc làm).",
      category: "Vocabulary",
      difficulty: "easy",
    },
    {
      id: 17,
      question:
        "I think that these trainers belong ______________ your brother.",
      options: ["A. on", "B. in", "C. to", "D. at"],
      correct: 2,
      explanation: "'Belong to' biểu thị quyền sở hữu.",
      tip: "Belong to = thuộc về ai đó. Trainers belong to = đôi giày thuộc về.",
      category: "Prepositions",
      difficulty: "easy",
    },
    {
      id: 18,
      question: "They usually take ______________ of what I tell them.",
      options: ["A. their time", "B. part", "C. place", "D. no notice"],
      correct: 3,
      explanation:
        "Thành ngữ 'take no notice of' có nghĩa là phớt lờ hoặc không chú ý đến.",
      tip: "Take no notice of = không để ý, phớt lờ. Usually = thường thường → họ không nghe lời.",
      category: "Idioms",
      difficulty: "medium",
    },
    {
      id: 19,
      question: "We never argue ______________ our teacher.",
      options: ["A. with", "B. at", "C. on", "D. from"],
      correct: 0,
      explanation:
        "Giới từ đúng cho 'argue' khi thảo luận với một người là 'with'.",
      tip: "Argue with = tranh cãi với ai đó. With = cùng với (người).",
      category: "Prepositions",
      difficulty: "easy",
    },
    {
      id: 20,
      question:
        "This dish is very healthy because it consists ______________ fish and vegetables.",
      options: ["A. on", "B. of", "C. at", "D. with"],
      correct: 1,
      explanation: "'Consist of' có nghĩa là được tạo thành hoặc bao gồm.",
      tip: "Consist of = bao gồm, gồm có. Món ăn 'gồm có' cá và rau.",
      category: "Prepositions",
      difficulty: "easy",
    },
    {
      id: 21,
      question:
        "Tim ______________ the news, while his son was playing computer games.",
      options: [
        "A. is watching",
        "B. watches",
        "C. was watching",
        "D. watching",
      ],
      correct: 2,
      explanation:
        "Mô tả hai hành động đồng thời trong quá khứ, một hành động liên tục ('was watching') xảy ra trong khi hành động liên tục khác ('was playing') cũng đang xảy ra.",
      tip: "While = trong khi. Hai hành động cùng lúc trong quá khứ → 'was watching'.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 22,
      question: "Lenny ______________ his old house two months ago.",
      options: ["A. were selling", "B. sells", "C. is selling", "D. sold"],
      correct: 3,
      explanation:
        "Cụm từ 'two months ago' chỉ một thời điểm cụ thể trong quá khứ, nên thì quá khứ đơn 'sold' là phù hợp.",
      tip: "Two months ago = cách đây 2 tháng → quá khứ đơn 'sold'.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 23,
      question:
        "He didn't meet Joe and Alf, because they left ______________ than they usually do.",
      options: ["A. early", "B. earlier", "C. earliest", "D. the earliest"],
      correct: 1,
      explanation:
        "So sánh thời gian họ rời đi với thời gian thường lệ, dạng so sánh hơn 'earlier' là đúng.",
      tip: "Than = hơn → so sánh hơn. Early → earlier (sớm hơn).",
      category: "Adverbs",
      difficulty: "easy",
    },
    {
      id: 24,
      question: "__________ you finish your report on time?",
      options: ["A. Was", "B. Are", "C. Did", "D. Were"],
      correct: 2,
      explanation:
        "Để tạo câu hỏi ở thì quá khứ đơn với động từ chính, 'Did' được dùng làm trợ động từ.",
      tip: "Finish = động từ thường → cần trợ động từ 'Did' để tạo câu hỏi quá khứ.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 25,
      question:
        "I was resting all day yesterday, because I was ______________ tired.",
      options: [
        "A. terrible",
        "B. most terrible",
        "C. terribly",
        "D. more terribly",
      ],
      correct: 2,
      explanation: "Cần trạng từ 'terribly' để bổ nghĩa cho tính từ 'tired'.",
      tip: "Tired = tính từ → cần trạng từ 'terribly' để bổ nghĩa. Terribly = rất, cực kỳ.",
      category: "Adverbs",
      difficulty: "easy",
    },
    {
      id: 26,
      question:
        "Robert was crossing the street when he ______________ Fred riding a motorcycle.",
      options: ["A. saw", "B. was seeing", "C. seeing", "D. is seeing"],
      correct: 0,
      explanation:
        "Một hành động ngắn, đã hoàn thành ('saw') làm gián đoạn một hành động dài hơn, đang diễn ra ('was crossing').",
      tip: "When = khi đó (hành động ngắn gián đoạn hành động dài) → 'saw'.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 27,
      question:
        "This artist is ______________ famous of all three that you mentioned.",
      options: ["A. the less", "B. least", "C. less", "D. the least"],
      correct: 3,
      explanation:
        "So sánh một mục với tất cả các mục khác trong nhóm, dạng so sánh nhất 'the least' được sử dụng.",
      tip: "Of all three = trong số cả ba → so sánh nhất 'the least' (ít nhất).",
      category: "Adjectives",
      difficulty: "medium",
    },
    {
      id: 28,
      question: "That's the boy ______________ father is our teacher.",
      options: ["A. who", "B. which", "C. whose", "D. that"],
      correct: 2,
      explanation: "'Whose' là đại từ sở hữu được dùng để chỉ quyền sở hữu.",
      tip: "Father = bố của ai → sở hữu → 'whose' (của người nào).",
      category: "Pronouns",
      difficulty: "easy",
    },
    {
      id: 29,
      question: "Can you tell me ______________ to put these boxes?",
      options: ["A. where", "B. when", "C. which", "D. who"],
      correct: 0,
      explanation: "'Where' được dùng để hỏi về địa điểm.",
      tip: "Put = đặt ở đâu → hỏi vị trí → 'where' (ở đâu).",
      category: "Vocabulary",
      difficulty: "easy",
    },
    {
      id: 30,
      question: "Mark, ______________ is only twenty, teaches French.",
      options: ["A. which", "B. who", "C. when", "D. whose"],
      correct: 1,
      explanation: "'Who' được dùng làm đại từ quan hệ để chỉ người.",
      tip: "Mark = người → đại từ quan hệ 'who' (người mà).",
      category: "Pronouns",
      difficulty: "easy",
    },
    {
      id: 31,
      question: "My doctor advised me to ______________ a sport.",
      options: ["A. take off", "B. take after", "C. take up", "D. take on"],
      correct: 2,
      explanation:
        "Cụm động từ 'take up' có nghĩa là bắt đầu một sở thích hoặc hoạt động mới, đặc biệt là thể thao.",
      tip: "Take up = bắt đầu (sở thích mới). Doctor advised = bác sĩ khuyên → bắt đầu chơi thể thao.",
      category: "Phrasal Verbs",
      difficulty: "medium",
    },
    {
      id: 32,
      question: "I can't believe that they ______________ your offer.",
      options: [
        "A. turned on",
        "B. turned off",
        "C. turned out",
        "D. turned down",
      ],
      correct: 3,
      explanation:
        "Cụm động từ 'turn down' có nghĩa là từ chối một lời đề nghị hoặc yêu cầu.",
      tip: "Turn down = từ chối. Can't believe = không tin → họ từ chối lời đề nghị.",
      category: "Phrasal Verbs",
      difficulty: "medium",
    },
    {
      id: 33,
      question: "When I suggested a walk in the woods, he ______________.",
      options: ["A. credited", "B. nodded", "C. raised", "D. shook"],
      correct: 1,
      explanation:
        "'Nod' có nghĩa là gật đầu lên xuống như dấu hiệu đồng ý hoặc chấp thuận.",
      tip: "Suggested = đề nghị → he nodded = anh ấy gật đầu (đồng ý).",
      category: "Vocabulary",
      difficulty: "easy",
    },
    {
      id: 34,
      question: "After his mother's ______________, he moved to Argentina.",
      options: ["A. death", "B. strength", "C. power", "D. impression"],
      correct: 0,
      explanation:
        "Từ hợp lý nhất trước việc chuyển đi sau khi có chuyện với thành viên gia đình là 'death' (cái chết).",
      tip: "After mother's = sau khi mẹ... → moved away = chuyển đi → 'death' (qua đời).",
      category: "Vocabulary",
      difficulty: "easy",
    },
    {
      id: 35,
      question:
        "It was really ______________ that nobody was hurt in that accident.",
      options: ["A. strong", "B. powerful", "C. incredible", "D. truthful"],
      correct: 2,
      explanation:
        "'Incredible' có nghĩa là cực kỳ tốt hoặc ấn tượng, hoặc khó tin. Trong ngữ cảnh này, nó ngụ ý sự ngạc nhiên và nhẹ nhõm rằng không ai bị thương.",
      tip: "Incredible = không thể tin được, tuyệt vời. Nobody hurt = không ai bị thương → thật tuyệt.",
      category: "Vocabulary",
      difficulty: "medium",
    },
    {
      id: 36,
      question: "Both my children are afraid ______________ the dark.",
      options: ["A. of", "B. for", "C. on", "D. with"],
      correct: 0,
      explanation: "Giới từ đúng sau 'afraid' là 'of'.",
      tip: "Afraid of = sợ cái gì. Cụm cố định 'afraid of'.",
      category: "Prepositions",
      difficulty: "easy",
    },
    {
      id: 37,
      question:
        "They did everything in their ______________ to keep the company.",
      options: ["A. truth", "B. strength", "C. impression", "D. power"],
      correct: 3,
      explanation:
        "Cụm từ 'do everything in their power' có nghĩa là làm mọi thứ có thể.",
      tip: "In their power = trong khả năng của họ. Cụm cố định 'in one's power'.",
      category: "Idioms",
      difficulty: "medium",
    },
    {
      id: 38,
      question: "I bought a leather bag that ______________ my new boots.",
      options: ["A. match", "B. matches", "C. suits", "D. suit"],
      correct: 1,
      explanation:
        "Động từ 'match' (số ít, vì 'that' chỉ 'bag') được dùng khi các vật có cùng màu, chất liệu hoặc kiểu dáng.",
      tip: "Bag (số ít) + that matches = cái túi đó hợp với. Match = hợp, đồng bộ.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 39,
      question: "Both her children have a very vivid ______________.",
      options: [
        "A. description",
        "B. impression",
        "C. admiration",
        "D. imagination",
      ],
      correct: 3,
      explanation:
        "'Vivid imagination' là cụm từ thường dùng có nghĩa là khả năng tưởng tượng rất mạnh mẽ và rõ ràng.",
      tip: "Vivid imagination = trí tưởng tượng phong phú. Cụm cố định với 'vivid'.",
      category: "Collocations",
      difficulty: "medium",
    },
    {
      id: 40,
      question: "I've got the ______________ that they're lying again.",
      options: [
        "A. impression",
        "B. admiration",
        "C. imagination",
        "D. description",
      ],
      correct: 0,
      explanation:
        "'Get the impression' có nghĩa là có cảm giác hoặc ý tưởng không phải lúc nào cũng dựa trên bằng chứng trực tiếp.",
      tip: "Get the impression = có cảm giác, ấn tượng. They're lying = họ đang nói dối.",
      category: "Collocations",
      difficulty: "medium",
    },
    {
      id: 41,
      question: "The Carltons have never ______________ Denmark before.",
      options: ["A. been to", "B. gone to", "C. gone in", "D. been at"],
      correct: 0,
      explanation:
        "'Have been to' được dùng để nói về việc đã đến thăm một nơi và quay về.",
      tip: "Been to = đã từng đến (và về). Never been to = chưa từng đến.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 42,
      question: "Have you ______________ thought of studying abroad?",
      options: ["A. since", "B. before", "C. never", "D. ever"],
      correct: 3,
      explanation:
        "'Ever' được dùng trong câu hỏi (và câu phủ định) có nghĩa là 'bao giờ'.",
      tip: "Have you ever = bạn đã bao giờ...? Ever dùng trong câu hỏi.",
      category: "Adverbs",
      difficulty: "easy",
    },
    {
      id: 43,
      question: "Danny ______________ tennis since he was a child.",
      options: [
        "A. played",
        "B. plays",
        "C. been playing",
        "D. has been playing",
      ],
      correct: 3,
      explanation:
        "Thì hiện tại hoàn thành tiếp diễn ('has been playing') được dùng để mô tả hành động bắt đầu trong quá khứ và tiếp tục đến hiện tại, thường với 'since' hoặc 'for'.",
      tip: "Since = từ khi → hành động kéo dài từ quá khứ đến hiện tại → 'has been playing'.",
      category: "Grammar",
      difficulty: "medium",
    },
    {
      id: 44,
      question:
        "It has been raining heavily ______________ our plane took off two hours ago.",
      options: ["A. while", "B. already", "C. since", "D. still"],
      correct: 2,
      explanation:
        "'Since' được dùng để chỉ điểm bắt đầu của một hành động hoặc trạng thái tiếp tục đến hiện tại.",
      tip: "Since + mốc thời gian quá khứ = từ lúc đó đến giờ. Plane took off = máy bay cất cánh.",
      category: "Conjunctions",
      difficulty: "medium",
    },
    {
      id: 45,
      question: "Mr. Marfin ______________ go on business trip very often.",
      options: ["A. need", "B. needs", "C. doesn't have", "D. has to"],
      correct: 3,
      explanation:
        "'Has to' (hoặc 'doesn't have to' cho phủ định) được dùng để diễn tả nghĩa vụ hoặc sự cần thiết.",
      tip: "Has to = phải làm gì. Business trip = công tác → ông ấy phải đi công tác.",
      category: "Modals",
      difficulty: "easy",
    },
    {
      id: 46,
      question: "We can't meet Jack today. We ______________ to work overtime.",
      options: ["A. have", "B. must", "C. had better", "D. would rather"],
      correct: 0,
      explanation:
        "Cụm từ 'have to work overtime' chỉ nghĩa vụ hoặc sự cần thiết.",
      tip: "Have to = phải. Can't meet = không thể gặp vì phải làm thêm giờ.",
      category: "Modals",
      difficulty: "easy",
    },
    {
      id: 47,
      question: "I'd ______________ join you for dinner than stay at home.",
      options: ["A. rather", "B. had better", "C. need", "D. must"],
      correct: 0,
      explanation:
        "'Would rather' (hoặc 'I'd rather') diễn tả sự ưa thích và được theo sau bởi động từ nguyên mẫu không 'to'.",
      tip: "I'd rather = tôi thích...hơn. Than = hơn là → cấu trúc so sánh sở thích.",
      category: "Modals",
      difficulty: "easy",
    },
    {
      id: 48,
      question:
        "Luckily, we ______________ wait for them. We can leave right now.",
      options: [
        "A. don't have",
        "B. don't need",
        "C. needn't",
        "D. not have to",
      ],
      correct: 2,
      explanation: "'Needn't' có nghĩa là không cần thiết phải làm gì đó.",
      tip: "Needn't = không cần. Luckily = may mắn → không cần đợi.",
      category: "Modals",
      difficulty: "medium",
    },
    {
      id: 49,
      question:
        "She ______________ still be at home. I talked to her on the phone a couple of minutes ago.",
      options: ["A. has to", "B. better", "C. must", "D. needs"],
      correct: 2,
      explanation:
        "'Must' được dùng để diễn tả suy luận mạnh mẽ hoặc kết luận logic.",
      tip: "Must = chắc chắn là. Talked minutes ago = vừa nói chuyện → chắc vẫn ở nhà.",
      category: "Modals",
      difficulty: "medium",
    },
    {
      id: 50,
      question:
        "I ______________ see an optician. I can't see very clearly lately.",
      options: [
        "A. would rather",
        "B. may not",
        "C. might not",
        "D. had better",
      ],
      correct: 3,
      explanation:
        "'Had better' được dùng để đưa ra lời khuyên hoặc nói điều tốt nhất cần làm, thường có hệ quả nếu không làm theo.",
      tip: "Had better = nên. Can't see clearly = không thấy rõ → nên đi khám mắt.",
      category: "Modals",
      difficulty: "medium",
    },
    {
      id: 51,
      question:
        "My brother came ______________ the flu last week and hasn't recovered yet.",
      options: ["A. across", "B. apart", "C. up with", "D. down with"],
      correct: 3,
      explanation: "Cụm động từ 'come down with' có nghĩa là bị ốm (một bệnh).",
      tip: "Come down with = bị ốm. Flu = cảm cúm → anh ấy bị cảm cúm.",
      category: "Phrasal Verbs",
      difficulty: "medium",
    },
    {
      id: 52,
      question:
        "Why don't you ask Felix? He always comes ______________ great ideas.",
      options: ["A. off", "B. up with", "C. down with", "D. apart"],
      correct: 1,
      explanation:
        "Cụm động từ 'come up with' có nghĩa là tạo ra một ý tưởng hoặc kế hoạch.",
      tip: "Come up with = nghĩ ra. Great ideas = ý tưởng hay → anh ấy hay nghĩ ra ý tưởng.",
      category: "Phrasal Verbs",
      difficulty: "medium",
    },
    {
      id: 53,
      question: "They haven't cleaned their attic ______________.",
      options: [
        "A. for ages",
        "B. in the future",
        "C. in common",
        "D. out of the ordinary",
      ],
      correct: 0,
      explanation: "'For ages' có nghĩa là trong một thời gian rất dài.",
      tip: "For ages = lâu lắm rồi. Haven't cleaned = chưa dọn → chưa dọn lâu lắm.",
      category: "Time expressions",
      difficulty: "easy",
    },
    {
      id: 54,
      question:
        "I really had no intention ______________ insulting your father.",
      options: ["A. of", "B. for", "C. on", "D. at"],
      correct: 0,
      explanation:
        "Giới từ đúng sau 'intention' khi theo sau bởi V-ing là 'of'.",
      tip: "Intention of + V-ing = ý định làm gì. No intention = không có ý định.",
      category: "Prepositions",
      difficulty: "easy",
    },
    {
      id: 55,
      question:
        "They aren't interested ______________ buying Steve's country house.",
      options: ["A. to", "B. on", "C. in", "D. for"],
      correct: 2,
      explanation: "Giới từ đúng sau 'interested' là 'in'.",
      tip: "Interested in = quan tâm đến. Cụm cố định 'interested in'.",
      category: "Prepositions",
      difficulty: "easy",
    },
    {
      id: 56,
      question: "We must ______________ into consideration everything he said.",
      options: ["A. regard", "B. give", "C. think", "D. take"],
      correct: 3,
      explanation:
        "Thành ngữ là 'take into consideration', có nghĩa là suy nghĩ cẩn thận về điều gì đó trước khi đưa ra quyết định.",
      tip: "Take into consideration = xem xét, cân nhắc. Cụm cố định với 'take'.",
      category: "Idioms",
      difficulty: "medium",
    },
    {
      id: 57,
      question: "We're looking ______________ seeing our grandparents.",
      options: ["A. after", "B. out", "C. over", "D. forward to"],
      correct: 3,
      explanation:
        "Cụm động từ 'look forward to' có nghĩa là cảm thấy vui mừng và hào hứng về điều gì đó sắp xảy ra.",
      tip: "Look forward to = mong chờ. Seeing grandparents = gặp ông bà → mong chờ gặp.",
      category: "Phrasal Verbs",
      difficulty: "easy",
    },
    {
      id: 58,
      question:
        "Brad ______________ his best to please his guests yesterday evening.",
      options: ["A. took", "B. did", "C. brought", "D. made"],
      correct: 1,
      explanation:
        "Cụm từ thường dùng là 'do one's best', có nghĩa là cố gắng hết sức có thể.",
      tip: "Do one's best = cố gắng hết sức. Cụm cố định với 'do'.",
      category: "Collocations",
      difficulty: "easy",
    },
    {
      id: 59,
      question: "Eating more fruit and vegetables will do you ______________.",
      options: ["A. badly", "B. well", "C. good", "D. best"],
      correct: 2,
      explanation:
        "Cụm từ 'do someone good' có nghĩa là có lợi cho ai đó hoặc có tác động tích cực.",
      tip: "Do you good = có lợi cho bạn. Fruit and vegetables = trái cây và rau → tốt cho sức khỏe.",
      category: "Idioms",
      difficulty: "easy",
    },
    {
      id: 60,
      question:
        "I'm afraid that the new sales representative doesn't ______________ the manager.",
      options: [
        "A. get by",
        "B. get through",
        "C. get across",
        "D. get on well with",
      ],
      correct: 3,
      explanation:
        "Cụm động từ 'get on well with' có nghĩa là có mối quan hệ tốt với ai đó.",
      tip: "Get on well with = hòa hợp với. Doesn't = không → không hòa hợp với sếp.",
      category: "Phrasal Verbs",
      difficulty: "medium",
    },
    {
      id: 61,
      question: "At this time tomorrow, Gerry ______________ his driving test.",
      options: [
        "A. shall take",
        "B. going to take",
        "C. shall have taken",
        "D. will be taking",
      ],
      correct: 3,
      explanation:
        "Thì tương lai tiếp diễn ('will be taking') được dùng để mô tả hành động sẽ đang diễn ra tại một thời điểm cụ thể trong tương lai.",
      tip: "At this time tomorrow = vào giờ này ngày mai → đang làm gì đó → 'will be taking'.",
      category: "Grammar",
      difficulty: "medium",
    },
    {
      id: 62,
      question:
        "Henry ______________ a shower as soon as he finishes cleaning his room.",
      options: ["A. will have had", "B. will have", "C. have", "D. is having"],
      correct: 1,
      explanation:
        "Mô tả hành động tương lai sẽ xảy ra sau khi hành động tương lai khác hoàn thành. 'Will have' là thì tương lai đơn.",
      tip: "As soon as = ngay khi → hành động tương lai đơn 'will have'.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 63,
      question: "Will you ______________ painting the house by tomorrow?",
      options: [
        "A. finished",
        "B. going to fish",
        "C. have finished",
        "D. finishing",
      ],
      correct: 2,
      explanation:
        "Thì tương lai hoàn thành ('will have finished') được dùng để mô tả hành động sẽ được hoàn thành trước một thời điểm nhất định trong tương lai ('by tomorrow').",
      tip: "By tomorrow = trước ngày mai → hành động hoàn thành trước đó → 'have finished'.",
      category: "Grammar",
      difficulty: "medium",
    },
    {
      id: 64,
      question:
        "Those cars are going really fast. There ______________ an accident.",
      options: [
        "A. is",
        "B. will have been",
        "C. is going to be",
        "D. going to be",
      ],
      correct: 2,
      explanation:
        "'Going to be' được dùng để dự đoán sự kiện tương lai dựa trên bằng chứng hiện tại ('Those cars are going really fast').",
      tip: "Going really fast = đi rất nhanh → dự đoán tai nạn → 'is going to be'.",
      category: "Grammar",
      difficulty: "medium",
    },
    {
      id: 65,
      question:
        "They could take better pictures if they ______________ a digital camera.",
      options: [
        "A. would have",
        "B. will have",
        "C. had",
        "D. are going to have",
      ],
      correct: 2,
      explanation:
        "Đây là câu điều kiện loại 2 (If + quá khứ đơn, would/could/might + động từ nguyên mẫu).",
      tip: "If they had = nếu họ có → câu điều kiện loại 2 (giả định không có thật).",
      category: "Grammar",
      difficulty: "medium",
    },
    {
      id: 66,
      question: "If I ______________ by the sea, I would go fishing every day.",
      options: ["A. lived", "B. would live", "C. live", "D. will be living"],
      correct: 0,
      explanation:
        "Đây là câu điều kiện loại 2 (If + quá khứ đơn, would/could/might + động từ nguyên mẫu).",
      tip: "Would go = sẽ đi → câu điều kiện loại 2 → 'lived' (quá khứ đơn).",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 67,
      question: "Could I have ______________ more apple juice, please?",
      options: ["A. no", "B. some", "C. any", "D. many"],
      correct: 1,
      explanation:
        "'Some' được dùng trong lời yêu cầu hoặc đề nghị, đặc biệt khi mong đợi câu trả lời tích cực.",
      tip: "Could I have = xin cho tôi → lời yêu cầu lịch sự → dùng 'some'.",
      category: "Determiners",
      difficulty: "easy",
    },
    {
      id: 68,
      question:
        "I can't drink this tea. There's too ______________ sugar in it.",
      options: ["A. much", "B. plenty", "C. many", "D. lot of"],
      correct: 0,
      explanation: "'Much' được dùng với danh từ không đếm được như 'sugar'.",
      tip: "Sugar = không đếm được → dùng 'much'. Too much = quá nhiều.",
      category: "Determiners",
      difficulty: "easy",
    },
    {
      id: 69,
      question:
        "How ______________ teachers were there at the seminar yesterday?",
      options: ["A. some", "B. many", "C. any", "D. much"],
      correct: 1,
      explanation: "'Many' được dùng với danh từ đếm được như 'teachers'.",
      tip: "Teachers = đếm được → dùng 'many'. How many = bao nhiêu (đếm được).",
      category: "Determiners",
      difficulty: "easy",
    },
    {
      id: 70,
      question:
        "Don't leave. There are ______________ more things I want to tell you.",
      options: ["A. few", "B. any", "C. little", "D. a few"],
      correct: 3,
      explanation:
        "'A few' có nghĩa là một ít và được dùng với danh từ đếm được ('things'). Nó ngụ ý có một số, phù hợp với ngữ cảnh muốn nói thêm.",
      tip: "A few = một vài (tích cực). Don't leave = đừng đi → còn vài thứ muốn nói.",
      category: "Determiners",
      difficulty: "medium",
    },
    {
      id: 71,
      question:
        "He finished my portrait yesterday, but he's putting ______________ at the moment.",
      options: [
        "A. it mildly",
        "B. the final touches",
        "C. ideas into my head",
        "D. an end to",
      ],
      correct: 1,
      explanation:
        "Cụm từ 'put the final touches' có nghĩa là thêm những cải tiến nhỏ cuối cùng vào cái gì đó.",
      tip: "Final touches = hoàn thiện cuối cùng. Portrait = tranh chân dung → đang hoàn thiện.",
      category: "Idioms",
      difficulty: "medium",
    },
    {
      id: 72,
      question:
        "Do you think you could put ______________ with the head teacher?",
      options: [
        "A. an end to",
        "B. it mildly",
        "C. the final touches",
        "D. in a good word for me",
      ],
      correct: 3,
      explanation:
        "'Put in a good word for someone' có nghĩa là nói tốt về ai đó, đặc biệt với người có thể giúp họ.",
      tip: "Put in a good word = nói tốt về ai. With head teacher = với hiệu trưởng.",
      category: "Idioms",
      difficulty: "medium",
    },
    {
      id: 73,
      question: "I finally ______________ trying to make him change his mind.",
      options: ["A. gave up", "B. gave out", "C. gave back", "D. gave off"],
      correct: 0,
      explanation:
        "Cụm động từ 'give up' có nghĩa là ngừng cố gắng làm điều gì đó.",
      tip: "Give up = bỏ cuộc. Finally = cuối cùng → cuối cùng bỏ cuộc thuyết phục.",
      category: "Phrasal Verbs",
      difficulty: "easy",
    },
    {
      id: 74,
      question: "They told me to ______________ these leaflets.",
      options: ["A. give off", "B. give out", "C. give up", "D. give in to"],
      correct: 1,
      explanation:
        "Cụm động từ 'give out' có nghĩa là phân phát cái gì đó cho một nhóm người.",
      tip: "Give out = phát ra, phân phát. Leaflets = tờ rơi → phát tờ rơi.",
      category: "Phrasal Verbs",
      difficulty: "easy",
    },
    {
      id: 75,
      question:
        "They ______________ the meeting because the chairman had to leave.",
      options: ["A. showed off", "B. paid off", "C. got off", "D. put off"],
      correct: 3,
      explanation:
        "Cụm động từ 'put off' có nghĩa là hoãn lại hoặc trì hoãn điều gì đó.",
      tip: "Put off = hoãn lại. Chairman had to leave = chủ tịch phải đi → hoãn cuộc họp.",
      category: "Phrasal Verbs",
      difficulty: "medium",
    },
    {
      id: 76,
      question: "Andy loves ______________ his brand-new sports car.",
      options: [
        "A. giving off",
        "B. putting off",
        "C. showing off",
        "D. cooling off",
      ],
      correct: 2,
      explanation:
        "Cụm động từ 'show off' có nghĩa là khoe khoang cái gì đó một cách tự hào để gây ấn tượng với người khác.",
      tip: "Show off = khoe khoang. Brand-new sports car = xe thể thao mới → thích khoe xe.",
      category: "Phrasal Verbs",
      difficulty: "easy",
    },
    {
      id: 77,
      question:
        "I broke my leg as I was ______________ the bus yesterday morning.",
      options: [
        "A. cooling off",
        "B. giving off",
        "C. paying off",
        "D. getting off",
      ],
      correct: 3,
      explanation:
        "Cụm động từ 'get off' (the bus/train/plane) có nghĩa là xuống phương tiện giao thông.",
      tip: "Get off the bus = xuống xe buýt. Broke leg = gãy chân khi xuống xe.",
      category: "Phrasal Verbs",
      difficulty: "easy",
    },
    {
      id: 78,
      question:
        "According ______________ Ned, that's the best Chinese restaurant in the city.",
      options: ["A. of", "B. in", "C. at", "D. to"],
      correct: 3,
      explanation:
        "Cụm từ cố định là 'according to', có nghĩa là 'theo như lời của'.",
      tip: "According to = theo như. Cụm cố định với 'to'.",
      category: "Prepositions",
      difficulty: "easy",
    },
    {
      id: 79,
      question:
        "Unfortunately, he didn't succeed ______________ getting the job after all.",
      options: ["A. in", "B. on", "C. for", "D. at"],
      correct: 0,
      explanation:
        "Động từ 'succeed' được theo sau bởi giới từ 'in' khi đề cập đến việc đạt được điều gì đó.",
      tip: "Succeed in = thành công trong việc. Didn't succeed = không thành công.",
      category: "Prepositions",
      difficulty: "easy",
    },
    {
      id: 80,
      question: "Matt worked so hard that he finally made ______________.",
      options: [
        "A. a haste",
        "B. it to the top",
        "C. the most of",
        "D. difficult",
      ],
      correct: 1,
      explanation:
        "Thành ngữ 'make it to the top' có nghĩa là trở nên rất thành công.",
      tip: "Make it to the top = thành công lớn. Worked so hard = làm việc chăm chỉ.",
      category: "Idioms",
      difficulty: "medium",
    },
    {
      id: 81,
      question: "Andrew managed ______________ a promotion.",
      options: ["A. in getting", "B. to get", "C. getting", "D. get"],
      correct: 1,
      explanation: "'Managed' được theo sau bởi động từ nguyên mẫu có 'to'.",
      tip: "Manage to do = xoay sở làm được. Cấu trúc với 'to'.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 82,
      question: "I'd rather ______________ with my cousin for the weekend.",
      options: ["A. stay", "B. to stay", "C. staying", "D. to staying"],
      correct: 0,
      explanation:
        "'Would rather' được theo sau bởi động từ nguyên mẫu không 'to'.",
      tip: "Would rather + V nguyên mẫu = thích...hơn. Không dùng 'to'.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 83,
      question:
        "They suggested ______________ the children to the new aquarium.",
      options: ["A. to take", "B. in taking", "C. taking", "D. to taking"],
      correct: 2,
      explanation: "Động từ 'suggest' được theo sau bởi V-ing.",
      tip: "Suggest + V-ing = đề nghị làm gì. Suggest taking = đề nghị đưa đi.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 84,
      question: "Don't forget ______________ off the computer when you finish.",
      options: ["A. turning", "B. to turning", "C. turn", "D. to turn"],
      correct: 3,
      explanation:
        "'Don't forget to do something' đề cập đến hành động cần thiết cần được thực hiện trong tương lai.",
      tip: "Don't forget to do = đừng quên làm gì (trong tương lai). To turn off = tắt.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 85,
      question:
        "I'm sorry but I don't really feel like ______________ them tonight.",
      options: ["A. seeing", "B. to see", "C. see", "D. to seeing"],
      correct: 0,
      explanation: "Cụm từ 'feel like' được theo sau bởi V-ing.",
      tip: "Feel like + V-ing = cảm thấy muốn làm gì. Feel like seeing = muốn gặp.",
      category: "Grammar",
      difficulty: "easy",
    },
    {
      id: 86,
      question: "Charles ______________ his car washed for two months.",
      options: [
        "A. hadn't been",
        "B. hasn't had",
        "C. hasn't",
        "D. hadn't been having",
      ],
      correct: 1,
      explanation:
        "Mô tả trạng thái bắt đầu trong quá khứ ('two months ago') và tiếp tục đến hiện tại, nên thì hiện tại hoàn thành ('hasn't had') là đúng cho câu phủ định đề cập đến dịch vụ.",
      tip: "For two months = trong 2 tháng → từ quá khứ đến giờ → 'hasn't had' (chưa rửa xe).",
      category: "Grammar",
      difficulty: "medium",
    },
    {
      id: 87,
      question: "Could I ______________ by fax, please?",
      options: [
        "A. have been sent",
        "B. have sent it",
        "C. had it sent",
        "D. have it sent",
      ],
      correct: 3,
      explanation:
        "Đây là cấu trúc causative ('have something done'), có nghĩa là sắp xếp cho ai đó làm việc gì đó cho bạn.",
      tip: "Have it sent = nhờ gửi. Causative: have + object + past participle.",
      category: "Grammar",
      difficulty: "medium",
    },
    {
      id: 88,
      question: "You ______________ checked the report twice.",
      options: [
        "A. should have been",
        "B. could",
        "C. should have",
        "D. could have been",
      ],
      correct: 2, // C. should have
      explanation:
        "'Should have + past participle' expresses a past obligation or advice that was not followed.",
      category: "Modals",
      difficulty: "medium",
    },
    {
      id: 88,
      question: "We ______________ the report typed by Monday.",
      options: [
        "A. will have",
        "B. are having",
        "C. will have had",
        "D. have had",
      ],
      correct: 2,
      explanation:
        "Đây là cấu trúc causative với thì tương lai hoàn thành 'will have had something done', có nghĩa là sắp xếp cho ai đó làm việc gì đó và việc đó sẽ hoàn thành trước thời điểm nhất định.",
      tip: "Will have had + past participle = nhờ làm gì và sẽ hoàn thành trước thời điểm nào đó. By Monday = trước thứ Hai.",
      category: "Grammar",
      difficulty: "hard",
    },
    {
      id: 89,
      question:
        "They ______________ come back from the shopping centre by now.",
      options: [
        "A. must have",
        "B. must have to",
        "C. might be",
        "D. may have been",
      ],
      correct: 0,
      explanation:
        "'Must have + past participle' diễn tả suy luận logic mạnh mẽ về một sự kiện đã xảy ra trong quá khứ.",
      tip: "Must have = chắc chắn đã. By now = đến giờ này → chắc đã về rồi.",
      category: "Modals",
      difficulty: "medium",
    },
    {
      id: 90,
      question:
        "I'm not sure, but I think he ______________ used your coffee mug.",
      options: [
        "A. can have been",
        "B. might have to",
        "C. can be",
        "D. may have",
      ],
      correct: 3,
      explanation:
        "'May have + past participle' diễn tả khả năng hoặc sự suy đoán về một sự kiện đã xảy ra trong quá khứ.",
      tip: "May have = có thể đã. I'm not sure = không chắc → dùng 'may have' (có thể đã).",
      category: "Modals",
      difficulty: "medium",
    },
    {
      id: 91,
      question: "I was cooking and talking on the phone ______________.",
      options: [
        "A. at once",
        "B. at random",
        "C. at a glance",
        "D. at the same time",
      ],
      correct: 3,
      explanation:
        "'At the same time' có nghĩa là hai hành động đang xảy ra đồng thời.",
      tip: "At the same time = cùng lúc. Cooking and talking = nấu ăn và nói chuyện cùng lúc.",
      category: "Expressions",
      difficulty: "easy",
    },
    {
      id: 92,
      question: "They're having a lesson ______________.",
      options: [
        "A. at random",
        "B. at a glance",
        "C. at the moment",
        "D. at once",
      ],
      correct: 2,
      explanation:
        "'At the moment' có nghĩa là 'bây giờ' và được dùng với thì hiện tại tiếp diễn.",
      tip: "At the moment = lúc này. They're having = đang có → đang học bài lúc này.",
      category: "Time Expressions",
      difficulty: "easy",
    },
    {
      id: 93,
      question: "______________ of six, he wanted to become an astronaut.",
      options: [
        "A. At a glance",
        "B. At the age",
        "C. At the moment",
        "D. At the same time",
      ],
      correct: 1,
      explanation:
        "'At the age of [số]' là thành ngữ đúng để nói về tuổi của ai đó tại một thời điểm cụ thể.",
      tip: "At the age of = ở tuổi. Six = 6 tuổi → ở tuổi 6.",
      category: "Idioms",
      difficulty: "easy",
    },
    {
      id: 94,
      question:
        "The headmaster told them to go to their classroom ______________.",
      options: [
        "A. at once",
        "B. at the age",
        "C. at his own speed",
        "D. at a glance",
      ],
      correct: 0,
      explanation: "'At once' có nghĩa là ngay lập tức.",
      tip: "At once = ngay lập tức. Headmaster told = hiệu trưởng bảo → phải đi ngay.",
      category: "Time Expressions",
      difficulty: "easy",
    },
    {
      id: 95,
      question:
        "I'm really sorry, but I didn't have ______________ that your mother was so seriously ill.",
      options: [
        "A. The chance",
        "B. An argument",
        "C. a lot in common",
        "D. the slightest idea",
      ],
      correct: 3,
      explanation:
        "Cụm từ 'not have the slightest idea' có nghĩa là hoàn toàn không biết gì.",
      tip: "The slightest idea = chút ý niệm nào. Didn't have = không có → hoàn toàn không biết.",
      category: "Idioms",
      difficulty: "medium",
    },
    {
      id: 96,
      question:
        "The chief editor had ______________ at the whole magazine before it was printed.",
      options: [
        "A. an effect",
        "B. a look",
        "C. a lot in common",
        "D. an argument",
      ],
      correct: 1,
      explanation:
        "'Have a look' có nghĩa là xem xét, kiểm tra một cách ngắn gọn.",
      tip: "Have a look = xem qua. Chief editor = tổng biên tập → xem qua tạp chí trước khi in.",
      category: "Collocations",
      difficulty: "easy",
    },
    {
      id: 97,
      question:
        "I'm sure that he had ______________ leaving you here all by yourself.",
      options: [
        "A. a look at",
        "B. the chance",
        "C. no intention of",
        "D. an effect on",
      ],
      correct: 2,
      explanation:
        "Cụm từ 'have no intention of' có nghĩa là không có ý định hoặc không muốn làm gì đó.",
      tip: "No intention of = không có ý định. I'm sure = tôi chắc → chắc anh ấy không có ý định.",
      category: "Idioms",
      difficulty: "medium",
    },
    {
      id: 98,
      question:
        "Unfortunately, they had a big ______________ their supervisor yesterday morning.",
      options: [
        "A. effect on",
        "B. intention of",
        "C. look at",
        "D. argument with",
      ],
      correct: 3,
      explanation:
        "'Have an argument with' có nghĩa là tranh cãi hoặc bất đồng với ai đó.",
      tip: "Argument with = tranh cãi với. Big argument = tranh cãi lớn với cấp trên.",
      category: "Collocations",
      difficulty: "easy",
    },
    {
      id: 99,
      question: "Gregory never ______________ what his mother tells him.",
      options: [
        "A. informs",
        "B. is used to",
        "C. pays attention to",
        "D. makes his way to",
      ],
      correct: 2,
      explanation:
        "'Pay attention to' có nghĩa là chú ý hoặc tập trung vào điều gì đó.",
      tip: "Pay attention to = chú ý đến. Never = không bao giờ → không bao giờ nghe lời mẹ.",
      category: "Collocations",
      difficulty: "easy",
    },
    {
      id: 100,
      question: "Mona's teacher ______________ her from taking the exams.",
      options: ["A. informed", "B. discouraged", "C. waited", "D. made"],
      correct: 1,
      explanation:
        "'Discourage someone from doing something' có nghĩa là làm cho ai đó mất tự tin hoặc không muốn làm việc gì đó.",
      tip: "Discourage from = ngăn cản, làm nản lòng. From taking exams = không cho thi.",
      category: "Vocabulary",
      difficulty: "medium",
    },
  ],
};
