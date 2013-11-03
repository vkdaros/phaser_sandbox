///<reference path="phaser.d.ts"/>

class Scene extends Phaser.State {
    public constructor(game: Phaser.Game) {
        super();
        this.game = game;
    }

    public setScene(sceneName: string): void {
        this.game.state.start(sceneName, true, false);
    }
}
