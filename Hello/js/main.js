///<reference path='phaser.d.ts'/>
var PhaserModule = Phaser;

var Hello = (function () {
    function Hello() {
        // state points to our implementation of functions needed by Phaser.
        var state = new PhaserModule.State();
        state.preload = this.preload;
        state.create = this.create;
        state.update = this.update;

        // Create a new game 640x480 pixels canvas. The third parameter is the
        // DOM parent in html page and the last two are booleans for flags for
        // transparent background in canvas and antialias.
        game = new PhaserModule.Game(640, 480, Phaser.CANVAS, '', state, false, false);
    }
    // Loads required assets of the game.
    Hello.prototype.preload = function () {
        // The first parameter is a unique identifier and the second is the
        // relative path to the image.
        game.load.image('logo_image', 'images/phaser-logo-small.png');
    };

    // Function called once for the initial setup.
    Hello.prototype.create = function () {
        // Creates a sprite with the image preloaded and place it at 320,240.
        this.logo = game.add.sprite(320, 240, 'logo_image');

        // Set the rotation center to the middle of the image.
        this.logo.anchor.x = 0.5;
        this.logo.anchor.y = 0.5;
    };

    Hello.prototype.update = function () {
        // Rotates logo object.
        this.logo.angle += 1;
    };
    return Hello;
})();

var game;

// Creates a Hello "game" when page is loaded.
window.onload = (function () {
    var hello = new Hello();
});
