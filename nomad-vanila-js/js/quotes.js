const quotes = [
  {
    quote: "Never doubt yourself. We are all capable of amazing things.",
    author: "Rob Cristophe",
  },
  {
    quote: "The beginning is always today.",
    author: "Mary Wollstonecraft",
  },
  {
    quote: "Nobody ever got ready by waiting. You only get ready by starting.",
    author: "John C. Maxwell",
  },
  {
    quote: "Do not seek to follow in the footsteps of others, instead, seek what they sought.",
    author: "Matsuo Basho",
  },
  {
    quote: "Incredible things can be done simply if we are committed to making them happen.",
    author: "Sadhguru",
  },
  {
    quote: "If it ain't fun, don't do it.",
    author: "Jack Canfield",
  },
  {
    quote: "Often when you think you're at the end of something, you're at the beginning of something else.",
    author: "Fred Rogers",
  },
  {
    quote: "Fall in love with the process.",
    author: "",
  },
  {
    quote: "Stay hungry; stay foolish.",
    author: "",
  },
  {
    quote: "Invest in yourself.",
    author: "",
  },
];

const quote = document.querySelector("#quote .text");
const author = document.querySelector("#quote .author");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
