$(document).ready(function() {
  $(".new-tweet form textarea").on("input", function(event) {
    const maxChar = 140;

    const $currentChar = $(this).val().length;

    const charRemaining = maxChar - $currentChar;

    let $counterDisplay = $(this)
      .parent()
      .find("span");

    $counterDisplay.text(charRemaining);

    charRemaining < 0
      ? $counterDisplay.addClass("red")
      : $counterDisplay.removeClass("red");
  });
});
