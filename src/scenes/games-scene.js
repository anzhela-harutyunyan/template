export class GameScene extends Phaser.Scene {
  preload() {
    console.log("gamePreload");
  }
  create() {
    // const img = this.add.image(0, 0, "logo");
    // const redCube = this.add.image(100, 100, "mainAtlas", "cube_red_0");
    // img.setOrigin(0, 0);
    // img.setScale(1.5, 1.5);
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("mummy"),
      frameRate: 16,
      repeat: 0
    });
    0;
    this.mummySprite = this.add
      .sprite(50, 300, "mummy")
      .setScale(4)
      .play("walk");
    mummySprite.anims.setRepeat(-1);
  }
  update() {
    this.mummySprite.x += 1.5;
  }
}
