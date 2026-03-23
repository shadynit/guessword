import { WordCategory } from "./gameTypes";

interface WordEntry {
  word: string;
  adult: boolean;
  category: WordCategory;
}

const WORD_BANK: WordEntry[] = [
  // Funny & silly
  ...(["Snoring", "Twerking", "Hiccups", "Burrito", "Selfie", "Moonwalk",
    "Pickles", "Sneeze", "Mullet", "Waddle", "Booger", "Drool",
    "Yodel", "Pajamas", "Flamingo", "Tickle", "Wedgie", "Spaghetti",
    "Potty", "Goofy", "Wobbly", "Jiggly", "Funky", "Wacky",
    "Oink", "Squawk", "Gobble", "Quack", "Moo",
    "Bubblegum", "Unicorn", "Underwear", "Mustache", "Tutu",
    "Suspenders", "Caterpillar", "Jellyfish", "Trampoline", "Carousel",
    "Marshmallow", "Popcorn", "Somersault", "Cartwheel", "Limbo",
    "Hopscotch", "Leapfrog", "Kazoo", "Tambourine", "Cowbell",
    "Bagpipes", "Ukulele", "Pirate", "Ninja", "Werewolf",
    "Sasquatch", "Bamboozle", "Shenanigans", "Hullabaloo", "Kerfuffle",
    "Razzmatazz", "Gobbledygook", "Thingamajig", "Doohickey", "Brouhaha",
    "Rigmarole", "Hodgepodge", "Slapstick", "Goofball", "Cringe",
    "Butterfingers", "Giggle", "Snicker", "Chortle",
    "Guffaw", "Cackle", "Bonkers", "Bananas", "Weirdo",
  ] as const).map(w => ({ word: w, adult: false, category: "funny" as WordCategory })),

  // Animals
  ...(["Platypus", "Blobfish", "Porcupine", "Sloth", "Armadillo",
    "Chipmunk", "Walrus", "Chameleon", "Pelican", "Hedgehog",
    "Warthog", "Baboon", "Iguana", "Llama", "Narwhal",
    "Alpaca", "Pangolin", "Manatee", "Toucan", "Lemur",
    "Gecko", "Stingray", "Hyena", "Ostrich", "Seahorse",
    "Tarantula", "Poodle", "Bullfrog", "Hamster", "Dodo",
    "Cheetah", "Vulture", "Mongoose", "Piranha", "Macaw",
  ] as const).map(w => ({ word: w, adult: false, category: "animals" as WordCategory })),

  // Food
  ...(["Waffle", "Meatball", "Taco", "Pretzel", "Pancake",
    "Milkshake", "Nacho", "Dumpling", "Churro", "Corndog",
    "Pudding", "Fudge", "Guacamole", "Fondue", "Biscuit",
    "Crouton", "Sardine", "Lasagna", "Cupcake", "Smoothie",
    "Noodle", "Muffin", "Kebab", "Gravy",
    "Pickle", "Salami", "Sausage", "Schnitzel",
  ] as const).map(w => ({ word: w, adult: false, category: "food" as WordCategory })),

  // Actions & movements (clean)
  ...(["Stumble", "Yawn", "Twirl", "Wiggle", "Shimmy",
    "Gallop", "Crawl", "Headbang", "Curtsy", "Pirouette",
    "Dabbing", "Breakdance", "Tiptoeing", "Sleepwalk", "Gargle",
    "Sniffle", "Belch", "Whistle", "Hiccup", "Giggling",
    "Winking", "Flexing", "Squatting",
  ] as const).map(w => ({ word: w, adult: false, category: "actions" as WordCategory })),

  // Actions (adult)
  ...(["Flirting", "Grinding", "Spanking", "Stripping", "Moaning", "Thrusting",
  ] as const).map(w => ({ word: w, adult: true, category: "adult" as WordCategory })),

  // Objects (clean)
  ...(["Plunger", "Boomerang", "Flyswatter", "Boombox", "Skateboard",
    "Hammock", "Pinata", "Megaphone", "Snorkel", "Scarecrow",
    "Treadmill", "Typewriter", "Telescope", "Compass", "Mannequin",
    "Lollipop", "Chainsaw", "Thermometer", "Whistle",
  ] as const).map(w => ({ word: w, adult: false, category: "objects" as WordCategory })),

  // Objects (adult)
  ...(["Condom", "Vibrator", "Handcuffs", "Whip", "Dildo",
  ] as const).map(w => ({ word: w, adult: true, category: "adult" as WordCategory })),

  // Body related (clean)
  ...(["Dimples", "Freckles", "Goatee", "Nostril", "Kneecap",
    "Earlobe", "Collarbone", "Elbow", "Armpit", "Bellybutton",
    "Toenail", "Moustache",
  ] as const).map(w => ({ word: w, adult: false, category: "body" as WordCategory })),

  // Body related (adult)
  ...(["Nipple", "Booty", "Cleavage", "Crotch",
    "Boner", "Bulge", "Hickey",
  ] as const).map(w => ({ word: w, adult: true, category: "adult" as WordCategory })),

  // Adult & cheeky 🔥
  ...(["Orgasm", "Foreplay", "Kinky", "Naughty", "Quickie",
    "Bondage", "Dominatrix", "Cougar", "MILF", "Stripper",
    "Escort", "Playboy", "Hooters", "Boobies", "Horny",
    "Seductive", "Aroused", "Threesome", "Fetish", "Tease",
    "Spank", "Lingerie", "Thong", "Corset", "Stilettos",
    "Striptease", "Lapdance", "Commando", "Peeping",
    "Flashing", "Groping", "Snogging",
  ] as const).map(w => ({ word: w, adult: true, category: "adult" as WordCategory })),

  // Funny situations (clean)
  ...(["Photobomb", "Ghosting", "Catfishing", "Clickbait", "Facepalm",
    "Deadpan", "Buzzkill", "FOMO", "Hangover",
    "Mansplaining", "Manspreading", "Eavesdropping",
    "Sleeptalking", "Drooling", "Farting",
  ] as const).map(w => ({ word: w, adult: false, category: "situations" as WordCategory })),

  // Funny situations (adult)
  ...(["Streaking", "Queefing",
  ] as const).map(w => ({ word: w, adult: true, category: "adult" as WordCategory })),

  // Sounds
  ...(["Rumble", "Sizzle", "Splat", "Thud", "Whoosh",
    "Zing", "Clang", "Bonk", "Boing", "Crunch",
  ] as const).map(w => ({ word: w, adult: false, category: "sounds" as WordCategory })),

  // Characters & types (clean)
  ...(["Mime", "Juggler", "Magician", "Clown", "Acrobat",
    "Cowboy", "Gladiator", "Viking", "Caveman", "Astronaut",
    "Lumberjack", "Ventriloquist",
  ] as const).map(w => ({ word: w, adult: false, category: "characters" as WordCategory })),

  // Characters (adult)
  ...(["Gigolo", "Playmate", "Hunk",
  ] as const).map(w => ({ word: w, adult: true, category: "adult" as WordCategory })),

  // Clothing (clean)
  ...(["Onesie", "Crocs", "Sombrero", "Monocle", "Cape",
    "Speedo", "Beanie", "Overalls", "Beret",
  ] as const).map(w => ({ word: w, adult: false, category: "clothing" as WordCategory })),

  // Clothing (adult)
  ...(["Mankini", "G-string", "Bikini", "Boxers", "Fishnet",
  ] as const).map(w => ({ word: w, adult: true, category: "adult" as WordCategory })),

  // Exclamations & slang (clean)
  ...(["Bazinga", "Geronimo", "Eureka", "Abracadabra", "Shazam",
    "Cowabunga", "Yikes", "Oopsie", "Knackered", "Cheeky",
    "Dodgy",
  ] as const).map(w => ({ word: w, adult: false, category: "exclamations" as WordCategory })),

  // Exclamations (adult)
  ...(["Dammit", "Bollocks", "Bloody", "Wanker", "Tosser",
    "Snog", "Shag", "Randy",
  ] as const).map(w => ({ word: w, adult: true, category: "adult" as WordCategory })),

  // Random hilarious (clean)
  ...(["Nincompoop", "Dingbat", "Knucklehead", "Numbskull", "Birdbrain",
    "Scatterbrain", "Blockhead", "Meathead", "Lollygag",
    "Hocus-pocus", "Roly-poly",
    "Tiddlywinks", "Cockamamie", "Balderdash", "Poppycock", "Malarkey",
    "Flimflam", "Hoopla", "Ruckus", "Tomfoolery", "Buffoonery",
    "Canoodle", "Schmooze", "Snazzy", "Swanky", "Saucy",
    "Smooching", "Noogie", "Nuggets",
    "Dumbbell", "Wobbliest", "Squishiest", "Wobbly",
  ] as const).map(w => ({ word: w, adult: false, category: "random" as WordCategory })),

  // Random (adult)
  ...(["Dingleberry", "Bootylicious", "Gooch", "Tiddies",
    "Dongle", "Knob", "Jugs", "Melons", "Rump",
    "Pecker", "Weenie", "Schlong", "Dangly", "Wiener",
    "Burp",
  ] as const).map(w => ({ word: w, adult: true, category: "adult" as WordCategory })),
];

let usedIndices = new Set<number>();

export function getRandomWord(allowAdult: boolean = true, categories: WordCategory[] = ["all"]): string {
  const isAll = categories.includes("all");
  const includesAdult = categories.includes("adult");
  
  const eligible = WORD_BANK
    .map((entry, index) => ({ ...entry, index }))
    .filter(e => {
      // Filter by adult flag
      if (e.adult && !allowAdult && !includesAdult) return false;
      if (e.adult && !includesAdult && !isAll) return false;
      if (e.adult && isAll && !allowAdult) return false;
      
      // Filter by category
      if (!isAll) {
        if (e.adult) return includesAdult;
        return categories.includes(e.category);
      }
      return true;
    })
    .filter(e => !usedIndices.has(e.index));

  if (eligible.length === 0) {
    usedIndices = new Set<number>();
    return getRandomWord(allowAdult, categories);
  }

  const pick = eligible[Math.floor(Math.random() * eligible.length)];
  usedIndices.add(pick.index);
  return pick.word;
}

export function resetWords() {
  usedIndices = new Set<number>();
}
