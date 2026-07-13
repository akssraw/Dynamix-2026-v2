import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUp, X } from 'lucide-react'

// BRAND ASSET IMPORT
import logoAsset from './assets/dynamix-logo.png'

// BOOT SOUND
import bootSound from './assets/ps2-boot.mp3'

// Master Event Data Matrix

const DX_2026_EVENTS = [
  {
    id: 1,
    title: "Pixel Pop",
    mode: "ONLINE",
    category: "Design",
    venue: "Google Form Submission",
    eligibility: "Classes: 1-2 (One participant from each) | Teams: 1 (2 participants per team)",
    hashtag: "#TUX PAINT",
    desc: "Step into a world of colors and creativity as participants bring a given theme to life through vibrant digital artwork using the fun-filled Tux Paint application.",
    details: [
      "Participants must create the artwork using Tux Paint only.",
      "Topic for prelims: 'My dream robot' or 'Flying cars in future'.",
      "The drawing should be created during the competition time.",
      "Use of Tux Paint tools such as Brushes, Shapes, Stamps, Magic Effects, Text, and Fill Colors is encouraged.",
      "The artwork must be the participant's original creation.",
      "Internet images, screenshots, or copied artwork are not allowed.",
      "Parents/teachers may assist only in opening the software and submitting the file.",
      "The final artwork should be saved and submitted in .jpg/.png format."
    ],
    guidelines: [
      "All submissions must be original and plagiarism is strictly prohibited.",
      "The organizer's decision regarding submissions and results shall be final and binding.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 2,
    title: "Snap Slide",
    mode: "ONLINE",
    category: "Design",
    venue: "Google Form Submission",
    eligibility: "Classes: 3-4 (One participant from each class) | Teams: 1 (2 participants per team)",
    hashtag: "#PRESENTATION",
    desc: "A Snap Slide competition is where participants design and build a creative presentation on a given topic.",
    details: [
      "Participants will craft an engaging 7-8 slide PowerPoint (PRESENTATION) on the given topic, blending creativity, design, and impactful storytelling.",
      "Topic for the event is: 'Smart Cities of the Future' or 'The Future Classroom'.",
      "Use of Animations, Transitions, and Multimedia is allowed but must be appropriate.",
      "Submissions must be in .pptx format.",
      "The presentation must adhere to the topic.",
      "The submission will be assessed on the basis of content, creativity and layout."
    ],
    guidelines: [
      "All submissions must be original and plagiarism is strictly prohibited.",
      "Use of any other app except PowerPoint is strictly prohibited.",
      "The organizer's decision regarding submissions and results shall be final and binding.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 3,
    title: "Lume Luxe",
    mode: "ONLINE",
    category: "Coding",
    venue: "Google Form Submission",
    eligibility: "Classes: 5 | Teams: 1 (2 participants per team)",
    hashtag: "#SCRATCH",
    desc: "Dive into the world of creativity and coding as participants use Scratch to design engaging projects on the given theme, turning innovative ideas into interactive digital experiences.",
    details: [
      "This is an online event. Entries to be submitted in the given link by July 20th, 2026, 11:59 pm.",
      "File to be submitted in original format only (.sb3).",
      "Topic for the event is: 'Future School Escape Room' or 'Robot Run 2050'."
    ],
    guidelines: [
      "All submissions must be original and plagiarism is strictly prohibited.",
      "The organiser's decision with regard to the submission and results be final and binding.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 4,
    title: "Dreamscape",
    mode: "ONLINE",
    category: "Design",
    venue: "Canva Submission",
    eligibility: "Classes: 6-7 (One participant from each) | Teams: 1 (2 participants per team)",
    hashtag: "#CANVA",
    desc: "Design and illustrate original conceptual layouts utilizing Canva software mechanics to visually communicate the core event themes without external automated generators.",
    details: [
      "Participants must create their design individually using Canva only.",
      "The design should be an original creation and must not contain copyrighted or AI-generated content copied from external sources.",
      "The final submission should be in PNG, JPG, or PDF format. Canva link also to be submitted.",
      "Participants may use Canva templates, but the design should show significant customization and creativity.",
      "The design must include a title and relevant visuals/text related to the chosen topic.",
      "Topic: 'Think Before You Click (Internet Safety)' or 'My Dream Gaming World'."
    ],
    guidelines: [
      "All submissions must be original and plagiarism is strictly prohibited.",
      "Use of any other app except Canva is strictly prohibited.",
      "The organiser's decision with regard to the submission and results be final and binding.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 5,
    title: "Build It",
    mode: "ONLINE",
    category: "Web",
    venue: "Prototype Submission Link",
    eligibility: "Classes: 6-8 (Any class) | Teams: 1 (2 participants per team)",
    hashtag: "#APP MAKING",
    desc: "BuildIT is an exciting app development challenge that encourages young innovators to design practical digital solutions for real-world problems.",
    details: [
      "The app must be designed and developed by the participating students.",
      "Topic: 'WasteWise' (An app that helps users segregate waste into recyclable, biodegradable and non-biodegradable categories) OR 'Accessible World' (An app designed to assist elderly or differently abled people with daily based tasks and reminders).",
      "Working Prototype Required: The app should have at least 3-4 functional screens.",
      "Submission Requirements: App project file (.aia/.apk or equivalent) and a 3-5 minute screen-recorded demo video explaining the problem addressed, key features, and a live demonstration.",
      "AI tools not to be used.",
      "Apps must not contain inappropriate, offensive, or copyrighted content.",
      "Platform: MIT App Inventor, Thunkable, Kodular, App Lab, Scratch-based Apps, or any beginner-friendly app development platform."
    ],
    guidelines: [
      "All submissions must be original and plagiarism is strictly prohibited.",
      "The organiser's decision with regard to the submission and results be final and binding.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 6,
    title: "Outcode Jr.",
    mode: "ONLINE",
    category: "Coding",
    venue: "Online Judging Platform",
    eligibility: "Classes: 7-8 (One from each) | Teams: 1 (2 participants per team)",
    hashtag: "#CODING",
    desc: "Get ready for a thrilling coding challenge where surprises await at every stage! With unexpected tasks, logic-based twists, and real-time problem solving, participants must think fast, code smart, and adapt quickly to conquer the unknown.",
    details: [
      "Participants will solve a set of algorithmic and logical programming problems within a specified time limit.",
      "Problems will assess logical reasoning, data structures, algorithms, mathematics, and problem-solving skills.",
      "Teams may submit solutions in any programming language supported by the competition platform.",
      "The competition will be conducted on school-provided laptops.",
      "Rankings will be determined based on the number of problems solved.",
      "The decisions of the judges and organizers regarding scoring, rankings, and contest matters shall be final."
    ],
    guidelines: [
      "The organiser's decision with regard to the submission and results be final and binding.",
      "Participants may use only the resources and software authorized by the organizers.",
      "AI tools, communication platforms, external storage devices, and unauthorized software are prohibited. Any violation will result in immediate disqualification.",
      "Solutions must be submitted through the designated online judging platform.",
      "Contest details, including duration and platform information, will be shared with registered teams prior to the event."
    ]
  },
  {
    id: 7,
    title: "Meme Code",
    mode: "ONLINE",
    category: "Design",
    venue: "Google Form Submission",
    eligibility: "Classes: 7-9 (Participant from any class) | Teams: 1 (2 participants per team)",
    hashtag: "#THE EDUCATIONAL TECH MEME CHALLENGE",
    desc: "MemeCode is a creative digital competition that combines humour with learning, prompting students to merge comedic themes with core computing concepts.",
    details: [
      "Participants will create and submit one original educational tech meme based on any one of the prescribed themes.",
      "The meme should combine humour with an informative message related to technology.",
      "Format: JPEG or PNG | Canvas Size: Minimum 1080 x 1080 pixels (square format preferred) | Language: English.",
      "The meme may be created using digital design tools, presentation software, illustration apps, or photo-editing platforms.",
      "Topic: 'The \"I'll Fix It Tomorrow\" Programmer' or 'The Secret Thoughts of a Computer'."
    ],
    guidelines: [
      "The meme must be the original work of the participant.",
      "It should be humorous while maintaining educational value and appropriate language.",
      "Offensive, discriminatory, political, defamatory, or inappropriate content will lead to disqualification.",
      "Copyrighted images, templates, or artwork should not be used.",
      "Participants must not use AI-based design tools and final presentation should reflect their own creativity.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 8,
    title: "Infogra Fix",
    mode: "ONLINE",
    category: "Design",
    venue: "Google Form Submission",
    eligibility: "Classes: 7-9 (Participant from any class) | Teams: 1 (2 participants per team)",
    hashtag: "#THE TECH INFOGRAPHIC CHALLENGE",
    desc: "InfograFix is a digital design competition that challenges students to transform complex technology concepts into visually appealing and easy-to-understand infographics.",
    details: [
      "Participants will create and submit one original infographic explaining the given topic.",
      "Format: PDF, JPEG, or PNG | Size: A3 (Portrait or Landscape) preferred | Language: English.",
      "The infographic should include a clear title, relevant visuals/icons/illustrations, and brief explanatory text.",
      "Must feature facts, statistics, timelines, processes, or comparisons (where applicable) and References/Web Sources.",
      "Topic: '3D Printing: Printing the Future' or 'How Hackers Trick People: Understanding Phishing'."
    ],
    guidelines: [
      "The infographic must be the original work of the participant.",
      "Participants may use digital design tools such as Canva, PowerPoint, Google Slides, or similar applications.",
      "AI-assisted design tools must not be used.",
      "Copyrighted images, graphics, or icons should not be used.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 9,
    title: "Prompt Craft",
    mode: "ONLINE",
    category: "Coding",
    venue: "Discord / Google Form Node",
    eligibility: "Classes: 8-9 (One participant from each) | Teams: 1 (2 participants per team)",
    hashtag: "#PROMPT AI ENGINEERING",
    desc: "Prompt Craft is an AI Prompt Engineering competition that challenges students to communicate effectively with Artificial Intelligence tools by designing clear, creative, and well-structured prompts.",
    details: [
      "Participants will receive a set of themes/topics at the beginning of the competition via Discord.",
      "They will be required to create effective prompts for the given task using any AI chatbot or generative AI tool available to them.",
      "Participants may refine and improve their prompts through multiple iterations during the allotted time.",
      "Final submission must include: The final prompt used and the AI-generated output. Final submission to be done within one hour."
    ],
    guidelines: [
      "The time for event will start as the topic is released on Discord and the Google Form will stop accepting responses exactly one hour after that.",
      "Participants may use any AI tool such as ChatGPT, Gemini, Copilot, Claude, or other similar platforms.",
      "Internet connectivity and device arrangements shall be the responsibility of the participating schools/student.",
      "Previously prepared prompts, templates, or saved prompt libraries are not permitted.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 10,
    title: "Reel Tech",
    mode: "ONLINE",
    category: "Video",
    venue: "Video Submission Portal",
    eligibility: "Classes: 8-10 (Participant from any class) | Teams: 1 (2 participants per team)",
    hashtag: "#THE TECH REEL CHALLENGE",
    desc: "ReelTech is a short video creation competition that encourages students to communicate complex technological ideas or myths through engaging and impactful vertical reels.",
    details: [
      "Participants will create and submit a 60-second original reel/video based on any one of the prescribed themes.",
      "Video Specifications: Duration: 45-60 seconds | Orientation: Vertical (9:16 ratio) preferred | Format: MP4 | Resolution: Minimum 720p | Language: English or Hindi.",
      "Participants may use voice-over, on-screen text, animations, photographs, live-action footage, screen recordings, or a combination of these.",
      "Topic: 'Believe, Build, Achieve' or 'Tech Myths Busted!'."
    ],
    guidelines: [
      "The reel/video must be the original creation of the participant.",
      "Copyrighted music, videos, images, or other media should not be used.",
      "AI-based tools must not be used.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 11,
    title: "Teach Scribe",
    mode: "ONLINE",
    category: "Design",
    venue: "PDF Document Upload Node",
    eligibility: "Classes: 8-9 (Any class) | Teams: 1 (2 participants per team)",
    hashtag: "#THE TECHNICAL BLOGGING CHALLENGE",
    desc: "TechScribe is a technical blogging competition that provides students with a platform to express their ideas, opinions, and insights on emerging technologies through engaging and informative writing.",
    details: [
      "Topic: 'The Next Big Tech Revolution' or 'Young Innovators Changing the World'.",
      "Blog Specifications: Word Limit: 600-1000 words | Language: English | Format: PDF document.",
      "Font parameters: Times New Roman or Calibri, Font Size: 12 pt, Line Spacing: 1.5.",
      "The blog must include: Title of the Blog, Participant's Name, Class, School Name, Introduction, Main Content, Conclusion, and References/Web Sources."
    ],
    guidelines: [
      "The blog must be the original work of the participant.",
      "Plagiarism and direct copying from websites, books, blogs, or AI-generated articles are strictly prohibited.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 12,
    title: "Cliptica",
    mode: "ONLINE",
    category: "Video",
    venue: "Discord Resource Vault",
    eligibility: "Classes: 9-10 (One from each) | Teams: 1 (2 participants per team)",
    hashtag: "#VIDEO EDITING",
    desc: "Unleash your imagination and transform the provided raw video clips into a visually captivating masterpiece through the art of post-production structural synchronization.",
    details: [
      "Participants can use any editing software of their choice.",
      "Clips will be provided on the Discord server.",
      "Topics will be announced on the Discord server on July 13."
    ],
    guidelines: [
      "Only the provided clips may be used; additional footage is not permitted unless specified.",
      "Basic editing techniques such as transitions, color correction, text overlays, sound effects, and background music are allowed.",
      "All audio, music, and visual elements used must be copyright-free or properly credited.",
      "Entries must be submitted in MP4 format.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 13,
    title: "Web D",
    mode: "ONLINE",
    category: "Web",
    venue: "GitHub Repository Core",
    eligibility: "Classes: 9-10 (One from each) | Teams: 1 (2 participants per team)",
    hashtag: "#WEB DEVELOPMENT",
    desc: "Participants will design and develop an innovative, fully functional web-based solution based on the given theme, blending creativity with responsive programming technologies.",
    details: [
      "Prompts will be released on Discord on July 13.",
      "Any web development technology or framework may be used.",
      "The website should demonstrate originality, creativity, usability, and responsive design.",
      "Use of AI-generated code is not permitted.",
      "Submission Requirements: Source Code Folder / GitHub Repository Link, Live Website Link (if hosted), 2-3 minute demonstration video, and brief project documentation (PDF)."
    ],
    guidelines: [
      "The project must be created by the participating team and should not be copied from existing sources.",
      "All media assets used must be copyright-free or properly credited.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 14,
    title: "Aesthetix",
    mode: "ONLINE",
    category: "Design",
    venue: "Design Suite Target",
    eligibility: "Classes: 9-10 (One from each) | Teams: 1 (2 participants per team)",
    hashtag: "#DESIGNING",
    desc: "From striking digital art and powerful posters to futuristic UI mockups—create visuals that inspire, engage, and leave a lasting impact through manual manipulation layouts.",
    details: [
      "Allowed software: Photoshop, Canva, Illustrator, CorelDRAW, or any open-source design software.",
      "Originality is key—all designs must be created manually by the participants.",
      "AI tools are strictly prohibited.",
      "Top 5 teams will qualify for the offline final round.",
      "Final submissions must be in high-resolution PNG, JPG, or PDF format."
    ],
    guidelines: [
      "All artwork must be original and created by the participating team.",
      "Plagiarism or submission of previously published work will result in immediate disqualification.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 15,
    title: "*Click* Noice",
    mode: "ONLINE",
    category: "Video",
    venue: "Discord Upload Arena",
    eligibility: "Classes: 9-12 (One from each) | Teams: 1 (2 participants per team)",
    hashtag: "#PHOTOGRAPHY (DSLR/MIRRORLESS)",
    desc: "Tell a story through your lens. Use the power of raw optics photography to capture moments that speak louder than baseline computational rules.",
    details: [
      "Participants must capture and submit original photographs using a DSLR or Mirrorless camera only.",
      "The competition theme will be announced on the official Discord server.",
      "Submissions must be in .JPG, .JPEG, or RAW format.",
      "Basic post-processing (cropping, exposure, contrast, and color correction) is permitted; excessive manipulation, compositing, or AI-generated elements are not allowed.",
      "Photographs must not contain watermarks, borders, signatures, or identifying marks.",
      "Participants should retain the original RAW file, as it may be requested for verification."
    ],
    guidelines: [
      "Plagiarism or use of images captured by someone else will lead to immediate disqualification.",
      "The decision of the judges and organizers will be final and binding.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 16,
    title: "Quest Sphere",
    mode: "OFFLINE",
    category: "Gaming",
    venue: "Discord (Prelims) / Gaming PC Lab (Finals)",
    eligibility: "Classes: 11-12 (One from each) | Teams: 1 (2 participants per team)",
    hashtag: "#GAMING PC",
    desc: "Enter the ultimate gaming battleground where only the sharpest players survive! Packed with intense competition, unexpected twists, and mystery games from multiple genres.",
    details: [
      "There will be different games for each round, which will be announced a day prior on the Discord server.",
      "The teams need to be a part of the Discord server during the online round of the event for announcements and instructions.",
      "Top 6 teams will qualify for the final offline round.",
      "Fair play is mandatory; the use of cheats, hacks, exploits, or unauthorized third-party software will result in immediate disqualification.",
      "Participants must ensure a stable internet connection and access to a gaming PC/laptop for prelims."
    ],
    guidelines: [
      "Matches will be conducted according to the rules of the selected game.",
      "Any form of misconduct, abusive language, or unsportsmanlike behavior will not be tolerated.",
      "The decision of the organizers and referees will be final and binding."
    ]
  },
  {
    id: 17,
    title: "Overthink",
    mode: "HYBRID",
    category: "Quiz",
    venue: "Discord Core / Main Auditorium",
    eligibility: "Classes: 11-12 (One from each) | Teams: 1 (2 participants per team)",
    hashtag: "#QUIZ",
    desc: "A thrilling tech quiz where logic drives every question and knowledge leads the way, keeping participants curious till the answers unfold.",
    details: [
      "The details of the event will be shared on the Discord server. Top 6 teams will qualify for the offline final round.",
      "The quiz will comprise multiple-choice, image-based, audio-visual, and logical reasoning questions.",
      "Questions will cover topics such as Technology, Computers, Artificial Intelligence, Cyber Security, Science, Current Affairs, Gaming, and General Knowledge.",
      "Multiple exciting rounds including Buzzer Round, Visual Round, Rapid Fire, Connect-the-Clues, and Surprise Challenge Round.",
      "Use of unfair means, external assistance, AI tools, or unauthorized resources during the quiz is strictly prohibited."
    ],
    guidelines: [
      "In case of a tie, additional tie-breaker questions may be conducted.",
      "Teams will be judged on accuracy, speed, teamwork, and analytical thinking.",
      "The decision of the quiz masters and organizers will be final and binding."
    ]
  },
  {
    id: 18,
    title: "Pitch-A-Thon",
    mode: "HYBRID",
    category: "Quiz",
    venue: "Discord / On-Site Arena",
    eligibility: "Classes: 9-12 (Participant from any class) | Teams: 1 (2 participants per team)",
    hashtag: "#IDEA PITCHING",
    desc: "Turn ideas into innovation as teams conceptualize and deliver compelling startup-style pitches based on the given prompt, covering market models, strategies, and scalability.",
    details: [
      "Presentation duration: 5-7 minutes, followed by an engaging Q&A session with the judges.",
      "Use of visual aids, prototypes, and live demonstrations is mandatory.",
      "Prompts and all the other details will be released on Discord."
    ],
    guidelines: [
      "Any updates or clarifications regarding the event will be conveyed through the Discord server.",
      "Organizers' decisions are absolute and binding across all pipeline valuations."
    ]
  },
  {
    id: 19,
    title: "Shoot It",
    mode: "HYBRID",
    category: "Video",
    venue: "On-Site Production Grid",
    eligibility: "Classes: 9-12 (One participant from each) | Teams: 1 (2 participants per team)",
    hashtag: "#MOVIE MAKING",
    desc: "Unleash your imagination and design a cinematic runtime narrative tracking specific societal concepts through original production loops.",
    details: [
      "Topic: 'Voices Unheard' or 'Breaking the silence'.",
      "Top 6 teams will qualify for the offline presentation round.",
      "Films must follow the given theme and tell a compelling story.",
      "All content must be original; third-party music or assets require proper credits.",
      "Submissions must have clear visuals and audible sound. Films can be in Hindi or English or bilingual; subtitles must be given.",
      "In the offline round, teams will present their films, explain their creative process and insights, and answer questions."
    ],
    guidelines: [
      "Judging will consider scriptwriting, cinematography, acting, editing, and music production.",
      "Offensive, misleading, discriminatory, or inappropriate content will lead to disqualification.",
      "The file name should be in the format: EventName_SchoolName_ParticipantName."
    ]
  },
  {
    id: 20,
    title: "Outcode Sr.",
    mode: "HYBRID",
    category: "Coding",
    venue: "Vite Execution Systems Lab",
    eligibility: "Classes: 11-12 (One from each) | Teams: 1 (2 participants per team)",
    hashtag: "#CODING",
    desc: "Step into an intense coding showdown where every challenge is a surprise waiting to be cracked! With unpredictable twists, logic-driven tasks, and real-time problem solving.",
    details: [
      "Participants will solve a set of algorithmic and logical programming problems within a specified time limit.",
      "Problems will assess logical reasoning, data structures, algorithms, mathematics, and problem-solving skills.",
      "Teams may submit solutions in any programming language supported by the competition platform.",
      "The competition will be conducted on school-provided laptops.",
      "Rankings will be determined based on the number of problems solved."
    ],
    guidelines: [
      "Participants may use only the resources and software authorized by the organizers.",
      "AI tools, communication platforms, external storage devices, and unauthorized software are prohibited. Any violation will result in immediate disqualification.",
      "Solutions must be submitted through the designated online judging platform.",
      "The organizers reserve the right to inspect systems and contest logs in cases of suspected malpractice."
    ]
  },
  {
    id: 21,
    title: "Joy-N-Stick",
    mode: "OFFLINE",
    category: "Gaming",
    venue: "Discord / Console Sandbox Enclosure",
    eligibility: "Classes: 11-12 (One participant from each) | Teams: 1 (2 participants per team)",
    hashtag: "#GAMING CONSOLE",
    desc: "Gear up for an electrifying gaming showdown where every match is a battle for glory! Face thrilling challenges across multiple console genres in an ultimate fight to seize the trophy.",
    details: [
      "Different games will be played in each round, announced a day prior on the Discord server.",
      "Teams must be present on the Discord server during the online round of the event.",
      "Top 6 teams will qualify for the final offline round.",
      "Be prepared for diverse gaming genres, fast reflexes, and team coordination."
    ],
    guidelines: [
      "Updates will be provided natively on the Discord Server platform.",
      "Misconduct or unfair software tampering results in a structural platform wipe/ban."
    ]
  },
  {
    id: 22,
    title: "Cryptx",
    mode: "HYBRID",
    category: "Coding",
    venue: "Discord Server Hunt Pipeline",
    eligibility: "Classes: 11-12 (One from each) | Teams: 1 (2 participants per team)",
    hashtag: "#CRYPTIC HUNT",
    desc: "Cryptic Hunt is an exciting hybrid Capture The Flag (CTF) challenge that tests participants' logical thinking, advanced online research skills, and cybersecurity decoding concepts.",
    details: [
      "The 'Capture The Flag (CTF)' event will be hosted online on the Discord server.",
      "The online hunt will be 48 hours long.",
      "Participants will face challenging levels that require skills ranging from basic Google searches to advanced problem-solving and decoding.",
      "Top 6 teams will qualify for the final round, which will take place offline at RIS, RKP."
    ],
    guidelines: [
      "Hints/Leads will be provided dynamically on the Discord Server core.",
      "Collusion between teams leads to instant computational disqualification."
    ]
  },
  {
    id: 23,
    title: "Surprise",
    mode: "OFFLINE",
    category: "Quiz",
    venue: "Physics Laboratory Deck",
    eligibility: "Classes: 11-12 (One from each) | Teams: 1 (2 participants per team)",
    hashtag: "#SURPRISE",
    desc: "Dare to enter the unknown! Packed with unexpected twists, mind-bending hardware/software challenges, and thrilling surprise tasks. No warnings. No shortcuts.",
    details: [
      "The event format and task will be revealed on the spot.",
      "Top 6 teams will qualify for the final round.",
      "Participants must be ready for anything—logic, creativity, tech, or even a mix of everything!",
      "Time, rules, and judging criteria will be announced at the start.",
      "Quick thinking and teamwork will be the key to success."
    ],
    guidelines: [
      "Any updates or clarifications regarding the event will be communicated through the Discord server.",
      "Malpractice assessment sweeps will run continuously over system logs."
    ]
  },
  {
    id: 24,
    title: "Robo Soccer",
    mode: "OFFLINE",
    category: "Robotics",
    venue: "Badminton Court Enclosure",
    eligibility: "Classes: 9-10 (One participant from each) | Teams: 1 (2 participants per team)",
    hashtag: "#ROBOTICS",
    desc: "Gear up for a high-intensity robotic football showdown where precision, control, and mechanical teamwork decide the champions! Design and command your bots to dominate the goals.",
    details: [
      "Size limit: 0.3m x 0.3m x 0.5m (+5cm) | Weight limit: 5kg (+0.1kg). Minimum 0.05m ground clearance for all parts.",
      "Must be battery-powered, no battery capacity limit; with internal batteries only; no external power lines allowed.",
      "Format: Knockout, 1v1 matches, approx. 3 minutes per game.",
      "Robots must be team-built (no ready-made kits allowed), wheeled mechanics only (no humanoid or walking configurations)."
    ],
    guidelines: [
      "All parts must meet event electrical and physical safety standards.",
      "Any updates or clarifications regarding the rules will be communicated through the Discord server."
    ]
  },
  {
    id: 25,
    title: "Robo Wars",
    mode: "OFFLINE",
    category: "Robotics",
    venue: "Badminton Combat Grid Arena",
    eligibility: "Classes: 11-12 (One from each) | Teams: 1 (2 participants per team)",
    hashtag: "#ROBOTICS",
    desc: "Enter the ultimate arena of steel and strategy where powerful bots clash in an adrenaline-fueled battle for dominance! Combine tactical durability engineering to disruptive disruption vectors.",
    details: [
      "Size limit: 0.4m x 0.4m x 0.6m (+5cm) | Weight limit: 10kg (+0.25kg). Minimum 0.05m ground clearance for all structural parts.",
      "Must be battery-powered, no battery capacity limit; with internal batteries only; no external tether strings.",
      "Format: Knockout, 3-4 player Free-For-All (FFA), 5-minute matches (2 x 2.5 mins + 30 seconds break); top 2 robots advance.",
      "Robots must be completely team-designed (no pre-assembled retail kits), wheeled configurations only (no walking locomotion loops)."
    ],
    guidelines: [
      "All parts must strictly pass the on-site technical inspection parameters before entering the enclosure grid.",
      "Updates or logs will be shared directly on the Discord platform node."
    ]
  }
];

type LogoPoint = { x: number; y: number };

function generateLogoPoints(width: number, height: number): { white: LogoPoint[]; green: LogoPoint[]; bounds: { x: number; y: number; w: number; h: number } } {
  const off = document.createElement('canvas');
  off.width = width;
  off.height = height;
  const octx = off.getContext('2d');
  if (!octx) return { white: [], green: [], bounds: { x: width / 2 - 220, y: height / 2 - 90, w: 440, h: 180 } };

  const cx = width / 2;
  const cy = height / 2;
  const mainSize = Math.min(width, height) * 0.24;
  const yearSize = mainSize * 0.42;
  const step = 3;

  octx.textAlign = 'center';
  octx.textBaseline = 'middle';

  octx.clearRect(0, 0, width, height);
  octx.fillStyle = '#ffffff';
  octx.font = `bold ${mainSize}px system-ui`;
  octx.fillText('ワ', cx - mainSize * 0.34, cy);
  const whiteData = octx.getImageData(0, 0, width, height).data;
  const white: LogoPoint[] = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (whiteData[(y * width + x) * 4 + 3] > 120) white.push({ x, y });
    }
  }

  octx.clearRect(0, 0, width, height);
  octx.fillStyle = '#00fa6c';
  octx.font = `bold ${mainSize}px system-ui`;
  octx.fillText('メ', cx + mainSize * 0.34, cy);
  octx.font = `bold ${yearSize}px monospace`;
  octx.fillText('2k26', cx + mainSize * 1.02, cy + mainSize * 0.05);
  const greenData = octx.getImageData(0, 0, width, height).data;
  const green: LogoPoint[] = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (greenData[(y * width + x) * 4 + 3] > 120) green.push({ x, y });
    }
  }

  const all = [...white, ...green];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  all.forEach(p => {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  });
  const clusterCx = (minX + maxX) / 2;
  const clusterCy = (minY + maxY) / 2;
  const offsetX = cx - clusterCx;
  const offsetY = cy - clusterCy;

  const shift = (pts: LogoPoint[]) => pts.map(p => ({ x: p.x + offsetX, y: p.y + offsetY }));
  const shiftedWhite = shift(white);
  const shiftedGreen = shift(green);

  return {
    white: shiftedWhite,
    green: shiftedGreen,
    bounds: { x: minX + offsetX - 24, y: minY + offsetY - 24, w: (maxX - minX) + 48, h: (maxY - minY) + 48 },
  };
}

function sampleCap(points: LogoPoint[], max: number): LogoPoint[] {
  if (points.length <= max) return points;
  const out: LogoPoint[] = [];
  const stride = points.length / max;
  for (let i = 0; i < max; i++) out.push(points[Math.floor(i * stride)]);
  return out;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type AssemblyParticle = {
  sx: number; sy: number;
  tx: number; ty: number;
  color: 'white' | 'green';
  delay: number;
  char: string;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeEvent, setActiveEvent] = useState<typeof DX_2026_EVENTS[0] | null>(null);

  const loaderCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const eventSectionRef = useRef<HTMLDivElement | null>(null);
  const bootAudioRef = useRef<HTMLAudioElement | null>(null);
  const convergeStartRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isLoading) return;
    const canvas = loaderCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const armInteraction = () => {
      if (convergeStartRef.current !== null) return;
      convergeStartRef.current = Date.now();
      const audio = bootAudioRef.current;
      if (audio) {
        audio.volume = 0.7;
        audio.play().catch((err) => console.error('[bootSound] playback failed:', err.name));
      }
    };
    window.addEventListener('pointerdown', armInteraction, { once: true });
    window.addEventListener('keydown', armInteraction, { once: true });

    let animId: number;

    const resizeLoader = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeLoader();
    window.addEventListener('resize', resizeLoader);

    const T_GHOST_START = 1.0;
    const T_GHOST_FULL = 2.0;
    const T_CONVERGE_START = 2.0;
    const T_CONVERGE_DUR = 1.8;
    const T_STAGGER_MAX = 0.5;
    const T_HOLD_END = 4.8;
    const T_FLASH_END = 5.4;
    const T_TOTAL = 5.9;

    const colWidth = 14;
    const cols = Math.ceil(canvas.width / colWidth);
    const streams = Array.from({ length: cols }, () => ({
      x: 0,
      y: Math.random() * -canvas.height,
      speed: 3 + Math.random() * 4,
      col: 0,
      chars: Array.from({ length: 22 }, () => String.fromCharCode(0x30a0 + Math.random() * 96))
    })).map((s, idx) => ({ ...s, col: idx, x: idx * colWidth }));

    const { white, green, bounds } = generateLogoPoints(canvas.width, canvas.height);
    const whiteSample = sampleCap(white, 1450);
    const greenSample = sampleCap(green, 1650);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const maxDist = Math.sqrt(cx * cx + cy * cy);

    const allTargets = [
      ...whiteSample.map(p => ({ p, color: 'white' as const })),
      ...greenSample.map(p => ({ p, color: 'green' as const })),
    ];
    const assembly: AssemblyParticle[] = allTargets.map(({ p, color }) => {
      const dist = Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2);
      return {
        sx: Math.random() * canvas.width,
        sy: Math.random() * canvas.height,
        tx: p.x,
        ty: p.y,
        color,
        delay: (dist / maxDist) * T_STAGGER_MAX + Math.random() * 0.15,
        char: String.fromCharCode(0x30a0 + Math.random() * 96),
      };
    });

    const drawLoader = () => {
      const started = convergeStartRef.current;
      const elapsed = started !== null ? (Date.now() - started) / 1000 : -1;

      if (started !== null && elapsed >= T_TOTAL) {
        setIsLoading(false);
        return;
      }

      let rainStrength = 1;
      if (elapsed > T_CONVERGE_START) {
        rainStrength = Math.max(0.12, 1 - (elapsed - T_CONVERGE_START) / (T_CONVERGE_DUR + 0.6));
      }

      ctx.fillStyle = `rgba(5, 5, 7, ${elapsed > T_CONVERGE_START ? 0.35 : 0.25})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      streams.forEach((s) => {
        s.y += s.speed;
        if (s.y > canvas.height) s.y = -100;
        for (let i = 0; i < s.chars.length; i++) {
          const currY = s.y + i * 14;
          if (currY < 0 || currY > canvas.height) continue;
          const alpha = (1 - i / s.chars.length) * rainStrength;
          ctx.font = '11px monospace';
          ctx.fillStyle = `rgba(0, 250, 108, ${alpha * 0.7})`;
          ctx.fillText(s.chars[i], s.x, currY);
        }
      });

      if (elapsed > T_GHOST_START) {
        const ghostT = Math.min(1, (elapsed - T_GHOST_START) / (T_GHOST_FULL - T_GHOST_START));
        const ghostAlpha = ghostT * 0.14;
        ctx.fillStyle = `rgba(255, 255, 255, ${ghostAlpha})`;
        for (let i = 0; i < whiteSample.length; i += 3) {
          ctx.fillRect(whiteSample[i].x, whiteSample[i].y, 1.5, 1.5);
        }
        ctx.fillStyle = `rgba(0, 250, 108, ${ghostAlpha})`;
        for (let i = 0; i < greenSample.length; i += 3) {
          ctx.fillRect(greenSample[i].x, greenSample[i].y, 1.5, 1.5);
        }
      }

      if (elapsed > T_CONVERGE_START) {
        assembly.forEach((a) => {
          const localElapsed = elapsed - T_CONVERGE_START - a.delay;
          const t = Math.max(0, Math.min(1, localElapsed / T_CONVERGE_DUR));
          if (t <= 0) return;
          const eased = easeOutCubic(t);
          const x = lerp(a.sx, a.tx, eased);
          const y = lerp(a.sy, a.ty, eased);
          const settled = t > 0.86;

          if (settled) {
            ctx.fillStyle = a.color === 'white' ? `rgba(255,255,255,0.9)` : `rgba(0,250,108,0.95)`;
            ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
          } else {
            if (Math.random() < 0.4) a.char = String.fromCharCode(0x30a0 + Math.random() * 96);
            ctx.font = '12px monospace';
            ctx.fillStyle = a.color === 'white' ? `rgba(255,255,255,${0.3 + eased * 0.6})` : `rgba(0,250,108,${0.3 + eased * 0.6})`;
            ctx.fillText(a.char, x, y);
          }
        });
      }

      if (elapsed > T_CONVERGE_START + T_CONVERGE_DUR + T_STAGGER_MAX && elapsed < T_HOLD_END) {
        const pulse = 0.5 + 0.5 * Math.sin((elapsed - T_CONVERGE_START) * 3);
        ctx.save();
        ctx.globalAlpha = 0.12 + pulse * 0.08;
        ctx.shadowColor = '#00fa6c';
        ctx.shadowBlur = 25;
        ctx.fillStyle = '#00fa6c';
        ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h);
        ctx.restore();
      }

      if (elapsed > T_HOLD_END) {
        const flashAlpha = Math.min(1, (elapsed - T_HOLD_END) / (T_FLASH_END - T_HOLD_END));
        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha * 0.9})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animId = requestAnimationFrame(drawLoader);
    };

    drawLoader();
    return () => {
      window.removeEventListener('resize', resizeLoader);
      window.removeEventListener('pointerdown', armInteraction);
      window.removeEventListener('keydown', armInteraction);
      cancelAnimationFrame(animId);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animId: number;
    let particles: any[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 220 };

    const resizeHero = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeHero);
    resizeHero();

    class Particle {
      x: number; y: number; directionX: number; directionY: number; size: number;
      constructor(x: number, y: number, directionX: number, directionY: number, size: number) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY;
        this.size = size;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(0, 250, 108, 0.45)';
        ctx.fill();
      }
      update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= forceDirectionX * force * 4;
            this.y -= forceDirectionY * force * 4;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    particles = Array.from({ length: Math.ceil((canvas.height * canvas.width) / 8500) }, () => {
      let size = Math.random() * 2.5 + 1;
      return new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        (Math.random() * 0.5) - 0.25,
        (Math.random() * 0.5) - 0.25,
        size
      );
    });

    const animateHero = () => {
      if (!ctx || !canvas) return;
      animId = requestAnimationFrame(animateHero);
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => p.update());

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dist = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
              + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          if (dist < (canvas.width / 6.5) * (canvas.height / 6.5)) {
            let opacityValue = 1 - (dist / 25000);
            
            let dx_mouse_a = particles[a].x - (mouse.x ?? 0);
            let dy_mouse_a = particles[a].y - (mouse.y ?? 0);
            let distance_mouse_a = Math.sqrt(dx_mouse_a * dx_mouse_a + dy_mouse_a * dy_mouse_a);

            if (mouse.x && distance_mouse_a < mouse.radius) {
              ctx.strokeStyle = `rgba(0, 250, 108, ${opacityValue * 0.85})`;
            } else {
              ctx.strokeStyle = `rgba(0, 250, 108, ${opacityValue * 0.35})`;
            }

            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX; mouse.y = event.clientY;
    };
    const handleMouseOut = () => {
      mouse.x = null; mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    animateHero();
    return () => {
      window.removeEventListener('resize', resizeHero);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, [isLoading]);

  const filteredEvents = selectedCategory === "All" 
    ? DX_2026_EVENTS 
    : DX_2026_EVENTS.filter(e => e.category === selectedCategory);

  const categories = ["All", "Coding", "Quiz", "Gaming", "Robotics", "Web", "Design", "Video"];

  return (
    <div className="min-h-screen bg-[#050507] text-neutral-200 selection:bg-[#00fa6c] selection:text-black antialiased relative">
      
      <audio ref={bootAudioRef} src={bootSound} preload="auto" />

      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 w-full h-full z-40 bg-[#050507] flex items-center justify-center"
          >
            <canvas ref={loaderCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          
          <canvas ref={heroCanvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />

          {/* FIRST VIEW: LANDING PANEL */}
          <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <div className="text-center p-6 max-w-5xl mx-auto relative z-10 flex flex-col items-center justify-center">
              
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: [0, -5, 0] }}
                transition={{
                  opacity: { duration: 0.8 },
                  y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
                }}
                className="mb-10"
              >
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 blur-3xl bg-cyan-400/20 rounded-full scale-150" />
                  <div className="absolute inset-0 blur-3xl bg-fuchsia-500/15 rounded-full scale-125" />
                  <span className="text-[42px] leading-none font-black tracking-[-0.08em]" style={{ fontFamily: "'Orbitron', sans-serif", color: "#fff", textShadow: "0 0 6px #ffffff, 0 0 18px rgba(255,255,255,.8), 0 0 32px rgba(255,255,255,.45)" }}>ワ</span>
                  <span className="text-[42px] leading-none font-black tracking-[-0.08em]" style={{ fontFamily: "'Orbitron', sans-serif", color: "#00fa6c", textShadow: "0 0 6px #00fa6c, 0 0 18px #00fa6c, 0 0 36px rgba(0,250,108,.9), 0 0 60px rgba(0,250,108,.45)" }}>メ</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center gap-4 mb-10 select-none pointer-events-none"
              >
                <img src={logoAsset} alt="DynamiX Logo" className="h-16 md:h-24 w-auto object-contain invert brightness-200 drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]" />
                <span className="text-4xl md:text-6xl font-mono font-bold tracking-tighter text-[#00fa6c] drop-shadow-[0_0_20px_rgba(0,250,108,0.4)] relative top-1 md:top-2 border-b-4 border-[#00fa6c] pb-1">
                  2k26
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl mx-auto mb-12 text-sm md:text-base leading-loose text-[#8EFCC1] font-mono tracking-wide select-none"
                style={{
                  fontFamily: "'Share Tech Mono', 'IBM Plex Mono', 'JetBrains Mono', monospace",
                  textShadow: "0 0 2px rgba(0,250,108,.35), 0 0 6px rgba(0,250,108,.20), 0 0 12px rgba(0,250,108,.08)"
                }}
              >
                Twenty-five years of pushing boundaries.<br />
                Twenty-five years of transforming ideas into reality.<br />
                "25 years of Dynamix"<br /><br />
                The journey continues with a celebration that honours our legacy while embracing the future.<br />
                <span className="tracking-[0.25em] uppercase" style={{ color: "#00FA6C", textShadow: "0 0 4px rgba(0,250,108,.55), 0 0 10px rgba(0,250,108,.25)" }}>COMING SOON...</span>
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative inline-block group rounded">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00fa6c]/30 to-[#00fa6c]/30 opacity-40 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
                <button 
                  onClick={() => eventSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="relative px-8 py-4 border border-[#00fa6c]/40 bg-neutral-950/90 text-[#00fa6c] font-mono text-xs tracking-widest uppercase rounded hover:border-[#00fa6c] hover:bg-[#00fa6c] hover:text-black transition-all duration-300 flex items-center gap-3"
                >
                  Scroll Down for more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* DASHBOARD VIEW */}
          <div 
            ref={eventSectionRef} 
            className="min-h-screen border-t border-white/5 bg-transparent px-8 pt-24 pb-40 relative z-10"
          >
            <div className="max-w-6xl mx-auto">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8 backdrop-blur-xl bg-white/[0.01] p-6 rounded-2xl border">
                <div>
                  <h2 className="text-3xl font-mono font-bold text-white uppercase tracking-tight">Upcoming Events</h2>
                </div>
                
                <div className="flex flex-wrap gap-2 max-w-xl">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-lg transition-all border ${
                        selectedCategory === cat 
                          ? "bg-[#00fa6c]/20 text-white border-[#00fa6c]/50 backdrop-blur-md shadow-[0_0_15px_rgba(0,250,108,0.15)]" 
                          : "bg-white/[0.03] text-neutral-400 border-white/5 hover:bg-white/[0.08]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* CARDS DISPLAY CONTAINER */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] w-full items-start">
                {filteredEvents.map((event) => (
                  <motion.div 
                    layoutId={`card-container-${event.id}`}
                    key={event.id} 
                    onClick={() => setActiveEvent(event)}
                    className="break-inside-avoid mb-6 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-[20px] backdrop-saturate-[160%] cursor-pointer transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.06] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[9px] font-mono tracking-widest text-[#00fa6c] bg-[#00fa6c]/10 px-2.5 py-0.5 rounded-md border border-[#00fa6c]/20 uppercase">
                          {event.category}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">{event.mode}</span>
                      </div>
                      <h3 className="text-lg font-mono font-bold text-white group-hover:text-[#00fa6c] transition-colors duration-300">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-300 leading-relaxed font-light line-clamp-2">
                        {event.desc}
                      </p>
                    </div>
                    
                    {/* ABOUT BUTTON INTERACTION ANCHOR ROW */}
                    <div className="mt-5 pt-3 border-t border-white/[0.06] flex justify-between items-center text-[10px] font-mono text-neutral-400">
                      <span className="tracking-wide">LOC: {event.venue}</span>
                      <button className="px-3 py-1 rounded bg-[#00fa6c]/10 text-[#00fa6c] border border-[#00fa6c]/30 group-hover:bg-[#00fa6c] group-hover:text-black transition-all duration-300 tracking-widest uppercase font-bold text-[9px]">
                        About →
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-20 flex justify-center">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                  className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md text-neutral-400 hover:text-[#00fa6c] hover:border-[#00fa6c]/30 transition-all font-mono text-xs flex items-center gap-2 uppercase tracking-widest"
                >
                  <ArrowUp className="h-4 w-4" /> Return to Main Node
                </button>
              </div>

            </div>
          </div>

          {/* 🟢 CENTERED EXPANDING HIGH-FIDELITY MODAL OVERLAY CONSOLE */}
          <AnimatePresence>
            {activeEvent && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
                
                {/* Backdrop Blur Layer */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveEvent(null)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />

                {/* Main Expanded Container */}
                <motion.div 
                  layoutId={`card-container-${activeEvent.id}`}
                  className="relative w-full max-w-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-3xl z-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden"
                >
                  <button 
                    onClick={() => setActiveEvent(null)}
                    className="absolute top-6 right-6 p-2 rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div>
                    <div className="flex gap-2 mb-6">
                      <span className="text-[10px] font-mono tracking-widest text-[#00fa6c] bg-[#00fa6c]/10 px-2.5 py-0.5 rounded-md border border-[#00fa6c]/20 uppercase">
                        {activeEvent.category}
                      </span>
                      <span className="text-[10px] font-mono tracking-widest text-neutral-300 bg-white/[0.06] px-2.5 py-0.5 rounded-md border border-white/10 uppercase">
                        {activeEvent.mode}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-mono font-bold text-white mb-6 uppercase tracking-tight">
                      {activeEvent.title}
                    </h2>

                    <div className="space-y-6 text-neutral-300 text-sm md:text-base leading-relaxed border-t border-b border-white/[0.08] py-8 my-8 font-light">
                      <p>{activeEvent.desc}</p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 font-mono text-xs text-neutral-400">
                        <div>
                          <span className="text-neutral-500 block uppercase mb-1">ASSIGNED VENUE</span>
                          <span className="text-white text-sm font-normal">{activeEvent.venue}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 block uppercase mb-1">SYSTEM_STAMP</span>
                          <span className="text-white text-sm font-normal">DX//NODE_{activeEvent.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
  <a 
    href="https://forms.gle/2GBSW2pDjP6NVzzg8" 
    target="_blank" 
    rel="noopener noreferrer"
    className="block w-full"
  >
    <button className="w-full py-4 rounded-xl bg-[#00fa6c] text-black font-mono font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors duration-300 shadow-[0_10px_30px_rgba(0,250,108,0.2)]">
      REGISTER HERE
    </button>
  </a>
</div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </div>
  )
}
