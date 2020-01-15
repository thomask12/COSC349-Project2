var displayAlerts = (function () {
    var pub = {};

    pub.beginGame = function(){
        $("#pickMessage").html("Entered Game");
        $("#pickMessage").fadeIn(300).delay(1100).fadeOut(300);
    };
    pub.picksUp = function(thing){
        if(thing === computer){
            $("#pickMessage").html("Computer picks up");
            $("#pickMessage").css({"color": "#F2F1EF", "background-color": "#454872"});
        }
        else{
            $("#pickMessage").html("Player picks up");
            $("#pickMessage").css("background-color", "#D8910D");
        }
        $("#pickMessage").fadeIn(300).delay(1100).fadeOut(300);
    };

    pub.multiplePlayed = function(number, card){
        $("#pickMessage").html(number + " " + card.charAt(0) + "'s");
        $("#pickMessage").css("background-color", "#D8910D");
        $("#pickMessage").fadeIn(300).delay(1100).fadeOut(300);
    };

    pub.twoOrten = function(card){
        alert("Reset with " + card);
        $("#pickMessage").html("Reset with " + card);
        $("#pickMessage").css("background-color", "#D8910D");
        $("#pickMessage").fadeIn(300).delay(1100).fadeOut(300);
    }

    return pub;
})();