import { SceneNames } from "../constants";

export class PreloadScene extends Phaser.Scene {
  preload() {
    //
  }

  create() {
    this.load.path = "./src/assets/";
    this.load.on("progress", this.onFileLoadComplete, this);
    this.load.on("complete", this.onLoadComplete, this);
    this.load.image("logo", "logo.png");
    this.load.atlas("mainAtlas", "atlases/main.png", "atlases/main.json");
    this.load.atlas("texas","atlases/texas.png")
    this.load.spritesheet(("mummy", "mummy37x45.png"), {
      frameWidth: 37,
      frameHeight: 45
    });
    this.load.start();
    //  const img = new Phaser.GameObjects.Image(this, 0, 0, "logo")
    //  this.add.existing(img);
  }
  _onFileLoadComplete(progress) {}
  _onLoadComplete() {
    this.game.scene.stop(SceneNames.preload);
    this.game.scene.start(SceneNames.game);
  }
  update() {
    //
  }
}
