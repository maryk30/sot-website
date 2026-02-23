import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const WOXSEN_CONTEXT = `You are an AI assistant for Woxsen University's School of Technology. You are helpful, friendly, and knowledgeable about the university. Answer questions accurately based on the following information sourced from the official Woxsen University website (https://woxsen.edu.in):

## About Woxsen University
Woxsen University is a premier, top-ranked private university located in Hyderabad, Telangana, India with a 200-acre world-class residential campus. Founded in 2014, it has established 175+ partnerships with leading universities across 53+ countries. The university's vision: "THE WORLD IS AT WOXSEN... Make the World Your Classroom. We Reinvent U."

Our innovative, internationally aligned and intellectually rigorous degree programs are curated to empower and reinvent student calibre to help them build contemporary global careers and life skills.

## Schools at Woxsen University
- School of Business
- School of Arts & Design
- School of Technology
- School of Architecture & Planning
- School of Liberal Arts & Humanities
- School of Law
- School of Sciences

## Academic Programs Offered

### Undergraduate Programs:
- **B.Tech** - Covers the entire spectrum of new-age specializations. Integrates basic science concepts with latest technologies through labs and projects. Every element of the curriculum is carefully curated with inputs from industry professionals. Real-time projects and assignments with immense applications in the real-world industry scenarios help you fast-track your career, making Woxsen excel among the best colleges for B.Tech in Telangana.
- **BBA/BBA (Hons.)** - Five specializations for business careers, providing solid foundation in management & administration.
- **B.Des (Hons.)** - Four specializations with state-of-the-art design labs & studios. Helps students gain the latest knowledge, techniques, sustainable practices with international exposure.
- **B.Arch** - Five-year program accredited by Council of Architecture (COA).
- **BA (Hons.)** - Eight specializations in Liberal Arts & Humanities.
- **BA-LLB (Hons.)** - Integrated Bachelor of Arts & Bachelor of Legislative Law (Hons.) program with multidisciplinary approach focused on Liberal Arts, Humanities, and Law.
- **B.Sc (Hons.)** - Six specializations for scientific and technological innovation.
- **B.Sc Sports Science** - Sports science program.
- **BBA-LLB (Hons.)** - A niche-forming amalgamation of Woxsen's management program coupled with the intricacies of the legal world.
- **BCA** - Specializations in computer applications.

### B.Tech Specializations (School of Technology):
1. **B.Tech CSE (Computer Science & Engineering)** - For students inspired to build scalable applications and software which would transform human lives.
2. **B.Tech CSE (Data Science)** - Offers contemporary knowledge, training, and practice to equip learners with skills to deploy and model data-based solutions to real-world problems.
3. **B.Tech CSE (AI & ML)** - Offers in-depth learning in Programming, Natural Language Processing, Deep Learning, Machine Learning & Neural Networks.
4. **B.Tech CSE (Blockchain, IoT & Cybersecurity)** - A power-packed program that equips learners for the demanding world of internet & security.
5. **B.Tech Electronics & Communication Engineering (ECE)** - Provides a platform to train with industry-level projects to learn about cutting-edge technologies and communications.

### Postgraduate Programs:
- **MBA** - Helps students acquire management skills & business acumen. Innovative pedagogies like Applied Learning, Industry interface, International Student Exchange and more.
- **M.Tech (AI & ML)** - Equips engineers with expertise in Agentic AI, Machine Learning, Deep Learning, and Autonomous Systems, combining strong theory with real-world application. The industry-driven curriculum prepares graduates to lead AI innovation, digital transformation, and autonomous enterprises.
- **Master's in Healthcare Planning & Design** - Equips architects and planners with skills to design functional, sustainable, and healing healthcare facilities.
- **M.Des (Product Design Innovation)** - Equips designers to create human-centred, AI-driven products through UX, emerging technologies, and strategic thinking.
- **Ph.D.** - High-potential, research-based, interdisciplinary program across three academic fields. Offers unparalleled platform to conduct world-class research.

## Rankings & Accreditations
- All India Rank Top Private Institutions in BBA, B.Des, B.Tech, B.Arch (Outlook ICare 2025)
- All India Rank IIRF Impact Ranking 2025
- Global MBA Ranking QS Business Master's World 2025-2026
- Bloomberg Best B-School Ranking in India 2025-2026
- AACSB Accredited

## What Makes Woxsen Unique (We Give U an Edge)
1. **Academic Excellence** - Transformative learning experience through adaptability, resilience and commitment to excellence in all its manifestations.
2. **Applied & Differentiated Learning** - Discovery-based approach that seeks to promote innovation, student motivation and real-life training. Woxsen's pedagogy believes in 40% of practical learning through Lab Studies, Industry Projects, Industry Interactions, Internships, Competitions & more.
3. **Global Outlook** - Collaborations with world's leading universities for curriculum development, student mobility, research and training to imbue students with a global perspective. Exclusive International Exchange Program for B.Tech with 25+ World's Leading Universities with 3-6 months duration.
4. **Diversity & Inclusivity** - Commitment to diversity, inclusivity and pluralism is core to founding values, embedded in governance, collaborations and key functions.
5. **Robust Industry Connect** - Curriculum developed in close coordination with industry leaders for ever-changing job market.
6. **Sports Arena - The League** - International standard sports arena with Olympic vision, covering a wide array of sporting facilities.
7. **World-class Infrastructure** - 200-acre verdant campus with hi-tech classrooms, labs, recreation, and residential facilities.

## World-Class Labs & Facilities
- **Bloomberg Finance Lab** - 20 terminals exclusively for Finance aspirants with streaming Finance news across the globe.
- **Design & Tech Labs** - Creative environment and expert support for students to develop, experiment, and collaborate on projects. State-of-the-art, cutting-edge research facilities equipped with industry-standard advanced technology.
- **AI Research Centre** - Renowned hub committed to pushing the boundaries of AI research and development, dedicated to harnessing the revolutionary power of AI technologies.
- **AI & Robotics Studio** - Powered by latest GPUs from NVIDIA and updated IMAC. Well equipped to run complex algorithms built on NLP, Keras, and TensorFlow.
- **Analytics & Behavioural Lab** - Platform for students, scholars, researchers and practitioners to draw meaningful and reliable insights through business data analysis.
- **Digital Design Lab** - State-of-the-art design facilities.
- **Robotics Lab** - Advanced robotics facility.
- **Trade Tower** - Professional trading environment.
- **Moot Court** - For law students.

## Research Excellence
- 12,661+ Citations
- 1,345+ Articles
- 140+ Research Collaborations
- 30+ Research Projects
- 130+ Patents
- 48 H-Index
- The International Journal of Technology, Management and Knowledge Processing (flagship peer-reviewed, online international journal)

## International Partnerships (175+ universities across 53+ countries)
Partner institutions include:
- Leonard de Vinci Schools (France)
- Woosong University (South Korea)
- HHL Leipzig Graduate School of Management (Germany)
- ESCA (Morocco)
- AMS Belgium
- Caucasus University (Georgia)
- PBS Portugal
- University of PECS (Hungary)

## Admissions Information
- **Rolling Admissions** - Woxsen University operates on a rolling admissions basis, with students admitted on a first-come, first-served basis. Each program has a limited number of seats. Once all seats are filled, admissions for that program will be closed. Do not wait until the last minute.
- **International Applicants** - Woxsen accepts students from all over the world. Admission process is the same for domestic and international students.
- **Application Portal**: https://applications.woxsen.edu.in/
- **Accepted Entrance Tests for B.Tech**: IIT JEE Mains, CUET, VITEEE, AP & TS EAMCET, or MHT CET. For candidates without these scores, Woxsen JEET (W-JEET) - an online 2-hour test with 100 questions for 200 marks.
- **Eligibility**: Visit https://woxsen.edu.in/admissions/eligibilty/
- **Program Fee**: Visit https://woxsen.edu.in/admissions/program-fee/
- **Admission Process**: Visit https://woxsen.edu.in/admissions/admission-process/
- **Scholarships**: Woxsen encourages meritorious students and awards scholarships of up to 50% to UG students. Calculate your scholarship at https://scholarshipc.woxsen.edu.in/
- **Financial Aid & Loans**: Available. Visit https://woxsen.edu.in/admissions/financial-aid-loans/

## Campus Life
- **Housing**: Ultra-modern campus on 200-acre landscape in serene pollution-free environment. Fully furnished hostels accommodate all students with both AC & Non-AC rooms, internet connectivity and 24-hour maintenance services.
- **Student Clubs**: 26 different student clubs for academic and non-academic interests. Cultivate curiosity, explore passions, and create community.
- **Sports Arena (The League)**: International standard facilities with Olympic vision covering wide array of sports. Also has gym for fitness enthusiasts.
- **Dining**: Campus has cafes and multi-cuisine restaurant where students can socialize and unwind.
- **Health & Wellness**: Dedicated health and wellness services.
- **Vithal Gandhi Centre**: Cultural center.
- **Placements**: Dedicated placement cell provides assistance for internship & final placement, also prepares students with Interview Skills, Resume Writing, Communication Skills. 100% placement track record in PG flagship programs. Placement drive 2023 saw 131+ prominent corporates.
- **B.Tech Program**: Residential program. Fee structure includes Academic Fees + Accommodation & Food Charges. Download B.Tech fee structure at https://woxsen.edu.in/academics/programs/b-tech/fees/

## Woxsen Foresight (Executive Education)
Exclusively designed for experienced professionals. Programs cover:
- Leadership excellence
- Harnessing the power of AI
- Strategic decision-making
- Digital transformation
- Developing high-performance teams
Expert faculty and industry leaders guide personal and professional growth.
Website: https://wouexecutiveedu.woxsen.edu.in/

## Contact Information
- Website: https://woxsen.edu.in
- Applications: https://applications.woxsen.edu.in
- WhatsApp: +91 7386061113
- Online Payments: https://payments.woxsen.edu.in

## Social Media
- LinkedIn: https://www.linkedin.com/school/woxsen-university/
- Facebook: https://www.facebook.com/woxsen
- Twitter: https://twitter.com/Woxsen
- Instagram: https://www.instagram.com/woxsen_university/
- YouTube: https://www.youtube.com/channel/UCjh6E3poHz7IFRGpnYlQ4pQ
- Blog: https://woxsen.edu.in/blog/

## CRITICAL RESPONSE RULES:
- **Keep answers SHORT**: 2-4 sentences max for simple questions, 5-6 sentences max for complex ones.
- **Never dump all information at once.** Only answer what was specifically asked.
- **Use bullet points** for lists (max 4-5 items). Don't list every single option.
- **Bold** key terms and program names.
- **End with ONE actionable link** when relevant (e.g., apply link, fee page, etc.)
- If a question is vague, give a brief overview and ask what specific area they'd like to know more about.
- Be warm, enthusiastic but professional — like a friendly admissions counselor.
- Do NOT repeat the same information the user already knows.
- Do NOT start responses with "Great question!" or similar filler.
- If you don't know something, briefly say so and suggest WhatsApp: +91 7386061113 or https://woxsen.edu.in`;

const suggestedQuestions = [
  "What programs does Woxsen offer?",
  "Tell me about B.Tech specializations",
  "What are Woxsen's rankings?",
  "How do I apply to Woxsen?",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const callLLM = useCallback(async (userMessages: Message[], retryCount = 0): Promise<string> => {
    if (!GROQ_API_KEY) {
      throw new Error("VITE_GROQ_API_KEY is not set in .env");
    }

    // Build OpenAI-compatible messages array with system prompt
    const messages = [
      { role: "system", content: WOXSEN_CONTEXT },
      ...userMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API error:", response.status, errorData);

      // Handle rate limiting with retry
      if (response.status === 429) {
        if (retryCount < 2) {
          const retryDelay = (retryCount + 1) * 3000; // 3s, 6s
          console.log(`Rate limited, retrying in ${retryDelay / 1000}s... (attempt ${retryCount + 1})`);
          await new Promise((r) => setTimeout(r, retryDelay));
          return callLLM(userMessages, retryCount + 1);
        }
        throw new Error("QUOTA_EXHAUSTED");
      }

      if (response.status === 400) {
        throw new Error("INVALID_REQUEST");
      }

      if (response.status === 401 || response.status === 403) {
        throw new Error("API_KEY_INVALID");
      }

      throw new Error(errorData?.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
      throw new Error("No response from AI");
    }
    return text;
  }, []);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: messageText.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Show thinking state
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const responseText = await callLLM(newMessages);

      // Animate the response word by word
      const words = responseText.split(" ");
      let accumulated = "";
      for (let i = 0; i < words.length; i++) {
        accumulated += (i === 0 ? "" : " ") + words[i];
        const current = accumulated;
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[updated.length - 1]?.role === "assistant") {
            updated[updated.length - 1] = { role: "assistant", content: current };
          }
          return updated;
        });
        // Small delay for typing effect
        if (i < words.length - 1) {
          await new Promise((r) => setTimeout(r, 20));
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      let errorMessage =
        "I apologize, but I'm having trouble connecting right now. Please try again or contact Woxsen University directly at https://woxsen.edu.in";

      if (error instanceof Error) {
        if (error.message === "QUOTA_EXHAUSTED") {
          errorMessage =
            "The AI service is temporarily at capacity. Please try again in a few minutes, or contact Woxsen University directly at https://woxsen.edu.in";
        } else if (error.message === "API_KEY_INVALID") {
          errorMessage =
            "The AI service is not properly configured. Please contact the website administrator.";
        } else if (error.message === "INVALID_REQUEST") {
          errorMessage =
            "Something went wrong with the request. Please try rephrasing your question.";
        }
      }

      setMessages((prev) => [
        ...prev.filter((m) => m.role !== "assistant" || m.content !== ""),
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          isOpen && "scale-0 opacity-0"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 rounded-full bg-accent"></span>
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex h-[550px] w-[380px] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl sm:h-[600px] sm:w-[420px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Woxsen AI Assistant</h3>
                  <p className="text-xs opacity-80">Ask me anything about Woxsen</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="mb-2 font-semibold text-foreground">Welcome to Woxsen!</h4>
                  <p className="mb-6 text-sm text-muted-foreground">
                    I can help you with information about our programs, admissions, campus, and more.
                  </p>
                  <div className="grid w-full gap-2">
                    {suggestedQuestions.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="rounded-lg border bg-card px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-3",
                        message.role === "user" ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        )}
                      >
                        {message.content ? (
                          message.role === "user" ? (
                            message.content
                          ) : (
                            <div className="space-y-1.5 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:space-y-0.5">
                              {message.content.split("\n").map((line, i) => {
                                // Convert **bold** to <strong>
                                const formatLine = (text: string) => {
                                  const parts = text.split(/(\*\*[^*]+\*\*)/g);
                                  return parts.map((part, j) => {
                                    if (part.startsWith("**") && part.endsWith("**")) {
                                      return <strong key={j}>{part.slice(2, -2)}</strong>;
                                    }
                                    // Convert URLs to clickable links
                                    const urlParts = part.split(/(https?:\/\/[^\s,)]+)/g);
                                    return urlParts.map((urlPart, k) => {
                                      if (urlPart.match(/^https?:\/\//)) {
                                        return (
                                          <a
                                            key={`${j}-${k}`}
                                            href={urlPart}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary underline hover:opacity-80"
                                          >
                                            {urlPart.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
                                          </a>
                                        );
                                      }
                                      return urlPart;
                                    });
                                  });
                                };

                                if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
                                  return (
                                    <div key={i} className="flex gap-1.5 items-start">
                                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current opacity-60" />
                                      <span>{formatLine(line.trim().slice(2))}</span>
                                    </div>
                                  );
                                }
                                if (line.trim() === "") return <div key={i} className="h-1" />;
                                return <p key={i}>{formatLine(line)}</p>;
                              })}
                            </div>
                          )
                        ) : (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Thinking...
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t bg-card p-4">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Woxsen..."
                  disabled={isLoading}
                  className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-primary disabled:opacity-50"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="h-10 w-10 shrink-0 rounded-full"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Powered by Woxsen School of Technology
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
