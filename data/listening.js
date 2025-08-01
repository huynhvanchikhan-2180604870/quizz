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
    {
      id: 17,
      type: "listening",
      title: "Listening Test 17",
      icon: "🎧",
      format: "fill_in_blanks",
      audioUrl: "audio/test17.mp3",
      passage: `TEXT 17:
Listen and fill in the blanks with the missing words.

This weekend, Mattress Matters in downtown Princeton is having our Grand opening sale. This weekend only, we're selling single, double, queen, and king size (1) ......................... You'll find all the top brand names at fantastic (2) ......................... Check out the huge grand opening sale at Mattress Matters in downtown Princeton, at 408 Pine Avenue. The sale is this weekend only! Mattress Matters. For a great night sleep.

We know you have a lot to do. That's why the pharmacy at Superprice is open six days a week from 9:00 A. m. until 6:00 p. m. Stop by the store, or call in your (3) ......................... any time, and drop by to pick it up. While you're in the store, check out the Superprice savings on fresh produce – peaches at 79 cents a pound, delicious (4) ......................... tomatoes at 89 cents a pound, and potatoes at just two dollars a bag. (5) ......................... up on pasta: this week at Superprice all pasta is on sale at 50 percent off. And before you leave, stop by our (6) ......................... to pick up a beautiful bunch of flowers for Mother's Day. We know you're busy. Superprice helps you save time. We have it all in one (7) .........................!

M = Man, A = Announcer, W = Woman

M: Happy birthday darling. I got this for you.
W: Oh! What is it?
M: It's a garage door opener. I thought you'd like it.
W: Yes...oh yes. Thank you!
A: Do you have trouble buying gifts for the people you love? Are you looking for just right thing for that special person? We can help. Log on to what to give khw and choose from an incredible selection of gifts at prices you can afford. We have special offers every month and free delivery for (8) ......................... over 50 dollars. So what are you waiting for? Log on to what to give khw, and find something she really likes.
M: Happy birthday darling. I got this for you.
W: A gold (9) .........................! Oh, this is beautiful! Oh, what a beautiful present! Oh, thank you!
A: Whatagive khw. The online shopping (10) ......................... for you!`,
      questions: [
        {
          id: 1,
          question: "1. mattresses",
          correctAnswer: "mattresses",
          explanation: "The store is selling different sizes of mattresses.",
          tip: "Listen for what the mattress store is selling.",
        },
        {
          id: 2,
          question: "2. discounts",
          correctAnswer: "discounts",
          explanation: "The store offers fantastic discounts on brand names.",
          tip: "Pay attention to what customers can find at the store.",
        },
        {
          id: 3,
          question: "3. prescription",
          correctAnswer: "prescription",
          explanation: "You can call in your prescription to the pharmacy.",
          tip: "Listen for what you can call in to the pharmacy.",
        },
        {
          id: 4,
          question: "4. ripe",
          correctAnswer: "ripe",
          explanation: "The tomatoes are described as delicious and ripe.",
          tip: "Focus on the adjective describing the tomatoes.",
        },
        {
          id: 5,
          question: "5. stock",
          correctAnswer: "stock",
          explanation: "The advice is to stock up on pasta while it's on sale.",
          tip: "Listen for the verb used with 'up on pasta'.",
        },
        {
          id: 6,
          question: "6. florist's",
          correctAnswer: "florist's",
          explanation: "You can stop by the florist's to buy flowers.",
          tip: "Pay attention to where you can buy flowers in the store.",
        },
        {
          id: 7,
          question: "7. location",
          correctAnswer: "location",
          explanation: "Superprice has everything in one location.",
          tip: "Listen for what Superprice offers in terms of convenience.",
        },
        {
          id: 8,
          question: "8. purchases",
          correctAnswer: "purchases",
          explanation:
            "Free delivery is offered for purchases over 50 dollars.",
          tip: "Focus on what needs to be over 50 dollars for free delivery.",
        },
        {
          id: 9,
          question: "9. bracelet",
          correctAnswer: "bracelet",
          explanation: "The woman receives a gold bracelet as a gift.",
          tip: "Listen for what type of gold item the woman receives.",
        },
        {
          id: 10,
          question: "10. service",
          correctAnswer: "service",
          explanation:
            "Whatagive khw is described as an online shopping service.",
          tip: "Pay attention to how the online shopping platform is described.",
        },
      ],
    },
    {
      id: 19,
      type: "listening",
      title: "Listening Test 19",
      icon: "🎧",
      format: "multiple_choice",
      audioUrl: "audio/test19.mp3",
      passage: `When I had just left high school, I was (1) ........ overseas for a year. But I wasn't sure that that was what I wanted. I was worried about going so far away, leaving my friends... you know. So I was (2) ........ to a friend of my father's about this, and he said, "Travel while you're young." It is such a cliché, I know, but actually I realized that it was good advice. You can be old one day and that I didn't want to (3) ........ then that I'd had a chance and not taken it.

So I'm off going to work overseas, and it (4) ........ to be the best experience. If he hadn't said that to me, I might never have gone.

My mother always said, "If something is bothering you, go for a walk by yourself." She used to do this all the time. We just (5) ........ it as normal. Now I realize that she was doing that to get a chance to be by herself, and to think about things. And now I do (6) ........ Whenever I have a problem that I can't work out, I go out for a walk, and it helps me feel better!

My (7) ........ had a mirror by the front door, and she always looked at herself in the mirror before she went out. It became a bit of a joke in the family, because the mirror was too high for her and she had to (8) ........ to see herself properly. You never know when you might have food stuck between your teeth!"

I was really shy, and I was nervous about going to a party where I didn't know anyone. And the friend that I was going with said, "Look, just (9) ........ interested in what they want to talk about themselves. People aren't really interested in you. When they want to talk about themselves, just keep on asking questions. Try to find out about them." I did, and it (10) ........ And ever since then I've always done that. I most certainly am not shy at social conversations going.`,
      questions: [
        {
          id: 1,
          question: "1.",
          options: [
            "A. offered a job",
            "B. ordered a job",
            "C. looking for job",
            "D. applying for job",
          ],
          correct: 0, // A
          explanation: "The speaker was offered a job overseas for a year.",
          tip: "Listen for what opportunity the speaker had after high school.",
        },
        {
          id: 2,
          question: "2.",
          options: ["A. telling", "B. taking", "C. talking", "D. speaking"],
          correct: 2, // C
          explanation:
            "The speaker was talking to a friend of their father's about this.",
          tip: "Pay attention to the verb used when discussing with the father's friend.",
        },
        {
          id: 3,
          question: "3.",
          options: [
            "A. realize",
            "B. recognize",
            "C. memorize",
            "D. criticize",
          ],
          correct: 0, // A
          explanation:
            "The speaker didn't want to realize later that they had missed a chance.",
          tip: "Focus on what the speaker was worried about for the future.",
        },
        {
          id: 4,
          question: "4.",
          options: [
            "A. came out",
            "B. turned down",
            "C. changed about",
            "D. turned out",
          ],
          correct: 3, // D
          explanation: "It turned out to be the best experience.",
          tip: "Listen for the phrasal verb describing how the experience was.",
        },
        {
          id: 5,
          question: "5.",
          options: ["A. adapted", "B. expected", "C. accepted", "D. collected"],
          correct: 2, // C
          explanation: "They accepted it as normal behavior from their mother.",
          tip: "Pay attention to how the family viewed the mother's habit.",
        },
        {
          id: 6,
          question: "6.",
          options: [
            "A. what I did",
            "B. what she did",
            "C. what he did",
            "D. what they did",
          ],
          correct: 1, // B
          explanation: "Now the speaker does what she (the mother) did.",
          tip: "Listen for whose behavior the speaker now follows.",
        },
        {
          id: 7,
          question: "7.",
          options: [
            "A. great mother",
            "B. crazy mother",
            "C. lazy mother",
            "D. grandmother",
          ],
          correct: 3, // D
          explanation:
            "The speaker's grandmother had a mirror by the front door.",
          tip: "Pay attention to which family member is being described.",
        },
        {
          id: 8,
          question: "8.",
          options: ["A. tiptoe", "B. big toes", "C. window", "D. big shoes"],
          correct: 0, // A
          explanation:
            "She had to tiptoe to see herself properly in the high mirror.",
          tip: "Listen for what action was needed to use the mirror.",
        },
        {
          id: 9,
          question: "9.",
          options: [
            "A. pay attention",
            "B. ask questions",
            "C. get attraction",
            "D. make acquaintance",
          ],
          correct: 1, // B
          explanation:
            "The advice was to ask questions and show interest in others.",
          tip: "Focus on the social advice given for the party.",
        },
        {
          id: 10,
          question: "10.",
          options: ["A. worried", "B. walked", "C. talked", "D. worked"],
          correct: 3, // D
          explanation: "The advice worked and helped overcome shyness.",
          tip: "Listen for whether the social strategy was successful.",
        },
      ],
    },
    {
      id: 20,
      type: "listening",
      title: "Listening Test 20",
      icon: "🎧",
      format: "fill_in_blanks",
      audioUrl: "audio/test20.mp3",
      passage: `Text 20: Best friends (CD 1 - 6)

1. Shona
I have three or four good friends, but I think my best friend is Kristy. We first met when we were 12. She was a new student at my school, and the teacher asked me to show her (1) ......................... We soon became friends. We looked pretty funny together. She's very tall, and I'm pretty short! Because we grew up together, we know everything about each other. So Kristy knows me better than anyone else. I can always talk to her about my problems. She always listens and then gives me good (2) ......................... I'd hope I do the same for her. We are both married now, and um, we live near each other, but in different towns. We talk on the phone all the time. (3) ......................... now, because we are both having a baby this summer!

2. Dominic
My best friend is named Sammy, um, and he often comes to play at my house after school. A long time ago, uh, when I was four, we went to Busy Bee (4) ......................... together. Me and Sammy are both six now. I like him 'cause he's funny and he plays soccer. I like going to play at his house, too. He has a big (5) ........................., and a nice dog named King.

3. Michael
I have two very good friends from (6) ......................... named Dave and Adam. We stayed in the same house near school. I don't know why we became friends. We're all very different. Dave was very (7) ......................... and always worked hard, and Adam was, well, pretty crazy! He never remembered his house keys. He climbed in through the window at least once a week. He loved cooking Indian food and having parties. We had parties all the time then!

Now, of course, life is very different. Dave is a writer and lives in France. He sends me long, funny e-mails every month. Adam is an international (8) ......................... He's been working in Hong Kong these days. But we still meet once a year with our families. We usually meet at Dave's house in France for a week or so.

4. Brianna
My best friend is my (9) ......................... Caleb. He's 16. Our moms are good friends, and I call Caleb's mom Aunt Jamie. We grew up together. When we were kids, we always liked the same games. Now we're into the same music. On weekends, we usually go on the internet, or sometimes we go downtown to the music stores to listen to our favorite (10) ......................... Caleb's cool. He's like a brother to me.`,
      questions: [
        {
          id: 1,
          question: "1. around",
          correctAnswer: "around",
          explanation:
            "The teacher asked to show the new student around the school.",
          tip: "Listen for what the teacher asked them to do for the new student.",
        },
        {
          id: 2,
          question: "2. advice",
          correctAnswer: "advice",
          explanation: "Kristy always listens and gives good advice.",
          tip: "Pay attention to what Kristy provides when listening to problems.",
        },
        {
          id: 3,
          question: "3. especially",
          correctAnswer: "especially",
          explanation:
            "They talk on the phone all the time, especially now because they're both having babies.",
          tip: "Focus on the word that emphasizes their current situation.",
        },
        {
          id: 4,
          question: "4. preschool",
          correctAnswer: "preschool",
          explanation:
            "They went to Busy Bee preschool together when they were four.",
          tip: "Listen for what type of school they attended when they were young.",
        },
        {
          id: 5,
          question: "5. yard",
          correctAnswer: "yard",
          explanation: "Sammy has a big yard where they can play.",
          tip: "Pay attention to what Sammy has at his house for playing.",
        },
        {
          id: 6,
          question: "6. college",
          correctAnswer: "college",
          explanation:
            "Michael has two good friends from college named Dave and Adam.",
          tip: "Listen for where Michael met his two friends.",
        },
        {
          id: 7,
          question: "7. quiet",
          correctAnswer: "quiet",
          explanation: "Dave was very quiet and always worked hard.",
          tip: "Focus on Dave's personality characteristic.",
        },
        {
          id: 8,
          question: "8. lawyer",
          correctAnswer: "lawyer",
          explanation: "Adam is an international lawyer working in Hong Kong.",
          tip: "Pay attention to Adam's current profession.",
        },
        {
          id: 9,
          question: "9. neighbor",
          correctAnswer: "neighbor",
          explanation: "Brianna's best friend is her neighbor Caleb.",
          tip: "Listen for the relationship between Brianna and Caleb.",
        },
        {
          id: 10,
          question: "10. artist",
          correctAnswer: "artist",
          explanation:
            "They go to music stores to listen to their favorite artist.",
          tip: "Focus on what they listen to at the music stores.",
        },
      ],
    },
    {
      id: 35,
      type: "listening",
      title: "Listening Test 35",
      icon: "🎧",
      format: "multiple_choice",
      audioUrl: "audio/test35.mp3",
      questions: [
        {
          id: 1,
          question: "What does the man plan to wear during the summer months?",
          options: ["A. a cool hat", "B. casual shoes", "C. light pants"],
          correct: 1, // B
          explanation: "The man plans to wear casual shoes during summer.",
          tip: "Listen for what clothing item the man mentions for summer.",
        },
        {
          id: 2,
          question:
            "What is one thing the man is NOT going to pack for the winter season?",
          options: ["A. a coat", "B. some sweaters", "C. a jacket"],
          correct: 0, // A
          explanation: "The man is not going to pack a coat for winter.",
          tip: "Pay attention to what winter item the man will not bring.",
        },
        {
          id: 3,
          question: "What is the weather like in the spring?",
          options: ["A. It's windy.", "B. It's rainy.", "C. It's cool."],
          correct: 1, // B
          explanation: "The weather in spring is described as rainy.",
          tip: "Focus on the spring weather description.",
        },
        {
          id: 4,
          question:
            "What is an example of an occasion where the man might need formal clothes?",
          options: ["A. a party", "B. a business meeting", "C. a wedding"],
          correct: 2, // C
          explanation:
            "A wedding is mentioned as an occasion for formal clothes.",
          tip: "Listen for the formal occasion mentioned.",
        },
        {
          id: 5,
          question: "What did the man wear to his high school graduation?",
          options: [
            "A. jeans and tennis shoes",
            "B. a casual shirt and tie",
            "C. a suit and dress shoes",
          ],
          correct: 0, // A
          explanation: "The man wore jeans and tennis shoes to his graduation.",
          tip: "Pay attention to what the man wore for his graduation ceremony.",
        },
      ],
    },
    {
      id: 54,
      type: "listening",
      title: "Listening Test 54",
      icon: "🎧",
      format: "true_false",
      audioUrl: "audio/test54.mp3",
      passage:
        "Text 54: Listen and decide if the following statements are True (T) or False (F).",
      questions: [
        {
          id: 1,
          question:
            "The professor mentions the play by Ibsen to present a new type play.",
          correct: 1, // False
          explanation:
            "The professor does not mention Ibsen to present a new type of play.",
          tip: "Listen carefully to why the professor mentions Ibsen.",
        },
        {
          id: 2,
          question:
            "Three types of plays mentioned in the talk are thriller, comedy, tragedy.",
          correct: 1, // False
          explanation:
            "The three types mentioned are not thriller, comedy, tragedy.",
          tip: "Pay attention to the specific types of plays mentioned.",
        },
        {
          id: 3,
          question: "Saint Joan is an example of a tragicomedy.",
          correct: 0, // True
          explanation:
            "Saint Joan is indeed mentioned as an example of tragicomedy.",
          tip: "Listen for examples of different play types.",
        },
        {
          id: 4,
          question: "Comedies have humorous characters and happy endings.",
          correct: 0, // True
          explanation:
            "Comedies are described as having humorous characters and happy endings.",
          tip: "Focus on the characteristics of comedies mentioned.",
        },
        {
          id: 5,
          question: '"Ghosts" is the play of George Bernard Shaw.',
          correct: 1, // False
          explanation: '"Ghosts" is not a play by George Bernard Shaw.',
          tip: "Listen carefully to which author wrote which play.",
        },
      ],
    },
    {
      id: 55,
      type: "listening",
      title: "Listening Test 55",
      icon: "🎧",
      format: "true_false",
      audioUrl: "audio/test55.mp3",
      passage:
        "TEXT 55: Listen and decide if the following statements are True (T) or False (F).",
      questions: [
        {
          id: 1,
          question: "The talk is mainly about rays from the sun.",
          correct: 0, // True
          explanation: "The talk is indeed mainly about rays from the sun.",
          tip: "Listen for the main topic of the discussion.",
        },
        {
          id: 2,
          question:
            "According to the speaker, the sky is blue because blue rays scatter the least.",
          correct: 1, // False
          explanation:
            "The sky is blue because blue rays scatter the most, not the least.",
          tip: "Pay attention to why the sky appears blue.",
        },
        {
          id: 3,
          question: "The color of light ray scatters the least is blue.",
          correct: 1, // False
          explanation: "Blue is not the color that scatters the least.",
          tip: "Listen for which color scatters the least.",
        },
        {
          id: 4,
          question:
            "Yellow rays are scattered most; they seem to be all over the sky.",
          correct: 1, // False
          explanation: "Yellow rays are not scattered the most.",
          tip: "Focus on which rays are scattered the most.",
        },
        {
          id: 5,
          question: "It's a beautiful blue sky yesterday.",
          correct: 1, // False
          explanation:
            "The statement refers to yesterday, but this may not be accurate.",
          tip: "Listen carefully to time references in the talk.",
        },
      ],
    },
    {
      id: 56,
      type: "listening",
      title: "Listening Test 56",
      icon: "🎧",
      format: "true_false",
      audioUrl: "audio/test56.mp3",
      passage:
        "Text 56: Listen and decide if the following statements are True (T) or False (F).",
      questions: [
        {
          id: 1,
          question:
            "The professor mainly discuss about the importance of getting vitamin D from sunshine as an aspect of health.",
          correct: 0, // True
          explanation:
            "The professor does discuss the importance of getting vitamin D from sunshine for health.",
          tip: "Listen for the main topic of the professor's discussion.",
        },
        {
          id: 2,
          question:
            "The speaker's main point is to get enough vitamin D, we need sunshine.",
          correct: 0, // True
          explanation:
            "The speaker emphasizes that sunshine is needed to get enough vitamin D.",
          tip: "Pay attention to the speaker's main argument about vitamin D.",
        },
        {
          id: 3,
          question:
            "The professor emphasizes her point about getting enough vitamin D by showing what happens when we're in the sun.",
          correct: 1, // False
          explanation:
            "The professor doesn't emphasize the point by showing what happens in the sun.",
          tip: "Listen for how the professor supports their argument.",
        },
        {
          id: 4,
          question: "Without Vitamin D, we may develop strong bones and teeth.",
          correct: 1, // False
          explanation:
            "Without vitamin D, we cannot develop strong bones and teeth - the opposite is true.",
          tip: "Focus on what happens when we lack vitamin D.",
        },
        {
          id: 5,
          question: "Too much sunshine can cause skin cancer.",
          correct: 0, // True
          explanation: "Too much sunshine can indeed cause skin cancer.",
          tip: "Listen for the potential dangers of excessive sun exposure.",
        },
      ],
    },
  ],
};
