export const fetchMoodEntries = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/user/moodentry/fetch", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch mood entries");
    }

    const data = await response.json();
    console.log("Mood Entries:", data);
return Array.isArray(data.data) ? data.data : [];

  } catch (error) {
    console.error("Error fetching mood entries:", error);
    return [];
  }
};

fetchMoodEntries().then((moodEntries) => {
  console.log("Fetched Mood Entries:", moodEntries);
});

// Mock resources data
export const mockResources = [
  {
    id: '1',
    category: 'Crisis Hotlines',
    title: 'National Suicide Prevention Lifeline',
    description: '24/7, free and confidential support for people in distress.',
    contact: '1-800-273-8255',
    url: 'https://suicidepreventionlifeline.org/'
  },
  {
    id: '2',
    category: 'Crisis Hotlines',
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741 to connect with a Crisis Counselor.',
    contact: 'Text HOME to 741741',
    url: 'https://www.crisistextline.org/'
  },
  {
    id: '3',
    category: 'Mobile Apps',
    title: 'Headspace',
    description: 'Meditation and mindfulness app to help reduce stress.',
    url: 'https://www.headspace.com/'
  },
  {
    id: '4',
    category: 'Mobile Apps',
    title: 'Calm',
    description: 'App for sleep, meditation and relaxation.',
    url: 'https://www.calm.com/'
  },
  {
    id: '5',
    category: 'Articles',
    title: 'Understanding Anxiety',
    description: 'Learn about the symptoms, causes, and treatments for anxiety disorders.',
    url: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders'
  },
  {
    id: '6',
    category: 'Articles',
    title: 'Sleep Hygiene',
    description: 'Tips for improving your sleep habits to support mental health.',
    url: 'https://www.sleepfoundation.org/sleep-hygiene'
  },
  {
    id: '7',
    category: 'Find Help',
    title: 'Psychology Today Therapist Finder',
    description: 'Search for therapists in your area that meet your needs.',
    url: 'https://www.psychologytoday.com/us/therapists'
  },
  {
    id: '8',
    category: 'Find Help',
    title: 'BetterHelp',
    description: 'Online counseling and therapy services.',
    url: 'https://www.betterhelp.com/'
  }
];

// Mock community posts
export const fetchPosts = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/user/post/fetch", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Posts");
    }

    const data = await response.json();
    console.log("Posts:", data);
    return Array.isArray(data.posts) ? data.posts : [];
  } catch (error) {
    console.error("Error fetching mood entries:", error);
    return [];
  }
};

fetchPosts().then((moodEntries) => {
  console.log("Fetched Posts:", moodEntries);
});

// Mock assessment questions
export const mockAssessments = {
  anxiety: {
    title: "Anxiety Assessment",
    description: "This quick assessment can help you understand if you might be experiencing symptoms of anxiety.",
    questions: [
      {
        id: 'a1',
        text: "How often have you been bothered by feeling nervous, anxious, or on edge?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 'a2',
        text: "How often have you been bothered by not being able to stop or control worrying?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 'a3',
        text: "How often have you been bothered by trouble relaxing?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: 'a4',
        text: "How often have you been bothered by worrying too much about different things?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      }
    ],
    results: [
      { range: [0, 4], level: "Minimal anxiety", description: "Your results indicate minimal symptoms of anxiety." },
      { range: [5, 9], level: "Mild anxiety", description: "Your results indicate mild symptoms of anxiety. Consider monitoring your symptoms." },
      { range: [10, 14], level: "Moderate anxiety", description: "Your results indicate moderate symptoms of anxiety. Consider speaking with a mental health professional." },
      { range: [15, 20], level: "Severe anxiety", description: "Your results indicate severe symptoms of anxiety. We strongly recommend consulting with a mental health professional." }
    ]
  },
  stress: {
    title: "Stress Assessment",
    description: "This quick assessment can help you understand your current stress levels.",
    questions: [
      {
        id: 's1',
        text: "How often have you felt that you were unable to control the important things in your life?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Almost never" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Fairly often" },
          { value: 4, label: "Very often" }
        ]
      },
      {
        id: 's2',
        text: "How often have you felt confident about your ability to handle your personal problems?",
        options: [
          { value: 4, label: "Never" },
          { value: 3, label: "Almost never" },
          { value: 2, label: "Sometimes" },
          { value: 1, label: "Fairly often" },
          { value: 0, label: "Very often" }
        ]
      },
      {
        id: 's3',
        text: "How often have you felt that things were going your way?",
        options: [
          { value: 4, label: "Never" },
          { value: 3, label: "Almost never" },
          { value: 2, label: "Sometimes" },
          { value: 1, label: "Fairly often" },
          { value: 0, label: "Very often" }
        ]
      },
      {
        id: 's4',
        text: "How often have you felt difficulties were piling up so high that you could not overcome them?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Almost never" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Fairly often" },
          { value: 4, label: "Very often" }
        ]
      }
    ],
    results: [
      { range: [0, 5], level: "Low stress", description: "Your results indicate low stress levels." },
      { range: [6, 10], level: "Moderate stress", description: "Your results indicate moderate stress levels. Consider implementing stress management techniques." },
      { range: [11, 16], level: "High stress", description: "Your results indicate high stress levels. Consider speaking with a mental health professional about stress management strategies." }
    ]
  }
};
