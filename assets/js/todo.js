// Check off specific Todos

$("ul").on("click", "li", function(){
  //if li is gray, turn it to black, else turn it to
  //grey
  $(this).toggleClass("completed");

});

//Click on x to delet
$("ul").on("click", "span", function(event){
  $(this).parent().fadeOut(500,function(){
    $(this).remove();
  });

  event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
  if(event.which ===13){
    var todoText = $(this).val();

    //Create a new li and add to ul
    $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
  }

});

$(".fa-plus").click(50, function(){
  $("input[type='text']").fadeToggle();
});
