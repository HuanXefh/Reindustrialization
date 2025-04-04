/*
  ========================================
  Section: Definition
  ========================================
*/


  // Part: Import
    const TEMPLATE = require("reind/blk/blk_messageBlock");
  // End


/*
  ========================================
  Section: Region
  ========================================
*/


  // Part: log-msg
    const logMsg_messageCenter = extend(MessageBlock, "log-msg-message-center", {
      setStats() {
        this.super$setStats();
        TEMPLATE.setStats(this);
      },
    });
    logMsg_messageCenter.buildType = () => extend(MessageBlock.MessageBuild, logMsg_messageCenter, {
      updateTile() {
        this.super$updateTile();
        TEMPLATE.updateTile(this);
      },
    });
    exports.logMsg_messageCenter = logMsg_messageCenter;
  // End



Events.run(ClientLoadEvent, () => {
  Log.info("REIND: ct_blk_messageBlock.js loaded.");
});
