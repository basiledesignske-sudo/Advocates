import { Attorney, CaseStudy, FAQItem, LegalArticle, PracticeArea, Testimonial, FirmStats } from '../types';

export const firmStatsData: FirmStats = {
  clientsServed: 450,
  yearsExperience: 10,
  expertAttorneys: 14,
  successRatePercent: 98.8,
};

export const practiceAreasData: PracticeArea[] = [
  {
    id: 'corporate-commercial',
    name: 'Corporate & Commercial Law',
    shortName: 'Corporate & Commercial',
    tagline: 'Comprehensive corporate advisory for domestic and foreign entities investing in Kenya.',
    description: 'Our Corporate & Commercial Team (CCT) provides a comprehensive range of corporate and commercial services to domestic and foreign clients planning to invest, or do business, in Kenya. These services cover all aspects of the client’s business and all transactions undertaken within the framework of Kenya’s regulatory regime.',
    iconName: 'Building2',
    image: '/images/corporate-law.jpeg',
    leadAttorneyId: 'wafula-paul',
    clientFocus: 'Domestic corporations, multinational enterprises, foreign direct investors (FDI), and private entities establishing operations in Kenya and East Africa.',
    keyServices: [
      'Advising on the legal framework for proposed business activities & preferred business vehicles (branches of foreign companies, local subsidiaries)',
      'Obtaining regulatory registrations, business licenses, and government approvals',
      'Advising on government investment incentives under Kenyan law',
      'Mergers & Acquisitions (M&A), Joint Ventures, and Strategic Alliances',
      'Corporate Governance, commercial contracts, and statutory compliance'
    ],
    roadmap: [
      { step: '01', title: 'Diagnostic Regulatory Review', description: 'Reviewing statutory requirements, sector-specific licenses, and optimal incorporation structure in Kenya.' },
      { step: '02', title: 'Entity Structuring & Filings', description: 'Drafting shareholder agreements, branch charters, and securing Registrar of Companies and Kenya Investment Authority (KenInvest) approvals.' },
      { step: '03', title: 'Transactional Architecture', description: 'Drafting commercial contracts, tax-optimized transaction documents, and capital structuring agreements.' },
      { step: '04', title: 'Ongoing Governance & Compliance', description: 'Annual statutory filings, boardroom legal advisory, and compliance with Kenyan regulatory authorities.' }
    ],
    faqs: [
      { question: 'What is the preferred business vehicle for a foreign company entering Kenya?', answer: 'Foreign companies typically choose between registering a local subsidiary (private limited company) or establishing a registered branch of a foreign company. Our CCT guides you on taxation, local shareholding requirements, and regulatory implications.' },
      { question: 'Can you assist in obtaining investment incentives under Kenyan law?', answer: 'Yes. We advise clients on benefits available through the Kenya Investment Authority (KenInvest), Special Economic Zones (SEZs), and Export Processing Zones (EPZs).' }
    ]
  },
  {
    id: 'dispute-resolution',
    name: 'Litigation & Dispute Resolution',
    shortName: 'Dispute Resolution',
    tagline: 'Strategic advocacy before Kenyan courts, specialized tribunals, and international arbitral panels.',
    description: 'Our Dispute Resolution Team (DRT) provides strategic analysis of disputes and practical, customized advice on realistic assessments of options, projected outcomes, and costs. We offer tactical counsel on all forms of dispute resolution, from negotiation and mediation to arbitration and litigation before the High Court, Court of Appeal, and Supreme Court.',
    iconName: 'Gavel',
    image: '/images/litigation-practice.jpeg',
    leadAttorneyId: 'wafula-paul',
    clientFocus: 'Commercial banks, corporate entities, institutional receivers, property owners, and international businesses confronting high-stakes disputes.',
    keyServices: [
      'Commercial Litigation: Corporate & shareholder disputes, partnership & JV controversies, banking & finance litigation, trade & construction disputes',
      'Civil Litigation: Land disputes, debt recovery, airline litigation, work injuries compensation, professional negligence, and contract enforcement',
      'Alternative Dispute Resolution (ADR): Domestic and international commercial arbitration (under ICC & LCIA rules), and court-mandated mediation',
      'Injunctions, Asset Tracing, Preservation Orders, and provisional courtroom remedies',
      'Cross-Border Litigation and Enforcement of Foreign Judgments and Arbitral Awards'
    ],
    roadmap: [
      { step: '01', title: 'Strategic Case Evaluation', description: 'Detailed analysis of merits, evidentiary strength, potential costs, and exploration of pre-action settlement posture.' },
      { step: '02', title: 'Urgent Injunctive Relief', description: 'Filing prompt conservatory orders, stay of execution, or injunction applications to protect assets and status quo.' },
      { step: '03', title: 'Rigorous Pleadings & Discovery', description: 'Synthesizing complex factual matrix, drafting unassailable pleadings, and executing decisive witness examinations.' },
      { step: '04', title: 'Advocacy & Judgment Execution', description: 'Persuasive courtroom advocacy followed by swift execution, debt realization, and judgment enforcement.' }
    ],
    faqs: [
      { question: 'What courts and tribunals do you appear before?', answer: 'Our advocates appear before the Supreme Court of Kenya, Court of Appeal, High Court (Commercial & Tax, Milimani, Constitutional & Human Rights), Environment and Land Court, Employment and Labour Relations Court, Tax Appeals Tribunal, and arbitral tribunals.' },
      { question: 'What is your track record in commercial banking recoveries and debt collection?', answer: 'Our senior advocates have successfully recovered in excess of Kshs 2,050,000,000 for leading commercial banks in Kenya, successfully resisting numerous debtor injunction applications.' }
    ]
  },
  {
    id: 'real-estate-conveyancing',
    name: 'Real Estate & Conveyancing',
    shortName: 'Real Estate & Conveyancing',
    tagline: 'Guiding infrastructure, project finance, property transactions, and title perfection across Kenya.',
    description: 'Kenya has entered an era of blooming projects and infrastructure with both new and old players ranging from borrowers, lenders, investors, developers to individuals diversifying in real estate, banking, and finance. We address the specific needs of clients from groundbreaking preliminaries to perfection of securities and completion.',
    iconName: 'Home',
    image: '/images/conveyancing-property-law.jpeg',
    leadAttorneyId: 'wafula-paul',
    clientFocus: 'Real estate developers, institutional lenders, infrastructure funds, commercial landlords, diaspora buyers, and private property owners.',
    keyServices: [
      'Sub-division of land, change of user, amalgamation, and municipal planning approvals',
      'Transfer of land, long-term commercial leases, conveyances, and title registration',
      'Caveats, easements, licences, and registered powers of attorney',
      'Charges, mortgages, debentures, and discharge of charges for financial institutions',
      'Comprehensive legal due diligence and statutory land consents across all Lands Registries',
      'Structured and project finance, trade finance, syndicated loans, and Islamic finance',
      'Trusts relating to land, estate planning, and wills'
    ],
    roadmap: [
      { step: '01', title: 'Title Search & Legal Due Diligence', description: 'Official registry searches on Ardhisasa, historical green card verification, and site inspection to verify ownership.' },
      { step: '02', title: 'Consents & Approvals', description: 'Obtaining Land Control Board consents, rates clearance certificates, land rent receipts, and change of user permits.' },
      { step: '03', title: 'Security Drafting & Perfection', description: 'Drafting sale agreements, transfers, charges, and debentures conforming to statutory perfection standards.' },
      { step: '04', title: 'Stamp Duty & Registration', description: 'Valuation by government valuer, stamp duty assessment and payment, and final issuance of Certificate of Title.' }
    ],
    faqs: [
      { question: 'How do you assist diaspora clients purchasing real estate in Kenya?', answer: 'We handle complete end-to-end representation: conducting official due diligence, verifying titles at the land registry, negotiating sale agreements, executing powers of attorney, and overseeing title registration without requiring your physical travel.' },
      { question: 'What experience do you have in high-stakes land title litigation?', answer: 'Our lead advocate successfully defended the cancellation of KSC International Ltd’s land title worth Ksh 900 Million on behalf of the Receivers and Managers.' }
    ]
  },
  {
    id: 'employment-labour',
    name: 'Employment & Labour Law',
    shortName: 'Employment & Labour',
    tagline: 'Rigorous guidance on responsible employment practices and workplace compliance.',
    description: 'Our Employment Team (ET) provides what clients seek: rigorous guidance on responsible employment practices. ET helps employers arrive at sound and mutually beneficial employment policies, leveraging deep knowledge of the dynamics of Kenyan and international labour laws and practices. Close collaboration with our Dispute Resolution Team maps out current trends from the Employment and Labour Relations Court of Kenya.',
    iconName: 'Briefcase',
    image: '/images/labour-law.jpeg',
    leadAttorneyId: 'wafula-paul',
    clientFocus: 'Corporate employers, human resource directors, executive leaders, trade unions, and statutory authorities.',
    keyServices: [
      'General employment law advice & statutory compliance audits',
      'Preparation of employment contracts, HR policies, and employee handbooks',
      'Advising on employee compensation, pensions, and statutory benefits',
      'Reviewing and negotiating Collective Bargaining Agreements (CBAs)',
      'Discrimination, sexual harassment policies, and disciplinary tribunal advisory',
      'Setting up Employee Share Option Plans / Schemes (ESOPs)',
      'Employment litigation (redundancies, unlawful dismissals, trade disputes)',
      'Immigration-related matters, Special Passes, and Kenyan Work Permits'
    ],
    roadmap: [
      { step: '01', title: 'HR Policy & Contract Audit', description: 'Reviewing employment contracts against the Employment Act 2007, Labour Relations Act, and recent ELRC judicial decisions.' },
      { step: '02', title: 'Workplace Risk Management', description: 'Structuring legally compliant disciplinary processes, redundancy notices, and internal dispute resolution frameworks.' },
      { step: '03', title: 'Union & CBA Negotiations', description: 'Engaging trade unions and negotiating balanced Collective Bargaining Agreements protecting employer flexibility.' },
      { step: '04', title: 'Courtroom & Tribunal Defense', description: 'Defending claims before the Employment and Labour Relations Court and resolving trade disputes efficiently.' }
    ],
    faqs: [
      { question: 'What are the legal prerequisites for declaring redundancies in Kenya?', answer: 'Section 40 of the Employment Act requires giving at least one month notice to the employee and relevant labour officer, applying fair selection criteria, and paying severance pay of not less than 15 days for each completed year of service.' },
      { question: 'What is your experience in major employment litigation?', answer: 'Our team successfully defended the Kenya Civil Aviation Authority (KCAA) in a complex employment dispute valued in excess of Ksh 360 Million.' }
    ]
  },
  {
    id: 'intellectual-property',
    name: 'Intellectual Property & Brand Protection',
    shortName: 'Intellectual Property',
    tagline: 'Integrated approach to protecting, enforcing, and commercializing intellectual assets across Africa.',
    description: 'Our Intellectual Property Team (IPT) offers clients an integrated approach to protecting their intellectual assets in Kenya and across Africa. Combining insightful advice and innovative tools, we help clients in obtaining, defending, enforcing, and exploiting intellectual property rights, including trademarks, industrial designs, copyrights, and patents.',
    iconName: 'ShieldAlert',
    image: '/images/intellectual-law.jpeg',
    leadAttorneyId: 'wafula-paul',
    clientFocus: 'International brand owners, innovators, technology startups, creative industries, and manufacturing conglomerates.',
    keyServices: [
      'General IP advisory, clearance, and official/unofficial Registry searches',
      'Trade mark registration, renewal, and comprehensive portfolio management',
      'Trade mark / trade dress litigation, opposition proceedings, and expungement actions',
      'Anti-piracy and anti-counterfeiting enforcement with the Anti-Counterfeit Authority (ACA)',
      'Patent filing, registration, prosecution, and patent infringement litigation',
      'Copyright protection, software licensing, and industrial designs registration',
      'IP audit, due diligence, licensing, franchising, and technology transfer agreements'
    ],
    roadmap: [
      { step: '01', title: 'Registry Search & Registrability', description: 'Conducting official searches at the Kenya Industrial Property Institute (KIPI) to assess availability and distinctiveness.' },
      { step: '02', title: 'Filing & Gazette Publication', description: 'Filing applications, overcoming examination objections, and publishing in the Industrial Property Journal.' },
      { step: '03', title: 'Opposition & Defense', description: 'Filing or responding to notices of opposition before the Registrar of Trade Marks to safeguard brand exclusivity.' },
      { step: '04', title: 'Enforcement & Border Seizure', description: 'Partnering with the Anti-Counterfeit Authority (ACA) to record IP and seize counterfeit goods entering Kenya.' }
    ],
    faqs: [
      { question: 'How do you handle trademark infringement and opposition in Kenya?', answer: 'We actively monitor the Industrial Property Journal, file formal notices of opposition against infringing marks, and prosecute expungement applications. We successfully represented South African company LA Group (Pty) Ltd in opposing registration of a mark infringing on their global “POLO” trademark.' },
      { question: 'Is it necessary to record IP rights with the Anti-Counterfeit Authority (ACA)?', answer: 'Yes, mandatory recordation with ACA for all IP rights relating to imported goods is vital to enable customs officials to intercept counterfeits at Kenyan ports of entry.' }
    ]
  },
  {
    id: 'cross-border-international',
    name: 'International & Cross-Border Legal Services',
    shortName: 'Cross-Border & Diaspora',
    tagline: 'Dedicated legal support for multinational corporations, foreign investors, and diaspora clients.',
    description: 'We advise multinational corporations, financial institutions, governments, and high-net-worth individuals on legal matters that involve more than one jurisdiction, including disciplines such as Mergers and Acquisitions (M&A), Joint Ventures and strategic alliances, Foreign Direct Investment (FDI) structuring, and international financing. We combine deep knowledge of domestic laws with international regulations, treaties, and global business practices.',
    iconName: 'Scale',
    image: '/images/Internal.jpg',
    leadAttorneyId: 'wafula-paul',
    clientFocus: 'Multinational corporations, international finance institutions, foreign investors, EAC regional operators, and Kenyan diaspora communities.',
    keyServices: [
      'Legal support for international and diaspora clients (property acquisitions, succession, estate administration)',
      'Foreign Direct Investment (FDI) structuring, EAC market entry, and bilateral investment treaty advisory',
      'Cross-border Mergers & Acquisitions (M&A) and regional joint ventures',
      'International financing, syndicated cross-border lending, and capital markets transactions',
      'Representation in international arbitration under ICC, LCIA, and UNCITRAL rules',
      'Cross-border litigation and reciprocal enforcement of foreign judgments and arbitral awards in Kenya'
    ],
    roadmap: [
      { step: '01', title: 'Cross-Border Conflict & Regulatory Audit', description: 'Evaluating choice-of-law provisions, treaty protections, foreign exchange guidelines, and jurisdictional interfaces.' },
      { step: '02', title: 'Tax-Efficient Structure Design', description: 'Coordinating with international counsel to structure double-taxation treaty advantages and corporate vehicles.' },
      { step: '03', title: 'Regulatory Clearances in Kenya', description: 'Obtaining COMESA competition clearances, Central Bank approvals, and sector-specific foreign investor licenses.' },
      { step: '04', title: 'Cross-Border Enforcement', description: 'Registering and executing foreign judgments and international arbitral awards through the Kenyan High Court.' }
    ],
    faqs: [
      { question: 'Can foreign judgments and international arbitral awards be enforced in Kenya?', answer: 'Yes. Foreign judgments from reciprocating countries are recognized under the Foreign Judgments (Reciprocal Enforcement) Act, and foreign arbitral awards are readily enforceable under Kenya’s Arbitration Act 1995 and the New York Convention.' },
      { question: 'How does the firm support diaspora Kenyans living in North America, Europe, or the Gulf?', answer: 'We serve as your trusted legal partner on the ground: executing property conveyances, handling estate succession before the High Court, resolving family land disputes, and overseeing commercial ventures without requiring travel to Kenya.' }
    ]
  }
];

export const attorneysData: Attorney[] = [
  {
    id: 'wafula-paul',
    name: 'WAFULA W. PAUL',
    role: 'Managing Partner & Senior Litigation Advocate',
    experience: '10+ Years Experience',
    specialty: 'Civil & Commercial Litigation, Banking Recoveries & ADR',
    bio: 'WAFULA W. PAUL is an experienced Litigation Advocate with a distinguished track record in managing complex legal disputes, representing high-profile corporate clients, and delivering strategic counsel before Kenyan courts and arbitral tribunals. Previously Senior Associate at Walker Kontos Advocates (2022–2025) and recipient of the prestigious Employee of the Year 2017 Award, Paul specializes in civil and commercial litigation, corporate debt recoveries exceeding Ksh 2.05 Billion, land title defense, and high-stakes trademark opposition. Known for his sharp analytical acumen, persuasive courtroom advocacy, and client-focused approach, he provides tailored solutions that consistently secure favorable outcomes for institutions and private clients alike.',
    image: '/wafula-paul.jpg',
    education: [
      'Advocate of the High Court of Kenya',
      'Kenya School of Law - Post Graduate Diploma in Law (ATP)',
      'Bachelor of Laws (LL.B. Honours)'
    ],
    barAdmissions: [
      'Law Society of Kenya (LSK)',
      'East Africa Law Society (EALS)',
      'High Court of Kenya'
    ],
    languages: ['English', 'Swahili'],
    memberships: [
      'Law Society of Kenya (LSK)',
      'East Africa Law Society (EALS)',
      'Chartered Institute of Arbitrators (CIArb - Kenya Branch)'
    ],
    notableMatters: [
      'Acted for the Receivers and Managers of KSC International Ltd in relation to a land dispute; successfully defended the claim seeking cancellation of KSC’s land title, worth Ksh 900 Million.',
      'Representing several commercial banks, including Barclays Bank, Kenya Commercial Bank (KCB), Giro Bank, Paramount Universal Bank, Oriental Commercial Bank, and CFC Stanbic Bank, on both corporate and retail recoveries, recovering in excess of Kshs 2,050,000,000 in the last year.',
      'Acted for NCBA Bank in relation to debt recovery against General Printers Ltd and its directors; successfully argued for dismissal of the injunction application sought by the directors.',
      'Acted for Eco Bank Kenya Ltd in a high-stakes commercial case brought by Auto Fine Limited, seeking damages in excess of Ksh 1 Billion.',
      'Acted for HFCK Bank Ltd in the recovery of a debt in excess of Ksh 200 Million from Hadar Limited in arbitration, through realization of the residential property known as Sifa Apartments.',
      'Acted for Bank of Africa Kenya Limited in recovery of debt in excess of Ksh 180 Million from Turbo Highways Limited, successfully resisting various court injunctions.',
      'Acted for LA Group (Pty) Ltd, a South African company, in a trademark dispute against Wardrobe Collections Ltd; successfully opposed registration of an infringing mark on the global trademark “POLO”.',
      'Acted for the Kenya Civil Aviation Authority (KCAA) in an employment dispute whose value was in excess of Ksh 360 Million.',
      'Acted for Stanbic Bank in the recovery of a debt in excess of Ksh 1 Billion from Bake n Bite Ltd.'
    ],
    email: 'info@wafulapwadvocates.com',
    phone: '+254 716 954 112 | +254 780 323 657',
    linkedIn: 'https://linkedin.com'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't-1',
    quote: 'Wafula PW & Co. Advocates delivered exemplary results during our multi-million debt recovery actions. Their surgical litigation strategy and deep command of banking securities in Kenyan courts are unmatched. They recovered substantial debt where others stalled.',
    clientName: 'D. K. Njoroge',
    clientRole: 'Head of Legal & Credit Recoveries',
    company: 'Commercial Banking Institution',
    practiceArea: 'Dispute Resolution',
    verified: true
  },
  {
    id: 't-2',
    quote: 'When our Ksh 900 Million land title faced aggressive cancellation proceedings, Paul Wafula’s courtroom mastery and tactical pleadings saved our assets. Their proactive communication and legal precision made them our trusted legal partner.',
    clientName: 'P. W. Mwangi',
    clientRole: 'Receiver & Manager',
    company: 'KSC International Ltd',
    practiceArea: 'Real Estate & Conveyancing',
    verified: true
  },
  {
    id: 't-3',
    quote: 'Their Intellectual Property Team acted decisively before the Kenyan Trademark Registry to protect our global trademark against unauthorized local registration. They possess genuine on-the-ground experience in African brand enforcement.',
    clientName: 'Johannes Van Der Merwe',
    clientRole: 'IP Counsel, South Africa',
    company: 'LA Group (Pty) Ltd',
    practiceArea: 'Intellectual Property',
    verified: true
  },
  {
    id: 't-4',
    quote: 'As a Kenyan in the diaspora, purchasing commercial and residential property in Nairobi used to be stressful. Wafula PW & Co. Advocates conducted comprehensive title due diligence and handled the conveyancing seamlessly from their Kiambu Road offices.',
    clientName: 'Mercy A. Wekesa',
    clientRole: 'Diaspora Investor & Executive',
    company: 'London / Nairobi',
    practiceArea: 'Cross-Border & Diaspora',
    verified: true
  }
];

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'Successful Defense of Ksh 900M Land Title for Receivers & Managers',
    matterType: 'High-Stakes Land & Commercial Litigation',
    practiceArea: 'Dispute Resolution & Real Estate',
    clientSector: 'Receivership & Property',
    challenge: 'A contentious petition sought the cancellation of a prime industrial and commercial land title valued at Ksh 900 Million belonging to KSC International Ltd (under receivership), which would have wiped out secured creditor interests.',
    strategy: 'Our litigation team raised jurisdictional objections, conducted deep historical registry analysis, demonstrated unbroken chain of title, and persuasively established the primacy of statutory receivership protections before the High Court.',
    outcome: 'The claim seeking cancellation was successfully defended in full, upholding the validity of the Ksh 900 Million title and safeguarding secured lenders.',
    confidentialityNote: 'Acted for the Receivers and Managers of KSC International Ltd.'
  },
  {
    id: 'cs-2',
    title: 'Recovery of Over Ksh 2.05 Billion Across Commercial Banking Portfolios',
    matterType: 'Banking Litigation & Debt Realization',
    practiceArea: 'Litigation & Dispute Resolution',
    clientSector: 'Banking & Financial Institutions',
    challenge: 'Corporate borrowers and debtors filed multiple interlocutory injunction applications seeking to restrain banks from realizing charged securities across Nairobi and surrounding counties.',
    strategy: 'Paul Wafula spearheaded aggressive courtroom opposition, disproving bad-faith claims of statutory non-compliance, validating statutory notices under the Land Act, and demonstrating debtors’ lack of equitable clean hands.',
    outcome: 'Successfully resisted debtor injunctions and achieved recoveries exceeding Ksh 2,050,000,000 for clients including NCBA, Stanbic, Eco Bank, Bank of Africa, and HFCK.',
    confidentialityNote: 'Represented major commercial banking institutions in Kenya.'
  },
  {
    id: 'cs-3',
    title: 'Global Brand Protection: Opposing “POLO” Trademark Infringement',
    matterType: 'Trademark Opposition & Brand Enforcement',
    practiceArea: 'Intellectual Property',
    clientSector: 'Fashion & Retail (South Africa / Kenya)',
    challenge: 'A local entity (Wardrobe Collections Ltd) sought registration of a trademark that infringed on the world-renowned “POLO” brand owned by South African multinational LA Group (Pty) Ltd.',
    strategy: 'Our Intellectual Property Team filed formal opposition before the Registrar of Trade Marks, demonstrating prior international registration, likelihood of consumer confusion, and the well-known status of the trademark.',
    outcome: 'Successfully opposed the registration, barring the infringing application and securing total brand protection for LA Group in the Kenyan market.',
    confidentialityNote: 'Matter prosecuted on behalf of LA Group (Pty) Ltd.'
  },
  {
    id: 'cs-4',
    title: 'Defense of Ksh 360M Employment Dispute for Statutory Authority',
    matterType: 'Employment & Labour Litigation',
    practiceArea: 'Employment & Labour Law',
    clientSector: 'Aviation & Public Sector',
    challenge: 'The Kenya Civil Aviation Authority (KCAA) was faced with a multi-million shilling collective employment claim alleging improper termination and contractual entitlements exceeding Ksh 360 Million.',
    strategy: 'Conducted rigorous analysis of employment regulations, collective bargaining agreements, and public service guidelines, presenting structured statutory defenses before the Employment and Labour Relations Court.',
    outcome: 'Successfully mitigated institutional exposure, achieving a favorable resolution safeguarding public resources and institutional governance.',
    confidentialityNote: 'Acted for the Kenya Civil Aviation Authority.'
  }
];

export const legalArticlesData: LegalArticle[] = [
  {
    id: 'art-1',
    slug: 'establishing-business-operations-in-kenya-regulatory-framework',
    title: 'Establishing Business Operations in Kenya: Vehicles, Approvals & Incentives',
    category: 'Corporate & Commercial',
    author: 'Wafula Paul',
    authorRole: 'Managing Partner',
    authorImage: '/Wafula Paul.jpg',
    date: 'September 2026',
    readTime: '6 min read',
    tags: ['Foreign Direct Investment', 'Companies Act 2015', 'Tax Structuring', 'AfCFTA'],
    summary: 'A strategic guide for foreign investors and diaspora entrepreneurs on preferred business vehicles, regulatory registrations, and accessing incentives under Kenyan law.',
    content: [
      'Kenya remains the premier economic and financial hub of East Africa, attracting international investors seeking a foothold in the African Continental Free Trade Area (AfCFTA). However, structuring business operations requires careful navigation of the Companies Act 2015 and sector-specific regulators.',
      'Foreign entities typically weigh the merits of establishing a local private limited company versus registering a branch of a foreign company. Factors influencing this decision include corporate tax differentials (with branches subject to higher corporate tax rates compared to resident subsidiaries), local directorship requirements, and ease of profit repatriation.',
      'Furthermore, enterprises looking to establish manufacturing, technological, or logistics operations should actively explore incentives under the Special Economic Zones (SEZ) Act and Export Processing Zones (EPZ) frameworks, offering reduced corporate tax rates, zero-rated VAT, and simplified single-window customs clearances.',
      'Key statutory filings include registration for Corporation Tax, PAYE, and VAT via the KRA iTax portal, mandatory registration with the National Social Security Fund (NSSF) and Social Health Authority (SHA), and compliance with the Data Protection Act 2019 regarding cross-border data transfers.'
    ],
    keyTakeaways: [
      'Compare local subsidiary versus foreign branch tax liabilities and withholding taxes before incorporation.',
      'Leverage investment certificates from KenInvest for accelerated business permits and special passes.',
      'Ensure strict compliance with the Data Protection Act 2019 and statutory Beneficial Ownership disclosures at the Business Registration Service (BRS).',
      'Evaluate SEZ status for 10-year corporate tax holidays and exemptions from stamp duty on land acquisitions.'
    ]
  },
  {
    id: 'art-2',
    slug: 'trends-in-employment-and-labour-relations-court-kenya',
    title: 'Current Jurisprudential Trends in the Employment and Labour Relations Court',
    category: 'Employment & Labour',
    author: 'Wafula Paul',
    authorRole: 'Managing Partner',
    authorImage: '/Wafula Paul.jpg',
    date: 'August 2026',
    readTime: '5 min read',
    tags: ['Employment Act 2007', 'Redundancies', 'Workplace Compliance', 'ELRC Precedents'],
    summary: 'Key judicial decisions from Kenya’s ELRC on procedural fairness in employee terminations, redundancy notices, and collective bargaining enforcement.',
    content: [
      'The Employment and Labour Relations Court (ELRC) of Kenya places paramount emphasis on both substantive justification and strict procedural fairness under Sections 41, 43, and 45 of the Employment Act 2007.',
      'Employers frequently stumble not on the substantive reason for termination, but on procedural pitfalls—such as failing to provide a written explanation in a language understood by the employee, or denying the statutory right to be accompanied by a colleague or union representative during disciplinary hearings.',
      'In corporate redundancy exercises, recent rulings mandate strict compliance with Section 40, including prior 30-day notice to the county labour officer and the application of objective, verifiable selection criteria (such as Last-In-First-Out, seniority, and demonstrated operational need).',
      'The court has continuously held that an employer who fails to accord statutory hearing procedures faces awards of up to 12 months’ gross compensation for unfair termination, irrespective of how grave the employee’s alleged infraction was.'
    ],
    keyTakeaways: [
      'Always document a formal two-stage disciplinary hearing with colleague or union representation explicitly noted in the minutes.',
      'Comply strictly with statutory 30-day redundancy notices to both the employee and local labour officer before declaring positions redundant.',
      'Regularly review employee handbooks, remote working policies, and disciplinary codes against evolving ELRC jurisprudence.'
    ]
  },
  {
    id: 'art-3',
    slug: 'perfection-of-banking-securities-real-estate-kenya',
    title: 'Perfection of Banking Securities & Due Diligence under Kenyan Property Law',
    category: 'Real Estate & Banking',
    author: 'Wafula Paul',
    authorRole: 'Managing Partner',
    authorImage: '/Wafula Paul.jpg',
    date: 'July 2026',
    readTime: '5 min read',
    tags: ['Ardhisasa', 'Land Act 2012', 'Securities Perfection', 'Debt Recovery'],
    summary: 'Critical steps for financial institutions and property investors: title due diligence on Ardhisasa, spousal consents, and unassailable charge perfection.',
    content: [
      'With significant digitization through the Ardhisasa platform and rigorous statutory requirements under the Land Act 2012 and Land Registration Act, perfecting charges and mortgages requires meticulous due diligence.',
      'Financial institutions and purchasers must verify not only official digital searches, but historical cadastral maps, Land Control Board consents (for agricultural land), and mandatory spousal consents under Section 79 of the Land Act.',
      'When defaults occur, the enforceability of statutory powers of sale hinges entirely on whether the charge was perfected impeccably and statutory notices under Sections 90 and 96 were properly served on the mortgagor and any registered guarantors.',
      'Judicial authorities in Kenya have firmly voided auctions where statutory 90-day notices of default or 40-day notices of intention to sell were procedurally defective or where professional valuation was conducted outside the statutory timeline.'
    ],
    keyTakeaways: [
      'Ensure mandatory spousal consent is obtained and witnessed prior to executing legal charges.',
      'Verify digital cadastral records against physical registry green cards to prevent overlapping titles.',
      'Comply strictly with statutory timelines when issuing Section 90 default notices before exercising statutory power of sale.'
    ]
  },
  {
    id: 'art-4',
    slug: 'trademark-protection-anti-counterfeiting-kenya-aca',
    title: 'Intellectual Property Enforcement & Anti-Counterfeiting Strategies in East Africa',
    category: 'Intellectual Property',
    author: 'Wafula Paul',
    authorRole: 'Managing Partner',
    authorImage: '/Wafula Paul.jpg',
    date: 'June 2026',
    readTime: '7 min read',
    tags: ['Trade Marks', 'Anti-Counterfeit Authority', 'Brand Protection', 'Border Seizures'],
    summary: 'How brand owners can leverage mandatory ACA recordation, customs border interception, and High Court ex-parte Anton Piller search orders to combat counterfeit goods.',
    content: [
      'East Africa’s expanding consumer market has heightened the imperative for global and regional brand owners to safeguard their intellectual assets against infringement, imitation, and unauthorized parallel importation.',
      'Under the Anti-Counterfeit Act and recent regulations, recordation of intellectual property rights with the Anti-Counterfeit Authority (ACA) is mandatory for goods imported into Kenya. This enables customs inspectors and ACA border officials to intercept and detain suspected counterfeit consignments at the Port of Mombasa and Jomo Kenyatta International Airport.',
      'Before the Kenya Industrial Property Institute (KIPI) and High Court, our practice routinely enforces trademark oppositions, expungement of infringing marks, and Anton Piller search-and-seizure orders to secure evidence against illicit distribution networks.'
    ],
    keyTakeaways: [
      'Complete mandatory ACA IP recordation to authorize port authorities to intercept infringing shipments.',
      'Actively monitor monthly KIPI Industrial Property Journals to file timely notices of opposition within 60 days.',
      'Deploy civil Anton Piller orders to seize infringing merchandise before evidence can be destroyed.'
    ]
  },
  {
    id: 'art-5',
    slug: 'cross-border-mergers-acquisitions-comesa-competition',
    title: 'Cross-Border M&A Structuring: Navigating the COMESA Competition Commission',
    category: 'Corporate & Commercial',
    author: 'Wafula Paul',
    authorRole: 'Managing Partner',
    authorImage: '/Wafula Paul.jpg',
    date: 'May 2026',
    readTime: '6 min read',
    tags: ['Cross-Border M&A', 'COMESA Clearances', 'Competition Authority of Kenya', 'Joint Ventures'],
    summary: 'A practitioner’s analysis on regional transaction structuring, mandatory pre-merger notification thresholds, and dual CAK-COMESA compliance.',
    content: [
      'Cross-border corporate transactions across the East African Community (EAC) and COMESA region require synchronizing domestic merger control under Kenya’s Competition Act with supra-national regulations enforced by the COMESA Competition Commission (CCC).',
      'Where a transaction has an appreciable effect across two or more COMESA member states and meets designated turnover or asset thresholds, mandatory notification must be filed with the CCC within 30 days of the parties entering into a definitive agreement.',
      'Failure to obtain merger clearance carries severe consequences, including statutory fines of up to 10% of annual turnover and potential invalidation of the acquisition in participating jurisdictions. Early merger filing assessment is critical to transactional closing.'
    ],
    keyTakeaways: [
      'Determine multi-jurisdictional COMESA thresholds early during initial due diligence.',
      'Structure merger agreements with express conditions precedent tied to CAK and CCC regulatory approvals.',
      'Mitigate integration delays by preparing market share and economic impact filings concurrently.'
    ]
  },
  {
    id: 'art-6',
    slug: 'commercial-injunctions-debt-recovery-milimani-court',
    title: 'Tactics in Commercial Debt Realization & Defending Ex-Parte Injunctions',
    category: 'Dispute Resolution',
    author: 'Wafula Paul',
    authorRole: 'Managing Partner',
    authorImage: '/Wafula Paul.jpg',
    date: 'April 2026',
    readTime: '5 min read',
    tags: ['Milimani Commercial Court', 'Injunctions', 'Giella v Cassman Brown', 'Debt Recovery'],
    summary: 'How secured lenders and commercial creditors can swiftly resist interlocutory injunctions and expedite realization under the Civil Procedure Act.',
    content: [
      'Commercial debt realization before the Milimani High Court often faces bad-faith delaying tactics through frivolous ex-parte injunction applications filed by defaulting corporate debtors.',
      'Defeating these motions requires establishing that the applicant has failed to meet the three cardinal conditions established in the landmark precedent of Giella v Cassman Brown & Co Ltd: establishing a prima facie case with a probability of success, demonstrating irreparable injury not compensable by damages, and determining the balance of convenience.',
      'Our dispute resolution team rigorously demonstrates that where a debt and statutory notice are validly evidenced, damages remain an adequate remedy and an injunction should not issue to restrain legitimate realization of commercial securities.'
    ],
    keyTakeaways: [
      'Hold applicants to the strict evidentiary threshold of Giella v Cassman Brown.',
      'Demonstrate that damages are an adequate remedy for monetary security disputes.',
      'Expedite court hearings by filing early notices of preliminary objection on points of law.'
    ]
  }
];

export const faqItemsData: FAQItem[] = [
  {
    category: 'Consultation & Location',
    question: 'Where is the firm located and how can I arrange a consultation?',
    answer: 'Our main offices are located on the First Floor of MCMX Building, Off Kiambu Road, Nairobi, Kenya. You can schedule an in-person or virtual consultation via our website contact form, telephone us at +254 716 954 112 / +254 780 323 657, or email info@wafulapwadvocates.com.'
  },
  {
    category: 'Diaspora & Cross-Border',
    question: 'How do you handle legal matters for Kenyans living in the diaspora or foreign investors?',
    answer: 'We provide dedicated legal support for international and diaspora clients. We handle real estate due diligence and conveyancing, company incorporation, succession, and commercial litigation without requiring your physical presence in Kenya, utilizing secure encrypted videoconferences and registered powers of attorney.'
  },
  {
    category: 'Fee Structures',
    question: 'How are legal fees determined at Wafula PW & Co. Advocates?',
    answer: 'Our fee structures strictly conform to the Advocates (Remuneration) Order of Kenya, ensuring transparency, predictability, and fairness. Depending on the brief, we offer fixed transactional fees for conveyancing and corporate setup, hourly rates for complex advisory, and retainer arrangements for ongoing corporate general counsel.'
  },
  {
    category: 'Dispute Resolution & Courts',
    question: 'What courts and tribunals do your advocates appear before?',
    answer: 'We represent clients across Kenya before the Supreme Court, Court of Appeal, High Court, Environment and Land Court, Employment and Labour Relations Court, Tax Appeals Tribunal, National Environment Tribunal, and domestic and international arbitration panels (under ICC, LCIA, and CIArb rules).'
  },
  {
    category: 'Confidentiality & Ethics',
    question: 'How does the firm ensure client confidentiality and conflict clearance?',
    answer: 'Client confidentiality is a cornerstone of our firm values. We conduct rigorous preliminary conflicts checks prior to any substantive engagement, and all client records, strategies, and communications are protected under strict advocate-client legal privilege.'
  }
];
