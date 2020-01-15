var cardOperations = (function () {
    var pub = {};

    //Function to pick up cards if a player cannot play again
    pub.pickUp = function (player) {
        if (played.inPlay[0].charAt(0) === "0") {
            played.inPlay.splice(0, 1);
        }
        player.hand = player.hand.concat(played.inPlay);
        if (player === player1) {
            for (var i = 0; i < played.inPlay.length; i += 1) {
                $("#avail").append("<li class='pick'><img src='images/" + player1.hand[((player1.hand.length - 1) - i)] + ".jpg' class='" + player1.hand[((player1.hand.length - 1) - i)] + "' alt='" + player1.hand[((player1.hand.length - 1) - i)] + "'></li>");
            }
        } else {
            $("#deck").html("<img src='images/deck.jpg' alt='deck'>");
        }
        //Resets inPlay so that a player can play again after the other picks up
        played.inPlay = ["0"];
    };

    //Checks whether a move is made playing a 2 and a 10
    pub.twoAndten = function (place, card) {
        $(place).remove();
        var playedNumber = card.charAt(0);
        //Resets base card if 2 is played
        if (playedNumber === "2") {
            played.inPlay.push(card);
            cardOperations.checkEnd(player1);
            $("#deck").html("<img src='images/" + card + ".jpg' alt='" + card + "'>");
            cardOperations.playerHelp(card);
        }
        //Clears cards if 10 is played
        if (playedNumber === "1") {
            cardOperations.checkEnd(player1);
            $("#deck").html("<img src='images/deck.jpg' alt='deck'>");
            played.inPlay = ["0"];
            cardOperations.playerHelp(card);
        }
    };

    //Returns the number of a certain @card that exists in @player.hand
    pub.multiCard = function (player, card) {
        //checks whether certain card appears more that once
        var cardCount = 0;
        for (var i = 0; i < player.hand.length; i += 1) {
            if (player.hand[i].charAt(0) === card) {
                cardCount += 1;
            }
        }
        return cardCount;
    };

    //Prompts the user to select the number of cards they want to play if more than 1 exists
    pub.playerMulti = function (multi, cardLocation) {
        if (multi > 1) {
            var userInput = 100;
            while (userInput > multi && userInput !== 0) {
                userInput = prompt("How many " + cardLocation.charAt(0) + "'s would you like to play?", multi);
            }
            var j = 1;
            while (j < userInput) {
                for (var i = 0; i < player1.hand.length; i += 1) {
                    if (player1.hand[i].charAt(0) === cardLocation.charAt(0) && player1.hand[i] !== cardLocation) {
                        var removeCard = player1.hand[i];
                        player1.hand.splice(i, 1);
                        $("#avail").find("." + removeCard + "").remove();
                        j += 1;
                    }
                }
            }
        }
    };

    //Pushes players card to inPlay and adds a new card to their hand
    pub.playerHelp = function (card) {
        cardOperations.pickEnd(player1);
        if (deck.length > 0) {
            for (var i = 0; i < player1.hand.length; i += 1) {
                if (card === player1.hand[i]) {
                    player1.hand.splice(i, 1);
                    while (player1.hand.length < 3) {
                        var compCard = Math.floor(Math.random() * (deck.length - 1));
                        player1.hand.push(deck[compCard]);
                        deck.splice(compCard, 1);
                        $("#avail").append("<li class='pick'><img class='" + player1.hand[player1.hand.length - 1] + "' src='images/" + player1.hand[player1.hand.length - 1] + ".jpg' alt='" + player1.hand[player1.hand.length - 1] + "'></li>");
                    }
                }
            }
        } else {
            for (var i = 0; i < player1.hand.length; i += 1) {
                if (card === player1.hand[i]) {
                    player1.hand.splice(i, 1);
                }
            }
        }
        cardOperations.pickTop(player1);
        cardOperations.pickEnd(player1);
        cardOperations.checkEnd(player1);
    };

    //Lots of convoluted logic to debug here, consider shortening it and redoing to order
    pub.computerHelp = function () {
        if(cardOperations.pickEnd(computer)){
            computer.hand = computer.under[0];
            computer.under.splice(0, 1);
        }
        if (determineCards.lowestCard(computer) === 100) {
            displayAlerts.picksUp(computer);
            cardOperations.pickUp(computer);
        } else {
            var computerCard = computer.hand[determineCards.lowestCard(computer)];
            if (computerCard.charAt(0) === "2" || computerCard.charAt(0) === "1") {
                var toRemove = determineCards.lowestCard(computer);
                computerCard = computer.hand[toRemove];
                if (computerCard.charAt(0) === "2") {
                    played.inPlay.push(computerCard);
                } else {
                    played.inPlay = ["0"];
                }
                displayAlerts.twoOrten(computerCard);
                computer.hand.splice(toRemove, 1);
                if(cardOperations.pickEnd(computer)){
                    computer.hand = computer.under[0];
                    computer.under.splice(0, 1);
                }
            }
            if (deck.length > 0) {
                //Adds cards to hand while there are cards left in the deck
                while (computer.hand.length < 3 && deck.length > 0) {
                    var compCard = Math.floor(Math.random() * (deck.length - 1));
                    computer.hand.push(deck[compCard]);
                    deck.splice(compCard, 1);
                }
            }
            cardOperations.pickTop(computer);
            var multi = cardOperations.multiCard(computer, computer.hand[determineCards.lowestCard(computer)].charAt(0));
            if (multi > 1) {
                setInterval(displayAlerts.multiplePlayed(multi, computer.hand[determineCards.lowestCard(computer)]), 500);
            }
            $("#deck").html("<img src='images/" + computer.hand[determineCards.lowestCard(computer)] + ".jpg' " +
                "alt='" + computer.hand[determineCards.lowestCard(computer)] + "'>");
            for (var i = 0; i < multi; i += 1) {
                var deleteCard = computer.hand[determineCards.lowestCard(computer)];
                var deleteSpot = determineCards.lowestCard(computer);
                played.inPlay.push(deleteCard);
                console.log("inPlay: " + played.inPlay + " computer hand: " + computer.hand + " delete spot: " + deleteSpot + " computer length: " + computer.hand.length);
                if(computer.hand.length > 1){
                    computer.hand.splice(deleteSpot, 1);
                }
                else{
                    computer.hand.pop();
                    alert("pop");
                }
            }
            cardOperations.pickTop(computer);
        }
        cardOperations.checkEnd(computer);
    };

    pub.pickTop = function (player) {
        if (player.hand.length === 0 && player.top.length > 1) {
            player.hand = player.top;
            player.top = ["0"];
            if (player === player1) {
                $("#one").html("<li><img src='images/deck.jpg' alt='deck'></li>" +
                    "<li><img src='images/deck.jpg' alt='deck'></li>" +
                    "<li><img src='images/deck.jpg' alt='deck'></li>");
                $("#avail").html("<li class='pick'><img class='" + player1.hand[0] + "' src='images/" + player1.hand[0] + ".jpg' alt='" + player1.hand[0] + "'></li>" +
                    "<li class='pick'><img class='" + player1.hand[1] + "' src='images/" + player1.hand[1] + ".jpg' alt='" + player1.hand[1] + "'></li>" +
                    "<li class='pick'><img class='" + player1.hand[2] + "' src='images/" + player1.hand[2] + ".jpg' alt='" + player1.hand[2] + "'></li>");
            }
            else{
                $("#two").html("<li><img src='images/deck.jpg' alt='deck'></li>" +
                    "<li><img src='images/deck.jpg' alt='deck'></li>" +
                    "<li><img src='images/deck.jpg' alt='deck'></li>");
            }
        }
    };

    pub.pickEnd = function (player) {
        if(player.hand.length === 0 && player.top.length === 1 && player.under.length > 1){
            alert(player.constructor.name + " has entered endgame");
            if(player === player1){
                alert("Select one top card");
                $("#one").on("click", "img", function () {
                    var card = $(this).find("img").attr("class");
                    alert("selected card: " + card);
                    player1.hand.push(card);
                    pickingCard.pick(this);
                });
            }
            return true;
        }

    };

    //At the end, sends data to database
    pub.checkEnd = function (player) {
        if (player.hand.length < 1 && player.top.length <= 1 && player.under.length <= 1) {
            alert(player.constructor.name + " won the game!");
            return true;
        }
        return false;
    };
    return pub;
})();