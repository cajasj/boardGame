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
        var i=0;
        var k=0;
        var x;
        var y;
        var cardcounter=2;
        var turn;

        /*name of index for the array cards*/
        var buy=1;
        var points=2;
        var hp =3;
        var buffs=4
        var passives=5;
        var activationCost=6;
        var keep=7;
        var activation=8;
        var description=9;
        /*name of indexs for player array*/
        var pHealth=1;
        var pTotal=2;
        var pEnergy=3;
        /*end name of index */

        /*passivebuffs energy, points, damage*/
        var passivebuff1=[0,0,0];
        var passivebuff2=[0,0,0];
        /*end passive buff */

        
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
        var playEnerg;
        var playHealth;
        var playContain;
        var playOpponent;
        var playerDamage;
        /*end players stats*/
        var rand;
        var ranNum=[];
        var check;
        /*  0      1      2   3   4         5              6             7              8     */
        /*name|-energy|points|HP|buffs|passive energy|activation cost|keep/discard|activation|*/
        var cards=[
        ["TANKS",4,4,-3,0,0,0,"Discard",false,"+4 points -3 HP"],//0
        ["CORNER STORE",3,1,0,0,0,0,"Discard",false,"+1 point"],//1
        ["HERBIVORE",5,1,0,0,0,0,"Keep",false,"1 point per turn if didn't attack"],//2
        ["IT HAS A CHILD!",7,0,0,0,0,0,"Keep",false,"HP = 10 lose all points and card when HP = 0 "],//3
        ["DEATH FROM ABOVE!",5,2,0,0,0,0,"Discard",false,"+2 points and go to Tokyo"],//4
        ["URBAVORE",4,1,0,1,0,0,"Keep",false,"+1 point and damge in tokyo"],//5
        ["FRIEND OF CHILDREN",3,0,0,0,1,0,"Keep",false,"+1 energy when rolling energy"],//6
        ["STRETCHY",3,0,0,0,0,-2,"Keep",true,"-2 energy to change 1 result "],//7
        ["PLOT TWIST",3,0,0,0,0,0,"Keep",true,"change result of any die discard when used"],//8
        ["CAMOUFLAGE",3,0,0,0,0,0,"Keep",false,"for each damage point roll heart(s) to nullify "],//9
        ["JET FIGHTER",5,5,-4,0,0,0,"Discard",false,"+5 points -4 health"]//10
        ];
        /*player health point energy*/
        var players=[
        [1,5,0,50,0],
        [2,5,0,50,0]
        ];
        var dice = $('.die').map(function () {
            return $(this).attr('src')
        }).get();
        ranNum[1]=Math.floor((Math.random() * cards.length));
        $("#slot1").html(Cards.find({id:ranNum[1]})); 
        console.log(ranNum[1]);
        $("#buy1").html(cards[ranNum[1]][buy]); 
        $("#keep1").html(cards[ranNum[1]][keep]);
        $("#description1").html(cards[ranNum[1]][description]);

        ranNum[2]=Math.floor((Math.random() * cards.length));
        while(ranNum[2]==ranNum[1]){
            ranNum[2]=Math.floor((Math.random() * cards.length));
        }
        $("#slot2").html(cards[ranNum[2]][0]); 
        $("#buy2").html(cards[ranNum[2]][buy]); 
        $("#keep2").html(cards[ranNum[2]][keep]);
        $("#description2").html(cards[ranNum[2]][description]);

        ranNum[3]=Math.floor((Math.random() * cards.length));
         while(ranNum[3]==ranNum[1]||ranNum[3]==ranNum[2]){
            ranNum[3]=Math.floor((Math.random() * cards.length));
        }
        $("#slot3").html(cards[ranNum[3]][0]);
        $("#buy3").html(cards[ranNum[3]][buy]);
        $("#keep3").html(cards[ranNum[3]][keep]);
        $("#description3").html(cards[ranNum[3]][description]);
        console.log("random ",ranNum);
        (function( $ ){
           $.fn.dealCards = function() {
                ranNum[check];
                players[playerCounter][pHealth]=players[playerCounter][pHealth]+cards[ranNum[check]][hp];
                players[playerCounter][pEnergy]=players[playerCounter][pEnergy]-cards[ranNum[check]][buy];
                players[playerCounter][pTotal]=players[playerCounter][pTotal]+cards[ranNum[check]][points];

                if(players[playerCounter][pHealth]>10){
                    players[playerCounter][pHealth]=10;
                }

                playPoint.html(players[playerCounter][pTotal]); 
                playEnerg.html(players[playerCounter][pEnergy]); 
                playHealth.html(players[playerCounter][pHealth]);
                if(cards[ranNum[check]][keep]=='Keep'){
                    slotNum.clone().appendTo(playContain);
                    buyNum.clone().appendTo(playContain);
                    keepNum.clone().appendTo(playContain);
                    descNum.clone().appendTo(playContain);
                }
                console.log("ranNum x", ranNum[x]);
                console.log("before splice x y",ranNum);
                cards.splice(ranNum[check],1);
                var z;

                if(ranNum[check]<= ranNum[x]){
                    z = check;
                    x--;
                    console.log("")
                    if(x==check){
                        x++;
                    }
                    
                    ranNum[x];
                    console.log("ranNum x", ranNum[x]);
                }

                if(ranNum[check]<=ranNum[y]){
                    y--;
                    ranNum[y];
                     console.log("ranNum y", ranNum[y]);
                }
                console.log("check x y",ranNum);
                ranNum[check]=Math.floor((Math.random() * cards.length));
                
                if(ranNum[check]==ranNum[x]|| ranNum[check]==ranNum[y]){
                        ranNum[check]=Math.floor((Math.random() * cards.length));
                        console.log("loop");
                    }
                if (cards.length<=2){
                    cards=[
                        ["TANKS",4,4,-3,0,0,0,"Discard",false,"+4 points -3 HP",1],//0
                        ["CORNER STORE",3,1,0,0,0,0,"Discard",false,"+1 point",2],//1
                        ["HERBIVORE",5,1,0,0,0,0,"Keep",false,"1 point per turn if didn't attack",3],//2
                        ["IT HAS A CHILD!",7,0,0,0,0,0,"Keep",false,"HP = 10 lose all points and card when HP = 0 ",4],//3
                        ["DEATH FROM ABOVE!",5,2,0,0,0,0,"Discard",false,"+2 points and go to Tokyo",5],//4
                        ["URBAVORE",4,1,0,1,0,0,"Keep",false,"+1 point and damge in tokyo",6],//5
                        ["FRIEND OF CHILDREN",3,0,0,0,1,0,"Keep",false,"+1 energy when rolling energy",7],//6
                        ["STRETCHY",3,0,0,0,0,-2,"Keep",true,"-2 energy to change 1 result ",8],//7
                        ["PLOT TWIST",3,0,0,0,0,0,"Keep",true,"change result of any die discard when used",9],//8
                        ["CAMOUFLAGE",3,0,0,0,0,0,"Keep",false,"for each damage point roll heart(s) to nullify ",10],//9
                        ["JET FIGHTER",5,5,-4,0,0,0,"Discard",false,"+5 points -4 health",11]//10
                        ];
                }else{
                    slotNum.html(cards[ranNum[check]][0]);
                    console.log(cards[ranNum[check]][0])
                    buyNum.html(cards[ranNum[check]][buy]);
                    keepNum.html(cards[ranNum[check]][keep]);
                    descNum.html(cards[ranNum[check]][description]);
                }
                console.log("after splice x y",ranNum);
            }
        })( jQuery );


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
                playEnerg.html(players[playerCounter][pEnergy]); 
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

        $("#slot1").dblclick(function(){
            slotNum= $("#slot1");
            buyNum=$("#buy1");
            keepNum=$("#keep1");
            descNum=$("#description1");
            check=1;
            x=2;
            y=3;
            if(playerCounter == 0){
                playPoint=$("#p1Points");
                playEnerg=$("#p1Energy");
                playHealth=$("#p1Health");
                playContain=$("#cardContainer1");
            }else{
                playPoint=$("#p2Points"),
                playEnerg=$("#p2Energy"),
                playHealth=$("#p2Health"),
                playContain=$("#cardContainer2")
                
            }

            slotNum.dealCards();
        });
        $("#slot2").dblclick(function(){
            slotNum= $("#slot2");
            buyNum=$("#buy2");
            keepNum=$("#keep2");
            descNum=$("#description2");
            check=2;
            x=1;
            y=3;
            if(playerCounter == 0){
                playPoint=$("#p1Points");
                playEnerg=$("#p1Energy");
                playHealth=$("#p1Health");
                playContain=$("#cardContainer1");
            }else{
                playPoint=$("#p2Points"),
                playEnerg=$("#p2Energy"),
                playHealth=$("#p2Health"),
                playContain=$("#cardContainer2")
                
            }

            slotNum.dealCards();
        });
        $("#slot3").dblclick(function(){
            slotNum= $("#slot3");
            buyNum=$("#buy3");
            keepNum=$("#keep3");
            descNum=$("#description3");
            check =3;
            x=1;
            y=2;
            if(playerCounter == 0){
                playPoint=$("#p1Points");
                playEnerg=$("#p1Energy");
                playHealth=$("#p1Health");
                playContain=$("#cardContainer1");
            }else{
                playPoint=$("#p2Points"),
                playEnerg=$("#p2Energy"),
                playHealth=$("#p2Health"),
                playContain=$("#cardContainer2")
                
            }

            slotNum.dealCards();
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
                    playEnerg=$("#p1Energy");
                    playHealth=$("#p1Health");
                    playContain=$("#cardContainer1");
                    playOpponent=$("#p2Health");
                    turn=2;
                }else{
                    playPoint=$("#p2Points"),
                    playEnerg=$("#p2Energy"),
                    playHealth=$("#p2Health"),
                    playContain=$("#cardContainer2");
                    playOpponent=$("#p1Health");
                    turn=1;
                }
                playPoint.diceResult();
                console.log(counter);
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
                console.log(players[0][pTotal]);
                players[0][pTotal]=players[0][pTotal]+2;
                $("#p1Points").html(players[0][pTotal]); 
             } else if(dragId == "token2"){
                k=1;
                console.log(players[1][pTotal]);
                players[1][pTotal]=players[1][pTotal]+2;
                $("#p2Points").html(players[1][pTotal]);
             }
             $(this).droppable('disable');
        }
        });
    }
}