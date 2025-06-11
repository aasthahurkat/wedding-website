// data/events.js

export const events = [
  {
    id: 'mehndi',
    title: 'Mehndi',
    date: '2025-12-22',
    time: '12 PM onwards',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS'],
    location: 'TBD',
    mapQuery: 'Indore',
    description: {
      BRIDE: 'Join Aastha in a joyous pre-wedding celebration centered around the application of beautiful henna designs. This intimate gathering will be filled with laughter, traditional music, and the artistry of intricate mehndi patterns.',
      GROOM: 'Join Preetesh in a joyous pre-wedding celebration centered around the application of henna designs. Come celebrate this beautiful tradition with music and festivities.',
      FRIENDS: 'Join the bride in a joyous pre-wedding celebration centered around the application of henna designs. Experience the beautiful tradition of mehndi with music, laughter, and celebration!'
    }
  },
  {
    id: 'mayra',
    title: {
      BRIDE: 'Mayra',
      GROOM: 'Mayra Ceremony', 
      FRIENDS: 'Mayra & Mixer Hour'
    },
    date: '2025-12-23',
    time: '10:30 AM onwards',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS'],
    location: 'Anandam Banquet Hall',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    description: {
      BRIDE: 'A heartwarming ceremony where maternal relatives present gifts and blessings—honoring family bonds and showering the couple with love.',
      GROOM: 'A heartwarming ceremony where maternal relatives present gifts and blessings—honoring family bonds and showering the couple with love.',
      FRIENDS: 'A heartwarming ceremony where maternal relatives present gifts and blessings. Friends are welcome to join or enjoy a casual mixer happening simultaneously—choose your vibe!'
    }
  },
  {
    id: 'sangeet',
    title: 'Sangeet',
    date: '2025-12-23',
    time: '7 PM onwards',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS'],
    location: 'Anandam Lawn',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    description: {
      BRIDE: 'An unforgettable evening of spectacle and style: live music, electrifying dance performances, and dazzling family showcases. Your chance to shine on the dance floor before the big day!',
      GROOM: 'An unforgettable evening of spectacle and style: live music, electrifying dance performances, and dazzling family showcases. Time to show off those dance moves!',
      FRIENDS: 'Get ready to party! An unforgettable evening of live music, electrifying dance performances, and dazzling showcases. Come dressed to impress and ready to dance the night away!'
    }
  },
  {
    id: 'after-party',
    title: 'After Party',
    date: '2025-12-23',
    time: 'TBD',
    allowedGroups: ['FRIENDS'],
    location: 'Anandam Banquet Hall',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    description:
      "Keep the energy alive with late-night music, dancing, and cocktails as we toast to Aastha and Preetesh's new journey together.",
  },
  {
    id: 'baraat-welcome',
    title: 'Baraat Welcome',
    date: '2025-12-24',
    time: '10 AM onwards',
    allowedGroups: ['BRIDE'],
    location: 'Anandam Lawn',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    description:
      "A warm welcome ceremony for the groom's procession, where the bride's family receives Preetesh with traditional rituals and celebration.",
  },
  {
    id: 'baraat',
    title: 'Baraat',
    date: '2025-12-24',
    time: '10 AM onwards',
    allowedGroups: ['GROOM', 'FRIENDS'],
    location: 'Anandam Lawn',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    outfits: ['Band baaja outfit', 'Ethnic footwear'],
    description: {
      GROOM: "Your big moment! Experience the groom's joyous procession with music, dancing, and celebration as you arrive to take Aastha to the pheras venue. This is your time to shine!",
      FRIENDS: "Join Preetesh's epic procession! Experience the groom's joyous baraat with music, dancing, and celebration. Come ready to dance and celebrate as we escort the groom to meet his bride!"
    }
  },
  {
    id: 'phere',
    title: 'Phere, Vows, and Wows!',
    date: '2025-12-24',
    time: '12 PM onwards',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS'],
    location: 'Anandam Lawn',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    description: {
      BRIDE: 'The most sacred moment - your wedding vows (pheras) around the holy fire, where you and Preetesh promise a lifelong partnership surrounded by the love of family and friends.',
      GROOM: 'The most sacred moment - your wedding vows (pheras) around the holy fire, where you and Aastha promise a lifelong partnership surrounded by the love of family and friends.',
      FRIENDS: 'Witness the sacred wedding vows (pheras) around the holy fire, where Aastha and Preetesh promise a lifelong partnership. Be part of this beautiful and meaningful ceremony.'
    }
  },
  {
    id: 'family-reception',
    title: 'Family Reception',
    date: '2025-12-24',
    time: '11 AM - 3 PM ',
    allowedGroups: ['BRIDE', 'GROOM'],
    location: 'Anandam Banquet Hall',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    outfits: ['Evening gown', 'Formal suit'],
    description:
      'An intimate celebration with immediate family and close relatives, featuring traditional blessings, dinner, and heartfelt moments with the newlyweds.',
  },
  {
    id: 'reception',
    title: 'Cocktails & Toasts - Friends Only!',
    date: '2025-12-24',
    time: '7 PM onwards',
    allowedGroups: ['FRIENDS'],
    location: 'Anandam Lawn',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    outfits: ['Evening gown', 'Formal suit'],
    description:
      'A festive dinner and dance under the stars, complete with toasts, and a chance to celebrate with the newlyweds.',
  },
];
