// Check off specific Todos

$("ul").on("click", "li", function(){
  //if li is gray, turn it to black, else turn it to
  //grey
  $(this).toggleClass("completed");

});

//Click on x to delet
$("ul").on("click", "span", function(event){
  var key = $(this).attr("id");
  $(this).parent().fadeOut(500,function(){
    var songReferenceKey = firebase.database().ref("songList/" + key);
    songReferenceKey.remove();
    $(this).remove();
  });


  event.stopPropagation();
});


$("input[type='text']").keypress(function(event){
  if(event.which ===13){
    if($(this).val() != ""){
      var listText = $(this).val();
      $(this).val("");
      //Create a new li and add to ul
      var newPostKey = firebase.database().ref("songList/").push().key;
      var songUpdate = {};
      songUpdate["songList/" + newPostKey + "/"] = {
        "Title" : listText
      };

      firebase.database().ref().update(songUpdate)
    }
  }

});

$(".fa-plus").click(50, function(){
  $("input[type='text']").fadeToggle();
});

function getDate(){
  var d = new Date();
  var dM = pad(d.getMonth()+1);
  var dD = pad(d.getDate());
  var dY = pad(d.getFullYear());
  var todaysDate = dM + dD + dY;
  return todaysDate;
}
