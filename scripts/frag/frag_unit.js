/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const VAR = require("reind/glb/glb_vars");

    const mdl_content = require("reind/mdl/mdl_content");
    const mdl_data = require("reind/mdl/mdl_data");
    const mdl_game = require("reind/mdl/mdl_game");

    const db_block = require("reind/db/db_block");
    const db_env = require("reind/db/db_env");
  // End


  // Part: Surrounding
    const update_surrounding = function(utp, unit) {
      if(Mathf.chance(0.98)) return;
      var t = unit.tileOn();
      if(t == null) return;

      var count_wall = 0.0;
      var staTime = 240.0;

      // Beneath
      if(mdl_content.isOnFloor(unit)) {
        if(db_env.db["type"]["quicksand"].contains(t.floor().name)) unit.apply(Vars.content.statusEffect("reind-sta-spec-quicksand"), staTime);
        if(db_env.db["type"]["parasiteFluid"].contains(t.floor().name)) /*unit.apply(Vars.content.statusEffect("reind-sta-spec-parasite"), 1800.0)*/;
      };

      // Range
      var li_ot = mdl_game._liTileRect(t, 5);

      li_ot.each(ot => {
        var d = mdl_game._dst(t, ot);
        var oblk = ot.block();
        var ob = ot.build;

        if(mdl_content.isCoverable(unit, true) && mdl_content.isTree(oblk)) {
          var z = mdl_data.read_1n1v(db_env.db["map"]["treeLayer"], ot.block().name);
          if(z > 75.9999 && z < 80.0001 && d < oblk.region.width * 0.15) {
            unit.apply(Vars.content.statusEffect("reind-sta-spec-hidden-well"), staTime);
            ot.block().drawBase(ot);
          };
        };

        if(mdl_content.isCore(oblk) && ob.team == unit.team) unit.apply(Vars.content.statusEffect("reind-sta-spec-core-overdrive"), staTime);

        if(mdl_content.isCoreUnit(utp) && mdl_content.isEnemy(ob, unit.team) && !mdl_content.isMap(oblk)) unit.apply(Vars.content.statusEffect("reind-sta-spec-attack-suppression"), staTime);

        if(mdl_content.isLowGround(unit) && mdl_content.isWall(oblk) && ob.team == unit.team) count_wall += 8.0 / d;
      });

      // Post-detection
      if(count_wall > VAR.wall_penaltyLimit) unit.apply(Vars.content.statusEffect("reind-sta-spec-over-protected"), staTime);
    };
    exports.update_surrounding = update_surrounding;
  // End


  // Part: Player
    const update_mouse = function(utp, unit) {
      if(unit != Vars.player.unit()) return;

      var ot = mdl_game._tileMouse();
      if(ot == null) return;

      var ui = new UI();
      var nm_flr = ot.floor().name;
      var nm_blk = ot.block().name;

      if(Core.input.touched) {
        if(nm_flr == "reind-map-misc-restriction-zone") ui.showInfoFade("@info.reind-info-restriction-zone.name", 2.0);
      };
    };
    exports.update_mouse = update_mouse;
  // End


Events.run(ClientLoadEvent, () => {
  Log.info("REIND: frag_unit.js loaded.");
});
