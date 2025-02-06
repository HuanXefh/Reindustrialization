/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const env_depthOre = require("reind/env/env_depthOre");
  // End


/*
  ========================================
  Section: Region
  ========================================
*/


  // Part: item-ore[coal]
    const envOre_depth_rawCoal = extend(OverlayFloor, "env-ore-depth-raw-coal", {
      setStats() {
        this.super$setStats();
        env_depthOre.setStats(this);
      },
      drawBase(tile) {
        env_depthOre.drawBase(this, tile);
      },
    });
    exports.envOre_depth_rawCoal = envOre_depth_rawCoal;


    const envOre_depth_crudeGraphite = extend(OverlayFloor, "env-ore-depth-crude-graphite", {
      setStats() {
        this.super$setStats();
        env_depthOre.setStats(this);
      },
      drawBase(tile) {
        env_depthOre.drawBase(this, tile);
      },
    });
    exports.envOre_depth_crudeGraphite = envOre_depth_crudeGraphite;
  // End


  // Part: item-ore[copper]
    const envOre_depth_nativeCopper = extend(OverlayFloor, "env-ore-depth-native-copper", {
      setStats() {
        this.super$setStats();
        env_depthOre.setStats(this);
      },
      drawBase(tile) {
        env_depthOre.drawBase(this, tile);
      },
    });
    exports.envOre_depth_nativeCopper = envOre_depth_nativeCopper;
  // End


  // Part: item-ore[iron]
    const envOre_depth_hematite = extend(OverlayFloor, "env-ore-depth-hematite", {
      setStats() {
        this.super$setStats();
        env_depthOre.setStats(this);
      },
      drawBase(tile) {
        env_depthOre.drawBase(this, tile);
      },
    });
    exports.envOre_depth_hematite = envOre_depth_hematite;


    const envOre_depth_magnetite = extend(OverlayFloor, "env-ore-depth-magnetite", {
      setStats() {
        this.super$setStats();
        env_depthOre.setStats(this);
      },
      drawBase(tile) {
        env_depthOre.drawBase(this, tile);
      },
    });
    exports.envOre_depth_magnetite = envOre_depth_magnetite;
  // End


  // Part: item-ore[lead]
    const envOre_depth_galena = extend(OverlayFloor, "env-ore-depth-galena", {
      setStats() {
        this.super$setStats();
        env_depthOre.setStats(this);
      },
      drawBase(tile) {
        env_depthOre.drawBase(this, tile);
      },
    });
    exports.envOre_depth_galena = envOre_depth_galena;
  // End


  // Part: item-ore[tin]
    const envOre_depth_cassiterite = extend(OverlayFloor, "env-ore-depth-cassiterite", {
      setStats() {
        this.super$setStats();
        env_depthOre.setStats(this);
      },
      drawBase(tile) {
        env_depthOre.drawBase(this, tile);
      },
    });
    exports.envOre_depth_cassiterite = envOre_depth_cassiterite;
  // End


  // Part: item-ore[zinc]
    const envOre_depth_sphalerite = extend(OverlayFloor, "env-ore-depth-sphalerite", {
      setStats() {
        this.super$setStats();
        env_depthOre.setStats(this);
      },
      drawBase(tile) {
        env_depthOre.drawBase(this, tile);
      },
    });
    exports.envOre_depth_sphalerite = envOre_depth_sphalerite;
  // End




Events.run(ClientLoadEvent, () => {
  Log.info("REIND:ct_env_depthOre.js loaded.");
});
