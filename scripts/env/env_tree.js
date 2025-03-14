/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const env_genericProp = require("reind/env/env_genericProp");

    const db_env = require("reind/db/db_env");
    const db_stat = require("reind/db/db_stat");

    const mdl_data = require("reind/mdl/mdl_data");
    const mdl_draw = require("reind/mdl/mdl_draw");
    const mdl_game = require("reind/mdl/mdl_game");
  // End


  // Part: Setting
    var treeAlpha = 20;
    const set_treeAlpha = function(int) {
      treeAlpha = int;
    };
    exports.set_treeAlpha = set_treeAlpha;
  // End


  // Part: Component
    function setStatsComp(blk) {
      var tpVal = (blk.name.includes("reind-env-tree-fungi-")) ? Core.bundle.get("term.reind-term-fungi.name") : Core.bundle.get("term.reind-term-tree.name");
      blk.stats.add(db_stat.type, tpVal);
    };


    function drawBaseComp(blk, t) {
      var z = mdl_data.read_1n1v(db_env.treeLayers, blk.name);
      if(z == null) return;
      var z_sha = z - 0.0005;

      var pos = mdl_game._pos(1, t);
      var pos_sha = mdl_game._pos(2, t, blk.shadowOffset);
      var reg = blk.region;
      var ang = Mathf.randomSeed(t.pos(), 0, 4) * 90.0 + Mathf.sin(Time.time + pos.x, 50.0, 0.5) + Mathf.sin(Time.time - pos.y, 65.0, 0.9) + Mathf.sin(Time.time + pos.y - pos.x, 85.0, 0.9);
      var scl = 1.0;
      var mag = 1.0;
      var wobScl = 1.0;
      if(blk.name.includes("reind-env-tree-bush-")) {
        scl = 0.5;
        mag = 1.5;
        wobScl = 0.7;
      };
      if(blk.name.includes("reind-env-tree-fungi-")) {
        scl = 3.0;
        mag = 0.4;
        wobScl = 0.3;
      };

      var a = (Groups.player.size() > 1) ? 1.0 : treeAlpha / 20.0;
      if(Vars.player.unit() != null && !Vars.player.unit().flying && Vars.player.unit().type.groundLayer < 76.0) {
        var pos_pl = mdl_game._pos(3, "player");
        if(pos_pl != null) {
          var d = mdl_game._dst(pos, pos_pl);
          if(d < reg.width * 0.15) a *= 0.37;
        };
      };

      mdl_draw.drawBlurredShadow(pos_sha, reg, ang, a, 1.05, Color.white, z_sha);
      mdl_draw.drawWobbleRegion(pos, reg, ang, a, 1.0, Color.white, scl, mag, wobScl, wobScl, z);
    };
  // End


/*
  ========================================
  Section: Application
  ========================================
*/


  // Part: Integration
    const setStats = function(blk) {
      env_genericProp.setStats(blk);

      setStatsComp(blk);
    };
    exports.setStats = setStats;


    const drawBase = function(blk, t) {
      drawBaseComp(blk, t);
    };
    exports.drawBase = drawBase;
  // End




Events.run(ClientLoadEvent, () => {
  Log.info("REIND: env_tree.js loaded.");
});
