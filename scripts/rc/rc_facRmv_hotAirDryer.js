const gi = [
  "reind-gas-misc-air", 0.2,
];


const rc = {
  "parent": "reind-fac-rmv-hot-air-dryer",

  "recipes": [


    /* ========================================
      Section: Drying
    ======================================== */


    /* <---------------- biotic ----------------> */


    // Powdered Biomass
    {
      "icon": "reind-item-int-powdered-biomass",
      "category": "drying",
      "inputs": [
        "reind-item-int-powdered-biomass", 10,
      ].concat(gi),
      "outputs": [
        "reind-item-int-powdered-biomass-dried", 10,
      ],
    },


    // Sawdust
    {
      "icon": "reind-item-bio-sawdust",
      "category": "drying",
      "inputs": [
        "reind-item-bio-sawdust", 10,
      ].concat(gi),
      "outputs": [
        "reind-item-int-sawdust-dried", 10,
      ],
    },


    /* <---------------- chemical ----------------> */


  ],
};
exports.rc = rc;
