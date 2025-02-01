/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const blk_genericDrill = require("reind/blk/blk_genericDrill");

    const ct_blk_impactDrill = require("reind/ct/ct_blk_impactDrill");

    const frag_attack = require("reind/frag/frag_attack");

    const mdl_database = require("reind/mdl/mdl_database");
    const mdl_draw = require("reind/mdl/mdl_draw");
    const mdl_geometry = require("reind/mdl/mdl_geometry");

    const db_block = require("reind/db/db_block");
    const db_stat = require("reind/db/db_stat");
  // End


  // Part: Component
    function setStatsComp(blk) {
      // Remove boosted drill speed
      blk.stats.remove(db_stat.boostedDrillSpeed);

      // Get impact range
      var rad = mdl_database.read_1n1v(db_block.impactRange, blk.name);
      if(rad != null) blk.stats.add(db_stat.impactRange, rad / Vars.tilesize, StatUnit.blocks);

      // Get depth tier multiplier
      var dtmtp = mdl_database.read_1n1v(db_block.depthTierMultiplier, blk.name);
      if(dtmtp != null) blk.stats.add(db_stat.depthTierMultiplier, dtmtp);
    };


    function updateTileComp(b) {
      // Update impact
      if(b.invertTime == 1.0) {
        var rad = mdl_database.read_1n1v(db_block.impactRange, b.block.name);
        if(rad != null) {
          var dmg = b.block.size * b.block.drillTime * 1.2;
          var dur = b.block.drillTime * 0.5;

          frag_attack.attack_impact_1b(b, rad, dmg, dur);
        };
      };

      // Update efficiency if mining depth ore
      var t = b.tile;
      var ov = t.overlay();
      if(ov != null && ov.name.includes("reind-env-ore-depth-")) {
        var down = false;

        var b_sc = Vars.indexer.findTile(Vars.player.team(), t.worldx(), t.worldy(), 999.0, b => b.block.name.includes("reind-min-scan-"));
        if(b_sc == null || b_sc.efficiency <= 0.9999) down = true;

        if(b_sc != null) {
          var r_sc = mdl_database.read_1n1v(db_block.genericRange, b_sc.block.name);
          if(r_sc == null) {
            down = true;
          } else {
            var t_sc = b_sc.tile;
            var d = mdl_geometry.getDistance_2t(t, t_sc);
            if(d > (b_sc.block.size / 2 + r_sc) * Vars.tilesize * 1.275) down = true;
          };
        };

        if(down) {
          b.progress = 0.0;
          ct_blk_impactDrill.accB_down(b, "w", true);
        } else {
          ct_blk_impactDrill.accB_down(b, "w", false);
        };
      };
    };


    function canMineComp(blk, t) {
      if(t.overlay() != null && t.overlay().name.includes("reind-env-ore-depth-")) {
        var itm = t.overlay().itemDrop;
        if(itm == blk.blockedItem) return false;

        var hardness = t.overlay().itemDrop.hardness;
        var tier_depth = blk.tier * mdl_database.read_1n1v(db_block.depthTierMultiplier, blk.name);
        if(hardness > tier_depth) return false;
      };

      return true;
    };


    function drawPlaceComp(blk, tx, ty, rot, valid) {
      // Draw impact range
      var rad = mdl_database.read_1n1v(db_block.impactRange, blk.name);
      if(rad != null) mdl_draw.drawCirclePulse_1blk(blk, Vars.world.tile(tx, ty), rad);
    };


    function drawSelectComp(b) {
      // Draw impact range
      var rad = mdl_database.read_1n1v(db_block.impactRange, b.block.name);
      if(rad != null) mdl_draw.drawCirclePulse_1b(b, rad);

      // Draw ore scanner connection
      var t = b.tile;
      var ov = t.overlay();
      if(ov != null && ov.name.includes("reind-env-ore-depth-")) {
        var b_sc = Vars.indexer.findTile(Vars.player.team(), t.worldx(), t.worldy(), 999.0, b => b.block.name.includes("reind-min-scan-"));
        if(b_sc != null) {
          mdl_draw.drawBuildRect(b, true, false);
          mdl_draw.drawBuildRect(b_sc, true, false);
          mdl_draw.drawLine_2b(b, b_sc);
        };
      };
    };
  // End


/*
  ========================================
  Section: Application
  ========================================
*/


  // Part: Integration
    const setStats = function(blk) {
      blk_genericDrill.setStats(blk);

      setStatsComp(blk);
    };
    exports.setStats = setStats;


    const updateTile = function(b) {
      blk_genericDrill.updateTile(b);

      updateTileComp(b);
    };
    exports.updateTile = updateTile;


    const canMine = function(blk, t) {
      return canMineComp(blk, t);
    };
    exports.canMine = canMine;


    const drawPlace = function(blk, tx, ty, rot, valid) {
      drawPlaceComp(blk, tx, ty, rot,valid);
    };
    exports.drawPlace = drawPlace;


    const drawSelect = function(b) {
      drawSelectComp(b);
    };
    exports.drawSelect = drawSelect;
  // End


Events.run(ClientLoadEvent, () => {
  Log.info("REIND:blk_impactDrill.js loaded.");
});
