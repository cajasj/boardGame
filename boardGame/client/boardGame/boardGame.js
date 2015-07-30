if (Meteor.isClient) {
    /*Template.boardGame.events({
        'click #roll' : function() {
            Meteor.call('diceRoll');

        }
    });*/
    
    Template.boardGame.rendered = function(){
        var counter =0;        
        var hillCounter=0;
        var i=0;
        var k=0;
        var x=0;
        var y=0;
        var z=0;
        var cardcounter=2;

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
        /*end name of index */

        /*passivebuffs energy, points, damage*/
        var passivebuff1=[0,0,0];
        var passivebuff2=[0,0,0];
        /*end passive buff */
        var card1=0;
        var curcard1=0;
        var store=[];
        var childFlag1=0;
        var herbFlag1=0;

        var counter =0;
        var playerCounter =0;
        var pointOne=0;
        var pointTwo=0;
        var pointThree=0
        var player1Total=0;

        var slotNum;
        var buyNum;
        var keepNum;
        var descNum;
        var cardNum;
        var curNum;

        var player1Totalenergy=50;
        var player1Health=1;
        var player2Total=0;
        var player2Health=1;
        var player2Totalenergy=50;
        var overflow=3;
        var value=[0,0,0,0,0,0];
        var names=[ "one","two","three","energy","hit","heal"];
        /*  0      1      2   3   4         5              6             7              8     */
        /*name|-energy|points|HP|buffs|passive energy|activation cost|keep/discard|activation|*/
        var cards=[
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
    
        var dice = $('.die').map(function () {
            return $(this).attr('src')
        }).get();
        $("#slot1").html(cards[0][0]); 
        $("#buy1").html(cards[0][buy]); 
        $("#keep1").html(cards[0][keep]);
        $("#description1").html(cards[0][description]);

        $("#slot2").html(cards[1][0]); 
        $("#buy2").html(cards[1][buy]); 
        $("#keep2").html(cards[1][keep]);
        $("#description2").html(cards[1][description]);

        $("#slot3").html(cards[2][0]);
        $("#buy3").html(cards[2][buy]);
        $("#keep3").html(cards[2][keep]);
        $("#description3").html(cards[2][description]);
        (function( $ ){
           $.fn.dealCards = function() {
              if(playerCounter==0){
                 if(player1Totalenergy>=cards[curNum][buy])
                    { 
                        
                        player1Totalenergy=player1Totalenergy-cards[curNum][buy];
                        player1Total=player1Total+cards[curNum][points];
                        player1Health=player1Health+cards[curNum][hp];
                        passivebuff1[0]=passivebuff1[0]+cards[curNum][passives];

                        $("#p1Points").html(player1Total); 
                        $("#p1Energy").html(player1Totalenergy); 
                        $("#p1Health").html(player1Health);
                        if(cards[curNum][keep]=='Keep'){
                            slotNum.clone().appendTo("#cardContainer1");
                            buyNum.clone().appendTo("#cardContainer1");
                            keepNum.clone().appendTo("#cardContainer1");
                            descNum.clone().appendTo("#cardContainer1");
                        }
                        cardcounter++;
                        curNum=cardcounter;
                        slotNum.html(cards[cardcounter][0]);
                        console.log(cards[cardcounter][0])
                        buyNum.html(cards[cardcounter][buy]);
                        keepNum.html(cards[cardcounter][keep]);
                        descNum.html(cards[cardcounter][description]);
                    }else{
                        alert("Your monster is suffering from performance issues don't worry it's only natural");
                    }
              }else{
                 if(player2Totalenergy>=cards[curcard1][buy])
                    {
                        player2Totalenergy=player2Totalenergy-cards[curcard1][buy];
                        player2Total=player2Total+cards[curcard1][points];
                        player2Health=player2Health+cards[curcard1][hp];
                        $("#p1Points").html(player1Total);                     
                        $("#p2Points").html(player2Total); 
                        $("#p2Energy").html(player2Totalenergy); 
                        $("#p2Health").html(player2Health);
                        if(cards[curNum][keep]=='Keep'){
                            slotNum.clone().appendTo("#cardContainer2");
                            buyNum.clone().appendTo("#cardContainer2");
                            keepNum.clone().appendTo("#cardContainer2");
                            descNum.clone().appendTo("#cardContainer2");
                        }
                        cardcounter++;
                        curNum=cardcounter;
                        slotNum.html(cards[cardcounter][0]);
                        buyNum.html(cards[cardcounter][buy]);
                        keepNum.html(cards[cardcounter][keep]);
                        descNum.html(cards[cardcounter][description]);
                    }else{
                        alert("Your monster is suffering from performance issues don't worry it's only natural");
                    }
              }

            }; 
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
            curNum=0;
            slotNum.dealCards();
        });
        $("#slot2").dblclick(function(){
            slotNum= $("#slot2");
            buyNum=$("#buy2");
            keepNum=$("#keep2");
            descNum=$("#description2");
            curNum=1;
            slotNum.dealCards();
        });
        $("#slot3").dblclick(function(){
            slotNum= $("#slot3");
            buyNum=$("#buy3");
            keepNum=$("#keep3");
            descNum=$("#description3");
            curNum=2;
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

                if(playerCounter ==1){
                    /*Player two get 1 point for remaining in Tokyo*/
                    if(k==1){
                        player2Total++;
                        value[5]=0;
                    }
                    /*End Tokyo point*/
                    player2Totalenergy= player2Totalenergy+value[3];

                    /*Adding Damage*/
                    if(value[4]>0 && i==0 && k!=1){
                        value[4]=0;
                    }
                    player1Health = player1Health -value[4];
                    /*End Damage*/

                    /*adding points*/
                    player2Total = player2Total +pointOne+pointThree+pointTwo;
                    if(value[4] ==0 && herbFlag1==1){
                        player2Total++;
                    }
                    /*end points*/

                    if (player1Health<=0){
                    /*    if("cardContainer1:contains('IT HAS A CHILD!')" ){
                            
                        }else{
                            }*/
                            alert("player 1 died");
                        
                    }else {
                        alert("player 1 turn");  
                    }
                    player2Health = player2Health + value[5];
                    if (player2Health >=11)
                    {
                        player2Health=10;
                    } 
                    
                    $("#p2Points").html(player2Total); 
                    $("#p2Energy").html(player2Totalenergy);
                    $("#p2Health").html(player2Health);
                    $("#p1Health").html(player1Health);
                    playerCounter =0;
                } else
                {
                    if(i==1){
                        player1Total=player1Total+1;
                        value[5]=0;
                    }
                    
                    player1Totalenergy= player1Totalenergy+value[3];
                    player1Health = player1Health+value[5];
                    /*damage*/
                    if(value[4]>0 && k==0 &&i!=1){
                        value[4]=0;
                    }
                    player2Health = player2Health -value[4];
                    /*end damage*/
                    
                    /*adding points*/
                    player1Total = player1Total +pointOne+pointThree+pointTwo;
                    if(value[4] ==0 && herbFlag1==1){
                        player1Total++;
                    } 
                    /*done with points*/
                    
                    if (player2Health<=0){
                        alert("player 2 died");
                    }else {
                        alert("player 2 turn");  
                    }
                    if (player1Health >=11)
                    {
                        player1Health=10;
                    }
                  
                    if(childFlag1 == 1){
                        player2Health=10;
                        alert("You have a child and you're litterally a dead beat dad!");
                        $("#cardContainer2").empty();
                        player2Total=0;
                        $("#p2Points").html(player2Total); 

                    }
                    $("#p1Points").html(player1Total); 
                    $("#p1Energy").html(player1Totalenergy); 
                    $("#p1Health").html(player1Health);
                    $("#p2Health").html(player2Health);
                    playerCounter++;  
                       
                }
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
            k=0;
        }
        });

       $('#board').droppable({
        drop: function (ev, ui) {
             
             var dragId = ui.draggable.attr("id");
             if(dragId == "token1"){
                i=1;
                player1Total=player1Total+2;
                $("#p1Points").html(player1Total); 
             } else if(dragId == "token2"){
                k=1;
                player2Total=player2Total+2;
                $("#p2Points").html(player2Total);
             }
             $(this).droppable('disable');
        }
        });
    }
}