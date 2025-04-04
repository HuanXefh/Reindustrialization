/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const VAR = require("reind/glb/glb_vars");

    const frag_attack = require("reind/frag/frag_attack");

    const cfg_update = require("reind/cfg/cfg_update");

    const mdl_content = require("reind/mdl/mdl_content");
    const mdl_corrosion = require("reind/mdl/mdl_corrosion");
    const mdl_effect = require("reind/mdl/mdl_effect");
    const mdl_flow = require("reind/mdl/mdl_flow");
    const mdl_game = require("reind/mdl/mdl_game");
    const mdl_heat = require("reind/mdl/mdl_heat");
    const mdl_reaction = require("reind/mdl/mdl_reaction");
    const mdl_ui = require("reind/mdl/mdl_ui");

    const db_block = require("reind/db/db_block");
    const db_effect = require("reind/db/db_effect");
    const db_fluid = require("reind/db/db_fluid");
  // End


  // Part: Setting
    var noob = false;
    const set_noob = function(bool) {
      noob = bool;
    };
    exports.set_noob = set_noob;
  // End


  // Part: Puddle
    /*
     * NOTE:
     *
     * Prevents puddles with an amount of NaN from being there for a long time.
     */
    const update_fix = function(liq, puddle) {
      if(isNaN(puddle.amount)) puddle.remove();
    };
    exports.update_fix = update_fix;


    /*
     * NOTE:
     *
     * Simply visual effects for some fluids.
     */
    const update_fuming = function(liq, puddle) {
      if(liq.gas) return;
      if(!Mathf.chance(mdl_effect._pFrac(0.03, puddle.amount / 24.0))) return;

      mdl_effect.showAt(puddle, db_effect._heatSmog());
    };
    exports.update_fuming = update_fuming;


    const update_puddleReaction = function(liq, puddle) {
      var t = puddle.tile;
      mdl_game._liTileRect(t, 1).each(ot => {
        var ob = ot.build;
        var op = Puddles.get(ot);

        if(ob != null && ob.items != null && !(ob.block instanceof CoreBlock)) {
          ob.items.each(itm => mdl_reaction.handleReaction(ob, itm, liq));
        };

        if(op != null) {
          mdl_reaction.handleReaction(ot, op.liquid, liq);
        };
      });
    };
    exports.update_puddleReaction = update_puddleReaction;


    const update_shortCircuit = function(liq, puddle) {
      if(cfg_update.isSuppressed()) return;
      if(liq.gas || !mdl_content.isConductive(liq)) return;

      var t = puddle.tile;
      var b = t.build;
      var li_ot = mdl_game._liTileRect(t, 1);
      li_ot.each(ot => {
        var ob = ot.build;

        // Spread
        if(ob != null && mdl_content.canShortCircuit(ob.block) && ob.power.status > 0.0) Puddles.deposit(ot, liq, Time.delta * 0.05);

        // Damage
        if(b != null && mdl_content.canShortCircuit(b.block) && b.power.status > 0.0) {
          var dmg = Time.delta * b.maxHealth * 0.01 / 60.0;
          b.damage(dmg);

          mdl_effect.showAtP(0.005, b, db_effect._heatSmog());
          if(Mathf.chanceDelta(0.001)) frag_attack.atk_lightning_noob(b, Team.derelict, 1, 6, 4, VAR.shortCircuit_lightningDamage, Pal.accent);
        };
      });
    };
    exports.update_shortCircuit = update_shortCircuit;
  // End


  // Part: Transport
    const addLiquid = function(b, liq, amt) {
      if(b == null) return;

      var amt_0 = b.liquids.get(liq);
      var cap = b.block.liquidCapacity;
      var amt_trans = 0.0;
      if(amt > 0.0) {
        amt_trans = Math.min(amt, cap - amt_0);
      } else {
        amt_trans = Math.min(amt * -1, amt_0) * -1;
      };

      b.liquids.add(liq, amt_trans);
      return amt_trans;
    };
    exports.addLiquid = addLiquid;


    const transferLiquid = function(b_f, b_t, liq, forced) {
      if(forced == null) forced = false;
      if(b_f == null || b_t == null || b_f.liquids == null || b_t.liquids == null) return;

      var amt_f = b_f.liquids.get(liq);
      var amt_t = b_t.liquids.get(liq);
      var tmpAmt_t = forced ? 0.0 : amt_t;
      var cap_t = b_t.block.liquidCapacity;
      var pres = (b_f.block.liquidPressure + b_t.block.liquidPressure) / 2.0;
      var visc = liq.viscosity;
      var rate = b_f.edelta() * mdl_flow._flowRate(amt_f, tmpAmt_t, pres, visc);
      var amt_trans = Math.min(rate, cap_t - amt_t);

      if(amt_f > 0.0001) {
        b_t.handleLiquid(b_f, liq, amt_trans);
        b_f.liquids.remove(liq, amt_trans);

        return amt_trans;
      };

      return 0.0;
    };
    exports.transferLiquid = transferLiquid;


    const getJunctionEnd = function(b, ob) {
      if(b == null || ob == null) return;
      if(!(ob.block instanceof LiquidJunction)) return ob;

      var ob_fi = "pending";
      var ot = ob.tile;
      while(ob_fi == "pending") {
        ob_fi = (ot == null) ? null : ot.build;
        if(ob_fi != null && ob_fi.block instanceof LiquidJunction) {
          ot = ob_fi.tile.nearby(b.rotation);
          ob_fi = "pending";
        };
      };

      return ob_fi;
    };
    exports.getJunctionEnd = getJunctionEnd;


    const moveLiquid_pipe = function(b, ob, liq) {
      if(b == null || ob == null) return 0.0;

      var ob_fi = getJunctionEnd(b, ob);
      if(ob_fi == null) return 0.0;

      if(b.team == ob_fi.team && b.liquids != null && ob_fi.liquids != null && ob_fi.acceptLiquid(b, liq)) {
        return transferLiquid(b, ob_fi, liq, !mdl_content.isConduit(ob_fi.block));
      } else if (!ob_fi.block.consumesLiquid(liq) && ob_fi.liquids != null && ob_fi.liquids.currentAmount() / ob_fi.block.liquidCapacity > 0.1 && b.liquids != null && b.liquids.currentAmount() / b.block.liquidCapacity > 0.1) {
        mdl_reaction.handleReaction(ob_fi, b.liquids.current(), ob_fi.liquids.current());
      };

      if(b.team == ob_fi.team && ob_fi.items != null && !(ob_fi.block instanceof CoreBlock) && !ob_fi.block.consumesLiquid(liq)) {
        // Water
        if(mdl_content.isAqueous(liq)) ob.items.each(itm => mdl_reaction.handleReaction(ob, itm, Vars.content.liquid("reind-liq-ore-water")));

        ob_fi.items.each(itm => mdl_reaction.handleReaction(ob, itm, liq));
      };

      return 0.0;
    };
    exports.moveLiquid_pipe = moveLiquid_pipe;
  // End


  // Start: Efficiency
    const updateTile_efficiency = function(b) {
      if(db_fluid.db["efficiency"]["whitelist"].contains(b.block.name)) return;

      var invalid = false;
      var liq = b.liquids.current();
      if(mdl_content.isEffc(liq)) invalid = true;

      if(invalid) {
        b.kill();
        mdl_effect.showAt(b, db_effect._invalidPlacement(), 0.0);
        mdl_ui.showInfoFade("@info.reind-info-efficiency.name");
      };
    };
    exports.updateTile_efficiency = updateTile_efficiency;


    const updateTile_coreEffc = function(b, rate) {
      var effc = Vars.content.liquid("reind-effc-effc-core");

      addLiquid(b, effc, b.edelta() * rate);
      b.dumpLiquid(effc);
    };
    exports.updateTile_coreEffc = updateTile_coreEffc;
  // End


  // Part: Durability
    const updateTile_sticky = function(b) {
      if(cfg_update.isSuppressed() || noob) return;
      if(!Mathf.chanceDelta(0.02)) return;
      if(b.liquids == null) return;
      if(!mdl_content.cloggable(b.block)) return;

      var liq = b.liquids.current();
      if(!mdl_content.isReind(liq)) return;
      var visc = liq.viscosity;
      var visc_clog = VAR.clogging_viscosity;
      if(visc < visc_clog) return;
      var amt = b.liquids.get(liq);
      if(amt < 0.05) return;
      var cap = b.block.liquidCapacity;

      var dmg = b.edelta() * (b.maxHealth * VAR.clogging_damageRatio + VAR.clogging_minDamage) * Mathf.lerp(0.5, 1.0, amt / cap) * Mathf.lerp(0.5, 1.0, (visc - visc_clog) / 0.25);
      b.damage(dmg);

      mdl_effect.showAtP(0.5, b, db_effect._cloggingParticles(b.block, liq));
    };
    exports.updateTile_sticky = updateTile_sticky;


    const updateTile_corrosion = function(b) {
      if(cfg_update.isSuppressed() || noob) return;
      if(!Mathf.chanceDelta(0.02)) return;
      var liq = b.liquids.current();
      if(!mdl_content.isReind(liq)) return;
      var amt = b.liquids.get(liq);
      if(amt < 0.05) return;

      var cor = mdl_corrosion._cor(liq);
      var corScl = mdl_corrosion._corScl(b.block, liq);
      if(cor < 0.01 && corScl > 1.0) cor = 1.0;        // No corrosion power but has effective fluid tags
      if(cor < 0.01) return;
      var corRes = mdl_corrosion._corRes(b.block);

      var dmg = b.edelta() * b.maxHealth * VAR.corrosion_damageRatio * cor * corScl / corRes;
      b.damage(dmg);

      mdl_effect.showAtP(0.5, b, db_effect._corrosionParticles(b.block, liq));
    };
    exports.updateTile_corrosion = updateTile_corrosion;


    const updateTile_flammableContent = function(b) {
      if(Vars.state.rules.reactorExplosions && Mathf.chance(0.004) && b.liquids != null) {
        var liq = b.liquids.current();
        var cond1 = liq.explosiveness > 0.2999 || liq.flammability > 0.2999;
        var cond2 = false;
        if(cond1) mdl_game._liTileRect(b.tile, 1, b.block.size).each(ot => {if(Fires.get(ot.x, ot.y)) cond2 = true});

        if(cond1 && cond2) {
          b.kill();

          var rad = frag_attack._gasExploRad(b.block.size);
          var dmg = frag_attack._gasExploDmg(b.block.size);
          var shake = 8.0;

          frag_attack.atk_explosion_noob(b, rad, dmg, shake);
        };
      };
    };
    exports.updateTile_flammableContent = updateTile_flammableContent;


    const updateTile_pressured = function(b) {
      if(Vars.state.rules.reactorExplosions && Mathf.chance(0.01) && b.liquids != null) {
        var amt_pres = b.liquids.get(Vars.content.liquid("reind-effc-cond-pressure"));
        var amt_vac = b.liquids.get(Vars.content.liquid("reind-effc-cond-vacuum"));
        var cap = b.block.liquidCapacity;
        var p = Math.max(amt_pres / cap * 0.3, amt_vac / cap * 0.4);

        if(Mathf.chance(p) && b.health / b.maxHealth < 0.5 || b.dead) {
          if(!b.dead) b.kill();

          var rad = frag_attack._gasExploRad(b.block.size);
          var dmg = frag_attack._gasExploDmg(b.block.size);
          var shake = 8.0;

          frag_attack.atk_explosion_noob(b, rad, dmg, shake);
        };
      };
    };
    exports.updateTile_pressured = updateTile_pressured;
  // End


  // Part: Misc
    const updateTile_overflow = function(b, liq) {
      if(!b.block.hasLiquids || b.efficiency < 0.0001) return;
      if(!Mathf.chanceDelta(0.04)) return;

      var amt = b.liquids.get(liq);
      var cap = b.block.liquidCapacity;
      if(amt / cap < 0.98) return;

      var li_ot = mdl_game._liTileEdgeIns(b.tile, b.block.size);
      li_ot.each(ot => {
        if(Mathf.chance(0.5)) Puddles.deposit(ot, liq, 8.0);
      });
    };
    exports.updateTile_overflow = updateTile_overflow;
  // End


Events.run(ClientLoadEvent, () => {
  Log.info("REIND: frag_fluid.js loaded.");
});
