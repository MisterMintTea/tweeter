/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // Function that creates new html elements
const createTweetSection = tweetObj => {
  const $article = $("<article>").addClass("tweet-container");

  const $header = $("<header>").addClass("tweet-header");

  const $h2TweetName = $("<h2>").text(tweetObj.user.name);

  const $avatars = $("<img>").attr("src", tweetObj.user.avatars.small).addClass("avatar");

  const $h4Handler = $("<h4>").text(tweetObj.user.handle).addClass("handler");

  $header.append($avatars);
  $header.append($h2TweetName);
  $header.append($h4Handler);
  

  const $content = $("<h3>").text(tweetObj.content.text);

  const $footer = $("<footer>").addClass("footer");

  const $iconFlag = $("<i>").addClass("fab fa-font-awesome-flag");
  const $iconHeart = $("<i>").addClass("fas fa-heart");
  const $iconRetweet = $("<i>").addClass("fas fa-retweet");

  const $date = $("<h4>").text(moment(new Date(tweetObj.created_at)).fromNow());

  $footer.append($date);
  $footer.append($iconFlag);
  $footer.append($iconHeart);
  $footer.append($iconRetweet);
  
  $article.append($header);
  $article.append($content);
  $article.append($footer);

  return $article;
};

// Creates new tweets in the database
const renderTweets = postArr => {
  for (const postEl of postArr) {
    const post = createTweetSection(postEl);
    $("#old-tweet").prepend(post);
  }
};

// Gets tweets from Database
const loadTweets = url => {
  $.ajax({
    method: "GET",
    url: url
  })

    .done(response => {
      renderTweets(response);
    })

    .fail(error => {
      console.log(`Error: ${error}`);
    })
    .always(() => {
      console.log("Request completed.");
    });
};

// Adds tweets to Database
function postTweets(url, pData) {
  $.ajax({
    method: "POST",
    url: url,
    data: pData
  })
    .done(response => {
      $("#old-tweet").empty();
      loadTweets(url);
      $('.counter').text(140);
      $('form')[0].reset();
    })
    .fail(error => {
      console.log(`Error: ${error}`);
    })
    .always(() => {
      console.log("Request completed.");
    });
}

// Loads primary functionality as the page is loaded
$(document).ready(function() {
  loadTweets("http://localhost:8080/tweets");

  $("#btn-compose").click(function() {
    $("#new-tweet").slideToggle("slow");
    $("#text-area").focus();
  });

  $("#new-tweet").hide();
  $("#b-navbar-fg").hide();

  $("#handler").hover(
    function () {
      $(this).show();
    },
    function () {
      $(this).hide();
    }
  );

  // Displays appropriate errors for textarea
  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const input = $(this)
      .find("textarea")
      .val();

    if (input.length === 0) {
      $("#error").slideDown("slow").text("The tweet is empty!");
      return;
    }
    if (input.length > 140) {
      $("#error").slideDown("slow").text("Too many characters!");
      return;
    } else {
      $("#error").hide();
      postTweets("http://localhost:8080/tweets", data);
      return;
    }
  });
});
