/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const mdl_effect = require("reind/mdl/mdl_effect");
    const mdl_game = require("reind/mdl/mdl_game");

    const db_effect = require("reind/db/db_effect");
  // End


  // Part: Gas
    const updateTile_gasSideRelease = function(p, b, offRot, rad, cone, scl, size, rev) {
      if(!Mathf.chance(mdl_effect._pFrac(p, b.efficiency))) return;

      var rot_fi = mdl_game._rotDiv(b.rotation, offRot);
      var blocked = false;
      mdl_game._tsRot(b.tile, rot_fi, b.block.size).forEach(ot => {
        if(ot.solid() || (ot.build != null && ot.build.block instanceof LiquidJunction)) blocked = true;
      });
      if(blocked) return;

      var offRad = Vars.tilesize * 0.5 * (b.block.size + 1);

      mdl_effect.showAt(b, db_effect._gasSideRelease(rad, offRad, cone, scl, size, rev), rot_fi * 90.0);
    };
    exports.updateTile_gasSideRelease = updateTile_gasSideRelease;
  // End


Events.run(ClientLoadEvent, () => {
  Log.info("REIND: frag_effect.js loaded.");
});
