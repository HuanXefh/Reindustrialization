const mdl_game = require("reind/mdl/mdl_game");


const db = {




  /*
   * NOTE:
   *
   * Simply params used by some blocks.
   */
  "param": {


    "depthTierMultiplier": new Seq([

      /* <---------------- min-dril ----------------> */

      "reind-min-dril-basic-impact-drill", 0.5,
      "reind-min-dril-titan-impact-drill", 0.7,

    ]),


    "exposed": new Seq([

      /* <---------------- dis-conv ----------------> */

      "reind-dis-conv-primitive-conveyor",
      "reind-dis-conv-improved-conveyor",
      "reind-dis-conv-multi-port-conveyor",

      /* <---------------- eff-stor ----------------> */

      "reind-eff-stor-crate",

    ]),


    "speed": {


      "base": new Seq([

        /* <---------------- dis-brd ----------------> */

        "reind-dis-brd-primitive-conveyor-bridge", 12.0,

        /* <---------------- eff-core ----------------> */

        "reind-eff-core-ash", 4.0,

        /* <---------------- bliq-pump ----------------> */

        "reind-bliq-pump-primitive-fluid-pump", 3.0,
        "reind-bliq-pump-piston-fluid-pump", 15.0,

      ]),


    },


    /*
     * NOTE:
     *
     * Various range params for blocks.
     * {r} and {rad} are different. {r} is used as an integer, while {rad} is float.
     */
    "range": {


      "base": new Seq([

        /* <---------------- min-harv ----------------> */

        "reind-min-harv-mycelial-harvester", 5,

        /* <---------------- min-scan ----------------> */

        "reind-min-scan-pulse-ore-scanner", 8,

        /* <---------------- min-crop ----------------> */

        "reind-min-crop-ink-corn", 1,

        /* <---------------- pow-gen ----------------> */

        "reind-pow-gen-energizer-generator", 10,
        "reind-pow-gen-tidal-generator", 6,

        /* <---------------- pow-boil ----------------> */

        "reind-pow-boil-steam-boiler", 8,

        /* <---------------- def-proj ----------------> */

        "reind-def-proj-basic-repair-projector", 8,

        /* <---------------- fac-sep ----------------> */

        "reind-fac-sep-dry-magnetic-separator", 2,

      ]),


      "impact": new Seq([

        /* <---------------- min-dril ----------------> */

        "reind-min-dril-basic-impact-drill", 48.0,
        "reind-min-dril-titan-impact-drill", 32.0,

        /* <---------------- dis-mdr ----------------> */

        "reind-dis-mdr-local-mass-driver", 32.0,
        "reind-dis-mdr-standard-mass-driver", 72.0,

        /* <---------------- map-fac ----------------> */

        "reind-map-fac-ids-trade-dock-rim-builder", 80.0,

      ]),


    },


    "damage": {


      "base": new Seq([

        /* <---------------- dis-mdr ----------------> */

        "reind-dis-mdr-local-mass-driver", 90.0,
        "reind-dis-mdr-standard-mass-driver", 725.0,

      ]),


    },


    "color": {


      "base": new Seq([

        /* <---------------- min-scan ----------------> */

        "reind-min-scan-pulse-ore-scanner", Color.valueOf("cedef3"),

        /* <---------------- def-proj ----------------> */

        "reind-def-proj-basic-radar", Color.valueOf("cedef3"),

      ]),


    },


    "sound": {


      "craft": new Seq([

        /* <---------------- fac-furn ----------------> */

        "reind-fac-furn-colossal-kiln", "se-craft-gas-release",
        "reind-fac-furn-bricked-blast-furnace", "se-craft-gas-release",

        /* <---------------- map-fac ----------------> */

        "reind-map-fac-ids-trade-dock-rim-builder", "se-craft-ids-trade-dock",

      ]),


    },


    "shake": new Seq([

      /* <---------------- map-fac ----------------> */

      "reind-map-fac-ids-trade-dock-rim-builder", 8.0,

    ]),


  },




  "map": {


    "faction": new Seq([

      /* <---------------- outpost military ----------------> */

      "reind-eff-core-ash", "outpost-military",
      "reind-eff-core-ember", "outpost-military",
      "reind-eff-core-bonfire", "outpost-military",

      /* <---------------- emerald tide ----------------> */

      "reind-min-dril-sand-excavator", "emerald-tide",

      "reind-ilmin-dril-ids-remote-drill", "emerald-tide",

      "reind-min-dril-basic-impact-drill", "emerald-tide",
      "reind-min-dril-titan-impact-drill", "emerald-tide",

      "reind-min-harv-mycelial-harvester", "emerald-tide",

      "reind-min-scan-pulse-ore-scanner", "emerald-tide",

      "reind-min-misc-placer-miner", "emerald-tide",

      /* <---------------- rim builder ----------------> */

      "reind-map-fac-ids-trade-dock-rim-builder", "rim-builder",

      /* <---------------- enclosure ----------------> */

      "reind-eff-stor-bit-container", "enclosure",

      "reind-ilfac-misc-ore-dictionary-convertor", "enclosure",

      "reind-ileff-misc-ids-engine", "enclosure",
      "reind-ileff-misc-bit-bank", "enclosure",

    ]),


    "family": new Seq([

      /* <---------------- absorber ----------------> */

      /* <---------------- alloy furnace ----------------> */

      "reind-fac-furn-kiln", "alloy-furnace",
      "reind-fac-furn-induction-furnace", "alloy-furnace",

      /* <---------------- brick kiln ----------------> */

      "reind-fac-furn-primitive-brick-kiln", "brick-kiln",

      /* <---------------- brick press ----------------> */

      "reind-fac-misc-core-crafter", "brick-press",
      "reind-fac-proc-brick-press", "brick-press",

      /* <---------------- chimney ----------------> */

      "reind-fac-misc-basic-chimney", "chimney",

      /* <---------------- coke oven ----------------> */

      "reind-fac-furn-primitive-coke-oven", "coke-oven",

      /* <---------------- concentrate smelter ----------------> */

      "reind-fac-furn-bricked-blast-furnace", "concentrate-smelter",

      /* <---------------- convertor ----------------> */

      /* <---------------- crafter ----------------> */

      "reind-fac-misc-core-crafter", "crafter",
      "reind-fac-misc-manual-crafter", "crafter",

      /* <---------------- dust mixer ----------------> */

      "reind-fac-mix-v-mixer", "dust-mixer",
      "reind-fac-mix-3d-mixer", "dust-mixer",
      "reind-fac-mix-conical-mixer", "dust-mixer",

      /* <---------------- dust remover ----------------> */

      "reind-fac-sep-cyclone-separator", "dust-remover",
      "reind-fac-sep-high-pressure-cyclone-separator", "dust-remover",

      /* <---------------- electrolyzer ----------------> */

      /* <---------------- fluid dryer ----------------> */

      "reind-fac-reac-fixed-bed-reactor", "fluid-dryer",

      /* <---------------- grain dryer ----------------> */

      "reind-fac-rmv-hot-air-dryer", "grain-dryer",

      /* <---------------- grain heater ----------------> */

      /* <---------------- heat exchanger ----------------> */

      "reind-fac-heat-vent-heat-exchanger", "heat-exchanger",
      "reind-fac-heat-temperature-control-unit", "heat-exchanger",

      /* <---------------- heater ----------------> */

      "reind-fac-heat-furnace-heater", "heater",
      "reind-fac-heat-vent-heat-exchanger", "heater",

      /* <---------------- inlet ----------------> */

      "reind-fac-misc-generic-inlet", "inlet",
      "reind-fac-misc-fuel-inlet", "inlet",

      /* <---------------- leacher ----------------> */

      /* <---------------- liquid mixer ----------------> */

      "reind-fac-mix-tank-mixer", "liquid-mixer",

      /* <---------------- melt reactor ----------------> */

      "reind-fac-furn-bricked-blast-furnace", "melt-reactor",

      /* <---------------- melter ----------------> */

      "reind-fac-furn-kiln", "melter",
      "reind-fac-furn-colossal-kiln", "melter",

      /* <---------------- pressure pump ----------------> */

      "reind-fac-air-piston-pressure-pump", "pressure-pump",
      "reind-fac-air-liquid-ring-pressure-pump", "pressure-pump",

      /* <---------------- pulverizer ----------------> */

      "reind-fac-mill-mechanical-mill", "pulverizer",
      "reind-fac-mill-ball-mill", "pulverizer",
      "reind-fac-mill-rod-mill", "pulverizer",

      /* <---------------- purifier i ----------------> */

      "reind-fac-sep-dry-magnetic-separator", "purifier-i",
      "reind-fac-sep-mineral-jig-m", "purifier-i",                // NOTE: Usually not used for concentrate purification.

      /* <---------------- purifier ii ----------------> */

      /* <---------------- reactor ----------------> */

      "reind-fac-reac-tank-reactor", "reactor",
      "reind-fac-reac-fixed-bed-reactor", "reactor",

      /* <---------------- roasting furnace ----------------> */

      "reind-fac-furn-colossal-kiln", "roasting-furnace",
      "reind-fac-furn-shaft-kiln", "roasting-furnace",
      "reind-fac-furn-rotary-kiln-m", "roasting-furnace",
      "reind-fac-furn-box-furnace", "roasting-furnace",

      /* <---------------- rock crusher ----------------> */

      "reind-fac-mill-jaw-crusher", "rock-crusher",
      "reind-fac-mill-hammer-crusher", "rock-crusher",                // NOTE: Hard materials are excluded.

      /* <---------------- sintering furnace ----------------> */

      "reind-fac-furn-primitive-sintering-furnace", "sintering-furnace",

      /* <---------------- vibration screen ----------------> */

      "reind-fac-sep-vibration-screen", "vibration-screen",

    ]),


    "attribute": new Seq([

      /* <---------------- min-misc ----------------> */

      "reind-min-misc-placer-miner", "reind-attr-flr-placer",

    ]),


    "liquid": new Seq([

      /* <---------------- pow-econd ----------------> */

      "reind-pow-econd-transmission-box", "reind-effc-cond-torque",

    ]),


    /*
     * NOTE:
     *
     * Params used by {blk_growthBlock}.
     * Format: {nm}, {growTime}, {growStages}, {cropYield}, {stageScr}.
     *
     * {cropYield} is used to determine when to harvest and what can be obtained.
     * {backTo} is the stage to change to when harvested. Use {0} to remove the crop.
     * Format: {stage}, {backTo}, {batch}
     *
     * {stageScr} is used for customization of the block, i.e. what will happen during a stage.
     * Format: {stage}, {scr}.
     */
    "growth": new Seq([

      "reind-min-crop-aerth-small-shiitake", 23400.0, 4, new Seq([
        3, 1, new Seq(["reind-item-bio-hypha-rod", 24, 0.5]), function() {},
        4, 1, new Seq(["reind-item-bio-hypha-rod", 72, 0.5]), function() {},
      ]), new Seq(),

      "reind-min-crop-ink-corn", 28800.0, 4, new Seq([
        3, 1, new Seq(["reind-item-bio-ink-corn", 16, 0.5]), function() {},
        4, 1, new Seq(["reind-item-bio-ink-corn", 48, 0.5]), function() {},
      ]), new Seq(),

      "reind-min-crop-thorium-reactor-mine", 1800.0, 5, new Seq([
        5, 0, new Seq(["thorium", 200, 0.5]), function() {
          Events.fire(Trigger.thoriumReactorOverheat);
          Damage.damage(this.x, this.y, 19 * Vars.tilesize, 5000.0);
          Fx.reactorExplosion.at(this);
          Sounds.explosionbig.at(this);
          Effect.shake(6.0, 16.0, this);
        },
      ]), new Seq([
        5, function() {
          if(mdl_game._liUnit(this, 24.0).size > 0) {
            this.kill();
            Events.fire(Trigger.thoriumReactorOverheat);
            Damage.damage(this.x, this.y, 19 * Vars.tilesize, 5000.0);
            Fx.reactorExplosion.at(this);
            Sounds.explosionbig.at(this);
            Effect.shake(6.0, 16.0, this);
          };
        },
      ]),

    ]),


  },




  /*
   * NOTE:
   *
   * Energy point related things.
   */
  "ep": {


    "range": new Seq([

      /* <---------------- min-dril ----------------> */

      "reind-min-dril-titan-impact-drill", 8,

      /* <---------------- pow-gen ----------------> */

      "reind-pow-gen-energizer-generator", 10,

    ]),


    "requirement": new Seq([

      /* <---------------- min-dril ----------------> */

      "reind-min-dril-titan-impact-drill", 2.0,

      /* <---------------- pow-gen ----------------> */

      "reind-pow-gen-energizer-generator", 5.0,

    ]),


  },




  "power": {


    "consumption": new Seq([

      /* <---------------- pow-wire ----------------> */

      "reind-pow-wire-copper-cable", 2.25,
      "reind-pow-wire-power-alarm", 30.0,
      "reind-pow-wire-copper-wire-relay", 25.0,
      "reind-pow-wire-copper-wire-node", 50.0,

    ]),


    "shortCircuit": new Seq([

      /* <---------------- pow-wire ----------------> */

      "reind-pow-wire-copper-cable",
      "reind-pow-wire-power-alarm",
      "reind-pow-wire-copper-wire-relay",
      "reind-pow-wire-copper-wire-node",

    ]),


    "tier": {


      "hv": new Seq([

        /* <---------------- fac-ele ----------------> */

        "reind-fac-ele-basic-electrolyzer",

      ]),


      "ehv": new Seq(),


    },


  },




  "heat": {


    "limit": new Seq([

      /* <---------------- pow-hcond ----------------> */

      "reind-pow-hcond-copper-heat-conductor", 40.0,
      "reind-pow-hcond-steel-heat-conductor", 100.0,

    ]),


    "loss": new Seq([

      /* <---------------- pow-hcond ----------------> */

      "reind-pow-hcond-copper-heat-conductor", 0.03,
      "reind-pow-hcond-steel-heat-conductor", 0.01,

    ]),


    "transCoef": new Seq([

      /* <---------------- pow-hcond ----------------> */

      "reind-pow-hcond-copper-heat-conductor", 7.76,
      "reind-pow-hcond-steel-heat-conductor", 1.0,

    ]),


    "fHeatCapacity": new Seq([

      /* <---------------- bliq-pump ----------------> */

      "reind-bliq-pump-primitive-fluid-pump", 800.0,
      "reind-bliq-pump-piston-fluid-pump", 1000.0,

      /* <---------------- bliq-cond ----------------> */

      "reind-bliq-cond-wooden-fluid-pipe", 50.0,
      "reind-bliq-cond-bronze-fluid-pipe", 800.0,
      "reind-bliq-cond-steel-fluid-pipe", 1000.0,
      "reind-bliq-cond-tempered-glass-fluid-pipe", 250.0,

      /* <---------------- bliq-brd ----------------> */

      "reind-bliq-brd-primitive-fluid-pipe-bridge", 800.0,

      /* <---------------- bliq-aux ----------------> */

      "reind-bliq-aux-fluid-unloader", 1000.0,

      /* <---------------- bliq-stor ----------------> */

      "reind-bliq-stor-liquid-cell", 800.0,
      "reind-bliq-stor-liquid-tank", 1000.0,
      "reind-bliq-stor-gas-cylinder", 1000.0,

    ]),


  },




  "durability": {


    "cloggable": new Seq([

      /* <---------------- bliq-cond ----------------> */

      "reind-bliq-cond-wooden-fluid-pipe",
      "reind-bliq-cond-tempered-glass-fluid-pipe",

    ]),


    "corrosion": {


      "base": new Seq([
        "wood", 1.0,
        "copper", 1.5,
        "steel", 2.0,
        "stainlessSteel", 6.0,
        "glass", 10.0,
      ]),


      "specific": new Seq([

        /* <---------------- bliq-aux ----------------> */

        "reind-bliq-aux-fluid-unloader", 6.0,

        /* <---------------- bliq-stor ----------------> */

        "reind-bliq-stor-liquid-cell", 6.0,
        "reind-bliq-stor-liquid-tank", 15.0,
        "reind-bliq-stor-gas-cylinder", 15.0,

      ]),


    },



  },




  /*
   * NOTE:
   *
   * Only corrosion involved for now.
   */
  "group": {


    "wood": new Seq([

      /* <---------------- bliq-cond ----------------> */

      "reind-bliq-cond-wooden-fluid-pipe",

    ]),


    "copper": new Seq([

      /* <---------------- bliq-pump ----------------> */

      "reind-bliq-pump-primitive-fluid-pump",

      /* <---------------- bliq-cond ----------------> */

      "reind-bliq-cond-bronze-fluid-pipe",

      /* <---------------- bliq-brd ----------------> */

      "reind-bliq-brd-primitive-fluid-pipe-bridge",

      /* <---------------- bliq-stor ----------------> */

      "reind-bliq-stor-liquid-cell",

    ]),


    "steel": new Seq([

      /* <---------------- bliq-pump ----------------> */

      "reind-bliq-pump-piston-fluid-pump",

      /* <---------------- bliq-cond ----------------> */

      "reind-bliq-cond-steel-fluid-pipe",

      /* <---------------- bliq-aux ----------------> */

      "reind-bliq-aux-fluid-unloader",

      /* <---------------- bliq-stor ----------------> */

      "reind-bliq-stor-liquid-tank",
      "reind-bliq-stor-gas-cylinder",

    ]),


    "glass": new Seq([

      /* <---------------- bliq-cond ----------------> */

      "reind-bliq-cond-tempered-glass-fluid-pipe",

    ]),


  },




  "pollution": {


    "value": new Seq([

      /* <---------------- env_tree ----------------> */

      "reind-env-tree-shell-tree", -8.0,
      "reind-env-tree-dark-crab-tree", -12.0,
      "reind-env-tree-campfire-tree", -20.0,
      "reind-env-tree-dune-shield", -6.0,
      "reind-env-tree-depth-seeker", -12.0,
      "reind-env-tree-brown-snake", -8.0,
      "reind-env-tree-bleeder", -16.0,
      "reind-env-tree-umbrella-tree", -20.0,
      "reind-env-tree-green-scale", -10.0,
      "reind-env-tree-aerthcyst", -12.0,
      "reind-env-tree-marsh-cloud", -14.0,
      "reind-env-tree-red-root", -18.0,
      "reind-env-tree-salad-tree", -24.0,
      "reind-env-tree-aquatic-cloud", -18.0,
      "reind-env-tree-cyanofall", -10.0,
      "reind-env-tree-algasus", -12.0,
      "reind-env-tree-zenith", -24.0,
      "reind-env-tree-cliffsider", -8.0,
      "reind-env-tree-nester", -16.0,
      "reind-env-tree-elder-gem-tree", -26.0,
      "reind-env-tree-bush-rock-fern", -6.0,

      /* <---------------- blk_genericMiner ----------------> */

      "reind-min-dril-mechanical-drill", 4.0 / 4.0,
      "reind-min-dril-pneumatic-drill", 4.0 / 4.0,
      "reind-min-dril-sand-excavator", 27.0 / 9.0,
      "reind-min-dril-pneumatic-wall-drill", 4.0 / 4.0,
      "reind-min-dril-basic-impact-drill", 6.0 / 4.0,
      "reind-min-dril-titan-impact-drill", 40.0 / 16.0,
      "reind-min-harv-lumberjack", 1.5 / 1.0,
      "reind-min-misc-placer-miner", 27.0 / 9.0,

      /* <---------------- blk_genericFactory ----------------> */

      "reind-fac-air-air-collector", -2.0,
      "reind-fac-air-air-filter", -12.0 / 4.0,
      "reind-fac-proc-sawmill", 24.0 / 16.0,
      "reind-fac-sep-vibration-screen", 4.0 / 4.0,
      "reind-fac-misc-basic-chimney", 8.0 / 4.0,

      /* <---------------- blk_heatFactory ----------------> */

      "reind-fac-furn-primitive-glass-kiln", 27.0 / 9.0,

      /* <---------------- blk_recipeFactory ----------------> */

      "reind-fac-furn-kiln", 8.0 / 4.0,
      "reind-fac-furn-colossal-kiln", 72.0 / 16.0,
      "reind-fac-furn-primitive-sintering-furnace", 15.0 / 9.0,
      "reind-fac-furn-bloomery", 16.0 / 4.0,
      "reind-fac-furn-bricked-blast-furnace", 171.5 / 49.0,
      "reind-fac-furn-carbonization-kiln", 8.0 / 4.0,
      "reind-fac-furn-primitive-brick-kiln", 8.0 / 4.0,
      "reind-fac-furn-primitive-coke-oven", 12.0 / 4.0,
      "reind-fac-heat-furnace-heater", 16.0 / 4.0,
      "reind-fac-mill-jaw-crusher", 6.0 / 4.0,
      "reind-fac-mill-hammer-crusher", 13.5 / 9.0,
      "reind-fac-mill-mechanical-mill", 6.0 / 4.0,
      "reind-fac-mill-ball-mill", 9.0 / 9.0,
      "reind-fac-mix-v-mixer", 2.0 / 4.0,
      "reind-fac-proc-brick-press", 13.5 / 9.0,
      "reind-fac-proc-charcoal-rod-maker-m", 2.0 / 4.0,
      "reind-fac-proc-charcoal-rod-maker-r1", 2.0 / 4.0,
      "reind-fac-sep-dry-magnetic-separator", 13.5 / 9.0,
      "reind-fac-sep-mineral-jig-m", 8.0 / 4.0,
      "reind-fac-sep-mineral-jig-r1", 8.0 / 4.0,
      "reind-fac-misc-core-crafter", 6.0 / 4.0,

      /* <---------------- very specific zone ----------------> */

      "reind-dis-aux-item-incinerator", 8.0 / 4.0,

    ]),


  },




  /*
   * NOTE:
   *
   * Pre-defined schematics.
   */
  "matrix": {


    "multiBlock": new Seq([

      /* <---------------- fac-furn ----------------> */

      "reind-fac-furn-bricked-blast-furnace-controller", "reind-fac-furn-bricked-blast-furnace", new Seq([
        new Point2(-3, -3), "reind-def-wall-concrete-barricade",
        new Point2(-1, -3), "reind-def-wall-plate-wall-steel",
        new Point2(0, -3), "reind-def-wall-plate-wall-steel",
        new Point2(1, -3), "reind-def-wall-plate-wall-steel",
        new Point2(2, -3), "reind-def-wall-concrete-barricade",

        new Point2(-1, -2), "reind-def-wall-brick-wall-mullite",
        new Point2(0, -2), "reind-def-wall-brick-wall-mullite",
        new Point2(1, -2), "reind-def-wall-brick-wall-mullite",

        new Point2(-3, -1), "reind-def-wall-plate-wall-steel",
        new Point2(-2, -1), "reind-def-wall-brick-wall-mullite",
        new Point2(-1, -1), "reind-def-wall-brick-wall-silica",
        new Point2(0, -1), "reind-def-wall-brick-wall-silica",
        new Point2(1, -1), "reind-def-wall-brick-wall-silica",
        new Point2(2, -1), "reind-def-wall-brick-wall-mullite",
        new Point2(3, -1), "reind-def-wall-plate-wall-steel",

        new Point2(-3, 0), "reind-def-wall-plate-wall-steel",
        new Point2(-2, 0), "reind-def-wall-brick-wall-mullite",
        new Point2(-1, 0), "reind-def-wall-brick-wall-silica",
        new Point2(1, 0), "reind-def-wall-brick-wall-silica",
        new Point2(2, 0), "reind-def-wall-brick-wall-mullite",
        new Point2(3, 0), "reind-def-wall-plate-wall-steel",

        new Point2(-3, 1), "reind-def-wall-plate-wall-steel",
        new Point2(-2, 1), "reind-def-wall-brick-wall-mullite",
        new Point2(-1, 1), "reind-def-wall-brick-wall-silica",
        new Point2(0, 1), "reind-def-wall-brick-wall-silica",
        new Point2(1, 1), "reind-def-wall-brick-wall-silica",
        new Point2(2, 1), "reind-def-wall-brick-wall-mullite",
        new Point2(3, 1), "reind-def-wall-plate-wall-steel",

        new Point2(-3, 2), "reind-def-wall-concrete-barricade",
        new Point2(-1, 2), "reind-def-wall-brick-wall-mullite",
        new Point2(0, 2), "reind-def-wall-brick-wall-mullite",
        new Point2(1, 2), "reind-def-wall-brick-wall-mullite",
        new Point2(2, 2), "reind-def-wall-concrete-barricade",

        new Point2(-1, 3), "reind-def-wall-plate-wall-steel",
        new Point2(0, 3), "reind-def-wall-plate-wall-steel",
        new Point2(1, 3), "reind-def-wall-plate-wall-steel",
      ]),

      /* <---------------- fac-sep ----------------> */

      "reind-fac-sep-high-pressure-cyclone-separator-controller", "reind-fac-sep-high-pressure-cyclone-separator", new Seq([
        new Point2(-1, -1), "reind-def-wall-plate-wall-steel",
        new Point2(0, -1), "reind-def-wall-plate-wall-steel",
        new Point2(1, -1), "reind-fac-sep-cyclone-separator",

        new Point2(-1, 0), "reind-def-wall-plate-wall-steel",

        new Point2(-1, 1), "reind-fac-sep-cyclone-separator",
        new Point2(1, 1), "reind-def-wall-plate-wall-steel",
        new Point2(2, 1), "reind-def-wall-plate-wall-steel",

        new Point2(1, 2), "reind-def-wall-plate-wall-steel",
        new Point2(2, 2), "reind-def-wall-plate-wall-steel",
      ]),

      "reind-fac-sep-large-vibration-screen-controller", "reind-fac-sep-large-vibration-screen", new Seq([
        new Point2(-2, -2), "reind-def-wall-plate-wall-steel",
        new Point2(-1, -2), "reind-def-wall-plate-wall-steel",
        new Point2(0, -2), "reind-fac-sep-vibration-screen",
        new Point2(2, -2), "reind-def-wall-plate-wall-steel",

        new Point2(-2, -1), "reind-fac-sep-vibration-screen",
        new Point2(2, -1), "reind-def-wall-plate-wall-steel",

        new Point2(1, 0), "reind-fac-sep-vibration-screen",

        new Point2(-2, 1), "reind-def-wall-plate-wall-steel",
        new Point2(-1, 1), "reind-fac-sep-vibration-screen",

        new Point2(-2, 2), "reind-def-wall-plate-wall-steel",
        new Point2(1, 2), "reind-def-wall-plate-wall-steel",
        new Point2(2, 2), "reind-def-wall-plate-wall-steel",
      ]),

      /* <---------------- very specific zone ----------------> */

      "reind-fac-misc-colossal-router-controller", "reind-fac-misc-colossal-router", new Seq([
        new Point2(-2, -2), "reind-def-wall-wooden-barricade",
        new Point2(0, -2), "reind-def-wall-plate-wall-steel",
        new Point2(1, -2), "reind-def-wall-wooden-barricade",

        new Point2(0, -1), "reind-dis-aux-router",

        new Point2(-2, 0), "reind-def-wall-plate-wall-steel",
        new Point2(-1, 0), "reind-dis-aux-router",
        new Point2(1, 0), "reind-dis-aux-router",
        new Point2(2, 0), "reind-def-wall-plate-wall-steel",

        new Point2(-2, 1), "reind-def-wall-wooden-barricade",
        new Point2(0, 1), "reind-dis-aux-router",
        new Point2(1, 1), "reind-def-wall-wooden-barricade",

        new Point2(0, 2), "reind-def-wall-plate-wall-steel",
      ]),

    ]),


  },




};
exports.db = db;
