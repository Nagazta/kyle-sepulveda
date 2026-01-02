/**
 * Static chatbot responses
 * Rule-based keyword matching for portfolio visitors
 */

export const chatbotResponses = {
  // Greeting responses
  greeting: {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'sup', 'yo'],
    responses: [
      "Hey there! 👋 I'm Kyle's assistant. Ask me about his background, tech stack, or how to contact him!",
      "Hello! 👋 I can help you learn about Kyle. Try asking about his skills, projects, or contact info!",
      "Hi! 👋 Want to know more about Kyle? Ask me about his experience, tech stack, or how to reach him!"
    ]
  },

  // About / Background
  about: {
    keywords: ['about', 'background', 'who are you', 'who is kyle', 'tell me about', 'introduce', 'story'],
    response: "Kyle Sepulveda is a backend-focused developer from CIT-U Cebu. He got into programming through gaming and curiosity about computers. Over time, that grew into building side projects to sharpen his skills. He enjoys experimenting with ideas, learning by doing, and solving practical problems. Currently focusing on backend development while exploring AI and blockchain!"
  },

  // Tech Stack / Skills
  tech: {
    keywords: ['tech', 'stack', 'skills', 'technologies', 'languages', 'tools', 'frameworks', 'what can you do', 'programming'],
    response: "Kyle focuses on backend development with a solid frontend foundation. His tech stack includes JavaScript, TypeScript, Python, Java, and more. He's experienced with frameworks like React, Node.js, and various backend technologies. Currently exploring AI and blockchain in Web3. Check out his Skills section for the full breakdown!"
  },

  // Projects
  projects: {
    keywords: ['projects', 'work', 'portfolio', 'built', 'made', 'github', 'repos', 'timeline'],
    response: "Kyle has worked on various projects showcasing his skills! You can explore his Projects Timeline section to see his GitHub activity, or check out featured projects throughout the portfolio. Each project shows the tech stack used and deployment status. Visit his GitHub at https://github.com/Nagazta for more!"
  },

  // Contact
  contact: {
    keywords: ['contact', 'email', 'reach', 'message', 'talk', 'hire', 'get in touch', 'connect'],
    response: "You can reach Kyle at:\n📧 kyle.sepulveda27@gmail.com\n🔗 GitHub: https://github.com/Nagazta\n\nFeel free to reach out for collaborations, opportunities, or just to chat about tech!"
  },

  // Education
  education: {
    keywords: ['school', 'university', 'education', 'study', 'degree', 'cit', 'cebu'],
    response: "Kyle studies at CIT-U (Cebu Institute of Technology - University) in Cebu. His journey into programming started from a gamer's curiosity, which evolved into a passion for building and learning through hands-on projects."
  },

  // Experience / Role
  experience: {
    keywords: ['experience', 'role', 'position', 'job', 'work experience', 'developer'],
    response: "Kyle is a backend-focused developer with a solid frontend foundation. He's worked on various projects as Development Lead, Team Lead, and Contributor. His roles involve building robust APIs, server-side systems, and full-stack applications. Check the Experience section for details!"
  },

  // AI / Blockchain
  ai: {
    keywords: ['ai', 'artificial intelligence', 'blockchain', 'web3', 'learning', 'exploring'],
    response: "Kyle is actively exploring AI and blockchain technologies while sharpening his core development skills. He's interested in the intersection of backend development and emerging technologies like Web3. Always learning and experimenting with new ideas!"
  },

  // Community
  community: {
    keywords: ['community', 'volunteer', 'events', 'active'],
    response: "Kyle is active in tech communities through volunteering and event support. He believes in giving back to the community and staying connected with fellow developers!"
  },

  // Thanks
  thanks: {
    keywords: ['thanks', 'thank you', 'appreciate', 'helpful'],
    responses: [
      "You're welcome! Happy to help! 😊",
      "Anytime! Feel free to ask more questions!",
      "Glad I could help! Let me know if you need anything else!"
    ]
  },

  // Goodbye
  goodbye: {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'cya'],
    responses: [
      "See you later! Feel free to explore the portfolio! 👋",
      "Goodbye! Don't hesitate to reach out to Kyle! 👋",
      "Take care! Hope you found what you were looking for! 👋"
    ]
  },

  // Fallback response
  fallback: {
    responses: [
      "I'm not sure about that, but I can help you learn about Kyle's background, tech stack, projects, or contact info!",
      "Hmm, I don't have info on that. Try asking about Kyle's skills, experience, or how to reach him!",
      "I'm focused on helping you learn about Kyle! Ask me about his background, projects, or tech stack!"
    ]
  }
};

/**
 * Find matching response based on user input
 * @param {string} input - User's message
 * @returns {string} - Bot's response
 */
export const getBotResponse = (input) => {
  const normalizedInput = input.toLowerCase().trim();

  // Check each category for keyword matches
  for (const [category, data] of Object.entries(chatbotResponses)) {
    if (category === 'fallback') continue;

    if (data.keywords) {
      const hasMatch = data.keywords.some(keyword =>
        normalizedInput.includes(keyword.toLowerCase())
      );

      if (hasMatch) {
        // Return random response if multiple exist
        if (data.responses) {
          return data.responses[Math.floor(Math.random() * data.responses.length)];
        }
        return data.response;
      }
    }
  }

  // Return random fallback response
  const fallbacks = chatbotResponses.fallback.responses;
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
