import  { useState, useEffect } from 'react';
import { Search, Bot, Zap , Github, Twitter, ChevronRight, TrendingUp, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EasyBuyLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Real-Time Scraping",
      description: "Collects product listings from e-commerce sites using advanced Puppeteer technology",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Summarization",
      description: "Uses Groq-hosted LLMs (LLaMA 4 Scout, Mixtral) to intelligently summarize results",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Full-stack system built with React, Flask, and MongoDB for optimal performance",
      color: "from-orange-500 to-red-500"
    }
  ];

  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "Flask", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "LangChain", category: "AI" },
    { name: "Docker", category: "DevOps" },
    { name: "Groq API", category: "AI Models" }
  ];

  const sampleQueries = [
    "Best gaming laptops under ₹1 lakh",
    "Top smart TVs under ₹50,000",
    "Most affordable noise-canceling headphones",
    "Best phones under ₹30k"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Easy Buy
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
              <a href="#tech" className="hover:text-purple-400 transition-colors">Tech Stack</a>
              <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-2 rounded-full hover:from-purple-600 hover:to-cyan-600 transition-all transform hover:scale-105"
              onClick={() => navigate('/auth')}>
                Get Started
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm">AI-Powered Product Intelligence</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
              Smart Product
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Discovery
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI-enhanced product tracker that scrapes real-time listings and delivers intelligent summaries 
              through cutting-edge LLM technology.
            </p>

            {/* Interactive Search Demo */}
            <div className="max-w-2xl mx-auto mb-16">
              <div className="relative">
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {sampleQueries.map((query, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm hover:bg-white/20 transition-all transform hover:scale-105"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 rounded-2xl text-lg font-semibold hover:from-purple-600 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center space-x-2">
                <span>Start Tracking</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="border border-white/30 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all transform hover:scale-105 flex items-center space-x-2">
                <Github className="w-5 h-5" />
                <span><a href='https://github.com/05sanjaykumar/Price-Tracker'>View Code</a></span>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Built with modern technologies and AI capabilities to deliver the best product tracking experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-105 ${
                  currentFeature === index ? 'ring-2 ring-purple-500/50' : ''
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "100+", label: "E-commerce Sites" },
              { number: "AI", label: "LLM Models" },
              { number: "24/7", label: "Real-time Tracking" },
              { number: "⚡", label: "Lightning Fast" }
            ].map((stat, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech" className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Tech Stack
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Built with cutting-edge technologies for maximum performance and scalability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-purple-500/50 transition-all transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{tech.name}</h3>
                    <p className="text-purple-300 text-sm">{tech.category}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Creator Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Built by Sanjay Kumar
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                💡 Self-taught developer | Polyglot Dev | Indie Hacker
                <br />
                🛠️ Built from scratch at 20 to showcase real-world project skills
              </p>
              
              <div className="flex justify-center space-x-6">
                <a href="https://github.com/05sanjaykumar" target='_blank' className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all transform hover:scale-105">
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a href="https://x.com/sanjaykuma49595"  target='_blank' className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all transform hover:scale-105">
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Ready to Start Tracking?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Experience the future of product discovery with AI-powered intelligence and real-time tracking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 rounded-2xl text-lg font-semibold hover:from-purple-600 hover:to-cyan-600 transition-all transform hover:scale-105"
              onClick={() => navigate('/auth')}>
                Get Started Now
              </button>
              <button className="border border-white/30 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all transform hover:scale-105">
                View Documentation
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/10">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Easy Buy. Built with passion by Sanjay Kumar.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EasyBuyLanding;