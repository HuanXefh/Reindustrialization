const mdl_effect = require("reind/mdl/mdl_effect");


const gi = [
  "reind-effc-cond-pressure", 0.01666667,
];


const rc = {
  "parent": "reind-fac-sep-high-pressure-cyclone-separator",

  "recipes": [


    /* ========================================
      Section: Special
    ======================================== */


    // Dust Recycling Effc
    {
      "icon": "reind-effc-effc-dust-recycling",
      "category": "special",
      "inputs": [].concat(gi),
      "outputs": [
        "reind-effc-effc-dust-recycling", 0.06666667,
      ],
    },


    // Dust Recycling Effc (Overdriven)
    {
      "icon": "reind-effc-effc-dust-recycling",
      "category": "special",
      "inputs": [].concat(gi),
      "outputs": [
        "reind-effc-effc-dust-recycling", 0.13333333,
      ],
      "tooltip": "overdriven",
      "craftScript": function() {
        var dmg = this.maxHealth * 0.0225;
        this.damagePierce(dmg);
        mdl_effect.damageAt(this, dmg);
        mdl_effect.flashAt(this);
      },
    },


    // Sand
    {
      "icon": "reind-item-ore-sand",
      "category": "special",
      "inputs": [
        "reind-gas-misc-air", 0.4,
      ].concat(gi),
      "randOutputs": [
        "reind-item-ore-sand", 6, 0.25,
        "reind-item-ore-sand-basaltic", 4, 0.125,
      ],
    },


  ],
};
exports.rc = rc;
