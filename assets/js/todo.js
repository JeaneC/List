var toggled = false;

//Function of what to do if a room is selected
$("ul#categories").on("click", "li", function(){

});

$("ul#list").on("click", "li", function(){
  $(this).toggleClass("completed");

});




$("input#title").on("click", function(){
  //This seems like it does nothing, but it prevents the dropdown from
  //Auto closing
  event.stopPropagation();

});

$("input#title").keypress(function(event){
  if(event.which ===13){

    loaded = false;
    listTitle = $(this).val();
    $(this).val("");
    $('#header').html(listTitle);
    if(!toggled){
      $(".dropdown-content").css('display', 'block');
      toggled = !toggled;
    } else {
      $(".dropdown-content").css('display', 'none');
      toggled = !toggled;
    }

    mainRef = firebase.database().ref("guest/" + listTitle);

    //Change Rooms
    mainRef.off();

    mainRef.once('value').then(function(snapshot) {

      var itemList = snapshot.val()

      $('ul#list').html('');
      if (itemList) { //If there is a item
        if(loaded){
        } else {
          for (var itemKey in itemList){
            const item = itemList[itemKey]["Title"];
            $("ul#list").append("<li><span class='item'  id='" + itemKey + "'><i class='fa fa-trash'></i></span> " + item + "</li>");
          }
          loaded = true;
        }

      } else {
        loaded = true;
        //$("ul#list").append("<li><span class="item" ><i class='fa fa-trash'></i></span> " + "Add Items Above!" + "</li>");
      }
    });

    mainRef.on('child_added', function(snapshot) {
      var itemList = snapshot.val()
        if(loaded){
          var item = itemList["Title"];
          $("ul#list").append("<li><span class='item'  id='" + snapshot.key + "'><i class='fa fa-trash'></i></span> " + item + "</li>");
          }

    });

  }

  event.stopPropagation();

});

$(".fa-bars").on("click", function(){
  //if li is gray, turn it to black, else turn it to
  //grey
  if(!toggled){
    $(".dropdown-content").css('display', 'block');
    toggled = !toggled;
  } else {
    $(".dropdown-content").css('display', 'none');
    toggled = !toggled;
  }


});
//Click on x to delete
$("ul#list").on("click", "span", function(event){
  var key = $(this).attr("id");
  $(this).parent().fadeOut(500,function(){
    var itemReferenceKey = firebase.database().ref("guest/" + listTitle + "/" + key);
    itemReferenceKey.remove();
    $(this).remove();
  });


  event.stopPropagation();
});


//User Presses Enter
$("input#add").keypress(function(event){
  if(event.which ===13){
    if($(this).val() != ""){
      var listText = $(this).val();
      $(this).val("");
      //Create a new li and add to ul
      //"guest/" +
      var newPostKey = firebase.database().ref("guest/" + listTitle +"/").push().key;
      var itemUpdate = {};
      itemUpdate["guest/" + listTitle + "/" + newPostKey + "/"] = {
        "Title" : listText
      };

      firebase.database().ref().update(itemUpdate)
    }
  }

});

$(".fa-plus").click(50, function(){
  $("input#add").fadeToggle();
});

function getDate(){
  var d = new Date();
  var dM = pad(d.getMonth()+1);
  var dD = pad(d.getDate());
  var dY = pad(d.getFullYear());
  var todaysDate = dM + dD + dY;
  return todaysDate;
}
