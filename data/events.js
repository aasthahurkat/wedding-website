// data/events.js

export const events = [
  {
    id: 'mehndi',
    image: {
      BRIDE: 'mehndi-hindi',
      GROOM: 'mehndi-hindi',
      FRIENDS: 'mehndi-friends'
    },
    title: 'Mehndi',
    date: '2025-12-22',
    time: '12 PM onwards',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS'],
    location: 'TBD',
    mapQuery: 'Indore',
    description: {
      BRIDE: 'मेहंदी की रस्म के साथ शादी का शगुन सजने जा रहा है। इस शुभ अवसर पर आप सभी का आशीर्वाद और साथ बहुत ज़रूरी है। आइए, मिलकर इस दिन को खुशियों के रंग से भर दें।',
      GROOM: 'मेहंदी की रस्म के साथ शादी का शगुन सजने जा रहा है। इस शुभ अवसर पर आप सभी का आशीर्वाद और साथ बहुत ज़रूरी है। आइए, मिलकर इस दिन को खुशियों के रंग से भर दें।',
      FRIENDS: "Join the celebrations! Whether you're joining the bride's mehndi ceremony or the groom's pre-wedding festivities, experience the beautiful tradition of henna designs with music, laughter, and celebration!"
    }
  },
  {
    id: 'mayra',
    image: {
      BRIDE: 'mayra-hindi',
      GROOM: 'mayra-hindi',
      FRIENDS: 'mayra-friends',
      INVITEES: 'mayra-friends',
      GUESTS: 'mayra-friends'
    },
    title: {
      BRIDE: 'Mayra',
      GROOM: 'Mayra Ceremony', 
      FRIENDS: 'Mayra & Mixer Hour',
      INVITEES: 'Mayra & Mixer Hour',
      GUESTS: 'Mayra & Mixer Hour'
    },
    date: '2025-12-23',
    time: '10:30 AM onwards',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS', 'INVITEES', 'GUESTS'],
    location: 'Anandam Banquet Hall',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    description: {
      BRIDE: 'मायरे की रस्म परिवार के प्यार और अपनेपन का प्रतीक है। इस खास रस्म में शामिल होकर अपना स्नेह और आशीर्वाद प्रदान करें।',
      GROOM: 'मायरे की रस्म परिवार के प्यार और अपनेपन का प्रतीक है। इस खास रस्म में शामिल होकर अपना स्नेह और आशीर्वाद प्रदान करें।',
      FRIENDS: 'A heartwarming ceremony where maternal relatives present gifts and blessings. Friends are welcome to join or enjoy a casual mixer happening simultaneously—choose your vibe!',
      INVITEES: 'A heartwarming ceremony where maternal relatives present gifts and blessings. You are welcome to join or enjoy a casual mixer happening simultaneously—choose your vibe!',
      GUESTS: 'A heartwarming ceremony where maternal relatives present gifts and blessings. Guests are welcome to join or enjoy a casual mixer happening simultaneously—choose your vibe!'
    }
  },
  {
    id: 'sangeet',
    image: {
      BRIDE: 'sangeet-only-hindi',
      GROOM: 'sangeet-only-hindi',
      FRIENDS: 'sangeet-friends',
      INVITEES: 'sangeet-friends',
      GUESTS: 'sangeet-friends'
    },
    title: 'Sangeet',
    date: '2025-12-23',
    time: '7 PM onwards',
    allowedGroups: ['BRIDE', 'GROOM', 'FRIENDS', 'INVITEES', 'GUESTS'],
    location: 'Anandam Lawn',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    description: {
      BRIDE: 'दो परिवारों के मिलन का जश्न, संगीत और डांस के बिना अधूरा है। इस मस्ती और उल्लास से भरी शाम में आप सपरिवार सादर आमंत्रित हैं।',
      GROOM: 'दो परिवारों के मिलन का जश्न, संगीत और डांस के बिना अधूरा है। इस मस्ती और उल्लास से भरी शाम में आप सपरिवार सादर आमंत्रित हैं।',
      FRIENDS: 'Get ready to party! An unforgettable evening of live music, electrifying dance performances, and dazzling showcases. Come dressed to impress and ready to dance the night away!',
      INVITEES: 'Get ready to party! An unforgettable evening of live music, electrifying dance performances, and dazzling showcases. Come dressed to impress and ready to dance the night away!',
      GUESTS: 'Get ready to party! An unforgettable evening of live music, electrifying dance performances, and dazzling showcases. Come dressed to impress and ready to dance the night away!'
    }
  },
  
  {
    id: 'baraat-welcome',
    image: 'baraat-bride',
    title: 'Baraat Welcome',
    date: '2025-12-24',
    time: '10 AM onwards',
    allowedGroups: ['BRIDE'],
    location: 'Anandam Lawn',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    description:
      "दूल्हे की भव्य बारात का स्वागत करने का समय आ गया है। आइए, पारंपरिक रीति-रिवाजों और उत्सव के साथ प्रीतेश का स्वागत करें।",
  },
  {
    id: 'baraat',
    image: {
      GROOM: 'baraat-groom',
      FRIENDS: 'baraat-friends',
      INVITEES: 'baraat-friends',
      GUESTS: 'baraat-friends'
    },
    title: 'Baraat',
    date: '2025-12-24',
    time: '10 AM onwards',
    allowedGroups: ['GROOM', 'FRIENDS', 'INVITEES', 'GUESTS'],
    location: 'Anandam Lawn',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    outfits: ['Band baaja outfit', 'Ethnic footwear'],
    description: {
      GROOM: "संगीत, डांस और जश्न के साथ दुल्हन को लेने जाने का समय है। इस शाही बारात का हिस्सा बनकर दूल्हे की शान बढ़ाएं।",
      FRIENDS: "Get ready for the Baraat! A vibrant procession with music and dance. Whether you're joining the groom's party or giving a grand welcome with the bride's side, your energy is what makes the celebration!",
      INVITEES: "Get ready for the Baraat! A vibrant procession with music and dance. Whether you're joining the groom's party or giving a grand welcome with the bride's side, your energy is what makes the celebration!",
      GUESTS: "Get ready for the Baraat! A vibrant procession with music and dance. Whether you're joining the groom's party or giving a grand welcome with the bride's side, your energy is what makes the celebration!"
    }
  },
  {
    id: 'phere',
    image: 'phere',
    title: 'Phere, Vows, and Wows!',
    date: '2025-12-24',
    time: '12 PM onwards',
    allowedGroups: ['FRIENDS', 'INVITEES', 'GUESTS'],
    location: 'Anandam Lawn',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    description: 
      "Witness the sacred wedding vows (pheras) around the holy fire, along with the festive reception celebration."
  },
  {
    id: 'family-reception',
    image: 'phere-lunch-hindi',
    title: 'Wedding Ceremony & Family Reception',
    date: '2025-12-24',
    time: '11 AM - 3 PM ',
    allowedGroups: ['BRIDE', 'GROOM'],
    location: 'Anandam Banquet Hall',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    outfits: ['Evening gown', 'Formal suit'],
    description: 
        'वो शुभ घड़ी आ गयी है जब आस्था और प्रीतेश एक नए जीवन की शुरुआत करेंगे। फेरों के पवित्र बंधन के साक्षी बनकर वर-वधू को अपना आशीर्वाद दें।'
     },
  {
    id: 'reception',
    image: 'reception',
    title: 'Cocktails & Toasts - Friends Only!',
    date: '2025-12-24',
    time: '7 PM onwards',
    allowedGroups: ['FRIENDS', 'INVITEES'],
    location: 'Anandam Lawn',
    mapQuery: 'Shri Anandam Pro. Shri Maheshwari Jankalyan Trust',
    outfits: ['Evening gown', 'Formal suit'],
    description:
      'A festive dinner and dance under the stars, complete with toasts, and a chance to celebrate with the newlyweds.',
  },
  {
    id: 'after-party',
    image: 'after-party',
    title: 'After Party',
    date: '2025-12-23',
    time: 'TBD',
    allowedGroups: ['FRIENDS'],
    location: 'Anandam Banquet Hall',
    mapQuery: 'Indore',
    description: 'The party continues! An intimate late-night celebration for close friends who want to keep the energy going.',
  },
];
