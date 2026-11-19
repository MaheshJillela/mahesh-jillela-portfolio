export const gameWork = [
  {
    id: "seariches",
    name: "Sea Riches",
    family: "Slots",
    mechanics: [
      "Core reels",
      "Reel expansion",
      "Lock & respins",
      "Free spins",
      "Hold & Spin",
      "Buy feature",
    ],
  },
  {
    id: "eyeofthereels",
    name: "Eye of the Reels",
    family: "Slots",
    mechanics: [
      "Core reels",
      "Reel expansion",
      "Lock & respins",
      "Free spins",
      "Hold & Spin",
      "Buy feature",
    ],
  },
  {
    id: "piratesawakening",
    name: "Pirates Awakening",
    family: "Slots",
    mechanics: [
      "Core reels",
      "Reel expansion",
      "Free spins",
      "Hold & Spin",
      "Buy feature",
      "Ladder presentation",
    ],
  },
  {
    id: "skyx",
    name: "SkyX",
    family: "Crash / instant",
    mechanics: ["Round lifecycle", "Multiplier curve", "Bet / cashout", "Autoplay"],
  },
  {
    id: "sky-sniffer",
    name: "Sky Sniffer",
    family: "Crash / instant",
    mechanics: ["Round lifecycle", "Multiplier curve", "Bet / cashout", "Autoplay"],
  },
  {
    id: "chickenluck",
    name: "Chickenluck",
    family: "Crash / instant",
    mechanics: ["Step progression", "Jump animation", "Bet / cashout"],
  },
  {
    id: "nflkick",
    name: "NFL Kick",
    family: "Crash / instant",
    mechanics: ["Kick interaction", "Result reveal", "Autoplay", "GA4 events"],
  },
] as const;

export const launchFlow = [
  {
    title: "Partner lobby",
    action: "Select a game",
    detail: "Client entry from the partner lobby.",
  },
  {
    title: "Launch context",
    action: "Resolve game + context",
    detail: "Game selection, language, device and demo / real mode.",
  },
  {
    title: "Launch request",
    action: "Request a session",
    detail: "Authenticated launch request with response and error handling.",
  },
  {
    title: "Game client",
    action: "Bind session + start",
    detail: "Validate the session response, store the client session and open the game.",
  },
] as const;

export const analyticsEvents = [
  "game_select",
  "intro_closed",
  "spin_clicked",
  "bet_placed",
  "cashout",
  "crashed",
  "autoplay_started",
  "sound_muted",
] as const;
