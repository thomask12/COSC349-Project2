var playGame = (function () {
    var pub = {};

    pub.gameOn = function () {
        cp.computerStart();
        $("#avail").on("click", ".pick", function () {
            pickingCard.pick(this);
        });
    };
    return pub;
})();