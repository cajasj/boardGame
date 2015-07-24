
Template.boardGame.rendered = function(){

  var playerCounter =0;
    var counter =0;
    var hillCounter=0;
    var i=0;
    var cardcounter=2;
    var buy=1;
    var currentPlayer = [$("player1"),$("player2")];
    var store=[];
    var overflow=3;
    var value=[0,0,0,0,0,0];
    var names=[ "one","two","three","energy","hit","heal"];
    /*  0      1      2         3       4         5       6        7              8         9        10*/
    /*name|-energy|points|self-damage|buffs|energy gain|spend|keep/discard|unsold/sold|activation|end of card stats*/
    var cards=[
    ["tanks",4,4,-3,0,0,0,false,false,-100],//0
    ["corner store",3,1,0,0,0,0,false,false,false,-100],//1
    ["herbivore",5,1,0,0,0,0,true,false,false,-100],//2
    ["it has a child!",7,0,0,0,0,0,true,false,false,-100],//3
    ["death from above",5,2,0,0,0,0,false,false,false,-100],//4
    ["urbavore",4,1,0,1,0,0,true,false,false,-100],//5
    ["friend of children",3,0,0,0,1,0,true,false,false,-100],//6
    ["stretchy",3,0,0,0,0,-2,true,false,true,-100],//7
    ["plot twist",3,0,0,0,0,0,true,false,true,-100],//8
    ["camouflage",3,0,0,0,0,0,true,false,false,-100],//9
    ["jet fighter",5,5,-4,0,0,0,false,false,false,-100]//10
    ];

    /*cards[1]=
    ["tanks",
    "corner store",
    "herbivore",
    "it has a child!",
    "death from above",
    "urbavore",
    "friend of children",
    "stretchy",
    "plot twist",
    "camouflage",
    "jet fighter"
    ];*/
    var pointOne=0;
    var pointTwo=0;
    var pointThree=0
    var player1Total=0;
    var test;
    var player1Totalenergy=0;
    var player1Health=10;
    var player2Total=0;
    var player2Health=10;
    var player2Totalenergy=0;
    var dice = $('.die').map(function () {
        return $(this).attr('src')
    }).get();
    $("#slot1").html(cards[0][0],cards[0][buy]); 

    $("#slot2").html(cards[1][0],cards[1][buy]); 
    $("#slot3").html(cards[2][0],cards[2][buy]);
    $("#slot1").dblclick(function(){
        if(playerCounter==0){
            if(player1Totalenergy>cards[0][buy]){
            console.log(this);
            player1Totalenergy=player1Totalenergy-cards[0][buy];
            cardcounter++;
            $("#slot1").html(cards[cardcounter][0]);
        }else{
            alert("Your monster is suffer from performance issues don't worry it's only natural")
        }
        }

    });
    $("#slot2").dblclick(function(){
        cardcounter++;
        $("#slot2").html(cards[cardcounter][0]);
    });
    $("#slot3").dblclick(function(){
        cardcounter++;
        $("#slot3").html(cards[cardcounter][0]);
    });

    $('input:checkbox').attr('checked','checked');

    //Roll all
    $('#roll').click(function () {
        counter +=1;
        //store dice value num  into store[0]

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
        //store dice value num  into store[3]
        if($("#selectRoll4").prop('checked') == true){
            num = Math.floor(Math.random() * dice.length);
            $('.die[name=fourth]').attr('src', dice[num]);
            store[3] = dice[num];
        }
        //store dice value num  into store[4]
       if($("#selectRoll5").prop('checked') == true){
            num = Math.floor(Math.random() * dice.length);
            $('.die[name=fifth]').attr('src', dice[num]);
            store[4] = dice[num];
        }
        //store dice value num  into store[5]
        if($("#selectRoll6").prop('checked') == true){
            num = Math.floor(Math.random() * dice.length);
            $('.die[name=last]').attr('src', dice[num]);
            store[5] = dice[num];
        }
        if (counter ==3){
            $("#turns").trigger("click");
            
        }
    });
    $('#turns').click(function () 
    {
        $('input:checkbox').prop('checked','checked');
        pointOne=0;
        pointTwo=0;
        pointThree=0
        overflow=3;
        counter =0;
        value=[0,0,0,0,0,0];
        for (num =0; num<store.length; num++)
        {
            //Count how many times for one
            if (store[num]=='img/one.jpg'){
                if(value[0]<2){
                    value[0]+=1;
                    
                }else if(value[0]==2){
                    pointOne +=1;
                    value[0]+=1;
                }else if (value[0]>2){
                    overflow+=1;
                    pointOne=1+(overflow%3);
                    if(overflow%3==0){
                        pointOne=3
                    }

                }
            }
            //Count how many times for two
            if (store[num]=='img/two.jpg'){
                if(value[1]<2){
                    value[1]+=1;
                   
                }else if(value[1]==2){
                    pointTwo +=2;
                    value[1]+=1;
                }else if (value[1]>2){
                    overflow+=1;
                    pointTwo=2+(overflow%3);
                    if(overflow%3==0){
                        pointTwo=5
                    }
                    value[1]+=1;
                }
            }
            //Count how many times for three
            if (store[num]=='img/three.jpg'){
                if(value[2]<2){
                    value[2]+=1;
                    
                }else if(value[2]==2){
                    pointThree +=3;
                    value[2]+=1;
                }else if (value[2] >2){
                     overflow+=1;
                    pointThree=3+(overflow%3);
                    if (overflow%3==0){
                        pointThree=6
                    }
                }
            }
            //Count how many times for energy
            if (store[num]=='img/energy.jpg'){
                value[3]+=1;
            }
             //Count how many times for hits
            if (store[num]=='img/hit.jpg'){
                value[4]+=1;
            }
             //Count how many times for heals
            if (store[num]=='img/heal.jpg')
            {
                value[5]+=1;
            }
        }
        
        value[0] = pointOne;
        value[1] = pointTwo;
        value[2] = pointThree;

        if(playerCounter ==1){
            if(i==1){
                player2Total++;
                value[5]=0;
            }
            player2Total = player2Total +pointOne+pointThree+pointTwo; 
            player2Totalenergy= player2Totalenergy+value[3];
            if(value[4]>0 && i==0){
                    value[4]=0;
                }
            player1Health = player1Health -value[4];
            player2Health = player2Health + value[5];
            if (player2Health >=11)
            {
                player2Health=10;
            }
            $("#p2Points").html(player2Total); 
            $("#p2Energy").html(player2Totalenergy);
            $("#p2Health").html(player2Health);
            $("#p1Health").html(player1Health);
            playerCounter =0
            } else{
                if(i==1){
                    player1Total=player1Total+1;
                    value[5]=0;
                }
                player1Total = player1Total +pointOne+pointThree+pointTwo; 
                player1Totalenergy= player1Totalenergy+value[3];
                player1Health = player1Health+value[5];
                if(value[4]>0 && i==0){
                    value[4]=0;
                }

                player2Health = player2Health -value[4];
                if (player1Health >=11)
                {
                    player1Health=10;
                }
                $("#p1Points").html(player1Total); 
                $("#p1Energy").html(player1Totalenergy); 
                $("#p1Health").html(player1Health);
                $("#p2Health").html(player2Health);
                playerCounter++;
       }
    

        
    });
    
    $('#token1').draggable({
        revert: 'invalid'
    });
    $('#token2').draggable({
        revert: 'invalid'
    });
    $('#player1').droppable({
    drop: function (ev, ui) {
        $("#board").droppable('enable');
        i=0;
    }
        
    });
    $('#player2').droppable({
    drop: function (ev, ui) {
        $("#board").droppable('enable');
        i=0;
    }
    });

   $('#board').droppable({
    drop: function (ev, ui) {
         i=1;
         var dragId = ui.draggable.attr("id");
         if(dragId == "token1"){
             player1Total=player1Total+2;
             $("#p1Points").html(player1Total); 
         } else if(dragId == "token2"){
            player2Total=player2Total+2;
            $("#p2Points").html(player2Total);
         }
         $(this).droppable('disable');
         

    }
    });

    
}