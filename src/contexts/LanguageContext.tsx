import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    home: 'Home',
    practice: 'Practice',
    learn: 'Learn',
    insights: 'Insights',
    profile: 'Profile',
    
    // Common Actions
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    done: 'Done',
    skip: 'Skip',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    confirm: 'Confirm',
    delete: 'Delete',
    add: 'Add',
    remove: 'Remove',
    update: 'Update',
    refresh: 'Refresh',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    viewAll: 'View All',
    showMore: 'Show More',
    showLess: 'Show Less',
    
    // Language Selection
    chooseYourLanguage: 'Choose Your Language',
    selectLanguage: 'Select Language',
    
    // Welcome & Auth
    welcomeToFundamind: 'Welcome to FundaMind',
    enterMobileNumber: 'Enter your mobile number to get started',
    mobileNumber: 'Mobile Number',
    sendOtp: 'Send OTP',
    verifyOtp: 'Verify OTP',
    enterOtp: 'Enter OTP',
    enterOtpSent: 'Enter the 6-digit code sent to +91',
    didntReceiveCode: "Didn't receive code? Resend OTP",
    verifyAndContinue: 'Verify & Continue',
    agreeToTerms: 'I agree to the Terms & Conditions and Privacy Policy',
    termsAndConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    
    // Home Screen
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    todaysChallenge: "Today's Challenge",
    quickActions: 'Quick Actions',
    finShort: 'FinShort',
    watchNow: 'Watch Now',
    playNow: 'Play Now',
    startLearning: 'Start Learning',
    
    // Games & Practice
    learningGames: 'Learning Games',
    playLearnMaster: 'Play, learn, and master financial concepts',
    allGames: 'All Games',
    inProgress: 'In Progress',
    completed: 'Completed',
    locked: 'Locked',
    progress: 'Progress',
    level: 'Level',
    score: 'Score',
    highScore: 'High Score',
    attempts: 'Attempts',
    accuracy: 'Accuracy',
    
    // Learning
    learningCenter: 'Learning Center',
    masterFinancialConcepts: 'Master financial concepts at your pace',
    lessons: 'Lessons',
    courses: 'Courses',
    modules: 'Modules',
    chapters: 'Chapters',
    topics: 'Topics',
    certificates: 'Certificates',
    achievements: 'Achievements',
    
    // Insights
    yourInsights: 'Your Insights',
    trackLearningJourney: 'Track your learning journey and achievements',
    totalTime: 'Total Time',
    streak: 'Streak',
    points: 'Points',
    modulesCompleted: 'Modules Completed',
    accuracyRate: 'Accuracy Rate',
    topicsMastered: 'Topics Mastered',
    weeklyActivity: 'Weekly Activity',
    subjectPerformance: 'Subject Performance',
    recentAchievements: 'Recent Achievements',
    thisWeek: 'This Week',
    improvement: 'improvement',
    outOfTotal: 'out of',
    pending: 'pending',
    
    // Profile
    levelProgress: 'Level Progress',
    expertLevel: 'Expert Level',
    yourStats: 'Your Stats',
    totalCoins: 'Total Coins',
    gamesCompleted: 'Games Completed',
    hoursLearned: 'Hours Learned',
    currentStreak: 'Current Streak',
    settings: 'Settings',
    notifications: 'Notifications',
    language: 'Language',
    account: 'Account',
    help: 'Help',
    support: 'Support',
    aboutUs: 'About Us',
    logout: 'Logout',
    
    // Financial Terms
    budgeting: 'Budgeting',
    investing: 'Investing',
    taxation: 'Taxation',
    insurance: 'Insurance',
    savings: 'Savings',
    loans: 'Loans',
    creditCard: 'Credit Card',
    stockMarket: 'Stock Market',
    mutualFunds: 'Mutual Funds',
    retirement: 'Retirement',
    
    // Game Specific
    budgetBazaar: 'Budget Bazaar',
    stockMarketSimulator: 'Stock Market Simulator',
    savingsSprout: 'Savings Sprout',
    creditCardQuest: 'Credit Card Quest',
    
    // Time & Dates
    today: 'Today',
    yesterday: 'Yesterday',
    thisMonth: 'This Month',
    days: 'days',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    online: 'Online',
    offline: 'Offline',
    loading: 'Loading',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    
    // Numbers & Quantities
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    
    // Placeholders
    interactiveChartComingSoon: 'Interactive chart coming soon',
    noDataAvailable: 'No data available',
    comingSoon: 'Coming Soon',
    
    // Home Screen Specific
    dailyChallenge: 'Daily Challenge',
    budgetPractice: 'Budget Practice',
    caSyllabus: 'CA Syllabus',
    myPortfolio: 'My Portfolio',
    yourLearningPath: 'Your Learning Path',
    almostThere: 'Almost there!',
    continueLearning: 'Continue Learning',
    
    // Game Difficulty
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    
    // Game Subtitles
    masterSmartShopping: 'Master smart shopping',
    learnToInvestWisely: 'Learn to invest wisely',
    buildYourSavings: 'Build your savings',
    understandCreditCards: 'Understand credit cards',
    
    // Missing Game Translations
    protectYourFuture: 'Protect your future',
    insuranceIsland: 'Insurance Island',
    
    // Learning Path & Course Content
    learningPath: 'Learning Path',
    yourFinancialJourney: 'Your financial journey',
    completeGamesInOrder: 'Complete games in order to unlock advanced concepts and earn more rewards!',
    beginner: 'Beginner',
    learner: 'Learner',
    expert: 'Expert',
    emergencyFundPlanning: 'Emergency Fund Planning',
    whatIsCompoundInterest: 'What is Compound Interest?',
    understandingCreditScore: 'Understanding Credit Score',
    typesOfMutualFunds: 'Types of Mutual Funds',
    emiCalculationBasics: 'EMI Calculation Basics',
    quickLessons: 'Quick Lessons',
    recommendedForYou: 'Recommended for You',
    basics: 'Basics',
    credit: 'Credit',
    investment: 'Investment',
  },
  
  hi: {
    // Navigation
    home: 'होम',
    practice: 'अभ्यास',
    learn: 'सीखें',
    insights: 'अंतर्दृष्टि',
    profile: 'प्रोफ़ाइल',
    
    // Common Actions
    continue: 'जारी रखें',
    back: 'वापस',
    next: 'अगला',
    done: 'हो गया',
    skip: 'छोड़ें',
    edit: 'संपादित करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    submit: 'जमा करें',
    confirm: 'पुष्टि करें',
    delete: 'हटाएं',
    add: 'जोड़ें',
    remove: 'हटाएं',
    update: 'अपडेट करें',
    refresh: 'रीफ्रेश करें',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    sort: 'क्रमबद्ध करें',
    viewAll: 'सभी देखें',
    showMore: 'और दिखाएं',
    showLess: 'कम दिखाएं',
    
    // Language Selection
    chooseYourLanguage: 'अपनी भाषा चुनें',
    selectLanguage: 'भाषा चुनें',
    
    // Welcome & Auth
    welcomeToFundamind: 'फंडामाइंड में आपका स्वागत है',
    enterMobileNumber: 'शुरू करने के लिए अपना मोबाइल नंबर दर्ज करें',
    mobileNumber: 'मोबाइल नंबर',
    sendOtp: 'OTP भेजें',
    verifyOtp: 'OTP सत्यापित करें',
    enterOtp: 'OTP दर्ज करें',
    enterOtpSent: '+91 पर भेजा गया 6-अंकीय कोड दर्ज करें',
    didntReceiveCode: 'कोड नहीं मिला? OTP दोबारा भेजें',
    verifyAndContinue: 'सत्यापित करें और जारी रखें',
    agreeToTerms: 'मैं नियम और शर्तों और गोपनीयता नीति से सहमत हूं',
    termsAndConditions: 'नियम और शर्तें',
    privacyPolicy: 'गोपनीयता नीति',
    
    // Home Screen
    goodMorning: 'सुप्रभात',
    goodAfternoon: 'नमस्कार',
    goodEvening: 'शुभ संध्या',
    todaysChallenge: 'आज की चुनौती',
    quickActions: 'त्वरित कार्य',
    finShort: 'फिनशॉर्ट',
    watchNow: 'अभी देखें',
    playNow: 'अभी खेलें',
    startLearning: 'सीखना शुरू करें',
    
    // Games & Practice
    learningGames: 'शिक्षण खेल',
    playLearnMaster: 'खेलें, सीखें और वित्तीय अवधारणाओं में महारत हासिल करें',
    allGames: 'सभी खेल',
    inProgress: 'प्रगति में',
    completed: 'पूर्ण',
    locked: 'बंद',
    progress: 'प्रगति',
    level: 'स्तर',
    score: 'स्कोर',
    highScore: 'उच्च स्कोर',
    attempts: 'प्रयास',
    accuracy: 'सटीकता',
    
    // Learning
    learningCenter: 'शिक्षण केंद्र',
    masterFinancialConcepts: 'अपनी गति से वित्तीय अवधारणाओं में महारत हासिल करें',
    lessons: 'पाठ',
    courses: 'पाठ्यक्रम',
    modules: 'मॉड्यूल',
    chapters: 'अध्याय',
    topics: 'विषय',
    certificates: 'प्रमाणपत्र',
    achievements: 'उपलब्धियां',
    
    // Insights
    yourInsights: 'आपकी अंतर्दृष्टि',
    trackLearningJourney: 'अपनी सीखने की यात्रा और उपलब्धियों को ट्रैक करें',
    totalTime: 'कुल समय',
    streak: 'स्ट्रीक',
    points: 'अंक',
    modulesCompleted: 'पूर्ण मॉड्यूल',
    accuracyRate: 'सटीकता दर',
    topicsMastered: 'महारत हासिल विषय',
    weeklyActivity: 'साप्ताहिक गतिविधि',
    subjectPerformance: 'विषय प्रदर्शन',
    recentAchievements: 'हाल की उपलब्धियां',
    thisWeek: 'इस सप्ताह',
    improvement: 'सुधार',
    outOfTotal: 'कुल में से',
    pending: 'लंबित',
    
    // Profile
    levelProgress: 'स्तर प्रगति',
    expertLevel: 'विशेषज्ञ स्तर',
    yourStats: 'आपके आंकड़े',
    totalCoins: 'कुल सिक्के',
    gamesCompleted: 'पूर्ण खेल',
    hoursLearned: 'सीखे गए घंटे',
    currentStreak: 'वर्तमान स्ट्रीक',
    settings: 'सेटिंग्स',
    notifications: 'सूचनाएं',
    language: 'भाषा',
    account: 'खाता',
    help: 'सहायता',
    support: 'समर्थन',
    aboutUs: 'हमारे बारे में',
    logout: 'लॉग आउट',
    
    // Financial Terms
    budgeting: 'बजट बनाना',
    investing: 'निवेश',
    taxation: 'कराधान',
    insurance: 'बीमा',
    savings: 'बचत',
    loans: 'ऋण',
    creditCard: 'क्रेडिट कार्ड',
    stockMarket: 'शेयर बाजार',
    mutualFunds: 'म्यूचुअल फंड',
    retirement: 'सेवानिवृत्ति',
    
    // Game Specific
    budgetBazaar: 'बजट बाजार',
    stockMarketSimulator: 'शेयर बाजार सिमुलेटर',
    savingsSprout: 'बचत स्प्राउट',
    creditCardQuest: 'क्रेडिट कार्ड क्वेस्ट',
    
    // Time & Dates
    today: 'आज',
    yesterday: 'कल',
    thisMonth: 'इस महीने',
    days: 'दिन',
    hours: 'घंटे',
    minutes: 'मिनट',
    seconds: 'सेकंड',
    
    // Status
    active: 'सक्रिय',
    inactive: 'निष्क्रिय',
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन',
    loading: 'लोड हो रहा है',
    error: 'त्रुटि',
    success: 'सफलता',
    warning: 'चेतावनी',
    info: 'जानकारी',
    
    // Placeholders
    interactiveChartComingSoon: 'इंटरैक्टिव चार्ट जल्द आ रहा है',
    noDataAvailable: 'कोई डेटा उपलब्ध नहीं',
    comingSoon: 'जल्द आ रहा है',
    
    // Home Screen Specific
    dailyChallenge: 'दैनिक चुनौती',
    budgetPractice: 'बजट अभ्यास',
    caSyllabus: 'सीए पाठ्यक्रम',
    myPortfolio: 'मेरा पोर्टफोलियो',
    yourLearningPath: 'आपका सीखने का पथ',
    almostThere: 'लगभग हो गया!',
    continueLearning: 'सीखना जारी रखें',
    
    // Game Difficulty
    easy: 'आसान',
    medium: 'मध्यम',
    hard: 'कठिन',
    
    // Game Subtitles
    masterSmartShopping: 'स्मार्ट शॉपिंग में महारत हासिल करें',
    learnToInvestWisely: 'समझदारी से निवेश करना सीखें',
    buildYourSavings: 'अपनी बचत बनाएं',
    understandCreditCards: 'क्रेडिट कार्ड को समझें',
    
    // Missing Game Translations
    protectYourFuture: 'अपने भविष्य की रक्षा करें',
    insuranceIsland: 'बीमा द्वीप',
    
    // Learning Path & Course Content
    learningPath: 'सीखने का पथ',
    yourFinancialJourney: 'आपकी वित्तीय यात्रा',
    completeGamesInOrder: 'उन्नत अवधारणाओं को अनलॉक करने और अधिक पुरस्कार अर्जित करने के लिए खेलों को क्रम में पूरा करें!',
    beginner: 'शुरुआती',
    learner: 'सीखने वाला',
    expert: 'विशेषज्ञ',
    emergencyFundPlanning: 'आपातकालीन फंड योजना',
    whatIsCompoundInterest: 'चक्रवृद्धि ब्याज क्या है?',
    understandingCreditScore: 'क्रेडिट स्कोर को समझना',
    typesOfMutualFunds: 'म्यूचुअल फंड के प्रकार',
    emiCalculationBasics: 'EMI गणना की मूल बातें',
    quickLessons: 'त्वरित पाठ',
    recommendedForYou: 'आपके लिए अनुशंसित',
    basics: 'मूल बातें',
    credit: 'क्रेडिट',
    investment: 'निवेश',
  },
  
  ta: {
    // Navigation
    home: 'முகப்பு',
    practice: 'பயிற்சி',
    learn: 'கற்றுக்கொள்ளுங்கள்',
    insights: 'நுண்ணறிவுகள்',
    profile: 'சுயவிவரம்',
    
    // Common Actions
    continue: 'தொடர்',
    back: 'பின்',
    next: 'அடுத்து',
    done: 'முடிந்தது',
    skip: 'தவிர்',
    edit: 'திருத்து',
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    submit: 'சமர்ப்பி',
    confirm: 'உறுதிப்படுத்து',
    delete: 'நீக்கு',
    add: 'சேர்',
    remove: 'அகற்று',
    update: 'புதுப்பி',
    refresh: 'புதுப்பி',
    search: 'தேடு',
    filter: 'வடிகட்டு',
    sort: 'வரிசைப்படுத்து',
    viewAll: 'அனைத்தையும் பார்',
    showMore: 'மேலும் காட்டு',
    showLess: 'குறைவாக காட்டு',
    
    // Language Selection
    chooseYourLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    selectLanguage: 'மொழி தேர்ந்தெடு',
    
    // Welcome & Auth
    welcomeToFundamind: 'ஃபண்டாமைண்டிற்கு வரவேற்கிறோம்',
    enterMobileNumber: 'தொடங்க உங்கள் மொபைல் எண்ணை உள்ளிடவும்',
    mobileNumber: 'மொபைல் எண்',
    sendOtp: 'OTP அனுப்பவும்',
    verifyOtp: 'OTP சரிபார்க்கவும்',
    enterOtp: 'OTP உள்ளிடவும்',
    enterOtpSent: '+91 க்கு அனுப்பப்பட்ட 6-இலக்க குறியீட்டை உள்ளிடவும்',
    didntReceiveCode: 'குறியீடு கிடைக்கவில்லையா? OTP மீண்டும் அனுப்பவும்',
    verifyAndContinue: 'சரிபார்த்து தொடரவும்',
    agreeToTerms: 'நான் விதிமுறைகள் & நிபந்தனைகள் மற்றும் தனியுரிமை கொள்கையுடன் ஒப்புக்கொள்கிறேன்',
    termsAndConditions: 'விதிமுறைகள் & நிபந்தனைகள்',
    privacyPolicy: 'தனியுரிமை கொள்கை',
    
    // Home Screen
    goodMorning: 'காலை வணக்கம்',
    goodAfternoon: 'மதிய வணக்கம்',
    goodEvening: 'மாலை வணக்கம்',
    todaysChallenge: 'இன்றைய சவால்',
    quickActions: 'விரைவு செயல்கள்',
    finShort: 'ஃபின்ஷார்ட்',
    watchNow: 'இப்போது பார்க்கவும்',
    playNow: 'இப்போது விளையாடு',
    startLearning: 'கற்றல் தொடங்கு',
    
    // Games & Practice
    learningGames: 'கற்றல் விளையாட்டுகள்',
    playLearnMaster: 'விளையாடு, கற்று, நிதி கருத்துகளில் தேர்ச்சி பெறு',
    allGames: 'அனைத்து விளையாட்டுகள்',
    inProgress: 'முன்னேற்றத்தில்',
    completed: 'முடிந்தது',
    locked: 'பூட்டப்பட்டது',
    progress: 'முன்னேற்றம்',
    level: 'நிலை',
    score: 'மதிப்பெண்',
    highScore: 'உயர் மதிப்பெண்',
    attempts: 'முயற்சிகள்',
    accuracy: 'துல்லியம்',
    
    // Learning
    learningCenter: 'கற்றல் மையம்',
    masterFinancialConcepts: 'உங்கள் வேகத்தில் நிதி கருத்துகளில் தேர்ச்சி பெறுங்கள்',
    lessons: 'பாடங்கள்',
    courses: 'பாடநெறிகள்',
    modules: 'தொகுதிகள்',
    chapters: 'அத்தியாயங்கள்',
    topics: 'தலைப்புகள்',
    certificates: 'சான்றிதழ்கள்',
    achievements: 'சாதனைகள்',
    
    // Insights
    yourInsights: 'உங்கள் நுண்ணறிவுகள்',
    trackLearningJourney: 'உங்கள் கற்றல் பயணம் மற்றும் சாதனைகளை கண்காணிக்கவும்',
    totalTime: 'மொத்த நேரம்',
    streak: 'தொடர்ச்சி',
    points: 'புள்ளிகள்',
    modulesCompleted: 'முடிந்த தொகுதிகள்',
    accuracyRate: 'துல்லிய விகிதம்',
    topicsMastered: 'தேர்ச்சி பெற்ற தலைப்புகள்',
    weeklyActivity: 'வாராந்திர செயல்பாடு',
    subjectPerformance: 'பாடத்திட்ட செயல்திறன்',
    recentAchievements: 'சமீபத்திய சாதனைகள்',
    thisWeek: 'இந்த வாரம்',
    improvement: 'முன்னேற்றம்',
    outOfTotal: 'மொத்தத்தில்',
    pending: 'நிலுவையில்',
    
    // Profile
    levelProgress: 'நிலை முன்னேற்றம்',
    expertLevel: 'நிபுணர் நிலை',
    yourStats: 'உங்கள் புள்ளிவிவரங்கள்',
    totalCoins: 'மொத்த நாணயங்கள்',
    gamesCompleted: 'முடிந்த விளையாட்டுகள்',
    hoursLearned: 'கற்ற மணிநேரங்கள்',
    currentStreak: 'தற்போதைய தொடர்ச்சி',
    settings: 'அமைப்புகள்',
    notifications: 'அறிவிப்புகள்',
    language: 'மொழி',
    account: 'கணக்கு',
    help: 'உதவி',
    support: 'ஆதரவு',
    aboutUs: 'எங்களைப் பற்றி',
    logout: 'வெளியேறு',
    
    // Financial Terms
    budgeting: 'பட்ஜெட்',
    investing: 'முதலீடு',
    taxation: 'வரி',
    insurance: 'காப்பீடு',
    savings: 'சேமிப்பு',
    loans: 'கடன்கள்',
    creditCard: 'கிரெடிட் கார்டு',
    stockMarket: 'பங்குச் சந்தை',
    mutualFunds: 'மியூச்சுவல் ஃபண்டுகள்',
    retirement: 'ஓய்வூதியம்',
    
    // Game Specific
    budgetBazaar: 'பட்ஜெட் பஜார்',
    stockMarketSimulator: 'பங்குச் சந்தை சிமுலேட்டர்',
    savingsSprout: 'சேமிப்பு ஸ்ப்ரௌட்',
    creditCardQuest: 'கிரெடிட் கார்டு குவெஸ்ட்',
    
    // Time & Dates
    today: 'இன்று',
    yesterday: 'நேற்று',
    thisMonth: 'இந்த மாதம்',
    days: 'நாட்கள்',
    hours: 'மணிநேரங்கள்',
    minutes: 'நிமிடங்கள்',
    seconds: 'விநாடிகள்',
    
    // Status
    active: 'செயலில்',
    inactive: 'செயலற்ற',
    online: 'ஆன்லைன்',
    offline: 'ஆஃப்லைன்',
    loading: 'ஏற்றுகிறது',
    error: 'பிழை',
    success: 'வெற்றி',
    warning: 'எச்சரிக்கை',
    info: 'தகவல்',
    
    // Home Screen Specific
    dailyChallenge: 'தினசரி சவால்',
    budgetPractice: 'பட்ஜெட் பயிற்சி',
    caSyllabus: 'CA பாடத்திட்டம்',
    myPortfolio: 'என் போர்ட்ஃபோலியோ',
    yourLearningPath: 'உங்கள் கற்றல் பாதை',
    almostThere: 'கிட்டத்தட்ட முடிந்தது!',
    continueLearning: 'கற்றலைத் தொடரவும்',
    
    // Game Difficulty
    easy: 'எளிது',
    medium: 'நடுத்தர',
    hard: 'கடினம்',
    
    // Game Subtitles
    masterSmartShopping: 'ஸ்மார்ட் ஷாப்பிங்கில் தேர்ச்சி பெறுங்கள்',
    learnToInvestWisely: 'புத்திசாலித்தனமாக முதலீடு செய்ய கற்றுக்கொள்ளுங்கள்',
    buildYourSavings: 'உங்கள் சேமிப்பை உருவாக்குங்கள்',
    understandCreditCards: 'கிரெடிட் கார்டுகளை புரிந்து கொள்ளுங்கள்',
    
    // Missing Game Translations
    protectYourFuture: 'உங்கள் எதிர்காலத்தைப் பாதுகாக்கவும்',
    insuranceIsland: 'காப்பீட்டு தீவு',
    
    // Placeholders
    interactiveChartComingSoon: 'ஊடாடும் விளக்கப்படம் விரைவில் வரும்',
    noDataAvailable: 'தரவு கிடைக்கவில்லை',
    comingSoon: 'விரைவில் வரும்',
  },
  
  te: {
    // Navigation
    home: 'హోమ్',
    practice: 'అభ్యాసం',
    learn: 'నేర్చుకోండి',
    insights: 'అంతర్దృష్టులు',
    profile: 'ప్రొఫైల్',
    
    // Common Actions
    continue: 'కొనసాగించండి',
    back: 'వెనుకకు',
    next: 'తదుపరి',
    done: 'పూర్తయింది',
    skip: 'వదిలివేయండి',
    edit: 'సవరించు',
    save: 'సేవ్ చేయండి',
    cancel: 'రద్దు చేయండి',
    submit: 'సమర్పించండి',
    confirm: 'ధృవీకరించండి',
    delete: 'తొలగించండి',
    add: 'జోడించండి',
    remove: 'తొలగించండి',
    update: 'అప్‌డేట్ చేయండి',
    refresh: 'రిఫ్రెష్ చేయండి',
    search: 'వెతకండి',
    filter: 'ఫిల్టర్',
    sort: 'క్రమబద్ధీకరించండి',
    viewAll: 'అన్నీ చూడండి',
    showMore: 'మరిన్ని చూపించండి',
    showLess: 'తక్కువ చూపించండి',
    
    // Language Selection
    chooseYourLanguage: 'మీ భాషను ఎంచుకోండి',
    selectLanguage: 'భాష ఎంచుకోండి',
    
    // Welcome & Auth
    welcomeToFundamind: 'ఫండామైండ్‌కు స్వాగతం',
    enterMobileNumber: 'ప్రారంభించడానికి మీ మొబైల్ నంబర్‌ను నమోదు చేయండి',
    mobileNumber: 'మొబైల్ నంబర్',
    sendOtp: 'OTP పంపండి',
    verifyOtp: 'OTP ధృవీకరించండి',
    enterOtp: 'OTP నమోదు చేయండి',
    enterOtpSent: '+91కు పంపిన 6-అంకెల కోడ్‌ను నమోదు చేయండి',
    didntReceiveCode: 'కోడ్ రాలేదా? OTP మళ్లీ పంపండి',
    verifyAndContinue: 'ధృవీకరించి కొనసాగించండి',
    agreeToTerms: 'నేను నిబంధనలు & షరతులు మరియు గోప్యతా విధానంతో అంగీకరిస్తున్నాను',
    termsAndConditions: 'నిబంధనలు & షరతులు',
    privacyPolicy: 'గోప్యతా విధానం',
    
    // Home Screen
    goodMorning: 'శుభోదయం',
    goodAfternoon: 'శుభ మధ్యాహ్నం',
    goodEvening: 'శుభ సాయంత్రం',
    todaysChallenge: 'నేటి సవాలు',
    quickActions: 'త్వరిత చర్యలు',
    finShort: 'ఫిన్‌షార్ట్',
    watchNow: 'ఇప్పుడు చూడండి',
    playNow: 'ఇప్పుడు ఆడండి',
    startLearning: 'నేర్చుకోవడం ప్రారంభించండి',
    
    // Games & Practice
    learningGames: 'అభ్యాస ఆటలు',
    playLearnMaster: 'ఆడండి, నేర్చుకోండి మరియు ఆర్థిక భావనలలో నైపుణ్యం సాధించండి',
    allGames: 'అన్ని ఆటలు',
    inProgress: 'పురోగతిలో',
    completed: 'పూర్తయింది',
    locked: 'లాక్ చేయబడింది',
    progress: 'పురోగతి',
    level: 'స్థాయి',
    score: 'స్కోర్',
    highScore: 'అధిక స్కోర్',
    attempts: 'ప్రయత్నాలు',
    accuracy: 'ఖచ్చితత్వం',
    
    // Learning
    learningCenter: 'అభ్యాస కేంద్రం',
    masterFinancialConcepts: 'మీ వేగంతో ఆర్థిక భావనలలో నైపుణ్యం సాధించండి',
    lessons: 'పాఠాలు',
    courses: 'కోర్సులు',
    modules: 'మాడ్యూల్స్',
    chapters: 'అధ్యాయాలు',
    topics: 'విషయాలు',
    certificates: 'సర్టిఫికేట్లు',
    achievements: 'సాధనలు',
    
    // Insights
    yourInsights: 'మీ అంతర్దృష్టులు',
    trackLearningJourney: 'మీ అభ్యాస ప్రయాణం మరియు సాధనలను ట్రాక్ చేయండి',
    totalTime: 'మొత్తం సమయం',
    streak: 'స్ట్రీక్',
    points: 'పాయింట్లు',
    modulesCompleted: 'పూర్తైన మాడ్యూల్స్',
    accuracyRate: 'ఖచ్చితత్వ రేటు',
    topicsMastered: 'నైపుణ్యం సాధించిన విషయాలు',
    weeklyActivity: 'వారపు కార్యకలాపాలు',
    subjectPerformance: 'విషయ పనితీరు',
    recentAchievements: 'ఇటీవలి సాధనలు',
    thisWeek: 'ఈ వారం',
    improvement: 'మెరుగుదల',
    outOfTotal: 'మొత్తంలో',
    pending: 'పెండింగ్',
    
    // Profile
    levelProgress: 'స్థాయి పురోగతి',
    expertLevel: 'నిపుణుల స్థాయి',
    yourStats: 'మీ గణాంకాలు',
    totalCoins: 'మొత్తం నాణేలు',
    gamesCompleted: 'పూర్తైన ఆటలు',
    hoursLearned: 'నేర్చుకున్న గంటలు',
    currentStreak: 'ప్రస్తుత స్ట్రీక్',
    settings: 'సెట్టింగ్‌లు',
    notifications: 'నోటిఫికేషన్‌లు',
    language: 'భాష',
    account: 'ఖాతా',
    help: 'సహాయం',
    support: 'మద్దతు',
    aboutUs: 'మా గురించి',
    logout: 'లాగ్ అవుట్',
    
    // Financial Terms
    budgeting: 'బడ్జెట్',
    investing: 'పెట్టుబడి',
    taxation: 'పన్నులు',
    insurance: 'బీమా',
    savings: 'పొదుపులు',
    loans: 'రుణాలు',
    creditCard: 'క్రెడిట్ కార్డ్',
    stockMarket: 'స్టాక్ మార్కెట్',
    mutualFunds: 'మ్యూచువల్ ఫండ్స్',
    retirement: 'పదవీ విరమణ',
    
    // Game Specific
    budgetBazaar: 'బడ్జెట్ బజార్',
    stockMarketSimulator: 'స్టాక్ మార్కెట్ సిమ్యులేటర్',
    savingsSprout: 'సేవింగ్స్ స్ప్రౌట్',
    creditCardQuest: 'క్రెడిట్ కార్డ్ క్వెస్ట్',
    
    // Time & Dates
    today: 'ఈరోజు',
    yesterday: 'నిన్న',
    thisMonth: 'ఈ నెల',
    days: 'రోజులు',
    hours: 'గంటలు',
    minutes: 'నిమిషాలు',
    seconds: 'సెకన్లు',
    
    // Status
    active: 'చురుకైన',
    inactive: 'నిష్క్రియ',
    online: 'ఆన్‌లైన్',
    offline: 'ఆఫ్‌లైన్',
    loading: 'లోడ్ అవుతోంది',
    error: 'లోపం',
    success: 'విజయం',
    warning: 'హెచ్చరిక',
    info: 'సమాచారం',
    
    // Home Screen Specific
    dailyChallenge: 'రోజువారీ సవాలు',
    budgetPractice: 'బడ్జెట్ అభ్యాసం',
    caSyllabus: 'CA సిలబస్',
    myPortfolio: 'నా పోర్ట్‌ఫోలియో',
    yourLearningPath: 'మీ అభ్యాస మార్గం',
    almostThere: 'దాదాపు అయిపోయింది!',
    continueLearning: 'అభ్యాసం కొనసాగించండి',
    
    // Game Difficulty
    easy: 'సులువు',
    medium: 'మధ్యమ',
    hard: 'కష్టం',
    
    // Game Subtitles
    masterSmartShopping: 'స్మార్ట్ షాపింగ్‌లో నైపుణ్యం సాధించండి',
    learnToInvestWisely: 'తెలివిగా పెట్టుబడి పెట్టడం నేర్చుకోండి',
    buildYourSavings: 'మీ పొదుపులను పెంచుకోండి',
    understandCreditCards: 'క్రెడిట్ కార్డ్‌లను అర్థం చేసుకోండి',
    
    // Missing Game Translations
    protectYourFuture: 'మీ భవిష్యత్తును రక్షించుకోండి',
    insuranceIsland: 'బీమా ద్వీపం',
    
    // Learning Path & Course Content
    learningPath: 'అభ్యాస మార్గం',
    yourFinancialJourney: 'మీ ఆర్థిక ప్రయాణం',
    completeGamesInOrder: 'అధునాతన భావనలను అన్‌లాక్ చేయడానికి మరియు మరిన్ని రివార్డ్‌లను పొందడానికి ఆటలను క్రమంలో పూర్తి చేయండి!',
    beginner: 'ప్రారంభకుడు',
    learner: 'అభ్యాసకుడు',
    expert: 'నిపుణుడు',
    emergencyFundPlanning: 'అత్యవసర ఫండ్ ప్లానింగ్',
    whatIsCompoundInterest: 'చక్రవృద్ధి వడ్డీ అంటే ఏమిటి?',
    understandingCreditScore: 'క్రెడిట్ స్కోర్‌ను అర్థం చేసుకోవడం',
    typesOfMutualFunds: 'మ్యూచువల్ ఫండ్‌ల రకాలు',
    emiCalculationBasics: 'EMI లెక్కింపు ప్రాథమికాలు',
    quickLessons: 'త్వరిత పాఠాలు',
    recommendedForYou: 'మీ కోసం సిఫార్సు చేయబడినవి',
    basics: 'ప్రాథమికాలు',
    credit: 'క్రెడిట్',
    investment: 'పెట్టుబడి',
    
    // Placeholders
    interactiveChartComingSoon: 'ఇంటరాక్టివ్ చార్ట్ త్వరలో వస్తుంది',
    noDataAvailable: 'డేటా అందుబాటులో లేదు',
    comingSoon: 'త్వరలో వస్తుంది',
  },
  
  bn: {
    // Navigation
    home: 'হোম',
    practice: 'অনুশীলন',
    learn: 'শিখুন',
    insights: 'অন্তর্দৃষ্টি',
    profile: 'প্রোফাইল',
    
    // Common Actions
    continue: 'চালিয়ে যান',
    back: 'পিছনে',
    next: 'পরবর্তী',
    done: 'সম্পন্ন',
    skip: 'এড়িয়ে যান',
    edit: 'সম্পাদনা',
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল করুন',
    submit: 'জমা দিন',
    confirm: 'নিশ্চিত করুন',
    delete: 'মুছে ফেলুন',
    add: 'যোগ করুন',
    remove: 'সরান',
    update: 'আপডেট করুন',
    refresh: 'রিফ্রেশ করুন',
    search: 'খুঁজুন',
    filter: 'ফিল্টার',
    sort: 'সাজান',
    viewAll: 'সব দেখুন',
    showMore: 'আরো দেখান',
    showLess: 'কম দেখান',
    
    // Language Selection
    chooseYourLanguage: 'আপনার ভাষা বেছে নিন',
    selectLanguage: 'ভাষা নির্বাচন করুন',
    
    // Welcome & Auth
    welcomeToFundamind: 'ফান্ডামাইন্ডে স্বাগতম',
    enterMobileNumber: 'শুরু করতে আপনার মোবাইল নম্বর লিখুন',
    mobileNumber: 'মোবাইল নম্বর',
    sendOtp: 'OTP পাঠান',
    verifyOtp: 'OTP যাচাই করুন',
    enterOtp: 'OTP লিখুন',
    enterOtpSent: '+91 এ পাঠানো 6-সংখ্যার কোড লিখুন',
    didntReceiveCode: 'কোড পাননি? OTP পুনরায় পাঠান',
    verifyAndContinue: 'যাচাই করুন এবং এগিয়ে যান',
    agreeToTerms: 'আমি নিয়ম ও শর্তাবলী এবং গোপনীয়তা নীতিতে সম্মত',
    termsAndConditions: 'নিয়ম ও শর্তাবলী',
    privacyPolicy: 'গোপনীয়তা নীতি',
    
    // Home Screen
    goodMorning: 'সুপ্রভাত',
    goodAfternoon: 'শুভ দুপুর',
    goodEvening: 'শুভ সন্ধ্যা',
    todaysChallenge: 'আজকের চ্যালেঞ্জ',
    quickActions: 'দ্রুত কার্যক্রম',
    finShort: 'ফিনশর্ট',
    watchNow: 'এখনই দেখুন',
    playNow: 'এখনই খেলুন',
    startLearning: 'শেখা শুরু করুন',
    
    // Games & Practice
    learningGames: 'শিক্ষামূলক খেলা',
    playLearnMaster: 'খেলুন, শিখুন এবং আর্থিক ধারণায় দক্ষতা অর্জন করুন',
    allGames: 'সব খেলা',
    inProgress: 'চলমান',
    completed: 'সম্পন্ন',
    locked: 'বন্ধ',
    progress: 'অগ্রগতি',
    level: 'স্তর',
    score: 'স্কোর',
    highScore: 'সর্বোচ্চ স্কোর',
    attempts: 'চেষ্টা',
    accuracy: 'নির্ভুলতা',
    
    // Learning
    learningCenter: 'শিক্ষা কেন্দ্র',
    masterFinancialConcepts: 'আপনার গতিতে আর্থিক ধারণায় দক্ষতা অর্জন করুন',
    lessons: 'পাঠ',
    courses: 'কোর্স',
    modules: 'মডিউল',
    chapters: 'অধ্যায়',
    topics: 'বিষয়',
    certificates: 'সার্টিফিকেট',
    achievements: 'অর্জন',
    
    // Insights
    yourInsights: 'আপনার অন্তর্দৃষ্টি',
    trackLearningJourney: 'আপনার শেখার যাত্রা এবং অর্জন ট্র্যাক করুন',
    totalTime: 'মোট সময়',
    streak: 'ধারাবাহিকতা',
    points: 'পয়েন্ট',
    modulesCompleted: 'সম্পন্ন মডিউল',
    accuracyRate: 'নির্ভুলতার হার',
    topicsMastered: 'আয়ত্তকৃত বিষয়',
    weeklyActivity: 'সাপ্তাহিক কার্যকলাপ',
    subjectPerformance: 'বিষয়ভিত্তিক পারফরম্যান্স',
    recentAchievements: 'সাম্প্রতিক অর্জন',
    thisWeek: 'এই সপ্তাহে',
    improvement: 'উন্নতি',
    outOfTotal: 'মোটের মধ্যে',
    pending: 'অপেক্ষমাণ',
    
    // Profile
    levelProgress: 'স্তরের অগ্রগতি',
    expertLevel: 'বিশেষজ্ঞ স্তর',
    yourStats: 'আপনার পরিসংখ্যান',
    totalCoins: 'মোট কয়েন',
    gamesCompleted: 'সম্পন্ন খেলা',
    hoursLearned: 'শেখার ঘন্টা',
    currentStreak: 'বর্তমান ধারাবাহিকতা',
    settings: 'সেটিংস',
    notifications: 'বিজ্ঞপ্তি',
    language: 'ভাষা',
    account: 'অ্যাকাউন্ট',
    help: 'সাহায্য',
    support: 'সহায়তা',
    aboutUs: 'আমাদের সম্পর্কে',
    logout: 'লগ আউট',
    
    // Financial Terms
    budgeting: 'বাজেট',
    investing: 'বিনিয়োগ',
    taxation: 'কর',
    insurance: 'বীমা',
    savings: 'সঞ্চয়',
    loans: 'ঋণ',
    creditCard: 'ক্রেডিট কার্ড',
    stockMarket: 'শেয়ার বাজার',
    mutualFunds: 'মিউচুয়াল ফান্ড',
    retirement: 'অবসর',
    
    // Game Specific
    budgetBazaar: 'বাজেট বাজার',
    stockMarketSimulator: 'শেয়ার বাজার সিমুলেটর',
    savingsSprout: 'সেভিংস স্প্রাউট',
    creditCardQuest: 'ক্রেডিট কার্ড কোয়েস্ট',
    
    // Time & Dates
    today: 'আজ',
    yesterday: 'গতকাল',
    thisMonth: 'এই মাসে',
    days: 'দিন',
    hours: 'ঘন্টা',
    minutes: 'মিনিট',
    seconds: 'সেকেন্ড',
    
    // Status
    active: 'সক্রিয়',
    inactive: 'নিষ্ক্রিয়',
    online: 'অনলাইন',
    offline: 'অফলাইন',
    loading: 'লোড হচ্ছে',
    error: 'ত্রুটি',
    success: 'সফল',
    warning: 'সতর্কতা',
    info: 'তথ্য',
    
    // Home Screen Specific
    dailyChallenge: 'দৈনিক চ্যালেঞ্জ',
    budgetPractice: 'বাজেট অনুশীলন',
    caSyllabus: 'CA সিলেবাস',
    myPortfolio: 'আমার পোর্টফোলিও',
    yourLearningPath: 'আপনার শেখার পথ',
    almostThere: 'প্রায় শেষ!',
    continueLearning: 'শেখা চালিয়ে যান',
    
    // Game Difficulty
    easy: 'সহজ',
    medium: 'মাঝারি',
    hard: 'কঠিন',
    
    // Game Subtitles
    masterSmartShopping: 'স্মার্ট শপিংয়ে দক্ষতা অর্জন করুন',
    learnToInvestWisely: 'বুদ্ধিমত্তার সাথে বিনিয়োগ করতে শিখুন',
    buildYourSavings: 'আপনার সঞ্চয় গড়ুন',
    understandCreditCards: 'ক্রেডিট কার্ড বুঝুন',
    
    // Missing Game Translations
    protectYourFuture: 'আপনার ভবিষ্যৎ রক্ষা করুন',
    insuranceIsland: 'বীমা দ্বীপ',
    
    // Placeholders
    interactiveChartComingSoon: 'ইন্টারঅ্যাক্টিভ চার্ট শীঘ্রই আসছে',
    noDataAvailable: 'কোন তথ্য পাওয়া যায়নি',
    comingSoon: 'শীঘ্রই আসছে',
  },
  
  mr: {
    // Navigation
    home: 'होम',
    practice: 'सराव',
    learn: 'शिका',
    insights: 'अंतर्दृष्टी',
    profile: 'प्रोफाइल',
    
    // Common Actions
    continue: 'सुरू ठेवा',
    back: 'मागे',
    next: 'पुढे',
    done: 'पूर्ण',
    skip: 'वगळा',
    edit: 'संपादित करा',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    submit: 'सबमिट करा',
    confirm: 'पुष्टी करा',
    delete: 'हटवा',
    add: 'जोडा',
    remove: 'काढा',
    update: 'अपडेट करा',
    refresh: 'रिफ्रेश करा',
    search: 'शोधा',
    filter: 'फिल्टर',
    sort: 'क्रमवारी लावा',
    viewAll: 'सर्व पहा',
    showMore: 'अधिक दाखवा',
    showLess: 'कमी दाखवा',
    
    // Language Selection
    chooseYourLanguage: 'आपली भाषा निवडा',
    selectLanguage: 'भाषा निवडा',
    
    // Welcome & Auth
    welcomeToFundamind: 'फंडामाइंडमध्ये आपले स्वागत आहे',
    enterMobileNumber: 'सुरू करण्यासाठी आपला मोबाइल नंबर टाका',
    mobileNumber: 'मोबाइल नंबर',
    sendOtp: 'OTP पाठवा',
    verifyOtp: 'OTP सत्यापित करा',
    enterOtp: 'OTP टाका',
    enterOtpSent: '+91 वर पाठवलेला 6-अंकी कोड टाका',
    didntReceiveCode: 'कोड मिळाला नाही? OTP पुन्हा पाठवा',
    verifyAndContinue: 'सत्यापित करा आणि पुढे जा',
    agreeToTerms: 'मी अटी व शर्ती आणि गोपनीयता धोरणाशी सहमत आहे',
    termsAndConditions: 'अटी व शर्ती',
    privacyPolicy: 'गोपनीयता धोरण',
    
    // Home Screen
    goodMorning: 'सुप्रभात',
    goodAfternoon: 'शुभ दुपार',
    goodEvening: 'शुभ संध्याकाळ',
    todaysChallenge: 'आजचे आव्हान',
    quickActions: 'त्वरित कृती',
    finShort: 'फिनशॉर्ट',
    watchNow: 'आता पहा',
    playNow: 'आता खेळा',
    startLearning: 'शिकायला सुरुवात करा',
    
    // Games & Practice
    learningGames: 'शिकण्याचे खेळ',
    playLearnMaster: 'खेळा, शिका आणि आर्थिक संकल्पनांमध्ये प्रभुत्व मिळवा',
    allGames: 'सर्व खेळ',
    inProgress: 'सुरू आहे',
    completed: 'पूर्ण',
    locked: 'बंद',
    progress: 'प्रगती',
    level: 'स्तर',
    score: 'स्कोअर',
    highScore: 'उच्च स्कोअर',
    attempts: 'प्रयत्न',
    accuracy: 'अचूकता',
    
    // Learning
    learningCenter: 'शिक्षण केंद्र',
    masterFinancialConcepts: 'आपल्या गतीने आर्थिक संकल्पनांमध्ये प्रभुत्व मिळवा',
    lessons: 'धडे',
    courses: 'अभ्यासक्रम',
    modules: 'मॉड्यूल',
    chapters: 'प्रकरण',
    topics: 'विषय',
    certificates: 'प्रमाणपत्रे',
    achievements: 'यश',
    
    // Insights
    yourInsights: 'आपली अंतर्दृष्टी',
    trackLearningJourney: 'आपला शिकण्याचा प्रवास आणि यश ट्रॅक करा',
    totalTime: 'एकूण वेळ',
    streak: 'सलग',
    points: 'गुण',
    modulesCompleted: 'पूर्ण मॉड्यूल',
    accuracyRate: 'अचूकता दर',
    topicsMastered: 'प्रभुत्व मिळवलेले विषय',
    weeklyActivity: 'साप्ताहिक क्रियाकलाप',
    subjectPerformance: 'विषयानुसार कामगिरी',
    recentAchievements: 'अलीकडील यश',
    thisWeek: 'या आठवड्यात',
    improvement: 'सुधारणा',
    outOfTotal: 'एकूणपैकी',
    pending: 'प्रलंबित',
    
    // Profile
    levelProgress: 'स्तर प्रगती',
    expertLevel: 'तज्ञ स्तर',
    yourStats: 'आपली आकडेवारी',
    totalCoins: 'एकूण नाणी',
    gamesCompleted: 'पूर्ण खेळ',
    hoursLearned: 'शिकलेले तास',
    currentStreak: 'सध्याची सलग',
    settings: 'सेटिंग्ज',
    notifications: 'सूचना',
    language: 'भाषा',
    account: 'खाते',
    help: 'मदत',
    support: 'आधार',
    aboutUs: 'आमच्याबद्दल',
    logout: 'लॉग आउट',
    
    // Financial Terms
    budgeting: 'बजेट',
    investing: 'गुंतवणूक',
    taxation: 'कर',
    insurance: 'विमा',
    savings: 'बचत',
    loans: 'कर्ज',
    creditCard: 'क्रेडिट कार्ड',
    stockMarket: 'शेअर बाजार',
    mutualFunds: 'म्युच्युअल फंड',
    retirement: 'निवृत्ती',
    
    // Game Specific
    budgetBazaar: 'बजेट बाजार',
    stockMarketSimulator: 'शेअर बाजार सिम्युलेटर',
    savingsSprout: 'सेव्हिंग्स स्प्राउट',
    creditCardQuest: 'क्रेडिट कार्ड क्वेस्ट',
    
    // Time & Dates
    today: 'आज',
    yesterday: 'काल',
    thisMonth: 'या महिन्यात',
    days: 'दिवस',
    hours: 'तास',
    minutes: 'मिनिटे',
    seconds: 'सेकंद',
    
    // Status
    active: 'सक्रिय',
    inactive: 'निष्क्रिय',
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन',
    loading: 'लोड होत आहे',
    error: 'त्रुटी',
    success: 'यश',
    warning: 'चेतावणी',
    info: 'माहिती',
    
    // Home Screen Specific
    dailyChallenge: 'दैनिक आव्हान',
    budgetPractice: 'बजेट सराव',
    caSyllabus: 'CA अभ्यासक्रम',
    myPortfolio: 'माझा पोर्टफोलिओ',
    yourLearningPath: 'आपला शिकण्याचा मार्ग',
    almostThere: 'जवळजवळ झाले!',
    continueLearning: 'शिकणे सुरू ठेवा',
    
    // Game Difficulty
    easy: 'सोपे',
    medium: 'मध्यम',
    hard: 'कठीण',
    
    // Game Subtitles
    masterSmartShopping: 'स्मार्ट शॉपिंगमध्ये प्रभुत्व मिळवा',
    learnToInvestWisely: 'हुशारीने गुंतवणूक करायला शिका',
    buildYourSavings: 'आपली बचत वाढवा',
    understandCreditCards: 'क्रेडिट कार्ड समजून घ्या',
    
    // Missing Game Translations
    protectYourFuture: 'आपल्या भविष्याचे संरक्षण करा',
    insuranceIsland: 'विमा बेट',
    
    // Placeholders
    interactiveChartComingSoon: 'परस्परसंवादी चार्ट लवकरच येत आहे',
    noDataAvailable: 'डेटा उपलब्ध नाही',
    comingSoon: 'लवकरच येत आहे',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && translations[savedLanguage]) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.log('Could not load language from localStorage');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch (error) {
      console.log('Could not save language to localStorage');
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
