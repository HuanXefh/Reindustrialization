/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const mdl_data = require("reind/mdl/mdl_data");
    const mdl_test = require("reind/mdl/mdl_test");
    const mdl_text = require("reind/mdl/mdl_text");

    const db_block = require("reind/db/db_block");
    const db_fluid = require("reind/db/db_fluid");
    const db_unit = require("reind/db/db_unit");
  // End


  // Part: Call
    const caller = function(ct, scr) {
      scr.call(ct);
    };
    exports.caller = caller;


    const callInit = function(ct, scr) {
      ct.init(() => scr.call(ct));
    };
    exports.callInit = callInit;
  // End


  // Part: Meta
    const getType_nm = function(nm) {
      if(nm == null || typeof nm != "string") return;

      if(mdl_text.includes_ex(
        nm,
        "reind-item-",
        "reind-ilitem-",
      )) return "item";

      if(mdl_text.includes_ex(
        nm,
        "reind-liq-",
        "reind-gas-",
        "reind-effc-",
        "reind-illiq-",
        "reind-ilgas-",
        "reind-ileffc-",
      )) return "fluid";

      if(mdl_text.includes_ex(
        nm,
        "reind-env-",
        "reind-map-",
      )) return "env";

      if(mdl_text.includes_ex(
        nm,
        "reind-def-",
        "reind-dis-",
        "reind-eff-",
        "reind-fac-",
        "reind-bliq-",
        "reind-log-",
        "reind-min-",
        "reind-pow-",
        "reind-pay-",
        "reind-ildef-",
        "reind-ildis-",
        "reind-ileff-",
        "reind-ilfac-",
        "reind-ilbliq-",
        "reind-illog-",
        "reind-ilmin-",
        "reind-ilpow-",
        "reind-ilpay-",
      )) return "build";

      if(mdl_text.includes_ex(
        nm,
        "reind-unit-",
      )) return "unit";

      if(mdl_text.includes_ex(
        nm,
        "reind-sta-",
      )) return "status";

      if(mdl_text.includes_ex(
        nm,
        "reind-wea-",
      )) return "weather";

      if(mdl_text.includes_ex(
        nm,
        "reind-camp-",
      )) return "sector";

      if(mdl_text.includes_ex(
        nm,
        "reind-pla-",
      )) return "planet";
    };
    exports.getType_nm = getType_nm;


    /* NOTE: Gets a content with type and id. */
    const getContent_id = function(tp_ct, id) {
      if(id < 0) return;

      var ct = null;
      switch(tp_ct) {
        case "item" :
          ct = Vars.content.items().get(id);
          break;
        case "fluid" :
          ct = Vars.content.liquids().get(id);
          break;
        case "block" :
          ct = Vars.content.blocks().get(id);
          break;
        case "unit" :
          ct = Vars.content.units().get(id);
          break;
        case "status" :
          ct = Vars.content.statusEffects().get(id);
          break;
        case "weather" :
          ct = Vars.content.weathers().get(id);
          break;
        case "sector" :
          ct = Vars.content.sectors().get(id);
          break;
        case "planet" :
          ct = Vars.content.planets().get(id);
          break;
      };

      return ct;
    };
    exports.getContent_id = getContent_id;


    /* NOTE: Maps arbitrary name to the content based on systematic naming. */
    const getContent_nm = function(nm) {
      if(nm == null || typeof nm != "string") return;

      var tp_ct = getType_nm(nm);
      var ct = null;
      switch(tp_ct) {
        case "item" :
          ct = Vars.content.item(nm);
          break;
        case "fluid" :
          ct = Vars.content.liquid(nm);
          break;
        case "env" :
          ct = Vars.content.block(nm);
          break;
        case "build" :
          ct = Vars.content.block(nm);
          break;
        case "unit" :
          ct = Vars.content.unit(nm);
          break;
        case "status" :
          ct = Vars.content.statusEffect(nm);
          break;
        case "weather" :
          ct = Vars.content.weather(nm);
          break;
        case "sector" :
          ct = Vars.content.sector(nm);
          break;
        case "planet" :
          ct = Vars.content.planet(nm);
          break;
      };

      if(ct == null) mdl_test._w_contentNotFound(nm);

      return ct;
    };
    exports.getContent_nm = getContent_nm;
  // End


  // Part: Field
    const getRegion = function(ct, suffix) {
      if(suffix == null) suffix = "";

      return Core.atlas.find(ct.name + suffix);
    };
    exports.getRegion = getRegion;


    const getBuildRegion = function(blk) {
      return Core.atlas.find(blk.name + "-icon", Core.atlas.find(blk.name));
    };
    exports.getBuildRegion = getBuildRegion;


    const getConfig = function(ct, val_ini) {
      var cfg = null;
      if(ct instanceof Block) cfg = ct.lastConfig;

      return (cfg == null) ? val_ini : cfg;
    };
    exports.getConfig = getConfig;
  // End


  // Part: Setting
    const getFaction = function(ct) {
      if(ct == null) return;

      var nm = ct.name;
      var tp_ct = getType_nm(nm);
      var faction = null;
      switch(tp_ct) {
        case "build" :
          faction = mdl_data.read_1n1v(db_block.blockFaction, nm);
          break;
        case "unit" :
          faction = mdl_data.read_1n1v(db_unit.unitFaction, nm);
          break;
      };

      return faction;
    };
    exports.getFaction = getFaction;


    const getFactionValue = function(ct) {
      if(ct == null) return;

      var faction = getFaction(ct);
      return (Vars.headless || faction == null) ? null : Core.bundle.get("term.reind-term-" + faction + ".name");
    };
    exports.getFactionValue = getFactionValue;


    const li_80286997 = new Seq();
    const getFactionMembers = function(faction) {
      var li = li_80286997.clear();

      if(faction instanceof Block || faction instanceof UnitType) faction = getFaction(faction);
      if(faction == null) return li;

      Vars.content.blocks().each(blk => {if(!isEnv(blk) && getFaction(blk) == faction && !li.contains(blk)) li.add(blk)});
      Vars.content.units().each(utp => {if(getFaction(utp) == faction && !li.contains(utp)) li.add(utp)});

      return li;
    };
    exports.getFamilyMembers = getFamilyMembers;


    const li_29300769 = new Seq();
    const getFamily = function(ct) {
      var li = li_29300769.clear();

      if(ct == null) return li;

      var nm = ct.name;
      if(isFactory(ct)) li.addAll(mdl_data.readli_1n1v(db_block.factoryFamily, nm));

      return li;
    };
    exports.getFamily = getFamily;


    const li_92008749 = new Seq();
    const getFamilyValue = function(ct) {
      var li = li_92008749.clear();

      if(Vars.headless || ct == null) return;

      var fami = getFamily(ct);
      fami.each(i => li.add(Core.bundle.get("term.reind-term-" + i + ".name")));

      return mdl_text.getTagText(li);
    };
    exports.getFamilyValue = getFamilyValue;


    const li_24116230 = new Seq();
    const getFamilyMembers = function(fami) {
      var li = li_24116230.clear();
      var li1 = new Seq();

      if(fami instanceof Block) li.addAll(getFamily(fami));
      if(typeof fami == "string") li.add(fami);

      Vars.content.blocks().each(blk => {
        if(isFactory(blk)) {
          var cond = false;
          var tmpFami = getFamily(blk);
          li.each(i => {if(tmpFami.contains(i) && !li1.contains(i)) cond = true});

          if(cond) li1.add(blk);
        };
      });

      return li1;
    };
    exports.getFamilyMembers = getFamilyMembers;
  // End


  // Part: Cond
    const isReind = function(ct) {
      return ct.name.includes("reind-");
    };
    exports.isReind = isReind;


    /* resource */


    const isEffc = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-effc-",
        "reind-ileffc-",
      );
    };
    exports.isEffc = isEffc;


    const isVirt = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-item-virt-",
        "reind-ilitem-virt-",
        "reind-ilmeta-",
      );
    };
    exports.isVirt = isVirt;


    const isLiq = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-liq-",
        "reind-illiq-",
      );
    };
    exports.isLiq = isLiq;


    const isGas = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-gas-",
        "reind-ilgas-",
      );
    };
    exports.isGas = isGas;


    const isIntermediate = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-item-int-",
        "reind-liq-int-",
        "reind-gas-int-",
        "reind-ilitem-int-",
        "reind-illiq-int-",
        "reind-ilgas-int-",
      );
    };
    exports.isIntermediate = isIntermediate;


    const isOre = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-item-ore-",
        "reind-liq-ore-",
        "reind-gas-ore-",
        "reind-ilitem-ore-",
        "reind-illiq-ore-",
        "reind-ilgas-ore-",
      );
    };
    exports.isOre = isOre;


    const isAqueous = function(ct) {
      return db_fluid.grp_aqueous.contains(ct.name);
    };
    exports.isAqueous = isAqueous;


    const isConductive = function(ct) {
      return db_fluid.grp_conductive.contains(ct.name);
    };
    exports.isConductive = isConductive;


    /* build */


    const isCore = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-eff-core-",
        "reind-ileff-core",
      );
    };
    exports.isCore = isCore;


    const isConduit = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-bliq-aux-",
        "reind-bliq-brd-",
        "reind-bliq-cond-",
        "reind-ilbliq-aux-",
        "reind-ilbliq-brd-",
        "reind-ilbliq-cond-",
      );
    };
    exports.isConduit = isConduit;


    const isTank = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-bliq-stor-",
        "reind-ilbliq-stor-",
      );
    };
    exports.isTank = isTank;


    const vulnerableToClogging = function(ct) {
      return db_block.vulnerableToClogging.contains(ct.name);
    };
    exports.vulnerableToClogging = vulnerableToClogging;


    const isHcond = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-pow-hcond-",
        "reind-ilpow-hcond-",
      );
    };
    exports.isHcond = isHcond;


    const isEcond = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-pow-econd-",
        "reind-ilpow-econd-",
      );
    };
    exports.isEcond = isEcond;


    const canShortCircuit = function(ct) {
      return db_block.canShortCircuit.contains(ct.name);
    };
    exports.canShortCircuit = canShortCircuit;


    const isFactory = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-fac-",
        "reind-ilfac-",
      );
    };
    exports.isFactory = isFactory;


    /* env */


    const isEnv = function(ct) {
      return mdl_text.includes_ex(
        ct.name,
        "reind-env-",
      );
    };
    exports.isEnv = isEnv;


    /* entity */


    const isEnemy = function(e, team) {
      if(e == null || team == null) return false;
      if(e.team == null) return false;
      if(e.team == Team.derelict || e.team == team) return false;

      return true;
    };
    exports.isEnemy = isEnemy;
  // End


Events.run(ClientLoadEvent, () => {
  Log.info("REIND: mdl_content.js loaded.");
});
