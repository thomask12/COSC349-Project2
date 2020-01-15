var deck = [];
var player1 = {
    under: [],
    top: [],
    hand: []
};
var computer = {
    under: [],
    top: [],
    hand: []
};
var played = {
    inPlay: ["0"]
};
$(document).ready(function () {
    var cardNums = ["3", "4", "5", "6", "7", "8", "9", "J", "Q", "K", "A", "2", "10"];
    var suits = ["S", "H", "C", "D"];
    var f1 = 0;
    for (var i = 0; i < cardNums.length; i += 1) {
        for (var j = 0; j < suits.length; j += 1) {
            num = '' + cardNums[i];
            deck.push(num + suits[j]);
        }
    }
    $("#start").on("click", function () {
        $("#started").remove();
        $("#cards").css("display", "block");
        // deals 3 cards randomly to each player's "under-hand"
        for (var i = 0; i < 6; i += 1) {
            var startingCard = Math.floor(Math.random() * (deck.length - 1));
            if (i % 2 === 0) {
                player1.under.push(deck[startingCard]);
                $("#one").append("<li class='under" + i + "'><img class='" + deck[startingCard] + "' src='images/deck.jpg' alt='deck'></li>");
            } else {
                computer.under.push(deck[startingCard]);
            }
            deck.splice(startingCard, 1);
        }
        // deals 6 cards randomly into each player's beginning hand
        for (var i = 0; i < 12; i += 1) {
            var startingCard = Math.floor(Math.random() * (deck.length - 1));
            if (i % 2 === 0) {
                player1.hand.push(deck[startingCard]);
                $("#avail").append("<li class='pick'><img class='" + deck[startingCard] + "' src='images/" + deck[startingCard] + ".jpg' alt='" + deck[startingCard] + "'></li>");
            } else {
                computer.hand.push(deck[startingCard]);
            }
            deck.splice(startingCard, 1);
        }
        var max = [0, 0, 0];
        var index = [0, 0, 0];
        for (var j = 0; j < computer.hand.length; j += 1) {
            var cardVal = computer.hand[j].charAt(0);
            if (cardVal === "J") {
                cardVal = "11";
            }
            if (cardVal === "Q") {
                cardVal = "12";
            }
            if (cardVal === "K") {
                cardVal = "13";
            }
            if (cardVal === "A") {
                cardVal = "14";
            }
            if (cardVal === "2") {
                cardVal = "15";
            }
            if (cardVal === "1") {
                cardVal = "16";
            }
            if (parseInt(cardVal) > max[0]) {
                max[2] = max[1];
                index[2] = index[1];
                max[1] = max[0];
                index[1] = index[0];
                max[0] = parseInt(cardVal);
                index[0] = j;
            } else if (parseInt(cardVal) > max[1]) {
                max[2] = max[1];
                index[2] = index[1];
                max[1] = parseInt(cardVal);
                index[1] = j;
            } else if (parseInt(cardVal) > max[2]) {
                max[2] = parseInt(cardVal);
                index[2] = j;
            }
        }
        computer.top.push(computer.hand[index[0]]);
        computer.top.push(computer.hand[index[1]]);
        computer.top.push(computer.hand[index[2]]);
        for (var j = 0; j < 3; j += 1) {
            for (var i = 0; i < (6 - j); i += 1) {
                if (computer.hand[i] === computer.top[j]) {
                    computer.hand.splice(i, 1);
                    break;
                }
            }
        }
        // computers highest cards are picked and inserted into it's "top-hand"
        $("#two").append("<li class='pick'><img class='" + computer.top[0] + "' src='images/" + computer.top[0] + ".jpg' alt='" + computer.top[0] + "'></li>" +
            "<li class='pick'><img class='" + computer.top[1] + "' src='images/" + computer.top[1] + ".jpg' alt='" + computer.top[1] + "'></li>" +
            "<li class='pick'><img class='" + computer.top[2] + "' src='images/" + computer.top[2] + ".jpg' alt='" + computer.top[2] + "'></li>");

        $("#avail").on("click", ".pick", function () {
            if (f1 < 3) {
                var cards = $(this).find("img").attr("class");
                for (var i = 0; i < player1.hand.length; i += 1) {
                    if (cards === player1.hand[i]) {
                        player1.hand.splice(i, 1);
                    }
                }
                player1.top.push(cards);
                var card = $(this).html();
                $(this).remove();
                $(".under" + (f1*2)).html(card);
                f1 += 1;
            }
            if (f1 === 3) {
                $("#cards").prepend("<button id='ready'>Begin Game</button>");
                f1 += 1;
            }
        });
    });
    $("#cards").on("click", "#ready", function () {
        $("#secondPlayer").css("display", "block");
        for (var i = 0; i < 3; i += 1) {
            $("." + i + "").css("opacity", "0.5");
        }
        $("#ready").remove();
        $("#cards h3").remove();
        $("#deck").css("display", "block");
        //End of game setup
        //Game begins here
        playGame.gameOn();
    });
});
