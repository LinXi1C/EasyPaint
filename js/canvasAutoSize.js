var CanvasAutoResize = {
    draw: function() {
    var ctx = document.getElementById('myCanvas').getContext('2d');
    var canvasContainer = document.getElementById('container');

    ctx.canvas.width  = canvasContainer.offsetWidth-35;
    ctx.canvas.height = window.screen.availHeight-210;
    },

    initialize: function(){
        var self = CanvasAutoResize;
        self.draw();
        $(window).on('resize', function(event){
        self.draw();
    });
    }
}

$(function(argument) {
    CanvasAutoResize.initialize();
});
