/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const blk_genericDistributionGate = require("reind/blk/blk_genericDistributionGate");

    const mdl_draw = require("reind/mdl/mdl_draw");
  // End


  // Part: Component
    function drawSelectComp(b) {
      // Draw config content
      if(b.unloadItem != null) mdl_draw.drawContentIcon_1b(b, b.unloadItem);
    };
  // End


/*
  ========================================
  Section: Application
  ========================================
*/


  // Part: Integration
    const setStats = function(blk) {
      blk_genericDistributionGate.setStats(blk);
    };
    exports.setStats = setStats;


    const updateTile = function(b) {
      blk_genericDistributionGate.updateTile(b);
    };
    exports.updateTile = updateTile;


    const drawSelect = function(b) {
      drawSelectComp(b);
    };
    exports.drawSelect = drawSelect;
  // End


Events.run(ClientLoadEvent, () => {
  Log.info("REIND:blk_directionalUnloader.js loaded.");
});
