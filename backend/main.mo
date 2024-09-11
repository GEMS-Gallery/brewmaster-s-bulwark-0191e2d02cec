import Nat "mo:base/Nat";

import Text "mo:base/Text";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor {
  type GuideSection = {
    title: Text;
    content: Text;
  };

  type TalentTree = {
    name: Text;
    talents: [GuideSection];
  };

  stable var talentPoints: ?[TalentTree] = null;
  stable var statPriority: ?[GuideSection] = null;
  stable var rotation: ?[GuideSection] = null;
  stable var cooldowns: ?[GuideSection] = null;

  public query func getTalentPoints(): async [TalentTree] {
    Option.get(talentPoints, [])
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
    talentPoints := ?[
      {
        name = "Monk";
        talents = [
          { title = "Chi Burst"; content = "Hurls a torrent of Chi energy up to 40 yds forward, dealing (30% of Attack power) Nature damage to all enemies, and (30% of Attack power) healing to the Monk and all allies in its path. Generates 1 Chi per enemy hit, up to 2 Chi." },
          { title = "Eye of the Tiger"; content = "Tiger Palm also applies Eye of the Tiger, dealing (4.5% of Attack power) Nature damage to the enemy and (4.5% of Attack power) healing to you over 8 sec." },
          { title = "Chi Wave"; content = "A wave of Chi energy flows through friends and foes, dealing (20% of Attack power) Nature damage or (20% of Attack power) healing. Bounces up to 7 times to targets within 25 yards." }
        ];
      },
      {
        name = "Brewmaster";
        talents = [
          { title = "Celestial Flames"; content = "Keg Smash reduces the remaining cooldown on your Brews by 1 additional sec." },
          { title = "Improved Purifying Brew"; content = "Purifying Brew now has 2 charges." },
          { title = "Stagger"; content = "You shrug off attacks, delaying a portion of Physical damage based on your Agility, instead taking it over 10 sec." }
        ];
      },
      {
        name = "Hero";
        talents = [
          { title = "Diffuse Magic"; content = "Reduces magic damage you take by 60% for 6 sec, and transfers all currently active harmful magical effects on you back to their original caster if possible." },
          { title = "Dampen Harm"; content = "Reduces all damage you take by 20% to 50% for 10 sec, with larger attacks being reduced by more." },
          { title = "Summon Black Ox Statue"; content = "Summons a Black Ox Statue at the target location for 15 min, pulsing threat to all enemies within 20 yards. You may cast Provoke on the statue to taunt all enemies near the statue." }
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
