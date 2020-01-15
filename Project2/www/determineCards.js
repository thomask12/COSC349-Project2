var determineCards = (function (){
    var pub = {};

    pub.toNumber = function(val){
        switch (val) {
            case "J":
                val = "11";
                break;
            case "Q":
                val = "12";
                break;
            case "K":
                val = "13";
                break;
            case "A":
                val = "14";
                break;
            case "2":
                val = "14";
                break;
            case "1":
                val = "14";
                break;
        }
        return val;
    };

    pub.lowestCard = function(thing){
        var location = 100;
        var currentCard = played.inPlay[played.inPlay.length - 1].charAt(0);
        var highestLow = 20;
        var newCurrent = pub.toNumber(currentCard);
        var toTen = [];
        if(currentCard === "2"){
            for (var i = 0; i < thing.hand.length; i += 1) {
                if(thing.hand.length === 0){
                    alert(thing.constructor.name + " hand is empty");
                }
                var card = thing.hand[i].charAt(0);
                var newCard = pub.toNumber(card);
                //Returns location in the hand of the lowest possible card that can be played
                if (parseInt(newCard) <= highestLow) {
                    highestLow = parseInt(newCard);
                    location = i;
                }
            }
        }
        else {
            for (var i = 0; i < thing.hand.length; i += 1) {
                if(thing.hand.length === 0){
                    alert(thing.constructor.name + " hand is empty");
                }
                var card = thing.hand[i].charAt(0);
                var newCard = pub.toNumber(card);
                //Returns location in the hand of the lowest possible card that can be played
                if (parseInt(newCard) >= parseInt(newCurrent) && parseInt(newCard) <= highestLow) {
                    highestLow = parseInt(newCard);
                    location = i;
                }
                //Adds 2's and 10's to a separate list because they are "reset" cards
                else if (card === "2" || card === "1") {
                    toTen.push(i);
                }
            }
        }
        //Tell if there is a 2 or a 10 in the hand if there are no other cards to be played
        if(location === 100 && toTen.length !== 0){
            return toTen[0];
        } else{
            return location;
        }
    };
    return pub;
}());