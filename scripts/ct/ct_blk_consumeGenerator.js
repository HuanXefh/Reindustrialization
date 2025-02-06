/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const blk_consumeGenerator = require("reind/blk/blk_consumeGenerator");
  // End


/*
  ========================================
  Section: Region
  ========================================
*/


  // Part: pow-gen
    const powGen_coreGenerator = extend(ConsumeGenerator, "pow-gen-core-generator", {
      setStats() {
        this.super$setStats();
        blk_consumeGenerator.setStats(this);
      },
      drawPlace(x, y, rotation, valid) {
        this.super$drawPlace(x, y, rotation, valid);
        blk_consumeGenerator.drawPlace(this, x, y, rotation, valid);
      },
    });
    powGen_coreGenerator.buildType = () => extend(ConsumeGenerator.ConsumeGeneratorBuild, powGen_coreGenerator, {
      updateTile() {
        this.super$updateTile();
        blk_consumeGenerator.updateTile(this);
      },
      draw() {
        this.super$draw();
        blk_consumeGenerator.draw(this);
      },
      drawSelect() {
        this.super$drawSelect();
        blk_consumeGenerator.drawSelect(this);
      },
    });
    exports.powGen_coreGenerator = powGen_coreGenerator;


    /* turbine */


    const powGen_lodestoneTurbine = extend(ConsumeGenerator, "pow-gen-lodestone-turbine", {
      setStats() {
        this.super$setStats();
        blk_consumeGenerator.setStats(this);
      },
      drawPlace(x, y, rotation, valid) {
        this.super$drawPlace(x, y, rotation, valid);
        blk_consumeGenerator.drawPlace(this, x, y, rotation, valid);
      },
    });
    powGen_lodestoneTurbine.buildType = () => extend(ConsumeGenerator.ConsumeGeneratorBuild, powGen_lodestoneTurbine, {
      updateTile() {
        this.super$updateTile();
        blk_consumeGenerator.updateTile(this);
      },
      draw() {
        this.super$draw();
        blk_consumeGenerator.draw(this);
      },
      drawSelect() {
        this.super$drawSelect();
        blk_consumeGenerator.drawSelect(this);
      },
    });
    exports.powGen_lodestoneTurbine = powGen_lodestoneTurbine;
  // End




Events.run(ClientLoadEvent, () => {
  Log.info("REIND:ct_blk_consumeGenerator.js loaded.");
});
