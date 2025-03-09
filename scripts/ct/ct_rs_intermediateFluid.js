/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const rs_intermediateFluid = require("reind/rs/rs_intermediateFluid");
  // End


/*
  ========================================
  Section: Region
  ========================================
*/


  // Part: liq-int[melt]
    const liqInt_melt_glass = extend(Liquid, "liq-int-melt-glass", {
      setStats() {
        this.super$setStats();
        rs_intermediateFluid.setStats(this);
      },
      update(puddle) {
        this.super$update(puddle);
        rs_intermediateFluid.update(this, puddle);
      },
    });
    exports.liqInt_melt_glass = liqInt_melt_glass;
  // End


  // Part: liq-int[misc]
    const liqInt_brinePurified = extend(Liquid, "liq-int-brine-purified", {
      setStats() {
        this.super$setStats();
        rs_intermediateFluid.setStats(this);
      },
      update(puddle) {
        this.super$update(puddle);
        rs_intermediateFluid.update(this, puddle);
      },
    });
    exports.liqInt_brinePurified = liqInt_brinePurified;
  // End


  // Part: gas-int[misc]
    const gasInt_airClean = extend(Liquid, "gas-int-air-clean", {
      setStats() {
        this.super$setStats();
        rs_intermediateFluid.setStats(this);
      },
      update(puddle) {
        this.super$update(puddle);
        rs_intermediateFluid.update(this, puddle);
      },
    });
    exports.gasInt_airClean = gasInt_airClean;
  // End



Events.run(ClientLoadEvent, () => {
  Log.info("REIND: ct_rs_intermediateFluid.js loaded.");
});
