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

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNames("texas", {
        prefix: "MC_",
        suffix: ".png",
        end: 11,
        zeroPad: 2
      }),
      repeat: -1
    });

    this.mummySprite = this.add
      .sprite(50, 300, "mummy")
      .setScale(4)
      .play("walk");
    this.mummySprite.anims.setRepeat(-1);

    // this.daddy = this.add.sprite(400, 200, "texas").play("jump");
    // this.daddy.anims.setTimeScale(0.5);

    this.add.text(200, 200, "Score:").setShadow(2, 2, "#976666", 5);
    this.children.bringToTop(this.mummySprite);
    // this.mummySprite.depth = 1;
    // console.warn(this.mummySprite.depth);
    const logoContainer = this.add.container(0, 0);
    logoContainer.add(this.daddy);
    logoContainer.add(logo);

    console.warn(this.daddy.x, this.daddy.y);
    logoContainer.setPosition(200,300);
  }

  update() {
    this.mummySprite.x++;
  }
}
