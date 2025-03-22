
import React from 'react';
import { motion } from 'framer-motion';
import { SmilePlus, Smile, Meh, Frown, Cloud } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MoodSelectorProps {
  onSelect: (mood: string) => void;
  selectedMood: string | null;
}

const moods = [
  { value: 'great', label: 'Great', icon: SmilePlus, color: 'bg-mood-great' },
  { value: 'good', label: 'Good', icon: Smile, color: 'bg-mood-good' },
  { value: 'okay', label: 'Okay', icon: Meh, color: 'bg-mood-okay' },
  { value: 'bad', label: 'Bad', icon: Frown, color: 'bg-mood-bad' },
  { value: 'terrible', label: 'Terrible', icon: Cloud, color: 'bg-mood-terrible' }
];

const MoodSelector = ({ onSelect, selectedMood }: MoodSelectorProps) => {
  return (
    <div className="py-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.value;
          
          return (
            <motion.button
              key={mood.value}
              className={cn(
                "mood-button",
                mood.color,
                isSelected ? "ring-4 ring-offset-2 ring-offset-background ring-primary" : ""
              )}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(mood.value)}
            >
              <Icon size={32} strokeWidth={1.5} className={isSelected ? "text-primary" : "text-foreground"} />
              <span className="font-medium">{mood.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSelector;
