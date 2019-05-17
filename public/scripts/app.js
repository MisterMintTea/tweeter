/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



  const createTweetSection = tweetObj => {
      const $article = $('<article>').addClass('.tweet-container');

      const $header = $('<header>').addClass('.tweet-header');

      const $h1TweetName = $('<h1>').text(tweetObj.user.name);

      const $avatars = $('<img>').attr('src', tweetObj.user.avatars.small);
      
      const $h2Handler = $('<h2>').text(tweetObj.user.handle);
      
      $header.append($h1TweetName);
      $h1TweetName.append($avatars);
      $avatars.append($h2Handler);

      const $content = $('<h3>').text(tweetObj.content.text);

      const $footer = $('<footer>');

      const $date = $('<h4>').text(new Date(tweetObj.created_at));

      $footer.append($date);

      $article.append($header);
      $article.append($content);
      $article.append($footer);

    console.log($article);
      return $article;
  }
  
const renderTweets = postArr => {
  for (const postEl of postArr) {
    const post = createTweetSection(postEl);
    $('#old-tweet').prepend(post);
  }
}

// Loads db 
const loadTweets = (url) => {
  $.ajax({
    method: 'GET',
    url: url
  })

  .done(response => {
    renderTweets(response);
  })

  .fail(error => {
    console.log(`Error: ${error}`);
  })
  .always(() => {
    console.log('Request completed.');
  })
}

function postTweets(url, pData){
  $.ajax({
    method: 'POST',
    url: url,
    data: pData
  })
  .done(response => {
    $('#old-tweet').empty()
    loadTweets(url)
    
  })
  .fail(error => {
    console.log(`Error: ${error}`);
  })
  .always(() => {
    console.log('Request completed.');
  })
}


  $(document).ready(function() {
    loadTweets('http://localhost:8080/tweets');

    $("#btn-compose").click(function() {
      $("#new-tweet").slideToggle("slow");
      $("#text-area").focus();
      });
    
   
    $( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      const data = $(this).serialize();
      console.log($(this).serialize());

      if (data.length === 5) {
        $("#error").slideDown("slow");
        return;
      }if (data.length > 145) {
        $("#error").slideDown("slow");
        return;
      } else {
        $("#error").hide();
        postTweets('http://localhost:8080/tweets', data)
        return;
      }
    })
  })
  

// (.counter).html(140);