var saveMoves = (function () {

    var pub = {};
    //Saves information of player moves to be processed later
    //Needs to save cards played as well as players initial hand, the point total, and move number
    pub.save = function (before, play, after) {
        $.ajax({
            data: {before: JSON.stringify(before), play: JSON.stringify(play), after: JSON.stringify(after)},
            url: "insertData.php",
            method: "POST",
            success: function (data) {

            },
            error: function () {
                alert("Ajax Failed");
            }
        });
    };

    return pub;
})();