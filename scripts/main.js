// Start: Require clusters
  require("cfg/cfg_attribute");
  require("cfg/cfg_item");
  require("cfg/cfg_planet");
  const cfg_sector = require("cfg/cfg_sector");
  require("blk/blk_boiler");
  require("blk/blk_distribution");
  require("blk/blk_fieldCrafter");
  require("blk/blk_heatBlock");
  require("blk/blk_liquidBlock");
  require("blk/blk_manualGenerator");
  require("blk/blk_pollutionCrafter");
  require("blk/blk_powerBlock");
  require("blk/blk_rangeAttrCrafter");
  require("blk/blk_storage");
  require("blk/blk_tree");
  require("ct/ct_effc");
  require("ct/ct_fluid");
  require("ct/ct_status");
  const ct_unit = require("ct/ct_unit");
  require("ct/ct_weather");
  require("module/module_pollution");
// End


// Start: Random tips
  const list_tips = new Seq();
  let i = 1;
  while(Core.bundle.has("reindTips-" + i + ".name")) {
    list_tips.add(Core.bundle.get("reindTips-" + i + ".name"));
    i++
  };


  function tips_getRandom() {
    var id = Math.round(Mathf.random(list_tips.size - 1));
    return list_tips.get(id);
  };
// End


// Start: Dialogs
  function dialogSet_welcome() {
    Sounds.wave.play();

    var dialog = new BaseDialog("@info.reind-info-welcome.name");

    // Adding contents
    dialog.cont.add("@info.reind-info-welcome.description").row();
    dialog.cont.row();
    dialog.cont.add("\n\n").row();
    dialog.cont.add("[orange]" + tips_getRandom() + "[white]").row();
    dialog.cont.row();
    dialog.cont.add("\n\n").row();
    dialog.cont.row();

    // Button: OK
    dialog.cont.button("@ok", run(() => {
      Sounds.door.play();
      cfg_sector.setLDM_weatherPreset(false);
      ct_unit.setLDM_unit(false);
      dialog.hide();
    })).size(150, 50);
    dialog.cont.row();

    // Button: No Particles
    dialog.cont.button("@reind-no-particles.name", run(() => {
      Sounds.shootSmite.play();
      cfg_sector.setLDM_weatherPreset(true);
      ct_unit.setLDM_unit(true);
      dialog.hide();
    })).size(150, 50);
    dialog.cont.row();

    // Done
    dialog.show();
  };
// End


Events.run(MusicRegisterEvent, () => {
  dialogSet_welcome();
});
