var CanvasAutoResize = {
    draw: function() {
    var ctx = document.getElementById('myCanvas').getContext('2d');
    var canvasContainer = document.getElementById('CanvasContainer');
    ctx.canvas.width  = canvasContainer.offsetWidth-40;
    ctx.canvas.height = canvasContainer.offsetHeight-2;
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
