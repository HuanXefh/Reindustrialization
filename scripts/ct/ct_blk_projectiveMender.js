/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const TEMPLATE = require("reind/blk/blk_projectiveMender");
  // End


/*
  ========================================
  Section: Region
  ========================================
*/


  // Part: def-proj
    const defProj_basicRepairProjector = extend(RegenProjector, "def-proj-basic-repair-projector", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawPlace(x, y, rotation, valid) {
        this.super$drawPlace(x, y, rotation, valid);
        TEMPLATE.drawPlace(this, x, y, rotation, valid);
      },
    });
    defProj_basicRepairProjector.buildType = () => extend(RegenProjector.RegenProjectorBuild, defProj_basicRepairProjector, {
      needCheck: true,
      r: 5,
      units: new Seq(), repairMap: new ObjectMap(),
      updateTile() {
        this.super$updateTile();
        TEMPLATE.updateTile(this);
      },
      shouldConsume() {
        return this.anyTargets || this.units.size > 0;
      },
      draw() {
        this.super$draw();
        TEMPLATE.draw(this);
      },
      drawSelect() {
        this.super$drawSelect();
        TEMPLATE.drawSelect(this);
      },
    });
    exports.defProj_basicRepairProjector = defProj_basicRepairProjector;
  // End




Events.run(ClientLoadEvent, () => {
  Log.info("REIND: ct_blk_projectiveMender.js loaded.");
});
