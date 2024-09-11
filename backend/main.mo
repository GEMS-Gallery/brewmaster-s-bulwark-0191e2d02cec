import Text "mo:base/Text";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor {
  type TalentBuild = {
    name: Text;
    description: Text;
    treeLink: Text;
  };

  type TalentSection = {
    title: Text;
    builds: [TalentBuild];
  };

  type GuideSection = {
    title: Text;
    content: Text;
  };

  stable var talentSections: ?[TalentSection] = null;
  stable var statPriority: ?[GuideSection] = null;
  stable var rotation: ?[GuideSection] = null;
  stable var cooldowns: ?[GuideSection] = null;

  public query func getTalentSections(): async [TalentSection] {
    Option.get(talentSections, [])
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
    talentSections := ?[
      {
        title = "Monk Talents";
        builds = [
          {
            name = "Standard Monk Build";
            description = "A versatile build suitable for most content.";
            treeLink = "https://www.wowhead.com/classic/talent-calc/monk/...";
          }
        ];
      },
      {
        title = "Brewmaster Talents";
        builds = [
          {
            name = "Defensive Brewmaster";
            description = "Focuses on survivability and damage mitigation.";
            treeLink = "https://www.wowhead.com/classic/talent-calc/monk/brewmaster/...";
          }
        ];
      },
      {
        title = "Hero Talents";
        builds = [
          {
            name = "Balanced Hero Build";
            description = "A well-rounded build for various situations.";
            treeLink = "https://www.wowhead.com/classic/talent-calc/monk/hero/...";
          }
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
