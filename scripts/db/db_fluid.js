const db = {




  "param": {


    /*
     * NOTE:
     *
     * Fluid heat is used to calculate heat damage to units and conduits.
     * {temperature} will be automatically overwrought.
     */
    "fHeat": [

      /* <---------------- liq-chem ----------------> */

      "reind-liq-chem-sulfuric-acid-fuming", 350.0,

      /* <---------------- gas-misc ----------------> */

      "reind-gas-misc-steam", 100.0,

      /* <---------------- gas-chem ----------------> */

      "reind-gas-chem-sulfur-trioxide", 350.0,

      /* <---------------- liq-int ----------------> */

      "reind-liq-int-melt-glass", 1250.0,

      /* <---------------- gas-int ----------------> */

    ],


    /*
     * NOTE:
     *
     * Well, I don't think this makes sense. Just in case needed afterwards.
     */
    "density": [

      /* <---------------- liq-ore ----------------> */

      "reind-liq-ore-brine", 1.05,
      "reind-liq-ore-sea-water", 1.02,
      "reind-liq-ore-crude-oil", 0.9,

      /* <---------------- liq-misc ----------------> */

      "reind-liq-misc-drilling-mud", 1.2,

      /* <---------------- liq-chem ----------------> */

      "reind-liq-chem-hydrochloric-acid", 1.0,

      "reind-liq-chem-sulfuric-acid", 1.0,
      "reind-liq-chem-sulfuric-acid-conc", 1.83,
      "reind-liq-chem-sulfuric-acid-fuming", 1.83,
      "reind-liq-chem-sulfurous-acid", 1.03,

      /* <---------------- gas-misc ----------------> */

      "reind-gas-misc-steam", 0.0006,

      /* <---------------- gas-chem ----------------> */

      "reind-gas-chem-chlorine", 0.00321,
      "reind-gas-chem-hydrogen", 0.000089,
      "reind-gas-chem-nitrogen", 0.00125,
      "reind-gas-chem-oxygen", 0.001429,
      "reind-gas-chem-ozone", 0.00146,

      "reind-gas-chem-carbon-dioxide", 0.001976,

      "reind-gas-chem-ammonia", 0.000771,

      "reind-gas-chem-hydrogen-sulfide", 0.00154,
      "reind-gas-chem-sulfur-dioxide", 0.0029275,
      "reind-gas-chem-sulfur-trioxide", 0.00197,

      /* <---------------- liq-int ----------------> */

      "reind-liq-int-melt-glass", 2.25,

    ],


    /*
     * NOTE:
     *
     * Simply real data.
     * {viscosity} will be automatically overwrought.
     */
    "viscosity": [

      /* <---------------- liq-ore ----------------> */

      "reind-liq-ore-water", 0.98,
      "reind-liq-ore-crude-oil", 9.0,

      /* <---------------- liq-was ----------------> */

      "reind-liq-was-pitch", 2800.0,
      "reind-liq-was-waste-slurry", 100.0,

      /* <---------------- liq-chem ----------------> */

      "reind-liq-chem-hydrochloric-acid", 1.9,

      "reind-liq-chem-sulfuric-acid-conc", 21.0,
      "reind-liq-chem-sulfuric-acid-fuming", 21.0,

    ],


  },




  "map": {


    "vent": [

      "reind-attr-vent-ammonia", "reind-gas-chem-ammonia",
      "reind-attr-vent-sour-gas", "reind-gas-ore-sour-gas",
      "reind-attr-vent-steam", "reind-gas-misc-steam",
      "reind-attr-vent-sulfur-dioxide", "reind-gas-chem-sulfur-dioxide",
      "reind-attr-underwater-vent-hydrogen-sulfide", "reind-gas-chem-hydrogen-sulfide",

    ],


  },




  /*
   * NOTE:
   *
   * Some properties will be applied according to fluid group.
   */
  "group": {


    "brine": [

      /* <---------------- liq-ore ----------------> */

      "reind-liq-ore-brine",
      "reind-liq-ore-sea-water",

      /* <---------------- liq-int ----------------> */

      "reind-liq-int-brine-purified"

    ],


    "basicAq": [

      /* <---------------- liq-was ----------------> */

      "reind-liq-was-waste-water-basic",

    ],


    "acidicAq": [

      /* <---------------- liq-chem ----------------> */

      "reind-liq-chem-hydrochloric-acid",
      "reind-liq-chem-sulfuric-acid",
      "reind-liq-chem-sulfurous-acid",

      /* <---------------- liq-was ----------------> */

      "reind-liq-was-waste-water-acidic",

    ],


    "alcohol": [],


    "basicAlc": [],


    "acidicAlc": [],


    "oil": [

      /* <---------------- liq-ore ----------------> */

      "reind-liq-ore-crude-oil",

    ],


    "basicOil": [],


    "acidicOil": [],


    "basicSub": [],


    "acidicSub": [

      /* <---------------- liq-chem ----------------> */

      "reind-liq-chem-sulfuric-acid-conc",
      "reind-liq-chem-sulfuric-acid-fuming",

    ],


    "basicGas": [

      /* <---------------- gas-chem ----------------> */

      "reind-gas-chem-ammonia",

    ],


    "acidicGas": [

      /* <---------------- gas-chem ----------------> */

      "reind-gas-chem-chlorine",

      "reind-gas-chem-hydrogen-sulfide",
      "reind-gas-chem-sulfur-dioxide",
      "reind-gas-chem-sulfur-trioxide",

    ],


    "slurry": [

      /* <---------------- liq-misc ----------------> */

      "reind-liq-misc-drilling-mud",

      /* <---------------- liq-was ----------------> */

      "reind-liq-was-waste-slurry",

    ],


    "melt": [],


    "stickyMelt": [

      /* <---------------- liq-int ----------------> */

      "reind-liq-int-melt-glass",

    ],


    // NOTE: Generated results aheat.


    /*
     * NOTE:
     *
     * Those will trigger short circuit, act like water in reactions, and feed carnage plasma.
     */
    "aqueous": [

      /* <---------------- liq-ore ----------------> */

      "reind-liq-ore-water",

      /* <---------------- liq-was ----------------> */

      "reind-liq-was-waste-water",

      /* <---------------- gas-misc ----------------> */

      "reind-gas-misc-steam",

    ],


    "conductive": [],


  },




  /*
   * NOTE:
   *
   * Some fluids may have special properties that cannot be described by groups.
   */
  "fTag": {


    "ammoniacal": [

      /* <---------------- gas-chem ----------------> */

      "reind-gas-chem-ammonia",

    ],


    "chloric": [

      /* <---------------- gas-chem ----------------> */

      "reind-gas-chem-chlorine",

    ],


    "fluoric": [],


    "oxidative": [

      /* <---------------- liq-chem ----------------> */

      "reind-liq-chem-sulfuric-acid-conc",
      "reind-liq-chem-sulfuric-acid-fuming",

      /* <---------------- gas-chem ----------------> */

      "reind-gas-chem-ozone",

      "reind-gas-chem-sulfur-trioxide",

    ],


    "dehydrative": [

      /* <---------------- liq-chem ----------------> */

      "reind-liq-chem-sulfuric-acid-conc",
      "reind-liq-chem-sulfuric-acid-fuming",

      /* <---------------- gas-chem ----------------> */

      "reind-gas-chem-sulfur-trioxide",

    ],


    "oil": [

      /* <---------------- liq-chem ----------------> */

      "reind-liq-chem-tolunene",

    ],


  },




  "corrosion": {


    /*
     * NOTE:
     *
     * Basic params for corrosion power.
     * These are default values for fluids in a particular fluid group.
     */
    "base": [
      "brine", 1.0,
      "basicAq", 1.35,
      "acidicAq", 1.35,
      "basicOil", 1.2,
      "acidicOil", 1.2,
      "basicSub", 1.25,
      "acidicSub", 1.25,
      "basicGas", 1.7,
      "acidicGas", 1.7,
    ],


    /*
     * NOTE:
     *
     * The main multiplier on final damage dealt by corrosion.
     * Format: {matGrp}, {fGrp}, {scl}.
     */
    "scale": [
      "wood", "basicAq", 5.0,
      "wood", "acidicAq", 5.0,
      "wood", "basicOil", 7.0,
      "wood", "acidicOil", 7.0,
      "wood", "acidicSub", 5.0,
      "wood", "basicSub", 5.0,
      "wood", "basicGas", 5.0,
      "wood", "acidicGas", 5.0,

      "iron", "brine", 9.0,
      "iron", "acidicAq", 2.0,
      "iron", "acidicOil", 2.0,
      "iron", "acidicSub", 2.0,
      "iron", "acidicGas", 3.0,

      "steel", "brine", 4.0,
      "steel", "acidicAq", 1.5,
      "steel", "acidicOil", 1.5,
      "steel", "acidicSub", 1.5,
      "steel", "acidicGas", 2.0,

      "galvanizedSteel", "acidicAq", 1.5,
      "galvanizedSteel", "acidicOil", 1.5,
      "galvanizedSteel", "acidicSub", 1.5,
      "galvanizedSteel", "acidicGas", 2.0,

      "stainlessSteel", "brine", 4.0,

      "cement", "brine", 5.0,
      "cement", "acidicAq", 2.0,
      "cement", "acidicOil", 2.0,
      "cement", "acidicSub", 2.0,
      "cement", "acidicGas", 3.0,

      "rubber", "acidicSub", 1.5,
      "rubber", "acidicGas", 2.0,
      "rubber", "basicSub", 1.5,
      "rubber", "basicGas", 2.0,
    ],


    /*
     * NOTE:
     *
     * Extra multiplier based on fluid tags, which may turn some regular fluids corrosive, e.g. ozone.
     * Format: {matGrp}, {fTag}, {scl}.
     */
    "tagScale": [
      "wood", "oxidative", 5.0,
      "wood", "dehydrative", 5.0,

      "copper", "ammoniacal", 4.0,
      "copper", "chloric", 4.0,

      "lead", "oxidative", 3.0,

      "glass", "fluoric", 12.0,

      "rubber", "oxidative", 4.0,
      "rubber", "fluoric", 6.0,
      "rubber", "oil", 12.0,
    ],


    /*
     * NOTE:
     *
     * The corrosion power used for a specific fluid.
     * If assigned here, default value won't be used.
     */
    "specific": [

      /* <---------------- liq-ore ----------------> */

      "reind-liq-ore-sea-water", 0.7,

      /* <---------------- liq-chem ----------------> */

      "reind-liq-chem-hydrochloric-acid", 1.7,

      "reind-liq-chem-sulfuric-acid", 1.7,
      "reind-liq-chem-sulfuric-acid-conc", 0.7,
      "reind-liq-chem-sulfuric-acid-fuming", 2.1,
      "reind-liq-chem-sulfurous-acid", 1.5,

      /* <---------------- gas-chem ----------------> */

      "reind-gas-chem-ammonia", 0.3,

      "reind-gas-chem-sulfur-trioxide", 2.0,

    ],


  },




  "efficiency": {


    "whitelist": [

      /* <---------------- pow-econd ----------------> */

      "reind-pow-econd-transmission-box",

    ],


    "noCap": [

      "reind-effc-cond-heat",

    ],


  },




  "reaction": {


    "map": [

      /* <---------------- liq-chem[inorganic] ----------------> */

      "reind-liq-chem-sulfuric-acid-conc", "ANY: Water", "evaporation",
      "reind-liq-chem-sulfuric-acid-fuming", "ANY: Water", "evaporation",

    ],


  },




};

db["group"]["aqueous"]
.pushAll(db["group"]["brine"])
.pushAll(db["group"]["basicAq"])
.pushAll(db["group"]["acidicAq"])
.pushAll(db["group"]["slurry"]);

db["group"]["conductive"]
.pushAll(db["group"]["aqueous"])
.pushAll(db["group"]["melt"])
.pushAll(db["group"]["stickyMelt"]);

exports.db = db;
