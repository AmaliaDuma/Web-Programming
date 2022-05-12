const contextPath = document.querySelector("script").getAttribute("contextPath");
console.log(contextPath)

const puzzleUrl = '/puzzle';

$(document).ready(function(){
    $('.piece').click(function() {
        let id = $(this).attr("id");

        $.ajax({
            url: puzzleUrl,
            type: "PUT",
            data: {
                "id1": id,
            },
            success: function() {
                window.location = window.location.pathname;
            }
        });

    });

});