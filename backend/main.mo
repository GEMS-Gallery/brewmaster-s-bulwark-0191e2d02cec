import Bool "mo:base/Bool";
import Nat "mo:base/Nat";

import Text "mo:base/Text";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor {
  type Talent = {
    id: Text;
    name: Text;
    description: Text;
    recommended: Bool;
    row: Nat;
    column: Nat;
  };

  type TalentTree = {
    name: Text;
    talents: [Talent];
  };

  type GuideSection = {
    title: Text;
    content: Text;
  };

  stable var talentTrees: ?[TalentTree] = null;
  stable var statPriority: ?[GuideSection] = null;
  stable var rotation: ?[GuideSection] = null;
  stable var cooldowns: ?[GuideSection] = null;

  public query func getTalentTrees(): async [TalentTree] {
    Option.get(talentTrees, [])
  };

  public query func getStatPriority(): async [GuideSection] {
    Option.get(statPriority, [])
  };

  public query func getRotation(): async [GuideSection] {
    Option.get(rotation, [])
  };

  public query func getCooldowns(): async [GuideSection] {
    Option.get(cooldowns, [])
  };

  // Initialize guide data
  func initGuideData() {
    talentTrees := ?[
      {
        name = "Monk Hero Talents";
        talents = [
          { id = "1"; name = "Strength of Spirit"; description = "Increases your Stamina by 5%."; recommended = true; row = 0; column = 1 },
          { id = "2"; name = "Resonant Fists"; description = "Your abilities have a chance to resonate with Shaohao's teachings, dealing additional Nature damage."; recommended = true; row = 1; column = 0 },
          { id = "3"; name = "Calming Presence"; description = "Reduces damage taken by nearby allies by 3%."; recommended = false; row = 1; column = 2 },
          { id = "4"; name = "Close to Heart"; description = "Increases your maximum health by 5%."; recommended = true; row = 2; column = 1 },
          { id = "5"; name = "Graceful Exit"; description = "Roll and Chi Torpedo have 1 additional charge."; recommended = true; row = 3; column = 0 },
          { id = "6"; name = "Vigorous Expulsion"; description = "Expel Harm's healing is increased by 20%."; recommended = false; row = 3; column = 2 },
          { id = "7"; name = "Profound Rebuttal"; description = "Increases your Parry chance by 3%."; recommended = true; row = 4; column = 1 },
          { id = "8"; name = "Improved Vivify"; description = "Vivify healing increased by 15%."; recommended = false; row = 5; column = 0 },
          { id = "9"; name = "Improved Detox"; description = "Detox now removes an additional harmful effect."; recommended = true; row = 5; column = 2 }
        ];
      }
    ];

    statPriority := ?[
      { title = "Primary Stats"; content = "Agility > Stamina" },
      { title = "Secondary Stats"; content = "Versatility > Mastery > Critical Strike > Haste" }
    ];

    rotation := ?[
      { title = "Opener"; content = "1. Keg Smash\n2. Breath of Fire\n3. Blackout Kick\n4. Tiger Palm" },
      { title = "Core Rotation"; content = "- Keg Smash on cooldown\n- Breath of Fire on cooldown\n- Blackout Kick\n- Tiger Palm as filler" }
    ];

    cooldowns := ?[
      { title = "Purifying Brew"; content = "Use to clear Stagger damage. Aim to use at high Stagger levels." },
      { title = "Celestial Brew"; content = "Strong absorb shield. Use when expecting high damage." },
      { title = "Zen Meditation"; content = "90% damage reduction for 8 seconds. Use for big hits." }
    ];
  };

  // Call initGuideData to set up initial data
  initGuideData();
}
