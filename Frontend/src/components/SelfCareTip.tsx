
import React from 'react';
import { Lightbulb } from 'lucide-react';
import GlassMorphism from './GlassMorphism';
import { motion } from 'framer-motion';

interface SelfCareTipProps {
  mood: string;
}

const moodTips = {
  great: [
    "Celebrate your positive mood by sharing it with someone you care about.",
    "Try to identify what contributed to your good mood today and see if you can replicate it tomorrow.",
    "Use this positive energy to tackle something you've been putting off."
  ],
  good: [
    "Listen to an uplifting playlist to maintain your positive momentum.",
    "Take a moment to appreciate what's going well in your life right now.",
    "Consider reaching out to a friend who might need some encouragement."
  ],
  okay: [
    "Try a brief mindfulness meditation to center yourself.",
    "A short walk outside might help elevate your mood.",
    "Consider journaling about your thoughts to gain clarity."
  ],
  bad: [
    "Practice deep breathing for 5 minutes to help reset your nervous system.",
    "It's okay to not be okay. Be gentle with yourself today.",
    "Consider a brief change of environment - even moving to another room can help."
  ],
  terrible: [
    "Please remember that all feelings, even intense ones, are temporary.",
    "Consider reaching out to a trusted friend, family member, or therapist.",
    "Focus on basic self-care today: hydration, rest, and easy, nourishing food."
  ]
};

const SelfCareTip = ({ mood }: SelfCareTipProps) => {
  const [tipIndex, setTipIndex] = React.useState(0);
  
  React.useEffect(() => {
    setTipIndex(Math.floor(Math.random() * moodTips[mood as keyof typeof moodTips].length));
  }, [mood]);
  
  if (!mood) return null;
  
  const tips = moodTips[mood as keyof typeof moodTips] || moodTips.okay;
  const tip = tips[tipIndex];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <GlassMorphism className="p-5 mt-6">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 rounded-full p-2 mt-1">
            <Lightbulb size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Self-Care Suggestion</h3>
            <p className="text-muted-foreground">{tip}</p>
          </div>
        </div>
      </GlassMorphism>
    </motion.div>
  );
};

export default SelfCareTip;
