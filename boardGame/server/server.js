Cards = new Mongo.Collection('card');

	/* 0   1      2      3       4   5      6                   7              8   			9 */
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
for(var row=0; row<cards.length; row++){
    Cards.insert({
        id: cards[row][0],
        names: cards[row][1],
        cost: cards[row][2],
        points: cards[row][3],
        hp: cards[row][4],
        buffs: cards[row][5],
        activation: cards[row][6],
        placement: cards[row][7],
        active: cards[row][8],
        descriptions: cards[row][9],
        url: cards[row][10]
    })
}
var draw=[];
var numberGen=[];
numberGen[1]=Math.floor((Math.random() * cards.length));
numberGen[2]=Math.floor((Math.random() * cards.length));
numberGen[3]=Math.floor((Math.random() * cards.length));
draw[1]=Cards.findOne({id:numberGen[1]});
draw[2]=Cards.findOne({id:numberGen[2]});
draw[3]=Cards.findOne({id:numberGen[3]});