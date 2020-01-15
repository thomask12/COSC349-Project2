var pickingCard = (function () {
    var pub = {};

    //Operations to continue the play of game after "startGame" is completed
    pub.pick = function(card){
        var cardLocation = $(card).find("img").attr("class");
        var possibleCard = determineCards.lowestCard(player1);
        var before = JSON.stringify(player1.hand);
        var play = JSON.stringify(played.inPlay);
        if(possibleCard === 100){
            displayAlerts.picksUp(player1);
            cardOperations.pickUp(player1);
            cp.computerPlay();
        }
        //Check that player1 doesn't play invalid cards while possessing valid cards
        else if (parseInt(determineCards.toNumber(player1.hand[possibleCard].charAt(0))) >
            parseInt(determineCards.toNumber(cardLocation.charAt(0)))
            && played.inPlay[played.inPlay.length - 1].charAt(0) !== "2") {
            alert("Select a different card");
        }
        else if(cardLocation.charAt(0) === "2" || cardLocation.charAt(0) === "1"){
            //Player selected 2 or 10
            cardOperations.twoAndten(card, cardLocation);
            alert("You can play another card");
        }
        else{
            //Checks if players hand contains many cards that can be played at once (excluding 2's and 10's as that's handled above)
            var multi = cardOperations.multiCard(player1, cardLocation.charAt(0));
            if(!cardOperations.pickEnd(player1)){
                cardOperations.playerMulti(multi, cardLocation);
            }
            p1p.playerPlays(cardLocation, card);
            cp.computerPlay();
        }
        var after = JSON.stringify(player1.hand);
        saveMoves.save(before, play, after);
    };
    pub.end = function (card) {

    };
    return pub;
})();