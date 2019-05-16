$(document).ready(function() {
  function loadTweets() {
    $.getJSON("http://localhost:8080/tweets", renderTweets);
  }
  loadTweets();
  // to calculate how long the tweets have been submited
  function formatTime (time) {
    var diff = Math.floor((Date.now() - time) / 1000);
    var interval = Math.floor(diff / 31536000);

    if (interval >= 1) {
      return interval + "y";
    }
    interval = Math.floor(diff / 2592000);
    if (interval >= 1) {
      return interval + "m";
    }
    interval = Math.floor(diff / 604800);
    if (interval >= 1) {
      return interval + "w";
    }
    interval = Math.floor(diff / 86400);
    if (interval >= 1) {
      return interval + "d";
    }
    interval = Math.floor(diff / 3600);
    if (interval >= 1) {
      return interval + "h";
    }
    interval = Math.floor(diff / 60);
    if (interval >= 1) {
      return interval + "m";
    }
    return "<1m";
  }

// extract info from the one tweet and append them to the new created <artical> under <section>
  let createTweetElement = function(data){
     const a = $("<article>").addClass("tweets");
     const $image = $("<img>").attr("src", data.user.avatars.small).addClass("avatar");
     const $name = $("<h3>").text(data.user.name).addClass("username");
     const $handle = $("<h5>").text(data.user.handle).addClass("nickname");
     const $daysPast = formatTime(data.created_at) + " ago";
     $("<header>").append($image).append($name).append($handle).appendTo(a);
     $("<p>").text(data.content.text).appendTo(a);
     $("<footer>").append($daysPast).appendTo(a);
    return a;
  };

//loop through every tweets and appand them to the home page
  function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    for (let tweetNum in tweets){
    // takes return value and appends it to the tweets container
      $('#tweets-container').prepend(createTweetElement(tweets[tweetNum]));
    }
  }


//post the tweet upon click the submit button, upon success, it will reload the tweets.
  $("#submitTweet").on("click",function(event){
    event.preventDefault();
    console.log($(".counter").val())
    if ($(".counter").val() < 0){
      alert("content is too long");
    } else {
         $.ajax({
        type: "POST",
        url: "/tweets",
        data: $("#textInput").serialize(),
        success: function(){
          $("#textInput").val("");
          loadTweets();
        },
        error: function(){
          alert("content is not present");
        }
      });
    }
  });

  //slide compse up and down
    $("#compose").click(function(){
      $(".new-tweet").slideToggle();
    });
});

