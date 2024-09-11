import Text "mo:base/Text";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor {
  type GuideSection = {
    title: Text;
    content: Text;
  };

  stable var talentPoints: ?[GuideSection] = null;
  stable var statPriority: ?[GuideSection] = null;
  stable var rotation: ?[GuideSection] = null;
  stable var cooldowns: ?[GuideSection] = null;

  public query func getTalentPoints(): async [GuideSection] {
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
      { title = "Tier 15"; content = "Choose 'Eye of the Tiger' for consistent damage and healing." },
      { title = "Tier 25"; content = "'Chi Torpedo' is great for mobility in dungeons." },
      { title = "Tier 35"; content = "'Light Brewing' reduces the cooldown of your Brews." }
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
