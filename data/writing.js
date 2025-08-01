const writingData = {
  metadata: {
    title: "Writing Practice",
    description: "Bài tập luyện viết thư tiếng Anh",
    totalTopics: 2,
    created: "2024-08-01",
    version: "1.0",
  },
  topics: [
    {
      id: 17,
      type: "writing",
      title: "Write an email about a new job in a different city",
      icon: "✉️",
      prompt: `Topic 17: You have been offered a job that will require you to move to a city that you have never visited before. You have a friend who lives there. Write an email with at least 150 words to your friend. In your email:

• explain your situation
• say why you feel unsure about living in the city  
• ask some questions about life in the city`,
      promptVietnamese: `Chủ đề 17: Bạn được mời làm việc tại một thành phố mà bạn chưa từng đến. Bạn có một người bạn sống ở đó. Viết email ít nhất 150 từ cho bạn của mình. Trong email:

• giải thích tình huống của bạn
• nói tại sao bạn cảm thấy không chắc chắn về việc sống ở thành phố đó
• hỏi một số câu hỏi về cuộc sống ở thành phố`,
      sampleLetter: `Dear ........,

I hope you are doing well. I have some exciting news to share with you!

I was just offered a job at ........ Company in ........ City. I am really excited about this opportunity, but I am also a little nervous because I have never been to ........ City before.

I am feeling a bit unsure about moving to a new city because I do not know anyone there. I know you have lived in ........ City for a while now, so I was hoping you could answer some questions for me.

I am also wondering about the cost of living. Is it expensive to live in ........ City? Are there any good places that you would recommend for me to live? What is the traffic like? And how is the food there?

I would really appreciate any advice you can give me about living in the city.

I am looking forward to hearing from you soon.

Best,
........`,
      vietnameseTranslation: `Gửi ........,

Tôi hy vọng bạn đang khỏe mạnh. Tôi có tin vui muốn chia sẻ với bạn!

Tôi vừa được mời làm việc tại Công ty ........ ở thành phố ........ Tôi rất hào hứng về cơ hội này, nhưng tôi cũng hơi lo lắng vì tôi chưa bao giờ đến thành phố ........ trước đây.

Tôi cảm thấy hơi không chắc chắn về việc chuyển đến một thành phố mới vì tôi không quen ai ở đó. Tôi biết bạn đã sống ở thành phố ........ được một thời gian rồi, vì vậy tôi hy vọng bạn có thể trả lời một số câu hỏi cho tôi.

Tôi cũng thắc mắc về chi phí sinh hoạt. Sống ở thành phố ........ có đắt không? Có nơi nào tốt mà bạn muốn giới thiệu cho tôi ở không? Giao thông như thế nào? Và đồ ăn ở đó ra sao?

Tôi sẽ rất biết ơn nếu bạn có thể cho tôi lời khuyên về việc sống ở thành phố này.

Tôi mong sớm nhận được tin từ bạn.

Thân ái,
........`,
    },
    {
      id: 18,
      type: "writing",
      title: "Write an email about applying for a course abroad",
      icon: "🎓",
      prompt: `Topic 18: You have a friend who lives abroad. You have decided to apply for a course at one of the colleges/universities in his city. Write an email with at least 150 words to your friend explaining:

• tell them about the college/university and the course
• why you want to do it
• ask for their help to find accommodation if you get admission to the course`,
      promptVietnamese: `Chủ đề 18: Bạn có một người bạn sống ở nước ngoài. Bạn quyết định nộp đơn học một khóa học tại một trường cao đẳng/đại học ở thành phố của họ. Viết email ít nhất 150 từ cho bạn của mình để giải thích:

• kể cho họ về trường cao đẳng/đại học và khóa học
• tại sao bạn muốn học
• nhờ họ giúp tìm chỗ ở nếu bạn được nhận vào khóa học`,
      sampleLetter: `Dear ........,

I hope this email finds you well. I have some exciting news to tell you!

I am applying to ........ University in your city for their Business program. This course is perfect for me because it has good teachers and modern facilities. The program is also well-known and will help me get a good job later.

I am passionate about this course and I think this program would be a great way for me to learn more and develop my skills. I have always wanted to study business, and this university has an excellent reputation.

However, I need to find somewhere to live if I get accepted. I know you are familiar with the city, so I hope you can give me some advice on finding accommodation. Do you know any good areas for students? Are there any apartments or student houses that you would recommend?

I would be so grateful for any help you can offer! It would mean a lot to me.

I am looking forward to hearing from you soon.

Best,
........`,
      vietnameseTranslation: `Gửi ........,

Tôi hy vọng email này đến với bạn khi bạn đang khỏe mạnh. Tôi có tin vui muốn kể cho bạn nghe!

Tôi đang nộp đơn vào Đại học ........ ở thành phố của bạn cho chương trình Kinh doanh của họ. Khóa học này hoàn hảo cho tôi vì có giáo viên giỏi và cơ sở vật chất hiện đại. Chương trình này cũng nổi tiếng và sẽ giúp tôi có được công việc tốt sau này.

Tôi đam mê khóa học này và tôi nghĩ chương trình này sẽ là cách tuyệt vời để tôi học hỏi thêm và phát triển kỹ năng. Tôi luôn muốn học kinh doanh, và trường đại học này có danh tiếng xuất sắc.

Tuy nhiên, tôi cần tìm nơi ở nếu được nhận. Tôi biết bạn quen thuộc với thành phố này, vì vậy tôi hy vọng bạn có thể cho tôi lời khuyên về việc tìm chỗ ở. Bạn có biết khu vực nào tốt cho sinh viên không? Có căn hộ hoặc nhà sinh viên nào mà bạn muốn giới thiệu không?

Tôi sẽ rất biết ơn nếu bạn có thể giúp đỡ! Điều đó có ý nghĩa rất lớn với tôi.

Tôi mong sớm nhận được tin từ bạn.

Thân ái,
........`,
    },
  ],
};
