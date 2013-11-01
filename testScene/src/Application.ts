/// <reference path="phaser.d.ts"/>
/// <reference path="Scene.ts"/>

// compilei com tsc 0.9.1.1
class Application
{
    private game: Phaser.Game;

    constructor()
    {
        var state = new Phaser.State();
        state.preload = this.preload;
        state.create = this.create;
        state.update = this.update;
        state.render = this.render;
        this.game = new Phaser.Game(640, 480, Phaser.CANVAS, '', state, false, false);
    }

    preload(): void
    {
    }

    create(): void
    {
        this.game.state.add('Menu', new Menu(this.game), false);
        this.game.state.add('Level', new Level(this.game), false);
        this.game.state.start('Menu', true, true);
    }

    update(): void
    {
    }

    render(): void
    {
    }
}

window.onload = (function() { var app = new Application(); });
