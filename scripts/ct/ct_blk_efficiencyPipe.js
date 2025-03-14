/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const blk_efficiencyPipe = require("reind/blk/blk_efficiencyPipe");

    const frag_facility = require("reind/frag/frag_facility");

    const mdl_content = require("reind/mdl/mdl_content");
    const mdl_draw = require("reind/mdl/mdl_draw");
    const mdl_game = require("reind/mdl/mdl_game");
  // End


/*
  ========================================
  Section: Region
  ========================================
*/


  // Part: pow-econd
    const powEcond_transmissionBox = extend(Conduit, "pow-econd-transmission-box", {
      // Specific
      icons: function() {
        return [Core.atlas.find(this.name + "-icon")];
      },
      setStats() {
        this.super$setStats();
        blk_efficiencyPipe.setStats(this);
      },
      setBars() {
        this.super$setBars();
        blk_efficiencyPipe.setBars(this);
      },
    });
    powEcond_transmissionBox.buildType = () => extend(Conduit.ConduitBuild, powEcond_transmissionBox, {
      rotatorReg: mdl_content.getRegion(powEcond_transmissionBox, "-rotator"),
      tprog: 0.0,
      // Specific
      updateTile() {
        this.super$updateTile();
        blk_efficiencyPipe.updateTile(this);
        this.tprog += frag_facility.getTprogInc(this, "liq", this.liquids.current());
      },
      acceptLiquid(source, liquid) {
        if(!this.super$acceptLiquid(source, liquid)) return false;
        if(!blk_efficiencyPipe.acceptLiquid(this, source, liquid)) return false;
        return true;
      },
      moveLiquid(next, liquid) {
        return blk_efficiencyPipe.moveLiquid(this, next, liquid);
      },
      // Specific
      draw() {
        mdl_draw.drawRotatorRegion(mdl_game._pos(1, this), this.rotatorReg, this.tprog, 0.0, 9.0);
        this.super$draw();
        blk_efficiencyPipe.draw(this);
      },
      drawSelect() {
        this.super$drawSelect();
        blk_efficiencyPipe.drawSelect(this);
      },
    });
    exports.powEcond_transmissionBox = powEcond_transmissionBox;
  // End




Events.run(ClientLoadEvent, () => {
  Log.info("REIND: ct_blk_efficiencyPipe.js loaded.");
});
