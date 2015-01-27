var env = require('node-env-file');
var Twit = require('twit');
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID
  key: process.env.PUSHER_KEY
  secret: process.env.PUSHER_SECRET
});

// Load any undefined ENV variables form a specified file.
env(__dirname + '/.env');

var Twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var stream = Twitter.stream('statuses/filter', {
  track: process.env.TRACK_FILTER
});

stream.on('tweet', function (data) {
  var tweet = {
    originalfeed_id: data.id,
    name: data.user.name,
    screen_name: data.user.screen_name,
    created_at: data.user.created_at,
    profile_image_url: data.user.profile_image_url,
    created_at: data.created_at,
    post: data.text,
    url: 'https://twitter.com/' + data.user.screen_name + '/status/' + data.id_str
  };

  pusher.trigger('test_channel', 'my_event', {
    "message": "hello world"
  });

  console.log(tweet);
});
// stream.on('error', function (data) {
//   console.log(data);
// });
// stream.on('connect', function (data) {
//   console.log(data);
// });
// stream.on('connected', function (data) {
//   console.log(data);
// });
