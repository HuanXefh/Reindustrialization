/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const unit_genericUnit = require("reind/unit/unit_genericUnit");
  // End


/*
  ========================================
  Section: Application
  ========================================
*/


  // Part: Integration
    const setStats = function(utp) {
      unit_genericUnit.setStats(utp);
    };
    exports.setStats = setStats;


    const update = function(utp, unit) {
      unit_genericUnit.update(utp, unit);
    };
    exports.update = update;


    const drawShadow = function(utp, unit) {
      unit_genericUnit.drawShadow(utp, unit);
    };
    exports.drawShadow = drawShadow;
  // End




Events.run(ClientLoadEvent, () => {
  Log.info("REIND: unit_airUnit.js loaded.");
});
