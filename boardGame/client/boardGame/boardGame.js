
Template.boardGame.rendered = function(){
  var empty = $("#red").is("red:empty");
 $('a').draggable({
    containment: "table",
    revert: 'invalid'
});
var i = 0;
var x = 0;
$('td').droppable({
    drop: function (ev, ui) {
        var dropped = ui.draggable;
        var droppedOn = $(this);
        $(droppedOn).droppable("disable");
        $(dropped).parent().droppable("enable");
        $(dropped).detach().css({
            top: 0,
            left: 0
        }).appendTo(droppedOn);
    }
    });
 $('td').not('td:empty').droppable("disable");

 $('#red').droppable({
        drop: function(ev, ui) {
          dropped = ui.draggable;
          droppedOn = $(this);
          
              
              i++;
              console.log(i,x);
        
          if (i>=3){
            x=1;
            console.log(x);
          $(droppedOn).droppable("disable");
          $(dropped).parent().droppable("enable");
          $(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
          }else{
             $(droppedOn).droppable("enable");
             $(dropped).parent().droppable("enable");
             $(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
          }
        },
        out: function(event, ui) {

        if (i==2 && x==1){
          i=0;
          x=0;
        }else{
          i=i-1;
        }

        console.log(i,x);
        }
    }); 
    var playerCounter =0;
    var counter =0;
    var currentPlayer = [$("player1"),$("player2")]
    var store=[];
    var card;
    var cards=["2Foot","plague","PTSD", "interns", "supply-drop","2Demo","pueple-heart","spy","blackmart"];
    var card_values=[2,.5,.25,6,10,2,3,1,2];
    var value=[0,0,0,0,0,0,0,0];
    var names=[ "two","four","six","food-five","food-ten","reroll","tank","card"];
    var dice = $('.die').map(function () {
        return $(this).attr('src')
    }).get();

     $('input:checkbox').attr('checked','checked');

    //Roll all
    $('#roll').click(function () {
      counter +=1;
      //store dice value num  into store[0]
      console.log(i);
      if($("#selectRoll1").prop('checked') == true){
        var num = Math.floor(Math.random() * dice.length);
        $('.die[name=first]').attr('src', dice[num]);
        store[0] = dice[num];
      }
      //store dice value num  into store[1]
      if($("#selectRoll2").prop('checked') == true){
        num = Math.floor(Math.random() * dice.length);
        $('.die[name=second]').attr('src', dice[num]);
        store[1] = dice[num];
      }
      //store dice value num  into store[2]
      if($("#selectRoll3").prop('checked') == true){
        num = Math.floor(Math.random() * dice.length);
        $('.die[name=third]').attr('src', dice[num]);
        store[2] = dice[num];
      }
      for(num=0; num<store.length; num++){
        if (store[num]=="Dice3.jpg"){
          counter== Math.floor(Math.random()*cards.length);
          cards.splice(counter-1, 1);
          card-values.splice(counter-1, 1);
        }

      }
    });
}