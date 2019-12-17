//Use As an Example

module.exports = {
  quiz_description: "Learn the basics of the QLAB App",
  quiz_questions: [
    {
      question: "What is the main currency in app?",
      answers: ["QPoints", "Dollars", "Pounds", "QScore"],
      correct_answer: "QPoints"
    },
    {
      question: "What ISN'T a way of earning QPoints?",
      answers: [
        "Do Quizzes",
        "Investment Dividends",
        "Buying Badges",
        "Do More Quizzes"
      ],
      correct_answer: "Buying Badges"
    },
    {
      question: "What does QScore represent?",
      answers: [
        "My IQ",
        "The number of quizzes I have done",
        "My learning effort",
        "Real Money"
      ],
      correct_answer: "My learning effort"
    },
    {
      question: "How Much do Investments Cost?",
      answers: [
        "The Persons QScore times 5",
        "The Persons QScore times 2",
        "The Persons QScore",
        "The Persons QScore times 10"
      ],
      correct_answer: "The Persons QScore times 5"
    },
    {
      question: "How often do I get Points from my Investments?",
      answers: ["Every Half Hour", "Every Hour", "Twice a Day", "Every Day"],
      correct_answer: "Every Day"
    },
    {
      question: "What CAN'T I use my QPoints for?",
      answers: [
        "Topping the Leaderboard",
        "Buying Amazon Vouchers",
        "Buying Badges",
        "Investing in Friends"
      ],
      correct_answer: "Buying Amazon Vouchers"
    }
  ],
  quiz_length: 6,
  quiz_points: 300,
  quiz_title: "Using QLAB"
};
