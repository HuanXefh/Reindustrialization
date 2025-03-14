/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const lib_base = require("reind/lib/lib_base");
    const lib_tmi = lib_base.hasTmi ? require("reind/lib/lib_tmi") : null;

    const blk_genericFactory = require("reind/blk/blk_genericFactory");

    const ct_blk_recipeFactory = require("reind/ct/ct_blk_recipeFactory");

    const frag_facility = require("reind/frag/frag_facility");
    const frag_recipe = require("reind/frag/frag_recipe");

    const mdl_content = require("reind/mdl/mdl_content");
    const mdl_draw = require("reind/mdl/mdl_draw");
    const mdl_effect = require("reind/mdl/mdl_effect");
    const mdl_game = require("reind/mdl/mdl_game");
    const mdl_recipe = require("reind/mdl/mdl_recipe");
    const mdl_table = require("reind/mdl/mdl_table");

    const db_effect = require("reind/db/db_effect");
    const db_stat = require("reind/db/db_stat");
  // End


  // Part: Auxiliary
    function ax_buildStats(rcFi) {
      return function(tb) {mdl_table.setRecipeDisplay(tb, rcFi)};
    };


    function ax_getProgressIncrease(b, time, rcFi, id_rc) {
      if(b.block.ignoreLiquidFullness) return b.edelta() / time / mdl_recipe.getTimeScale(rcFi, id_rc);

      var val = 1.0;
      var scl = 1.0;
      var hasLiquidOutput = false;
      var outputs = mdl_recipe.getOutputs(rcFi, id_rc);
      var cap = outputs.size;
      if(b.liquids != null && cap > 0) {
        val = 0.0;
        for(let i = 0; i < cap; i++) {
          if(i % 2 != 0) continue;

          var liq = Vars.content.liquid(outputs.get(i));
          if(liq == null) continue;
          var amt = outputs.get(i + 1);
          var tmpVal = (b.block.liquidCapacity - b.liquids.get(liq)) / (amt * b.edelta());
          val = Math.max(val, tmpVal);
          scl = Math.min(scl, tmpVal);
          hasLiquidOutput = true;
        };
      };

      if(!hasLiquidOutput) val = 1.0;
      return b.edelta() / time * (b.block.dumpExtraLiquid ? Math.min(val, 1.0) : scl) / mdl_recipe.getTimeScale(rcFi, id_rc);
    };
  // End


  // Part: Component
    function setStatsComp(blk, rcFi) {
      blk.stats.remove(Stat.productionTime);
      blk.stats.add(Stat.productionTime, blk.craftTime / 60.0, StatUnit.seconds);

      blk.stats.add(db_stat.recipes, ax_buildStats(rcFi));
    };


    function updateTileComp(b, rcFi, id_rc, tag) {
      var isManual = (tag == "manual");

      // Prevents invalid recipe
      if(mdl_recipe.getRecipeSize(rcFi) < id_rc + 0.9999) {
        ct_blk_recipeFactory.accB_id_rc(b, "w", 0);
        return;
      };

      var needCheck = ct_blk_recipeFactory.accB_needCheck(b, "r");
      var ci = ct_blk_recipeFactory.accB_ci(b, "r");
      var bi = ct_blk_recipeFactory.accB_bi(b, "r");
      var opt = ct_blk_recipeFactory.accB_opt(b, "r");
      var co = ct_blk_recipeFactory.accB_co(b, "r");
      var bo = ct_blk_recipeFactory.accB_bo(b, "r");
      var fo = ct_blk_recipeFactory.accB_fo(b, "r");
      var tmpEffc = ct_blk_recipeFactory.accB_tmpEffc(b, "r");

      if(needCheck) {
        ci = frag_recipe.getCI(rcFi, id_rc);
        bi = frag_recipe.getBI(rcFi, id_rc);
        opt = frag_recipe.getOpt(rcFi, id_rc);
        co = frag_recipe.getCO(rcFi, id_rc);
        bo = frag_recipe.getBO(rcFi, id_rc);
        fo = frag_recipe.getFO(rcFi, id_rc);
        tmpEffc = frag_recipe.getEfficiency(b, ci, bi, opt, mdl_recipe.getRequireOptional(rcFi, id_rc));

        ct_blk_recipeFactory.accB_ci(b, "w", ci);
        ct_blk_recipeFactory.accB_bi(b, "w", bi);
        ct_blk_recipeFactory.accB_opt(b, "w", opt);
        ct_blk_recipeFactory.accB_co(b, "w", co);
        ct_blk_recipeFactory.accB_bo(b, "w", bo);
        ct_blk_recipeFactory.accB_fo(b, "w", fo);
        ct_blk_recipeFactory.accB_tmpEffc(b, "w", tmpEffc);

        ct_blk_recipeFactory.accB_needCheck(b, "w", false);
      } else {
        if(Mathf.chance(0.008)) ct_blk_recipeFactory.accB_needCheck(b, "w", true);
      };

      b.efficiency = tmpEffc;
      if(isManual) {
        var param = ct_blk_recipeFactory.accB_param(b, "r");
        b.efficiency *= param;

        var param_dec = Math.min(0.002, param);
        ct_blk_recipeFactory.accB_param(b, "w", param - param_dec);
      };

      mdl_recipe.getScript(rcFi, id_rc).call(b);

      if(b.efficiency < 0.0001 || !b.shouldConsume()) {
        // Cools down
        b.warmup = Mathf.approachDelta(b.warmup, 0.0, b.block.warmupSpeed);
      } else {
        // Warms up
        b.warmup = Mathf.approachDelta(b.warmup, b.warmupTarget(), b.block.warmupSpeed);

        var prog_fi = b.progress + ax_getProgressIncrease(b, b.block.craftTime, rcFi, id_rc);
        if(prog_fi < 1.0) {
          b.progress = prog_fi;
        } else {
          prog_fi %= 1.0;
          b.progress = prog_fi;

          frag_recipe.addItems(b, bo, fo, mdl_recipe.getFailProbability(rcFi, id_rc));
          frag_recipe.consumeItems(b, bi, opt);

          mdl_effect.showAt(b, b.block.craftEffect, 0.0);

          mdl_recipe.getCraftScript(rcFi, id_rc).call(b);
        };

        frag_recipe.addLiquids(b, co, ax_getProgressIncrease(b, 1.0, rcFi, id_rc), mdl_recipe.getTimeScale(rcFi, id_rc));
        frag_recipe.consumeLiquids(b, ci, ax_getProgressIncrease(b, 1.0, rcFi, id_rc), mdl_recipe.getTimeScale(rcFi, id_rc));

        mdl_effect.showAroundP(b.block.updateEffectChance, b, b.block.updateEffect, b.block.size * Vars.tilesize * 0.5, 0.0);

        mdl_recipe.getUpdateScript(rcFi, id_rc).call(b);
      };

      b.totalProgress += Time.delta * b.warmup * b.efficiency;

      frag_recipe.dumpResource(b, co, bo, fo);
    };


    function initComp(blk, rcFi) {
      var cap = mdl_recipe.getRecipeSize(rcFi);
      var cond_liq = false;
      for(let i = 0; i < cap; i++) {
        var co = frag_recipe.getCO(rcFi, i);
        if(frag_recipe.outputsLiquid(co)) cond_liq = true;
      };
      if(cond_liq) blk.outputsLiquid = true;

      blk.hasConsumers = true;

      if(lib_base.hasTmi) {
        Events.run(MusicRegisterEvent, () => lib_tmi.register_recipeFactory(blk, rcFi));
      };
    };


    function setBarsComp(blk, rcFi) {
      blk.removeBar("liquid");

      frag_facility.setBars_was(blk, rcFi);

      blk.addBar("reind-prog", b => new Bar(
        "term.reind-term-recipe-progress.name",
        Pal.ammo,
        () => Math.min(b.progress, 1.0),
      ));
    };


    const vec2_95321152 = new Vec2();
    function buildConfigurationComp(b, tb, tag) {
      var vec2 = vec2_95321152.setZero();

      var isManual = (tag == "manual");

      var rcFi = ct_blk_recipeFactory.accB_rcFi(b, "r");
      var id_rc = ct_blk_recipeFactory.accB_id_rc(b, "r");

      if(isManual) {
        mdl_table.setTrigger(tb, function() {
          if(Vars.state.paused) {
            mdl_ui.showInfoFade(Core.bundle.get("info.reind-info-manual-generator-paused.name"));
          } else {
            var param_fi = Mathf.lerpDelta(ct_blk_recipeFactory.accB_param(b, "r"), 1.0, 0.135);
            Call.tileConfig(Vars.player, b, vec2.set(-2, param_fi));
          };
        }, Icon.crafting, Core.bundle.get("info.reind-info-manual-crafter.name"), 72.0);
        tb.row().add("").row();
      };

      mdl_table.setRecipeSelector(tb, rcFi, id_rc, b, function() {
        frag_recipe.consumeItems(b, rcFi, id_rc);
        b.block.lastConfig = this;
        Call.tileConfig(Vars.player, b, vec2.set(this, -2));
        b.deselect();
      }, 7);
    };


    function configuredComp(b, builder, val) {
      if(val == null) return;

      if(builder != null && builder.isPlayer()) b.lastAccessed = builder.getPlayer().coloredName();
      var val_fi = -2;
      var param_fi = -2;
      if(val instanceof Vec2) {
        val_fi = val.x;
        param_fi = val.y;
      };
      if(val instanceof Building) val_fi = val.config();

      if(val_fi > -2) {
        ct_blk_recipeFactory.accB_id_rc(b, "w", val_fi);
        ct_blk_recipeFactory.accB_needCheck(b, "w", true);
        b.progress = 0.0;

        mdl_effect.showAt(b, db_effect._recipeChange(b.block.size, b.team.color), 0.0);
      };

      if(param_fi > -2) {
        ct_blk_recipeFactory.accB_param(b, "w", param_fi);

        mdl_effect.showAt(b, b.block.updateEffect);
      };
    };


    function acceptItemComp(b, ob, itm, ci, bi, opt) {
      if(b.items == null) return false;
      if(b.items.get(itm) >= b.getMaximumAccepted(itm)) return false;
      if(!frag_recipe.hasInput(ci, bi, opt, itm.name)) return false;

      return true;
    };


    function acceptLiquidComp(b, ob, liq, ci, bi, opt) {
      if(b.liquids == null) return false;
      if(b.liquids.get(liq) > b.block.liquidCapacity) return false;
      if(!frag_recipe.hasInput(ci, bi, opt, liq.name)) return false;

      return true;
    };


    function outputsItemsComp(blk, rcFi) {
      var cap = mdl_recipe.getRecipeSize(rcFi);
      var cond = false;
      for(let i = 0; i < cap; i++) {
        var bo = frag_recipe.getBO(rcFi, i);
        var fo = frag_recipe.getFO(rcFi, i);
        if(frag_recipe.outputsItem(bo, fo)) cond = true;
      };

      return cond;
    };


    function shouldConsumeComp(b, co, bo, fo) {
      if(!frag_recipe.canAddResource(b, co, bo, fo)) return false;
      if(!b.enabled) return false;

      return true;
    };


    function consumesLiquidComp(blk, liq, rcFi) {
      var cap = mdl_recipe.getRecipeSize(rcFi);
      var cond = false;
      for(let i = 0; i < cap; i++) {
        var ci = frag_recipe.getCI(rcFi, i);
        var bi = frag_recipe.getBI(rcFi, i);
        var opt = frag_recipe.getOpt(rcFi, i);
        if(frag_recipe.hasInput(ci, bi, opt, liq.name)) cond = true;
      };

      return cond;
    };


    function drawSelectComp(b, rcFi, id_rc) {
      var ct = mdl_content.getContent_nm(mdl_recipe.getIconName(rcFi, id_rc));
      mdl_draw.drawContentIcon(mdl_game._pos(1, b), ct, b.block.size);

      var tt = mdl_recipe.getRawTooltip(rcFi, id_rc);
      if(tt == "overdriven") mdl_draw.drawRectPulse(mdl_game._pos(2, b), b.block.size * 0.5 * Vars.tilesize, Pal.remove);
    };


    function drawStatusComp(b, tag) {
      var isManual = (tag == "manual");

      var color = b.status().color;
      if(isManual && b.efficiency > 0.5) color = BlockStatus.active.color;

      if(b.block.enableDrawStatus) mdl_draw.drawBlockStatus(b, color);
    };
  // End


/*
  ========================================
  Section: Application
  ========================================
*/


  // Part: Integration
    const setStats = function(blk, rcFi) {
      blk_genericFactory.setStats(blk);

      setStatsComp(blk, rcFi);
    };
    exports.setStats = setStats;


    const updateTile = function(b, rcFi, id_rc, tag) {
      blk_genericFactory.updateTile(b);

      updateTileComp(b, rcFi, id_rc, tag);
    };
    exports.updateTile = updateTile;


    const init = function(blk, rcFi) {
      initComp(blk, rcFi);
    };
    exports.init = init;


    const setBars = function(blk, rcFi) {
      setBarsComp(blk, rcFi);
    };
    exports.setBars = setBars;


    const buildConfiguration = function(b, tb, tag) {
      buildConfigurationComp(b, tb, tag);
    };
    exports.buildConfiguration = buildConfiguration;


    const configured = function(b, builder, val) {
      configuredComp(b, builder, val);
    };
    exports.configured = configured;


    const acceptItem = function(b, ob, itm, ci, bi, opt) {
      if(!acceptItemComp(b, ob, itm, ci, bi, opt)) return false;

      return true;
    };
    exports.acceptItem = acceptItem;


    const acceptLiquid = function(b, ob, liq, ci, bi, opt) {
      if(!acceptLiquidComp(b, ob, liq, ci, bi, opt)) return false;

      return true;
    };
    exports.acceptLiquid = acceptLiquid;


    const outputsItems = function(blk, rcFi) {
      return outputsItemsComp(blk, rcFi);
    };
    exports.outputsItems = outputsItems;


    const shouldConsume = function(b, co, bo, fo) {
      if(!shouldConsumeComp(b, co, bo, fo)) return false;

      return true;
    };
    exports.shouldConsume = shouldConsume;


    const consumesLiquid = function(blk, liq, rcFi) {
      return consumesLiquidComp(blk, liq, rcFi);
    };
    exports.consumesLiquid = consumesLiquid;


    const drawSelect = function(b, rcFi, id_rc) {
      drawSelectComp(b, rcFi, id_rc);
    };
    exports.drawSelect = drawSelect;


    const drawStatus = function(b, tag) {
      drawStatusComp(b, tag);
    };
    exports.drawStatus = drawStatus;
  // End


Events.run(ClientLoadEvent, () => {
  Log.info("REIND: blk_recipeFactory.js loaded.");
});
