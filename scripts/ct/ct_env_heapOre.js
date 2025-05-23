/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const TEMPLATE = require("reind/env/env_heapOre");
  // End


/*
  ========================================
  Section: Region
  ========================================
*/


  // Part: env-heap[ore]
    const envHeap_barite = extend(TallBlock, "env-heap-barite", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawBase(tile) {
        TEMPLATE.drawBase(this, tile);
      },
    });
    exports.envHeap_barite = envHeap_barite;


    const envHeap_bauxite = extend(TallBlock, "env-heap-bauxite", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawBase(tile) {
        TEMPLATE.drawBase(this, tile);
      },
    });
    exports.envHeap_bauxite = envHeap_bauxite;


    const envHeap_clay = extend(TallBlock, "env-heap-clay", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawBase(tile) {
        TEMPLATE.drawBase(this, tile);
      },
    });
    exports.envHeap_clay = envHeap_clay;


    const envHeap_dolomite = extend(TallBlock, "env-heap-dolomite", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawBase(tile) {
        TEMPLATE.drawBase(this, tile);
      },
    });
    exports.envHeap_dolomite = envHeap_dolomite;


    const envHeap_fluorapatite = extend(TallBlock, "env-heap-fluorapatite", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawBase(tile) {
        TEMPLATE.drawBase(this, tile);
      },
    });
    exports.envHeap_fluorapatite = envHeap_fluorapatite;


    const envHeap_gypsum = extend(TallBlock, "env-heap-gypsum", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawBase(tile) {
        TEMPLATE.drawBase(this, tile);
      },
    });
    exports.envHeap_gypsum = envHeap_gypsum;


    const envHeap_limestone = extend(TallBlock, "env-heap-limestone", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawBase(tile) {
        TEMPLATE.drawBase(this, tile);
      },
    });
    exports.envHeap_limestone = envHeap_limestone;


    const envHeap_olivine = extend(TallBlock, "env-heap-olivine", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawBase(tile) {
        TEMPLATE.drawBase(this, tile);
      },
    });
    exports.envHeap_olivine = envHeap_olivine;


    const envHeap_pumice = extend(TallBlock, "env-heap-pumice", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawBase(tile) {
        TEMPLATE.drawBase(this, tile);
      },
    });
    exports.envHeap_pumice = envHeap_pumice;


    const envHeap_salt = extend(TallBlock, "env-heap-salt", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawBase(tile) {
        TEMPLATE.drawBase(this, tile);
      },
    });
    exports.envHeap_salt = envHeap_salt;


    const envHeap_silicaStone = extend(TallBlock, "env-heap-silica-stone", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawBase(tile) {
        TEMPLATE.drawBase(this, tile);
      },
    });
    exports.envHeap_silicaStone = envHeap_silicaStone;


    const envHeap_talcum = extend(TallBlock, "env-heap-talcum", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
      drawBase(tile) {
        TEMPLATE.drawBase(this, tile);
      },
    });
    exports.envHeap_talcum = envHeap_talcum;
  // End




Events.run(ClientLoadEvent, () => {
  Log.info("REIND: ct_env_heapOre.js loaded.");
});
