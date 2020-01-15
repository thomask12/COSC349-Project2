var cp = (function () {
    var pub = {};

    pub.computerStart = function() {
        for (var i = 0; i < computer.hand.length; i += 1) {
            if (computer.hand[i].charAt(0) === "3") {
                played.inPlay.push(computer.hand[i]);
                $("#deck").html("<img src='images/" + computer.hand[i] + ".jpg' alt='" + computer.hand[i] + "'>");
                computer.hand.splice(i, 1);
                var compCard = Math.floor(Math.random() * (deck.length - 1));
                computer.hand.push(deck[compCard]);
                deck.splice(compCard, 1);
                break;
            }
        }
        displayAlerts.beginGame();
    };

    pub.computerPlay = function () {
        //computer picks up cards
        cardOperations.computerHelp();
        if(computer.hand.length === 0 && computer.top.length < 3 && computer.under.length === 0){
            alert("Computer has won the game");
        }
        return true;
    };
    return pub;
})();