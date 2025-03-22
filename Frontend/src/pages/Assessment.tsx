
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import GlassMorphism from '@/components/GlassMorphism';
import { mockAssessments } from '@/lib/mocks';

type AssessmentType = 'anxiety' | 'stress';

const Assessment = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  
  const handleStartAssessment = (type: AssessmentType) => {
    setSelectedAssessment(type);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };
  
  const handleAnswer = (questionId: string, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (selectedAssessment && currentQuestion < mockAssessments[selectedAssessment].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handleReset = () => {
    setSelectedAssessment(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };
  
  const calculateScore = () => {
    if (!selectedAssessment) return 0;
    
    return Object.values(answers).reduce((total, value) => total + value, 0);
  };
  
  const getResultCategory = () => {
    if (!selectedAssessment) return null;
    
    const score = calculateScore();
    const results = mockAssessments[selectedAssessment].results;
    
    return results.find(result => 
      score >= result.range[0] && score <= result.range[1]
    );
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold mb-2">Mental Health Assessment</h1>
          <p className="text-muted-foreground mb-6">
            Take a quick assessment to gain insights into your mental wellbeing.
          </p>
        </motion.div>
        
        {!selectedAssessment ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <GlassMorphism className="p-6">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Brain size={24} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Anxiety Assessment</h2>
              <p className="text-muted-foreground mb-4">
                Evaluate symptoms related to anxiety and worry.
              </p>
              <motion.button
                onClick={() => handleStartAssessment('anxiety')}
                className="bg-primary text-white rounded-xl px-4 py-2 font-medium inline-flex items-center gap-2 mt-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Assessment <ArrowRight size={16} />
              </motion.button>
            </GlassMorphism>
            
            <GlassMorphism className="p-6">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Brain size={24} className="text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Stress Assessment</h2>
              <p className="text-muted-foreground mb-4">
                Measure your current stress levels and coping ability.
              </p>
              <motion.button
                onClick={() => handleStartAssessment('stress')}
                className="bg-primary text-white rounded-xl px-4 py-2 font-medium inline-flex items-center gap-2 mt-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Start Assessment <ArrowRight size={16} />
              </motion.button>
            </GlassMorphism>
          </motion.div>
        ) : showResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GlassMorphism className="p-8">
              <div className="text-center mb-6">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Assessment Complete</h2>
                <p className="text-muted-foreground">
                  Thank you for completing the {mockAssessments[selectedAssessment].title}.
                </p>
              </div>
              
              <div className="bg-primary/10 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  Your result: {getResultCategory()?.level}
                </h3>
                <p className="text-muted-foreground">
                  {getResultCategory()?.description}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">What does this mean?</h3>
                <p className="text-muted-foreground mb-3">
                  This assessment provides a snapshot of your current mental state. It's not a diagnosis, but it can help you understand your emotions and when you might benefit from additional support.
                </p>
                <p className="text-muted-foreground">
                  If your results indicate high levels of distress, consider speaking with a mental health professional.
                </p>
              </div>
              
              <div className="flex justify-center">
                <motion.button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <RefreshCw size={16} />
                  Take Another Assessment
                </motion.button>
              </div>
            </GlassMorphism>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassMorphism className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold">
                    {mockAssessments[selectedAssessment].title}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {mockAssessments[selectedAssessment].questions.length}
                  </span>
                </div>
                
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-300"
                    style={{ 
                      width: `${((currentQuestion + 1) / mockAssessments[selectedAssessment].questions.length) * 100}%` 
                    }}
                  />
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">
                  {mockAssessments[selectedAssessment].questions[currentQuestion].text}
                </h3>
                
                <div className="space-y-3">
                  {mockAssessments[selectedAssessment].questions[currentQuestion].options.map((option) => (
                    <motion.button
                      key={option.value}
                      className="w-full text-left p-4 border border-border rounded-xl hover:bg-secondary/50 transition-colors"
                      onClick={() => handleAnswer(
                        mockAssessments[selectedAssessment].questions[currentQuestion].id, 
                        option.value
                      )}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </GlassMorphism>
          </motion.div>
        )}
        
        {!selectedAssessment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8"
          >
            <GlassMorphism className="p-6">
              <h2 className="text-xl font-semibold mb-3">About Our Assessments</h2>
              <p className="text-muted-foreground mb-3">
                These quick assessments are designed to help you gain insight into your mental wellbeing. They're based on standardized screening tools used by mental health professionals.
              </p>
              <p className="text-muted-foreground">
                <strong>Important note:</strong> These assessments are not diagnostic tools. They're meant to provide a general understanding of your mental health and aren't a substitute for professional evaluation.
              </p>
            </GlassMorphism>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Assessment;
