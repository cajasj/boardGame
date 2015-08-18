if (Meteor.isClient) {
    /*Template.boardGame.events({
        'click #roll' : function() {
            Meteor.call('diceRoll');

        }
    });*/

    Template.boardGame.rendered = function(){
        /*Miscellenous*/
        var counter =0;        
        var hillCounter=0;
        var i;
        var k=0;
        var x;
        var y;
        var cardcounter=2;
        var turn;

        /*name of index for the array cards*/
        var buy=2;
        var points=3;
        var hp =4;
        var buffs=5;
        var activationCost=6;
        var keep=7;
        var activation=8;
        var description=9;
        /*name of indexs for player array*/
        var pHealth=1;
        var pTotal=2;
        var pEnergy=3;
        /*end name of index */


        
        var childFlag1=0;
        var herbFlag1=0;

        var counter =0;
        var playerCounter=0;
        /*Dice Results varaiable*/
        var pointOne=0;
        var pointTwo=0;
        var pointThree=0
        var store=[];
        var overflow=3;
        var value=[0,0,0,0,0,0];
        var names=[ "one","two","three","energy","hit","heal"];
        /*End dice results*/

        /*Holds cards stat ID*/
        var slotNum;
        var buyNum;
        var keepNum;
        var descNum;
        var curNum=0;
        /*End card stats*/
        
        /*holds player stats ID*/
        var playPoint;
        var playEnergy;
        var playHealth;
        var playContain;
        var playOpponent;
        var playerDamage;
        /*end players stats*/
        var ranNum;
        var ranNumArray=[];
        var arrayLength;
        var currIndex;
        var indexSearch;
        var cardcheck1;
        var cardcheck2;
        var nextCard=2;
    /* 0   1      2      3       4   5      6                   7              8             9 */
    /*id|name|-energy|points|Health|buffs|activation cost|keep/discard|activation|description*/
        var cards=[
            [1,"TANKS",4,4,-3,false,0,"Discard",false,"+4 points -3 HP", "public/img/cards/tanks.jpg"],//0 
            [2,"CORNER STORE",3,1,0,false,0,"Discard",false,"+1 point","public/img/cards/cornerStore.png"],//1
            [3,"HERBIVORE",5,1,0,false,0,"Keep",false,"1 point per turn if didn't attack","public/img/cards/herbivore.png"],//2
            [4,"IT HAS A CHILD!",7,0,0,false,0,"Keep",false,"HP = 10 lose all points and card when HP = 0 ", "public/img/cards/herbivore.png"],//3
            [5,"DEATH FROM ABOVE!",5,2,0,false,0,"Discard",false,"+2 points and go to Tokyo", "public/img/cards/deathFromAbove.jpg"],//4
            [6,"URBAVORE",4,1,0,true,0,"Keep",false,"+1 point and damge in tokyo", "public/img/cards/urbavore.jpg"],//5
            [7,"FRIEND OF CHILDREN",3,0,0,true,0,"Keep",false,"+1 energy when rolling energy", "public/img/cards/friendOfChildren.jpg"],//6
            [8,"STRETCHY",3,0,0,false,-2,"Keep",true,"-2 energy to change 1 result ", "public/img/cards/stretchy.jpg"],//7
            [9,"PLOT TWIST",3,0,0,false,0,"Keep",true,"change result of any die discard when used", "public/img/cards/plotTwist.jpg"],//8
            [10,"CAMOUFLAGE",3,0,0,false,0,"Keep",false,"for each damage point roll heart(s) to nullify ", "public/img/cards/camouflage.png"],//9
            [11,"JET FIGHTER",5,5,-4,false,0,"Discard",false,"+5 points -4 health", "public/img/cards/jetFighter.jpg"]//10
        ];
        var cardNameList=[
            "TANKS",
            "CORNER STORE",
            "HERBIVORE",
            "IT HAS A CHILD!",
            "DEATH FROM ABOVE!",
            "URBAVORE",
            "FRIEND OF CHILDREN",
            "STRETCHY",
            "PLOT TWIST",
            "CAMOUFLAGE",
            "JET FIGHTER"
            ]
        cardNameList.sort(function() {
        return 0.5 - Math.random()
        }) 
        console.log("card list", cardNameList);
           
        /*player health point energy*/
        var players=[
        [1,5,0,50,0],
        [2,5,0,50,0]
        ];
        var dice = $('.die').map(function () {
            return $(this).attr('src')
        }).get();



        $("#slot1").html(cardNameList[0]); 
        for (i=0; i<cardNameList.length; i++){
            if(cardNameList[0]==cards[i][1]){
                break;
            }
        }
        $("#buy1").html(cards[i][buy]); 
        $("#keep1").html(cards[i][keep]);
        $("#description1").html(cards[i][description]);

        $("#slot2").html(cardNameList[1]);
        for (i=0; i<cardNameList.length; i++){
            if(cardNameList[1]==cards[i][1]){
                break;
            }
        }
        $("#buy2").html(cards[i][buy]); 
        $("#keep2").html(cards[i][keep]);
        $("#description2").html(cards[i][description]);
        
        $("#slot3").html(cardNameList[2]);
        for (i=0; i<cardNameList.length; i++){
            if(cardNameList[2]==cards[i][1]){
                break;
            }
        }
        $("#buy3").html(cards[i][buy]);
        $("#keep3").html(cards[i][keep]);
        $("#description3").html(cards[i][description]);
        // so you wont forget make 2D array for all keep card set it as false
        (function( $ ){
            $.fn.playerTurn = function(){
                if(playerCounter == 0){
                    playPoint=$("#p1Points");
                    playEnergy=$("#p1Energy");
                    playHealth=$("#p1Health");
                    playContain=$("#cardContainer1");
                }else{
                    playPoint=$("#p2Points"),
                    playEnergy=$("#p2Energy"),
                    playHealth=$("#p2Health"),
                    playContain=$("#cardContainer2")
                }
            }
        })( jQuery );
        (function( $ ){
           $.fn.dealCards = function() {
               /* console.log("this is currIndex", currIndex);*/
                for (i=0; i<cardNameList.length; i++){
                    if(cardNameList[currIndex]==cards[i][1]){
                        
                        break;
                    }
                    ///session varaible
                }

                players[playerCounter][pHealth]+=cards[i][hp];
                players[playerCounter][pEnergy]-=cards[i][buy];
                players[playerCounter][pTotal]+=cards[i][points];
               

                if(players[playerCounter][pHealth]>10){
                    players[playerCounter][pHealth]=10;
                }
                
                playPoint.html(players[playerCounter][pTotal]); 
                playEnergy.html(players[playerCounter][pEnergy]); 
                playHealth.html(players[playerCounter][pHealth]);
                nextCard++;
                cardNameList[nextCard];
              
                if(nextCard >= cardNameList.length){ 
                    cardNameList.sort(function() {
                        return 0.5 - Math.random()
                    }) 
                    console.log("card list vanilla", cardNameList);
                    for (i=0; i<cardNameList.length; i++){
                        
                        if(cardNameList[i]==cardcheck1){
                            cardNameList.splice(i,1);
                            console.log("splice check1", cardNameList);
                        }
                        if(cardNameList[i]==cardcheck2){
                            cardNameList.splice(i,1);
                            console.log("splice check2", cardNameList);
                        }
                    }
                    cardNameList.unshift(cardcheck1,cardcheck2);
                    nextCard=2
                    $('#cardIndex2').html(0);
                    $('#cardIndex3').html(1);
                    console.log("card list", cardNameList);
                }

                console.log("next card outside of if",nextCard);
                for (i=0; i<cardNameList.length; i++){
                    if(cardNameList[nextCard]==cards[i][1]){
                        break;
                    }
                }
                slotNum.html(cardNameList[nextCard]);
                /*console.log("next card is", cardNameList[nextCard]);*/
                buyNum.html(cards[i][buy]);
                keepNum.html(cards[i][keep]);
                descNum.html(cards[i][description]);
                cardNum.html(nextCard);
            }
        })( jQuery );

        $("#slot1").dblclick(function(){
            slotNum= $("#slot1");
            buyNum=$("#buy1");
            keepNum=$("#keep1");
            descNum=$("#description1");
            cardNum=$('#cardIndex1');
            currIndex= parseInt($('#cardIndex1').text(),10);
            cardcheck1 = $('#slot2').text();
            cardcheck2 = $('#slot3').text();

           
            cardNum.playerTurn();
            cardNum.dealCards();
        });

        $("#slot2").dblclick(function(){
            slotNum= $("#slot2");
            buyNum=$("#buy2");
            keepNum=$("#keep2");
            descNum=$("#description2");
            cardNum=$('#cardIndex2');
            currIndex=parseInt($('#cardIndex2').text(),10);
            cardcheck1 = $('#slot1').text();
            cardcheck2 = $('#slot3').text();

            cardNum.playerTurn();
            cardNum.dealCards();
        });

        $("#slot3").dblclick(function(){
            slotNum= $("#slot3");
            buyNum=$("#buy3");
            keepNum=$("#keep3");
            descNum=$("#description3");
            cardNum=$('#cardIndex3');
            cardcheck1 = $('#slot1').text();
            cardcheck2 = $('#slot3').text();

            currIndex=parseInt($('#cardIndex3').text(),10);

            cardNum.playerTurn();
            cardNum.dealCards();
        });


        (function( $ ){
           $.fn.diceResult = function() {
                if(playerCounter==0){
                    playerDamage = 1
                }else{
                    playerDamage=0;
                }
                if(value[4]>0 && i==0 && k==0){
                    value[4]=0;
                }
                if(k==1){
                    players[playerCounter][pTotal]++;
                    value[5]=0;
                }
                if(i==1){
                    players[playerCounter][pTotal]+1;
                    value[5]=0;
                }

                players[playerCounter][pHealth]=players[playerCounter][pHealth]+value[5];
                players[playerCounter][pTotal]=players[playerCounter][pTotal]+pointOne+pointTwo+pointThree;
                players[playerCounter][pEnergy]=players[playerCounter][pEnergy]+value[3];
                players[playerDamage][pHealth]=players[playerDamage][pHealth]-value[4];
                if(players[playerCounter][pHealth]>10){
                    players[playerCounter][pHealth]=10;
                }

                playPoint.html(players[playerCounter][pTotal]); 
                playEnergy.html(players[playerCounter][pEnergy]); 
                playHealth.html(players[playerCounter][pHealth]);
                playOpponent.html(players[playerDamage][pHealth]);
                if(playerCounter==0){
                    playerCounter=1;
                }else{
                    playerCounter=0;
                }
            }
        })( jQuery );
        (function( $ ){
           $.fn.reborn = function() {
                
           }
        })( jQuery );

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
            if(counter>0){
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
                /*Players get 1 point for remaining in Tokyo*/
                if(k==1){
                    players[playerCounter][pTotal]++;
                    value[5]=0;
                }
                if(i==1){
                    players[playerCounter][pTotal]=players[playerCounter][pTotal]+1;
                    value[5]=0;
                }
                /*end players points gain at start*/
                
                if(playerCounter == 0){
                    playPoint=$("#p1Points");
                    playEnergy=$("#p1Energy");
                    playHealth=$("#p1Health");
                    playContain=$("#cardContainer1");
                    playOpponent=$("#p2Health");
                    turn=2;
                }else{
                    playPoint=$("#p2Points"),
                    playEnergy=$("#p2Energy"),
                    playHealth=$("#p2Health"),
                    playContain=$("#cardContainer2");
                    playOpponent=$("#p1Health");
                    turn=1;
                }
                playPoint.diceResult();
                alert("player "+ turn+ " turn" );
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
            $("#dropCircle").droppable('enable');
            i=0;
        }
        });
        $('#player2').droppable({
        drop: function (ev, ui) {
            $("#dropCircle").droppable('enable');
            k=0;
        }
        });
       $('#dropCircle').droppable({
        drop: function (ev, ui) {
             
             var dragId = ui.draggable.attr("id");
             if(dragId == "token1"){
                i=1;
                players[0][pTotal]=players[0][pTotal]+2;
                $("#p1Points").html(players[0][pTotal]); 
             } else if(dragId == "token2"){
                k=1;
                players[1][pTotal]=players[1][pTotal]+2;
                $("#p2Points").html(players[1][pTotal]);
             }
             $(this).droppable('disable');
        }
        });
    }
}