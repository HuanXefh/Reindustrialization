/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const lib_base = require("reind/lib/lib_base");

    const frag_faci = require("reind/frag/frag_faci");
    const frag_recipe = require("reind/frag/frag_recipe");

    const mdl_content = require("reind/mdl/mdl_content");
    const mdl_recipe = require("reind/mdl/mdl_recipe");
  // End


  // Part: Class
    const Tmi = lib_base.loadClass("tmi.TooManyItems");
    exports.Tmi = Tmi;

    const TmiRecipe = lib_base.loadClass("tmi.recipe.Recipe");
    exports.TmiRecipe = TmiRecipe;

    const TmiRecipeType = lib_base.loadClass("tmi.recipe.RecipeType");
    exports.TmiRecipeType = TmiRecipeType;
  // End


  // Part: Get
    const _tmiTp = function(tp) {
      var val = null;
      switch(tp) {
        case "factory" :
          val = TmiRecipeType.factory;
          break;
        case "building" :
          val = TmiRecipeType.building;
          break;
        case "collecting" :
          val = TmiRecipeType.collecting;
          break;
        case "generator" :
          val = TmiRecipeType.generator;
          break;
      };

      return val;
    };
    exports._tmiTp = _tmiTp;


    const _tmiCt = function(ct_gn) {
      return Tmi.itemsManager.getItem(mdl_content._ct_gn(ct_gn));
    };
    exports._tmiCt = _tmiCt;


    const _tmiRawRc = function(tp, ct_gn, time) {
      return new TmiRecipe(_tmiTp(tp), _tmiCt(ct_gn), time);
    };
    exports._tmiRawRc = _tmiRawRc;
  // End


  // Part: Apply
    const addRaw = function(rawRc, ct_gn, amt) {
      rawRc.addMaterialFloat(_tmiCt(ct_gn), amt);
    };
    exports.addRaw = addRaw;


    const addRawPersec = function(rawRc, ct_gn, amt) {
      rawRc.addMaterialPersec(_tmiCt(ct_gn), amt);
    };
    exports.addRawPersec = addRawPersec;


    const addProd = function(rawRc, ct_gn, amt) {
      rawRc.addProductionFloat(_tmiCt(ct_gn), amt);
    };
    exports.addProd = addProd;


    const addProdPersec = function(rawRc, ct_gn, amt) {
      rawRc.addProductionPersec(_tmiCt(ct_gn), amt);
    };
    exports.addProdPersec = addProdPersec;


    const register = function(rawRc) {
      try {Tmi.recipesManager.addRecipe(rawRc, true)} catch(err) {Tmi.recipesManager.addRecipe(rawRc)};
    };
    exports.register = register;
  // End


  // Part: Recipe
    const register_crop = function(blk) {
      var tup = frag_faci._cropTuple(blk);
      var growTime = tup[0];
      var growStages = tup[1];
      var cropYield = tup[2];

      var li = cropYield;
      var cap = li.size;
      if(cap == 0) return;
      for(let i = 0; i < cap; i++) {
        if(i % 4 != 0) continue;

        var stage = cropYield.get(i);
        var batch = cropYield.get(i + 2);
        var growTime_fi = stage / growStages * growTime;
        var rawRc = _tmiRawRc("factory", blk, growTime_fi);

        var cap1 = batch.size;
        if(cap1 == 0) continue;
        for(let j = 0; j < cap1; j++) {
          if(j % 3 != 0) continue;

          var itm = mdl_content._ct_gn(batch.get(j));
          if(itm == null) continue;
          var amt = batch.get(j + 1);
          var p = batch.get(j + 2);

          addProd(rawRc, itm, amt * p);
        };

        register(rawRc);
      };
    };
    exports.register_crop = register_crop;


    const register_structureCore = function(blk) {
      var pair = frag_faci._structPair(blk);
      var blk_tg = pair[0];
      var plan = pair[1];
      var rawRc = _tmiRawRc("building", blk_tg, 0.0);

      addRaw(rawRc, blk, 1);
      var li = frag_faci._structLiPlan(plan);
      var cap = li.size;
      if(cap > 0) {
        for(let i = 0; i < cap; i++) {
          if(i % 2 != 0) continue;

          var blk1 = li.get(i);
          var amt = li.get(i + 1);

          addRaw(rawRc, blk1, amt);
        };
      };

      register(rawRc);
    };
    exports.register_structureCore = register_structureCore;


    const li_26558541 = new Seq();
    const register_recipeFactory = function(blk, rcFi) {
      var li_ct = li_26558541;
      if(li_ct.size == 0) {
        Vars.content.items().each(itm => li_ct.add(itm));
        Vars.content.liquids().each(liq => li_ct.add(liq));
      };

      var cap0 = mdl_recipe._rcSize(rcFi);
      if(cap0 == 0) return;

      for(let i = 0; i < cap0; i++) {
        var ci = frag_recipe._ci(rcFi, i);
        var bi = frag_recipe._bi(rcFi, i);
        var opt = frag_recipe._opt(rcFi, i);
        var co = frag_recipe._co(rcFi, i);
        var bo = frag_recipe._bo(rcFi, i);
        var fo = frag_recipe._fo(rcFi, i);
        var failP = mdl_recipe._failP(rcFi, i);
        var rawRc = _tmiRawRc("factory", blk, blk.craftTime);

        li_ct.each(ct0 => {
          var amt_ci = 0.0;
          var amt_bi = 0.0;
          var amt_co = 0.0;
          var amt_bo = 0.0;

          // CI
          var li = ci;
          var cap = li.size;
          if(cap > 0) {
            for(let j = 0; j < cap; j++) {
              if(j % 2 != 0) continue;

              var ct = li.get(j);
              var amt = li.get(j + 1);

              if(ct0 == ct) amt_ci += amt;
            };
          };

          // BI
          var li = bi;
          var cap = li.size;
          if(cap > 0) {
            for(let j = 0; j < cap; j++) {
              if(j % 3 != 0) continue;

              var ct = li.get(j);
              var amt = li.get(j + 1);
              var p = li.get(j + 2);

              if(ct0 == ct) amt_bi += amt * p;
            };
          };

          // Opt
          var li = opt;
          var cap = li.size;
          if(cap > 0) {
            for(let j = 0; j < cap; j++) {
              if(j % 4 != 0) continue;

              var ct = li.get(j);
              var amt = li.get(j + 1);
              var p = li.get(j + 2);

              if(ct0 == ct) amt_bi += amt * p;
            };
          };

          // CO
          var li = co;
          var cap = li.size;
          if(cap > 0) {
            for(let j = 0; j < cap; j++) {
              if(j % 2 != 0) continue;

              var ct = li.get(j);
              var amt = li.get(j + 1);

              if(ct0 == ct) amt_co += amt;
            };
          };

          // BO
          var li = bo;
          var cap = li.size;
          if(cap > 0) {
            for(let j = 0; j < cap; j++) {
              if(j % 3 != 0) continue;

              var ct = li.get(j);
              var amt = li.get(j + 1);
              var p = li.get(j + 2);

              if(ct0 == ct) amt_bo += amt * p * (1.0 - failP);
            };
          };


          // FO
          var li = fo;
          var cap = li.size;
          if(cap > 0) {
            for(let j = 0; j < cap; j++) {
              if(j % 2 != 0) continue;

              var ct = li.get(j);
              var amt = li.get(j + 1);

              if(ct0 == ct) amt_bo += amt * failP;
            };
          };

          if(amt_ci > 0.0) addRawPersec(rawRc, ct0, amt_ci);
          if(amt_bi > 0.0) addRaw(rawRc, ct0, amt_bi);
          if(amt_co > 0.0) addProdPersec(rawRc, ct0, amt_co);
          if(amt_bo > 0.0) addProd(rawRc, ct0, amt_bo);
        });

        register(rawRc);
      };
    };
    exports.register_recipeFactory = register_recipeFactory;
  // End


Events.run(ClientLoadEvent, () => {
  Log.info("REIND: lib_tmi.js loaded.");
});
