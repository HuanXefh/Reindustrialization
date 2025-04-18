const go = [
  "reind-effc-effc-bf-fuel", 0.03333333,
];
const go1 = [
  "reind-effc-effc-rk-fuel", 0.03333333,
];


const rc = {
  "parent": "reind-fac-misc-fuel-inlet",

  "recipes": [


    /* ========================================
      Section: Blast Furnace
    ======================================== */


    // Peat
    {
      "icon": "reind-item-ore-peat",
      "category": "blast-furnace",
      "randInputs": [
        "reind-item-ore-peat", 10, 0.9,
      ],
      "outputs": [].concat(go),
    },


    // Lignite
    {
      "icon": "reind-item-ore-lignite",
      "category": "blast-furnace",
      "randInputs": [
        "reind-item-ore-lignite", 10, 0.75,
      ],
      "outputs": [].concat(go),
    },


    // Charcoal
    {
      "icon": "reind-item-bio-charcoal",
      "category": "blast-furnace",
      "randInputs": [
        "reind-item-bio-charcoal", 10, 0.6,
      ],
      "outputs": [].concat(go),
    },


    // Coal
    {
      "icon": "reind-item-chem-coal",
      "category": "blast-furnace",
      "randInputs": [
        "reind-item-chem-coal", 10, 0.5,
      ],
      "outputs": [].concat(go),
    },


    // Semicoke
    {
      "icon": "reind-item-chem-semicoke",
      "category": "blast-furnace",
      "randInputs": [
        "reind-item-chem-semicoke", 10, 0.4,
      ],
      "outputs": [].concat(go),
    },


    // Coke
    {
      "icon": "reind-item-chem-coke",
      "category": "blast-furnace",
      "randInputs": [
        "reind-item-chem-coke", 10, 0.3,
      ],
      "outputs": [].concat(go),
    },


    /* ========================================
      Section: Rotary Kiln
    ======================================== */


    // Peat
    {
      "icon": "reind-item-ore-peat",
      "category": "rotary-kiln",
      "randInputs": [
        "reind-item-ore-peat", 15, 0.9,
      ],
      "outputs": [].concat(go1),
    },


    // Lignite
    {
      "icon": "reind-item-ore-lignite",
      "category": "rotary-kiln",
      "randInputs": [
        "reind-item-ore-lignite", 15, 0.75,
      ],
      "outputs": [].concat(go1),
    },


    // Charcoal
    {
      "icon": "reind-item-bio-charcoal",
      "category": "rotary-kiln",
      "randInputs": [
        "reind-item-bio-charcoal", 15, 0.6,
      ],
      "outputs": [].concat(go1),
    },


    // Coal
    {
      "icon": "reind-item-chem-coal",
      "category": "rotary-kiln",
      "randInputs": [
        "reind-item-chem-coal", 15, 0.5,
      ],
      "outputs": [].concat(go1),
    },


    // Semicoke
    {
      "icon": "reind-item-chem-semicoke",
      "category": "rotary-kiln",
      "randInputs": [
        "reind-item-chem-semicoke", 15, 0.4,
      ],
      "outputs": [].concat(go1),
    },


    // Coke
    {
      "icon": "reind-item-chem-coke",
      "category": "rotary-kiln",
      "randInputs": [
        "reind-item-chem-coke", 15, 0.3,
      ],
      "outputs": [].concat(go1),
    },


  ],
};
exports.rc = rc;
