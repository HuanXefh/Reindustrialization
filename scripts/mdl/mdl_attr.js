/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const mdl_game = require("reind/mdl/mdl_game");
  // End


  // Part: Base
    const _attr = function(attr_gn) {
      var val = null;

      if(typeof attr_gn == "string") val = attr_gn;
      if(attr_gn instanceof Attribute) val = attr_gn.toString();

      return val;
    };
    exports._attr = _attr;
  // End


  // Part: Stat
    /*
     * NOTE:
     *
     * Returns the localized name for attribute, used mainly for stats.
     * Attributes have no translation in vanilla game, since there's no need.
     */
    const _attrVal = function(attr_gn) {
      var nmAttr = _attr(attr_gn);

      return Core.bundle.get("attr." + nmAttr + ".name");
    };
    exports._attrVal = _attrVal;
  // End


  // Part: Sum
    const _sumAttr = function(blk, t, attr_gn) {
      var nmAttr = _attr(attr_gn);

      return blk.sumAttribute(Attribute.get(nmAttr), t.x, t.y);
    };
    exports._sumAttr = _sumAttr;


    const _sumAttr_li = function(li_ot, attr_gn) {
      var attr = 0.0;
      var nmAttr = _attr(attr_gn);

      li_ot.each(ot => attr += ot.floor().attributes.get(Attribute.get(nmAttr)));

      return attr;
    };
    exports._sumAttr_li = _sumAttr_li;


    const _sumAttr_rect = function(blk, t, attr_gn, r) {
      if(r == null) r = 0;

      var nmAttr = _attr(attr_gn);

      return _sumAttr_li(mdl_game._liTileRect(t, r, blk.size), nmAttr);
    };
    exports._sumAttr_rect = _sumAttr_rect;
  // End


  // Part: Condition
    const _limit = function(blk, avLimit) {
      if(avLimit == null) avLimit = 1.0;

      return Math.pow(blk.size, 2) * avLimit;
    };
    exports._limit = _limit;
  // End


  // Part: Pair
    /*
     * NOTE:
     *
     * Gets the highest attribute sum in a mapper list, from a list of tiles.
     * Returns an attribute pair as {[nmAttr, attr]}.
     *
     * Available mapper lists:
     * {db_item.db["map"]["rock"]} ... attribute -> rock floor
     * {db_item.db["map"]["bush"]} ... attribute -> bush
     * {db_fluid.db["map"]["vent"]} ... attribute -> vent
     */
    const _attrPair = function(map, li_ot) {
      var attr = 0.0;
      var nmAttr = null;
      var cap = map.size;
      if(cap > 0) {
        for(let i = 0; i < cap; i++) {
          if(i % 2 != 0) continue;

          var tmpNmAttr = map.get(i);
          var tmpAttr = _sumAttr_li(li_ot, tmpNmAttr);
          if(tmpAttr > attr) {
            nmAttr = tmpNmAttr;
            attr = tmpAttr;
          };
        };
      };

      return (nmAttr == null) ? null : [nmAttr, attr];
    };
    exports._attrPair = _attrPair;
  // End


  // Part: List
    /*
     * NOTE:
     *
     * Gets attribute sum for each attribute in a mapper list.
     * Returns a list of {nmAttr} and {attr}.
     */
    const _liSumAttr = function(map, li_ot) {
      var li = new Seq();

      var cap = map.size;
      if(cap > 0) {
        for(let i = 0; i < cap; i++) {
          if(i % 2 != 0) continue;

          var nmAttr = map.get(i);
          var attr = sumAttr_li(li_ot, nmAttr);

          li.add(nmAttr, attr);
        };
      };

      return li;
    };
    exports._liSumAttr = _liSumAttr;
  // End


  // Part: Special
    const _wind = function(t, scl) {
      if(scl == null) scl = 1.0;

      var attr = (1.0 - Math.pow(Math.sin(Time.time / 6400.0 / scl), 2) * 0.7) * Attribute.get("reind-attr-env-wind").env();
      if(t != null && attr > 0.0) attr += Mathf.randomSeed(t.pos(), -2, 2) * 0.1;

      if(attr < 0.0) attr = 0.0;
      return attr;
    };
    exports._wind = _wind;
  // End


Events.run(ClientLoadEvent, () => {
  Log.info("REIND: mdl_attr.js loaded.");
});
