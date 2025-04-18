const rc = {
  "parent": "reind-fac-misc-generic-inlet",

  "recipes": [


    /* ========================================
      Section: Special
    ======================================== */


    /* <---------------- ball impact effc ----------------> */


    // Steel Ball
    {
      "icon": "reind-effc-effc-ball-impact",
      "category": "special",
      "randInputs": [
        "reind-item-cons-ball-steel", 1, 0.1,
      ],
      "outputs": [
        "reind-effc-effc-ball-impact", 0.01666667,
      ],
      "timeScale": 2.0,
      "tooltip": "using-steel-ball",
    },


    /* <---------------- gas filter effc ----------------> */


    // Charcoal
    {
      "icon": "reind-effc-effc-gas-filter",
      "category": "special",
      "randInputs": [
        "reind-item-bio-charcoal", 1, 0.5,
      ],
      "outputs": [
        "reind-effc-effc-gas-filter", 0.01666667,
      ],
      "tooltip": "using-charcoal",
    },


    // Active Carbon
    {
      "icon": "reind-effc-effc-gas-filter",
      "category": "special",
      "randInputs": [
        "reind-item-chem-active-carbon", 1, 0.1,
      ],
      "outputs": [
        "reind-effc-effc-gas-filter", 0.01666667,
      ],
      "tooltip": "using-active-carbon",
    },


    /* <---------------- packed tower effc ----------------> */


    // Steel Pall Ring
    {
      "icon": "reind-effc-effc-packed-tower",
      "category": "special",
      "randInputs": [
        "reind-item-cons-pall-ring-steel", 1, 0.2,
      ],
      "outputs": [
        "reind-effc-effc-packed-tower", 0.01666667,
      ],
      "timeScale": 2.0,
      "tooltip": "using-steel-pall-ring",
    },


    // Stainless Steel Pall Ring
    {
      "icon": "reind-effc-effc-packed-tower",
      "category": "special",
      "randInputs": [
        "reind-item-cons-pall-ring-stainless-steel", 1, 0.1,
      ],
      "outputs": [
        "reind-effc-effc-packed-tower", 0.01666667,
      ],
      "timeScale": 2.0,
      "tooltip": "using-stainless-steel-pall-ring",
    },


  ],
};
exports.rc = rc;
