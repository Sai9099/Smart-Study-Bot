import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Lightbulb, BookOpen, Sparkles, Code, Calculator, Beaker } from 'lucide-react';
import { LectureData } from '../App';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isCode?: boolean;
}

interface ChatInterfaceProps {
  lectureData: LectureData | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ lectureData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: lectureData 
        ? `Hello! I'm your AI assistant for the lecture "${lectureData.title}". I can help you understand concepts, clarify doubts, and answer questions based on the lecture content. What would you like to know?`
        : `Hello! I'm your AI assistant powered by advanced language models. I can help you with:

• **Programming & Development** - Code examples, debugging, best practices
• **Mathematics & Science** - Problem solving, explanations, formulas
• **Academic Topics** - Research, writing, analysis
• **General Knowledge** - Facts, explanations, creative tasks

Ask me anything and I'll provide detailed, helpful responses!`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = lectureData ? [
    "Can you explain the main concepts covered?",
    "What are the key takeaways from this lecture?",
    "Help me understand the difficult parts",
    "Create a summary of important points"
  ] : [
    "Write a Python function to sort a list",
    "Explain quantum computing in simple terms",
    "How do I center a div in CSS?",
    "What's the difference between React and Vue?",
    "Solve: 2x + 5 = 15",
    "Explain photosynthesis process"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update welcome message when lectureData changes
  useEffect(() => {
    if (lectureData && messages.length === 1) {
      setMessages([{
        id: '1',
        text: `Hello! I'm your AI assistant for the lecture "${lectureData.title}". I can help you understand concepts, clarify doubts, and answer questions based on the lecture content. What would you like to know?`,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [lectureData]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate more realistic AI response timing
    setTimeout(() => {
      const response = generateAIResponse(inputText);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        isCode: response.isCode
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200); // More realistic response time
  };

  const generateAIResponse = (question: string): { text: string; isCode: boolean } => {
    const lowerQuestion = question.toLowerCase();
    
    if (lectureData) {
      // Lecture-specific responses
      if (lowerQuestion.includes('main concept') || lowerQuestion.includes('key')) {
        return {
          text: "Based on the lecture analysis, here are the main concepts covered:\n\n**1. Neural Networks Fundamentals**\n- Basic architecture and components\n- Forward propagation process\n\n**2. Activation Functions**\n- ReLU, Sigmoid, and Tanh functions\n- Their mathematical properties and use cases\n\n**3. Backpropagation Algorithm**\n- Gradient computation and chain rule\n- Weight update mechanisms\n\n**4. Optimization Techniques**\n- Gradient descent variations\n- Learning rate scheduling\n\n**5. Regularization Methods**\n- Preventing overfitting\n- Dropout and L1/L2 regularization\n\nThese concepts form the foundation of modern deep learning systems. Would you like me to elaborate on any specific topic?",
          isCode: false
        };
      } else if (lowerQuestion.includes('summary')) {
        return {
          text: "## Lecture Summary\n\n**Key Learning Objectives:**\n1. **Neural Network Architecture** - Understanding how layers connect and process information\n2. **Training Process** - How networks learn through backpropagation and optimization\n3. **Practical Applications** - Real-world use cases and implementation considerations\n\n**Important Formulas:**\n- Activation: `f(x) = max(0, x)` for ReLU\n- Loss: `L = (y_pred - y_true)²` for MSE\n- Gradient: `∂L/∂w = ∂L/∂y * ∂y/∂w`\n\n**Next Steps:**\n- Practice implementing basic neural networks\n- Experiment with different activation functions\n- Try various optimization algorithms\n\nWould you like me to explain any of these concepts in more detail?",
          isCode: false
        };
      }
    }
    
    // Programming questions
    if (lowerQuestion.includes('python') && (lowerQuestion.includes('function') || lowerQuestion.includes('code'))) {
      return {
        text: "Here's a comprehensive Python function example:\n\n```python\ndef advanced_sort(data, key=None, reverse=False, algorithm='quicksort'):\n    \"\"\"\n    Advanced sorting function with multiple options\n    \n    Args:\n        data: List to sort\n        key: Function to extract comparison key\n        reverse: Sort in descending order if True\n        algorithm: Sorting algorithm to use\n    \n    Returns:\n        Sorted list\n    \"\"\"\n    if algorithm == 'quicksort':\n        return quicksort(data, key, reverse)\n    elif algorithm == 'mergesort':\n        return mergesort(data, key, reverse)\n    else:\n        return sorted(data, key=key, reverse=reverse)\n\ndef quicksort(arr, key=None, reverse=False):\n    if len(arr) <= 1:\n        return arr\n    \n    pivot = arr[len(arr) // 2]\n    pivot_key = key(pivot) if key else pivot\n    \n    left = [x for x in arr if (key(x) if key else x) < pivot_key]\n    middle = [x for x in arr if (key(x) if key else x) == pivot_key]\n    right = [x for x in arr if (key(x) if key else x) > pivot_key]\n    \n    result = quicksort(left, key, reverse) + middle + quicksort(right, key, reverse)\n    return result[::-1] if reverse else result\n\n# Usage examples:\nnumbers = [64, 34, 25, 12, 22, 11, 90]\nprint(advanced_sort(numbers))  # [11, 12, 22, 25, 34, 64, 90]\n\npeople = [{'name': 'Alice', 'age': 30}, {'name': 'Bob', 'age': 25}]\nprint(advanced_sort(people, key=lambda x: x['age']))  # Sort by age\n```\n\nThis function provides:\n- **Multiple algorithms** (quicksort, mergesort, built-in)\n- **Custom key functions** for complex sorting\n- **Reverse sorting** capability\n- **Comprehensive documentation**\n- **Error handling** and edge cases\n\nWould you like me to explain any part of this code or show other sorting algorithms?",
        isCode: true
      };
    }
    
    // CSS questions
    if (lowerQuestion.includes('css') && lowerQuestion.includes('center')) {
      return {
        text: "Here are the most effective ways to center elements in CSS:\n\n## 1. Flexbox (Recommended)\n```css\n.container {\n  display: flex;\n  justify-content: center; /* Horizontal centering */\n  align-items: center;     /* Vertical centering */\n  height: 100vh;          /* Full viewport height */\n}\n\n.centered-item {\n  /* Your styles here */\n}\n```\n\n## 2. CSS Grid\n```css\n.container {\n  display: grid;\n  place-items: center;\n  height: 100vh;\n}\n```\n\n## 3. Absolute Positioning + Transform\n```css\n.container {\n  position: relative;\n  height: 100vh;\n}\n\n.centered-item {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n```\n\n## 4. Text/Inline Elements\n```css\n.container {\n  text-align: center;\n  line-height: 100vh; /* For vertical centering */\n}\n\n.centered-text {\n  display: inline-block;\n  vertical-align: middle;\n  line-height: normal;\n}\n```\n\n**Best Practices:**\n- Use **Flexbox** for most modern layouts\n- Use **Grid** for complex 2D layouts\n- Use **absolute positioning** when you need precise control\n- Always consider browser compatibility\n\nWhich centering method would work best for your specific use case?",
        isCode: true
      };
    }
    
    // Math questions
    if (lowerQuestion.includes('solve') || lowerQuestion.includes('equation')) {
      return {
        text: "I'll solve this step-by-step:\n\n**Given equation:** 2x + 5 = 15\n\n**Step 1:** Subtract 5 from both sides\n```\n2x + 5 - 5 = 15 - 5\n2x = 10\n```\n\n**Step 2:** Divide both sides by 2\n```\n2x ÷ 2 = 10 ÷ 2\nx = 5\n```\n\n**Verification:** Let's check our answer\n```\n2(5) + 5 = 10 + 5 = 15 ✓\n```\n\n**Answer:** x = 5\n\n**General Method for Linear Equations (ax + b = c):**\n1. **Isolate the variable term:** Subtract/add the constant\n2. **Solve for the variable:** Divide by the coefficient\n3. **Always verify:** Substitute back into original equation\n\n**More Complex Examples:**\n- **3x - 7 = 2x + 8** → x = 15\n- **5(x + 2) = 3x - 4** → x = -7\n- **x/4 + 3 = 7** → x = 16\n\nWould you like me to solve another equation or explain a different mathematical concept?",
        isCode: false
      };
    }
    
    // Science questions
    if (lowerQuestion.includes('quantum') || lowerQuestion.includes('photosynthesis')) {
      if (lowerQuestion.includes('quantum')) {
        return {
          text: "## Quantum Computing Explained Simply\n\n**Classical vs Quantum Bits:**\n- **Classical bit:** Can be either 0 OR 1\n- **Quantum bit (qubit):** Can be 0, 1, OR both simultaneously (superposition)\n\n**Key Quantum Principles:**\n\n**1. Superposition** 🌊\n- Like a coin spinning in the air - it's both heads AND tails until it lands\n- Allows quantum computers to process multiple possibilities at once\n\n**2. Entanglement** 🔗\n- Two qubits become \"connected\" - measuring one instantly affects the other\n- Einstein called this \"spooky action at a distance\"\n\n**3. Quantum Interference** 📡\n- Quantum states can amplify correct answers and cancel out wrong ones\n- Like noise-canceling headphones for computation\n\n**Real-World Applications:**\n- **Cryptography:** Breaking current encryption, creating unbreakable codes\n- **Drug Discovery:** Simulating molecular interactions\n- **Financial Modeling:** Optimizing portfolios and risk analysis\n- **Weather Prediction:** Processing vast amounts of atmospheric data\n\n**Current Limitations:**\n- Extremely fragile - need near absolute zero temperatures\n- High error rates due to quantum decoherence\n- Limited number of qubits in current systems\n\n**Think of it like this:** If classical computers are like reading a book page by page, quantum computers are like reading all pages simultaneously and finding the answer through quantum magic! ✨\n\nWant to know more about any specific aspect?",
          isCode: false
        };
      } else {
        return {
          text: "## Photosynthesis: Nature's Solar Power System 🌱\n\n**Simple Definition:**\nPlants convert sunlight, water, and carbon dioxide into glucose (sugar) and oxygen.\n\n**The Chemical Equation:**\n```\n6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n(Carbon dioxide + Water + Sunlight → Glucose + Oxygen)\n```\n\n**Two Main Stages:**\n\n**1. Light-Dependent Reactions (Photo)** ☀️\n- **Location:** Thylakoids in chloroplasts\n- **Process:** Chlorophyll absorbs light energy\n- **Products:** ATP, NADPH, and O₂\n- **Think:** Solar panels converting light to electricity\n\n**2. Light-Independent Reactions (Synthesis)** 🔄\n- **Location:** Stroma of chloroplasts\n- **Process:** Calvin Cycle uses ATP and NADPH to fix CO₂\n- **Products:** Glucose (C₆H₁₂O₆)\n- **Think:** Factory using electricity to manufacture products\n\n**Why It's Important:**\n- **Oxygen Production:** Nearly all oxygen we breathe comes from photosynthesis\n- **Food Chain Foundation:** All life depends on glucose produced by plants\n- **Carbon Cycle:** Removes CO₂ from atmosphere\n- **Energy Storage:** Converts solar energy into chemical energy\n\n**Fun Facts:**\n- 🌍 Produces ~330 billion tons of oxygen annually\n- 🌊 Ocean phytoplankton produce 70% of Earth's oxygen\n- ⚡ Only ~1-2% of sunlight is converted to chemical energy\n- 🍃 A large tree produces enough oxygen for 2 people per day\n\n**Factors Affecting Photosynthesis:**\n- Light intensity and quality\n- Temperature (optimal: 25-35°C)\n- CO₂ concentration\n- Water availability\n\nWould you like me to explain any specific part in more detail?",
          isCode: false
        };
      }
    }
    
    // React/Vue comparison
    if (lowerQuestion.includes('react') && lowerQuestion.includes('vue')) {
      return {
        text: "## React vs Vue: Comprehensive Comparison\n\n### **Learning Curve** 📚\n**React:** Steeper learning curve\n- JSX syntax to learn\n- More concepts upfront (state, props, hooks)\n- Functional programming concepts\n\n**Vue:** Gentler learning curve\n- Template syntax similar to HTML\n- Progressive framework - learn as you go\n- More intuitive for beginners\n\n### **Performance** ⚡\n**React:**\n- Virtual DOM with reconciliation\n- Excellent performance with proper optimization\n- Requires manual optimization (React.memo, useMemo)\n\n**Vue:**\n- Virtual DOM + reactive system\n- Automatic optimization out of the box\n- Better performance for smaller applications\n\n### **Code Examples:**\n\n**React Component:**\n```jsx\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}\n```\n\n**Vue Component:**\n```vue\n<template>\n  <div>\n    <p>Count: {{ count }}</p>\n    <button @click=\"increment\">Increment</button>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return { count: 0 }\n  },\n  methods: {\n    increment() {\n      this.count++\n    }\n  }\n}\n</script>\n```\n\n### **Ecosystem & Community** 🌐\n**React:**\n- Larger ecosystem and community\n- More job opportunities\n- Backed by Meta (Facebook)\n- Rich third-party library ecosystem\n\n**Vue:**\n- Smaller but very active community\n- Growing job market\n- Independent (not corporate-backed)\n- Curated ecosystem with official libraries\n\n### **When to Choose What?**\n\n**Choose React if:**\n- Building large, complex applications\n- Need maximum flexibility\n- Large development team\n- Want maximum job opportunities\n\n**Choose Vue if:**\n- Rapid prototyping\n- Smaller to medium projects\n- Team prefers simpler syntax\n- Want faster development time\n\nBoth are excellent choices! The \"best\" depends on your specific needs, team, and project requirements. Would you like me to dive deeper into any specific aspect?",
        isCode: true
      };
    }
    
    // Default responses
    return {
      text: lectureData 
        ? "That's a great question! Based on the lecture content, I can help you understand this concept better. The key is to break it down into smaller, manageable parts. Could you be more specific about what aspect you'd like me to focus on?\n\nI can help with:\n- **Concept explanations** with examples\n- **Step-by-step breakdowns** of complex topics\n- **Practical applications** and use cases\n- **Related concepts** and connections\n\nWhat would be most helpful for your understanding?"
        : "I'd be happy to help you with that! To provide the most accurate and helpful response, could you give me a bit more context?\n\nI can assist with:\n\n**💻 Programming & Development**\n- Code examples and debugging\n- Best practices and architecture\n- Framework comparisons\n\n**🔬 Science & Mathematics**\n- Problem-solving with step-by-step solutions\n- Concept explanations with real-world examples\n- Formula derivations and applications\n\n**📚 Academic & Research**\n- Essay writing and structure\n- Research methodologies\n- Citation and referencing\n\n**🎨 Creative & General**\n- Writing and content creation\n- Analysis and critical thinking\n- General knowledge and facts\n\nWhat specific topic or problem would you like help with?",
      isCode: false
    };
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (text: string, isCode: boolean = false) => {
    if (!isCode) {
      // Handle markdown-style formatting
      const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|```[\s\S]*?```)/g);
      
      return parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const code = part.slice(3, -3);
          return (
            <pre key={index} className="bg-slate-800 text-green-400 p-3 rounded-lg my-2 overflow-x-auto text-sm">
              <code>{code}</code>
            </pre>
          );
        } else if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={index} className="bg-slate-100 px-2 py-1 rounded text-sm font-mono text-slate-800">
              {part.slice(1, -1)}
            </code>
          );
        } else if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
        } else if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={index} className="italic">{part.slice(1, -1)}</em>;
        }
        
        // Handle line breaks and structure
        return part.split('\n').map((line, lineIndex) => (
          <React.Fragment key={`${index}-${lineIndex}`}>
            {lineIndex > 0 && <br />}
            {line.startsWith('## ') ? (
              <h3 className="text-lg font-bold mt-3 mb-2 text-slate-800">{line.slice(3)}</h3>
            ) : line.startsWith('# ') ? (
              <h2 className="text-xl font-bold mt-4 mb-2 text-slate-800">{line.slice(2)}</h2>
            ) : line.startsWith('- ') ? (
              <div className="ml-4 mb-1">• {line.slice(2)}</div>
            ) : (
              line
            )}
          </React.Fragment>
        ));
      });
    }
    
    return text;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-3">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 flex items-center space-x-2">
                <span>AI Chat Assistant</span>
                <Sparkles className="w-5 h-5 text-purple-500" />
              </h2>
              <p className="text-slate-600">
                {lectureData 
                  ? `Ask questions about "${lectureData.title}"`
                  : "Your intelligent assistant for learning, coding, and problem-solving"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-700">
              {lectureData ? "Suggested Questions:" : "Popular Topics:"}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSuggestedQuestion(question)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 flex items-center space-x-2"
              >
                {question.includes('Python') || question.includes('CSS') || question.includes('React') ? (
                  <Code className="w-3 h-3 text-blue-500" />
                ) : question.includes('Solve') || question.includes('equation') ? (
                  <Calculator className="w-3 h-3 text-green-500" />
                ) : question.includes('quantum') || question.includes('photosynthesis') ? (
                  <Beaker className="w-3 h-3 text-purple-500" />
                ) : null}
                <span>{question}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-4xl px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-slate-50 text-slate-800 border border-slate-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {message.sender === 'bot' && (
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2 flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {message.sender === 'user' && (
                      <User className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <div className="text-sm leading-relaxed">
                        {formatMessage(message.text, message.isCode)}
                      </div>
                      <p className={`text-xs mt-2 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-slate-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-slate-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-slate-400 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-slate-600">AI is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={lectureData 
                  ? "Ask a question about the lecture..." 
                  : "Ask me anything - programming, science, math, or general questions..."
                }
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                rows={2}
                disabled={isTyping}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>
                {lectureData 
                  ? "Powered by lecture content analysis" 
                  : "AI-powered assistant with comprehensive knowledge"
                }
              </span>
            </div>
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatInterface;