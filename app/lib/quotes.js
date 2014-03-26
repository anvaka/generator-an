module.exports = getOne;

var quotes = ['Whatever the mind of man can conceive and believe, it can achieve.',
'Strive not to be a success, but rather to be of value.',
'You miss 100% of the shots you don’t take.',
'The most difficult thing is the decision to act, the rest is merely tenacity.',
'Definiteness of purpose is the starting point of all achievement.',
'The past is a ghost, the future a dream. All we ever have is now.',
'We become what we think about.',
'Life is 10% what happens to me and 90% of how I react to it.',
'The mind is everything. What you think you become.',
'The best time to plant a tree was 20 years ago. The second best time is now.',
'Winning isn’t everything, but wanting to win is.',
'The only person you are destined to become is the person you decide to be.',
'Believe you can and you’re halfway there.',
'Stop wishing, start doing',
'Everything you’ve ever wanted is on the other side of fear.'];

function getOne() {
  return quotes[Math.round(Math.random() * quotes.length)];
}
