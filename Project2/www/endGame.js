var endGame = (function () {

    var pub = {};

    pub.pickTop = function (player){
        if(player.hand.length === 0) {
            if(player.top.length !== 1){
                var temp = player.top;
                player.hand = temp;
                player.top = ["0"];
                if (player === player1) {
                    $("#one").html("<li class='first'><img src='images/deck.jpg' alt='deck'></li>" +
                        "<li class='second'><img src='images/deck.jpg' alt='deck'></li>" +
                        "<li class='third'><img src='images/deck.jpg' alt='deck'></li>");
                    $("#avail").html("<li class='pick'><img class='" + player1.hand[0] + "' src='images/" + player1.hand[0] + ".jpg' alt='" + player1.hand[0] + "'></li>" +
                        "<li class='pick'><img class='" + player1.hand[1] + "' src='images/" + player1.hand[1] + ".jpg' alt='" + player1.hand[1] + "'></li>" +
                        "<li class='pick'><img class='" + player1.hand[2] + "' src='images/" + player1.hand[2] + ".jpg' alt='" + player1.hand[2] + "'></li>");
                } else {
                    $("#two").html("<li class='first'><img src='images/deck.jpg' alt='deck'></li>" +
                        "<li class='second'><img src='images/deck.jpg' alt='deck'></li>" +
                        "<li class='third'><img src='images/deck.jpg' alt='deck'></li>");
                }
            }
            else{
                //Here flip over one card at a time until under is empty and player has a hand length of 0
            }
        }
    };

    return pub;
})();