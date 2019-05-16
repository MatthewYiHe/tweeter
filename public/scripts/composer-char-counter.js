$(document).ready(function() {
  const content = $("textarea");
  content.on("input", function(event){
    let counter = 140 - $(this).val().length;
    $(this).siblings()[1].innerText = counter;
    if (counter < 0){
      $(".counter").addClass("neg");
    } else {
      $(".counter").removeClass("neg");
    }
  });
});
