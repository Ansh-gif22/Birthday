/* ==========================================================
   config.js — EVERYTHING you need to edit lives in this file.
   Use {name} for your friend's name and {you} for your name
   inside any message; they are replaced automatically.
   ========================================================== */
const birthdayConfig = {
  friendName: "Heerriee",
  yourName: "Budbakk",

  // Leave as a placeholder until you know it. Format: "YYYY-MM-DD" (e.g. "2026-12-31").
  // Only used if showCountdown is true.
  birthdayDate: "BIRTHDAY_DATE",
  showCountdown: false,

  heroSubtitle: "Today, the world celebrates someone who makes it a little more beautiful. 💗",

  /* ---------- THE LETTER ----------
     One string per paragraph. "\n" makes a line break inside a paragraph. */
  letter: [
    "Dear {name},",
    "Happy Birthday to one of the most wonderful people in my life! 💗",
    "I hope your special day is filled with happiness, laughter, beautiful surprises, and all the little things that make you smile.",
    "May this new year of your life bring you countless reasons to be happy, the courage to chase your dreams, and people who always remind you how special you are.",
    "Never stop being the amazing person you are. Keep smiling, keep shining, and keep making the world a little brighter just by being yourself.",
    "You deserve so many beautiful things in life, and I genuinely hope this year brings you closer to every dream in your heart.",
    "Thank you for being you. I hope your birthday is as lovely, fun, and unforgettable as you are.",
    "Once again, HAPPY BIRTHDAY! 🎂🌷💗",
    "With lots of love and best wishes,\n{you}"
  ],

  /* ---------- PHOTOS ----------
     HOW TO ADD A PHOTO: copy the file into assets/images/, then add a line:
       { src: "assets/images/my-photo.jpg", caption: "Optional caption", alt: "Optional description" },
     To remove one: delete its line. To reorder: move lines up/down.
     Missing files show a soft "add a photo" card instead of a broken icon. */
  photos: [
    { src: "assets/images/WhatsApp Image 2026-10-11 at 22.50.40.jpg", caption: "A beautiful memory 🌷" },
    { src: "assets/images/WhatsApp Image 2026-10-11 at 22.50.41.jpg", caption: "Keep smiling 💗" },
    { src: "assets/images/WhatsApp Image 2026-10-11 at 22.50.52.jpg", caption: "Pure sunshine ☀️" },
    { src: "assets/images/WhatsApp Image 2026-10-11 at 22.50.53.jpg", caption: "Main character energy ✨" },
    { src: "assets/images/WhatsApp Image 2026-10-11 at 22.50.52 (1).jpg", caption: "Never stop shining 🌸" }
  ],

  /* ---------- VIDEOS ----------
     HOW TO ADD A VIDEO: put the .mp4 in assets/videos/ (and an optional poster
     image in assets/images/), then add a block. Delete a block to remove it. */
  videos: [
    
    {
      src: "assets/videos/WhatsApp Video 2026-10-11 at 22.50.52.mp4",
      poster: "assets/images/video-poster2.jpg",
      title: "Golu-Molu 🤏🏻",
      caption: "This one always makes me smile."
    }
  ],

  /* ---------- STITCH SECTION ---------- */
  stitch: {
    // Optional: put your own sticker/image here. If the file is missing, a cute
    // original blue doodle is shown instead.
    image: "assets/images/stitch.png",
    heading: "Your Little Blue Happiness Corner 💙",
    message: "May your life always be filled with little adventures, big smiles, unexpected happiness, and people who love you just the way you are. Ohana means family, and I hope you always feel surrounded by love. 💙🌺",
    wishes: [
      "May your day be as bright as a tropical sunrise! 🌺",
      "Sending you a whole ocean of tiny blue happiness 🌊💙",
      "Ohana means family — and you're always in mine 💙",
      "May today feel like a warm beach and a really good snack 🏝️",
      "A sprinkle of blue magic: you are loved, always ✨",
      "May your smile be extra mischievous today 😉💙"
    ]
  },

  /* ---------- SHIN-CHAN-STYLE SECTION ---------- */
  shin: {
    // Optional: your own image. Falls back to an original cartoon doodle.
    image: "assets/images/shinchan.png",
    heading: "Welcome to the Little Chaos Zone! 😂❤️",
    message: "Official birthday announcement: Today, you have full permission to eat extra cake, laugh at silly things, be a little dramatic, and enjoy being the main character. Birthday rules are birthday rules! 😂🎂",
    quote: "“Age is just a number. Cake is forever.” 🎂",
    jokes: [
      "Breaking news: calories don't count on birthdays! 📢🍰",
      "You're not older, you're just upgraded to a new version. 🚀",
      "Today's schedule: eat cake, eat more cake, nap. That's it. 😴",
      "Warning: the birthday person is allowed to be extra dramatic today! 🎭",
      "I'd say 'make a wish' but you already have the best cake energy. 🕯️",
      "Rule #1: Birthday rules are birthday rules. Rule #2: See rule #1. 😂",
      "Fun fact: you get one free dance-in-the-kitchen pass today. 💃"
    ]
  },

  /* ---------- WISH CARDS ---------- */
  wishes: [
    { icon: "😊", title: "Happiness", message: "May you always find reasons to smile, even on ordinary days." },
    { icon: "🌟", title: "Dreams", message: "May every dream you are brave enough to chase bring you closer to the life you imagine." },
    { icon: "🫶", title: "Friendship", message: "May you always be surrounded by people who appreciate your heart and celebrate your happiness." },
    { icon: "🦋", title: "Adventures", message: "May this year bring beautiful memories, unexpected adventures, and stories worth telling." },
    { icon: "🌷", title: "Self-love", message: "May you always remember your worth and never forget how much goodness you deserve." },
    { icon: "🏆", title: "Success", message: "May your hard work open beautiful doors and lead you toward everything you hope to achieve." }
  ],

  /* ---------- SECRET SURPRISE ---------- */
  giftPrompt: "Wait… there's one last little surprise! 🎁",
  finalMessage: [
    "Happy Birthday once again, {name}! 💗",
    "No matter how quickly time passes, I hope life keeps giving you beautiful reasons to smile. Keep being yourself, keep dreaming big, and never forget that you deserve happiness, love, success, and wonderful memories.",
    "Here's to another year of becoming an even more amazing version of yourself! 🌷🎂✨"
  ],

  /* ---------- ENDING ---------- */
  endingLine1: "Made with love, just for you. 💗",
  endingLine2: "Your birthday, your little world, your special memories. 🌷",
  signature: "— {you}",

  /* ---------- MUSIC (optional) ----------
     Put your own mp3 at this path. If it's missing, the page still works. */
  backgroundMusic: "assets/Audio/sub_clair-happy-birthday-579516.mp3",
  showMusicButton: true
};