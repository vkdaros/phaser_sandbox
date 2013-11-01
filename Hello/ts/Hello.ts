///<reference path='phaser.d.ts'/>

import PhaserModule = Phaser;

class Hello {
    // The main object of the game is a Phaser logo image.
    private logo;

    constructor() {
        // state points to our implementation of functions needed by Phaser.
        var state = new PhaserModule.State();
        state.preload = this.preload;
        state.create = this.create;
        state.update = this.update;

        // Create a new game 640x480 pixels canvas. The third parameter is the
        // DOM parent in html page and the last two are booleans for flags for
        // transparent background in canvas and antialias.
        game = new PhaserModule.Game(640, 480, Phaser.CANVAS, '', state, false,
                                     false);
    }

    // Loads required assets of the game.
    private preload(): void {
        // The first parameter is a unique identifier and the second is the
        // relative path to the image.
        game.load.image('logo_image', 'images/phaser-logo-small.png');
    }

    // Function called once for the initial setup.
    private create(): void {
        // Creates a sprite with the image preloaded and place it at 320,240.
        this.logo = game.add.sprite(320, 240, 'logo_image');

        // Set the rotation center to the middle of the image.
        this.logo.anchor.x = 0.5;
        this.logo.anchor.y = 0.5;
    }

    private update(): void {
        // Rotates logo object.
        this.logo.angle += 1;
    }
}

var game;

// Creates a Hello "game" when page is loaded.
window.onload = (
    function() {
        var hello = new Hello();
    }
);
