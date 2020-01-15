var p1p = (function () {
    var pub = {};
    pub.playerPlays = function (selected, e) {
        $(e).remove();
        var cardLocation = selected;
        $("#deck").html("<img src='images/" + cardLocation + ".jpg' alt='" + cardLocation + "'>");
        played.inPlay.push(cardLocation);
        cardOperations.playerHelp(cardLocation);
        return true;
    };
    return pub;
})();
