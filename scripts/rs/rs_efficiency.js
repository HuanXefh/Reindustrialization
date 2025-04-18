/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const PARENT = require("reind/rs/rs_genericResource");

    const db_stat = require("reind/db/db_stat");
  // End


  // Part: Component
    function setStatsComp(effc) {
      effc.stats.remove(Stat.explosiveness);
      effc.stats.remove(Stat.flammability);
      effc.stats.remove(Stat.temperature);
      effc.stats.remove(Stat.heatCapacity);
      effc.stats.remove(Stat.viscosity);

      effc.stats.add(db_stat.transportable, false);
    };


    function updateComp_efficiency(effc, puddle) {

    };
  // End


/*
  ========================================
  Section: Application
  ========================================
*/


  // Part: Integration
    const setStats = function(effc) {
      PARENT.setStats(effc);

      setStatsComp(effc);
    };
    exports.setStats = setStats;


    const update = function(effc, puddle) {
      updateComp(effc);
    };
    exports.update = update;


    const loadIcon = function(liq) {
      PARENT.loadIcon(liq);
    };
    exports.loadIcon = loadIcon


    const createIcons = function(liq, packer) {
      PARENT.createIcons(liq, packer);
    };
    exports.createIcons = createIcons;
  // End




Events.run(ClientLoadEvent, () => {
  Log.info("REIND: rs_efficiency.js loaded.");
});
