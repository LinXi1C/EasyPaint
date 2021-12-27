var CanvasAutoResize = {
    draw: function() {
    var ctx = document.getElementById('myCanvas').getContext('2d');
    var canvasContainer = document.getElementById('DrawContainer');

    ctx.canvas.width  = canvasContainer.offsetWidth-30;
    ctx.canvas.height = window.screen.availHeight-210;

    },

    initialize: function(){
        var self = CanvasAutoResize;
        self.draw();
    //     $(window).on('resize', function(event){
    //     self.draw();
    // });
    }
}

$(function(argument) {
    CanvasAutoResize.initialize();
});

var CanvasAutoResize2 = {
    draw: function() {
        var ctx = document.getElementById('graph').getContext('2d');
        var canvasContainer = document.getElementById('FuncContainer');

        ctx.canvas.width  = canvasContainer.offsetWidth-34;
        ctx.canvas.height = window.screen.availHeight-220;

    },

    initialize: function(){
        var self = CanvasAutoResize2;
        self.draw();
        // $(window).on('resize', function(event){
        //     self.draw();
        // });
    }
}

$(function(argument) {
    CanvasAutoResize2.initialize();
});
