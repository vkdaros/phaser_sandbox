/// <reference path="Scene.ts"/>

// compilei com tsc 0.9.1.1
class Application
{
    constructor()
    {
        game = new Phaser.Game(640, 480, Phaser.CANVAS, '', {
            preload: this.preload, create: this.create, update: this.update, render: this.render
        });
    }

    preload(): void
    {
    }

    create(): void
    {
        game.state.add('Menu', Menu);
        game.state.add('Level', Level);
        game.state.start('Menu');
    }

    update(): void
    {
    }

    render(): void
    {
    }
}

var game;
window.onload = (function() { var app = new Application(); });
