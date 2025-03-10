/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const blk_fluidUnloader = require("reind/blk/blk_fluidUnloader");

    const mdl_content = require("reind/mdl/mdl_content");
  // End


  // Part: Accessor
    const accB_id_sel = function(b, mode, val) {
      if(mode == "r") return b.id_sel;
      if(mode == "w") b.id_sel = val;
    };
    exports.accB_id_sel = accB_id_sel;
  // End


/*
  ========================================
  Section: Region
  ========================================
*/


  // Part: bliq-aux
    const bliqAux_fluidUnloader = extend(GenericCrafter, "bliq-aux-fluid-unloader", {
      setStats() {
        this.super$setStats();
        blk_fluidUnloader.setStats(this);
      },
    });
    bliqAux_fluidUnloader.buildType = () => extend(GenericCrafter.GenericCrafterBuild, bliqAux_fluidUnloader, {
      id_sel: mdl_content.getConfig(bliqAux_fluidUnloader, -1),
      updateTile() {
        this.super$updateTile();
        blk_fluidUnloader.updateTile(this);
      },
      buildConfiguration(table) {
        this.super$buildConfiguration(table);
        blk_fluidUnloader.buildConfiguration(this, table);
      },
      config() {
        return this.id_sel;
      },
      configured(builder, value) {
        blk_fluidUnloader.configured(this, builder, value);
      },
      moveLiquid(next, liquid) {
        return blk_fluidUnloader.moveLiquid(this, next, liquid);
      },
      draw() {
        this.super$draw();
        blk_fluidUnloader.draw(this);
      },
      drawSelect() {
        this.super$drawSelect();
        blk_fluidUnloader.drawSelect(this);
      },
      // RW
      write(write) {
        this.super$write(write);
        write.f(this.id_sel);
      },
      // RW
      read(read, revision) {
        this.super$read(read, revision);
        this.id_sel = read.f();
      },
    });
    exports.bliqAux_fluidUnloader = bliqAux_fluidUnloader;
  // End




Events.run(ClientLoadEvent, () => {
  Log.info("REIND: ct_blk_fluidUnloader.js loaded.");
});
