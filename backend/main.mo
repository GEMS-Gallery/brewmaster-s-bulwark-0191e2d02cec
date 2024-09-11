import Bool "mo:base/Bool";
import Char "mo:base/Char";
import Nat "mo:base/Nat";
import Order "mo:base/Order";

import Text "mo:base/Text";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor {
  type Talent = {
    name: Text;
    description: Text;
    recommended: Bool;
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
        name = "Class Talents";
        talents = [
          { name = "Eye of the Tiger"; description = "Tiger Palm also applies Eye of the Tiger, dealing Nature damage to the enemy and healing you over 8 sec."; recommended = true },
          { name = "Chi Wave"; description = "A wave of Chi energy flows through friends and foes, dealing Nature damage or healing."; recommended = false },
          { name = "Chi Burst"; description = "Hurls a torrent of Chi energy up to 40 yds forward, dealing Nature damage to all enemies, and healing you and all allies in its path."; recommended = false },
          { name = "Celerity"; description = "Reduces the cooldown of Roll by 5 sec and increases its maximum charges by 1."; recommended = true },
          { name = "Tiger's Lust"; description = "Increases a friendly target's movement speed by 70% for 6 sec and removes all roots and snares."; recommended = false },
          { name = "Summon White Tiger Statue"; description = "Summons a White Tiger Statue at the target location for 30 sec, pulsing every 2 sec, healing up to 3 allies within 10 yds for (40% of Spell power)."; recommended = true }
        ];
      },
      {
        name = "Specialization Talents";
        talents = [
          { name = "Celestial Flames"; description = "Keg Smash reduces the remaining cooldown on your Brews by 1 additional sec."; recommended = true },
          { name = "Improved Purifying Brew"; description = "Purifying Brew now has 2 charges."; recommended = true },
          { name = "Improved Celestial Brew"; description = "Celestial Brew's barrier now absorbs at least 25% of your maximum health in damage."; recommended = true },
          { name = "Shuffle"; description = "Your Stagger now reduces 10% more damage."; recommended = true },
          { name = "Evasive Stride"; description = "You heal for 20% of your Staggered damage when you move."; recommended = true },
          { name = "Exploding Keg"; description = "Hurls a flaming keg at the target location, dealing Fire damage to nearby enemies and causing them to miss their melee attacks for 3 sec."; recommended = false }
        ];
      },
      {
        name = "Capstone Talents";
        talents = [
          { name = "Weapons of Order"; description = "For 30 sec, your Mastery is increased by 10%, Keg Smash cooldown is reset instantly and its damage is increased by 50%."; recommended = true },
          { name = "Invoke Niuzao, the Black Ox"; description = "Summons an effigy of Niuzao for 25 sec. Niuzao attacks your primary target and taunts it. When you Stagger damage, 25% of the amount Staggered is instead dealt to enemies near Niuzao."; recommended = false },
          { name = "Charred Passions"; description = "Breath of Fire ignites the ground for 6 sec, dealing additional periodic Fire damage to enemies who stand within it."; recommended = true }
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
