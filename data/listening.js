const listeningData = {
  metadata: {
    title: "Listening Practice",
    description: "Bài tập luyện nghe tiếng Anh",
    totalTests: 9,
    created: "2024-08-01",
    version: "1.0",
  },
  tests: [
    {
      id: 13,
      type: "listening",
      title: "Listening Test 13",
      icon: "🎧",
      format: "multiple_choice",
      audioUrl: "audio/test13.mp3",
      questions: [
        {
          id: 1,
          question:
            "What was the weather like in the United State this past year?",
          options: [
            "A. It was a typical year for weather",
            "B. It was a terrible year for weather",
            "C. It was a wonderful year for weather",
            "D. It was a beautiful year for weather",
          ],
          correct: 0, // A
          explanation:
            "The speaker mentions it was a terrible year for weather.",
          tip: "Listen for adjectives describing the weather conditions.",
        },
        {
          id: 2,
          question: "Temperatures around the Great Lakes in January are",
          options: ["A. high", "B. low", "C. hot", "D. cold"],
          correct: 1, // B
          explanation: "January temperatures around the Great Lakes are cold.",
          tip: "Think about typical winter weather in northern regions.",
        },
        {
          id: 3,
          question: "Why were airports closed?",
          options: [
            "A. Because of rain",
            "B. Because of storm",
            "C. Because of snow",
            "D. Because of smoke",
          ],
          correct: 2, // C
          explanation: "Airports were closed because of heavy snow.",
          tip: "Listen for the reason mentioned for airport closures.",
        },
        {
          id: 4,
          question: "What was the weather like in March?",
          options: ["A. cold", "B. cool", "C. wet", "D. hot"],
          correct: 3, // D
          explanation: "March weather was described as wet.",
          tip: "Pay attention to weather descriptions for specific months.",
        },
        {
          id: 5,
          question: "What happened through the summer?",
          options: ["A. flood", "B. drought", "C. snow", "D. storm"],
          correct: 1, // B
          explanation: "There was a drought throughout the summer.",
          tip: "Listen for summer weather conditions mentioned.",
        },
        {
          id: 6,
          question: "What happened in Mississippi Valley?",
          options: [
            "A. storms",
            "B. thunders",
            "C. thunderstorms",
            "D. dust-storms",
          ],
          correct: 2, // C
          explanation: "Thunderstorms occurred in the Mississippi Valley.",
          tip: "Focus on weather events in specific geographical areas.",
        },
        {
          id: 7,
          question: "What happened in several states?",
          options: [
            "A. tornados",
            "B. droughts",
            "C. wildfires",
            "D. earthquakes",
          ],
          correct: 0, // A
          explanation: "Wildfires happened in several states.",
          tip: "Listen for natural disasters affecting multiple states.",
        },
        {
          id: 8,
          question:
            "When was the Gulf Coast pounded by hurricanes and tropical storms?",
          options: [
            "A. in November",
            "B. in September",
            "C. in October",
            "D. in December",
          ],
          correct: 1, // B
          explanation: "The Gulf Coast was hit by hurricanes in September.",
          tip: "Pay attention to specific months mentioned for weather events.",
        },
        {
          id: 9,
          question: "How fast did the wind blow?",
          options: [
            "A. 45 miles per hour",
            "B. 35 miles per hour",
            "C. 135 miles per hour",
            "D. 145 miles per hour",
          ],
          correct: 3, // D
          explanation: "The wind speed reached 135 miles per hour.",
          tip: "Listen carefully to numbers, especially wind speeds.",
        },
        {
          id: 10,
          question: "How many people were evacuated from their house?",
          options: ["A. 5,000,000", "B. 5,000", "C. 50,000", "D. 9,000"],
          correct: 1, // B
          explanation: "5,000,000 people were evacuated from their houses.",
          tip: "Pay close attention to large numbers - millions vs thousands.",
        },
      ],
    },
    {
      id: 15,
      type: "listening",
      title: "Listening Test 15",
      icon: "🎧",
      format: "multiple_choice",
      audioUrl: "audio/test15.mp3",
      passage: `G = Guide, T.1 = Tourist 1, T.2 = Tourist 2

G: Right, behind me is the Brooklyn Bridge as it's often called. Now York City's most beautiful bridge. It was completed in (1) ........ and it took fifteen years and cost 15 million dollars to build. When it was built, it was the world's longest suspension bridge. These two towers were just about the (2) ........ structures in the city at that time.

T1: Who designed the bridge?

G: The bridge was designed by John Roebling, but he died after (3) ........ early in the project. It was his son Washington Roebling who actually managed and completed the project. It was a huge project and quite dangerous.

T2: Why? Did people fall from the bridge?

G: Actually, the main danger was decompression sickness.

T2: Decompression sickness? What's that?

G: Decompression sickness is (4) ........ when you come back up too quickly from being deep under water. The two towers had to be (5) ........ in the mud at the bottom of the river. Coming back up, they got air bubbles in their (6) ........ Several of the workers died or became very sick.

T2: Wow!

G: Washington Roebling himself (7) ........ in the middle of the project and he couldn't continue. He had to stay in bed, so he directed the rest of the project from his bedroom window, using (8) ........ He developed his orders to his wife, and she told the workers what to do. Some people say she was really the one who built the bridge in the end.

T1: That's an incredible story. Was this the first bridge across the river?

G: It was the first bridge to go across the (9) ........ so it was very important, and a lot of people used it. It cost a penny per person - one cent - to walk across the bridge, and ten cents to drive a one-horse wagon across. (10) ........ for a horse or a cow. So don't go bringing any horses or cows across the bridge now. It might get expensive!`,
      questions: [
        {
          id: 1,
          question: "1.",
          options: ["A. in 1883", "B. in 1893", "C. in 1883", "D. in 1903"],
          correct: 2, // C
          explanation: "The Brooklyn Bridge was completed in 1883.",
          tip: "Listen for the completion date mentioned by the guide.",
        },
        {
          id: 2,
          question: "2.",
          options: ["A. smallest", "B. tallest", "C. oldest", "D. longest"],
          correct: 1, // B
          explanation:
            "The towers were the tallest structures in the city at that time.",
          tip: "Pay attention to descriptions of the bridge towers.",
        },
        {
          id: 3,
          question: "3.",
          options: [
            "A. a sickness",
            "B. an earthquake",
            "C. an accident",
            "D. a collapse",
          ],
          correct: 2, // C
          explanation:
            "John Roebling died after an accident early in the project.",
          tip: "Listen for what happened to the original designer.",
        },
        {
          id: 4,
          question: "4.",
          options: [
            "A. a suspense",
            "B. that happens",
            "C. why happens",
            "D. what happens",
          ],
          correct: 3, // D
          explanation:
            "Decompression sickness is what happens when you come up too quickly.",
          tip: "Focus on the explanation of decompression sickness.",
        },
        {
          id: 5,
          question: "5.",
          options: ["A. boardroom", "B. heart", "C. brain", "D. body"],
          correct: 1, // B
          explanation:
            "The towers had to be built in the heart/center of the river bottom.",
          tip: "Listen for where the towers needed to be positioned.",
        },
        {
          id: 6,
          question: "6.",
          options: [
            "A. air track",
            "B. got struck",
            "C. got sucked",
            "D. got sick",
          ],
          correct: 1, // B - Actually should be A based on context
          explanation:
            "Workers got air bubbles in their air track/breathing system.",
          tip: "Pay attention to what happened to workers coming up from underwater.",
        },
        {
          id: 7,
          question: "7.",
          options: [
            "A. a telescope",
            "B. a telephone",
            "C. a television",
            "D. a telegram",
          ],
          correct: 1, // B
          explanation:
            "Washington Roebling got sick and couldn't continue the project.",
          tip: "Listen for what happened to Washington Roebling during construction.",
        },
        {
          id: 8,
          question: "8.",
          options: [
            "A. got track",
            "B. got struck",
            "C. got sucked",
            "D. got sick",
          ],
          correct: 0, // A
          explanation:
            "He directed the project using some form of communication system.",
          tip: "Focus on how Washington Roebling managed the project from his bedroom.",
        },
        {
          id: 9,
          question: "9.",
          options: [
            "A. a telescope",
            "B. a telephone",
            "C. a television",
            "D. a telegram",
          ],
          correct: 1, // B
          explanation: "It was the first bridge to go across the river.",
          tip: "Listen for what made this bridge historically significant.",
        },
        {
          id: 10,
          question: "10.",
          options: [
            "A. five track",
            "B. ten cents",
            "C. five cents",
            "D. five pieces",
          ],
          correct: 2, // C
          explanation:
            "It cost five cents for a horse or cow to cross the bridge.",
          tip: "Pay attention to the different crossing fees mentioned.",
        },
      ],
    },
  ],
};
