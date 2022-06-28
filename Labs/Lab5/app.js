const addEvents = () => {
    $("#close-button").click(function (e) { 
        $("#container").css("display", "none");
        
    });

    $("#close-button").hover(function(){
        $("#close-button").css("background-color", "#E4DBE8");
    }, function(){
        $("#close-button").css("background-color", "#F1E7F5");
    })

    $("#dialog").bind("mousedown", mouse_down);

    function mouse_down(ev) { 
        ev.preventDefault();
        $(document).bind("mousemove", mouse_move);
    }

    function mouse_move(ev){
        var pX = ev.pageX;
        var pY = ev.pageY;
        if (pX > 1000 || pY > 500){
            return;
        }
        $("#dialog").css("left", pX + "px");
        $("#dialog").css("top", pY + "px");
        $(document).bind("mouseup", mouse_up);

    }

    function mouse_up() { 
        $(document).unbind();
    }

    $("#open-dialog-button").click(function (e) { 
        e.preventDefault();
        $("#container").css("display", "block");
    });

}


addEvents();
