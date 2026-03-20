export const WORD_BANK: string[] = [
  "Snoring", "Belly flop", "Twerk", "Hiccups", "Burrito", "Selfie",
  "Moonwalk", "Pickles", "Bubble wrap", "Sneeze", "Toenail", "Mullet",
  "Fart", "Waddle", "Bellybutton", "Chicken dance", "Booger", "Drool",
  "Armpit", "Yodel", "Pajamas", "Flamingo", "Tickle", "Wedgie",
  "Spaghetti", "Zombie walk", "Piggyback", "Tongue twister", "Noodle arms",
  "Banana peel", "Snot", "Potty", "Goofy", "Wobbly", "Jiggly",
  "Funky", "Wacky", "Silly putty", "Rubber duck", "Clown nose",
  "Oink", "Squawk", "Gobble", "Moo", "Quack",
  "Cannonball", "Face plant", "Brain freeze", "Double chin", "Jazz hands",
  "Air guitar", "Karate chop", "Belly laugh", "Eyebrow wiggle", "Knee slap",
  "Robot dance", "Chicken wing", "Penguin walk", "Crab walk", "Bear hug",
  "Pillow fight", "Food coma", "Couch potato", "Snooze button", "Bubblegum",
  "Unicorn", "Disco ball", "Toilet paper", "Whoopee cushion", "Underwear",
  "Mustache", "Polka dots", "Flip flop", "Tutu", "Suspenders",
  "Belly dancer", "Kangaroo hop", "Gorilla chest", "Caterpillar", "Jellyfish",
  "Pogo stick", "Trampoline", "Roller coaster", "Bumper cars", "Carousel",
  "Hot dog", "Marshmallow", "Popcorn", "Cotton candy", "Gummy bear",
  "Somersault", "Cartwheel", "Limbo", "Hopscotch", "Leapfrog",
  "Kazoo", "Tambourine", "Cowbell", "Bagpipes", "Ukulele",
  "Pirate", "Ninja", "Werewolf", "Mummy", "Sasquatch",
  "Hiccup cure", "Dad joke", "Plot twist", "Awkward silence", "Cringe",
  "Butterfingers", "Slapstick", "Goofball", "Shenanigans", "Hullabaloo",
  "Kerfuffle", "Bamboozle", "Razzmatazz", "Gobbledygook", "Thingamajig",
  "Doohickey", "Whatchamacallit", "Hodgepodge", "Rigmarole", "Brouhaha"
];

let usedIndices: Set<number> = [];

export function getRandomWord(): string {
  if (usedIndices.size >= WORD_BANK.length) {
    usedIndices = new Set();
  }
  let index: number;
  do {
    index = Math.floor(Math.random() * WORD_BANK.length);
  } while (usedIndices.has(index));
  usedIndices.add(index);
  return WORD_BANK[index];
}

export function resetWords() {
  usedIndices = new Set();
}