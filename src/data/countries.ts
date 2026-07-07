export type LegalStatus = "legal" | "medical" | "decriminalized" | "illegal";

export type Country = {
  code: string;
  slug: string;
  name: string;
  flag: string;
  legalStatus: LegalStatus;
  medical: boolean;
  recreational: boolean;
  rules: string;
  updated: string; // ISO date
  cities: { slug: string; name: string; guide: string }[];
};

export const countries: Country[] = [
  {
    code: "CA", slug: "canada", name: "Canada", flag: "🇨🇦",
    legalStatus: "legal", medical: true, recreational: true,
    rules: "Fully legal nationwide since October 2018 (Cannabis Act). Adults 18–19+ (varies by province) may possess up to 30g in public and grow up to 4 plants per household (except Quebec and Manitoba). Sales through licensed retailers only. Crossing international borders with cannabis remains a serious crime.",
    updated: "2026-05-01",
    cities: [
      { slug: "toronto", name: "Toronto", guide: "Hundreds of licensed dispensaries across the city. Public consumption allowed wherever tobacco smoking is permitted. Ontario minimum age: 19." },
      { slug: "vancouver", name: "Vancouver", guide: "Canada's historic cannabis capital. Licensed stores throughout; consumption lounges limited. BC minimum age: 19." },
    ],
  },
  {
    code: "DE", slug: "germany", name: "Germany", flag: "🇩🇪",
    legalStatus: "legal", medical: true, recreational: true,
    rules: "Partially legalized April 2024 (CanG). Adults 18+ may possess 25g in public, 50g at home, and grow 3 plants. Non-commercial cannabis social clubs may distribute to members. Commercial retail sale not yet permitted. Medical cannabis available by prescription since 2017.",
    updated: "2026-04-15",
    cities: [
      { slug: "berlin", name: "Berlin", guide: "Cannabis social clubs operating since mid-2024. Public possession up to 25g legal; consumption banned near schools, playgrounds, and in pedestrian zones before 20:00." },
    ],
  },
  {
    code: "NL", slug: "netherlands", name: "Netherlands", flag: "🇳🇱",
    legalStatus: "decriminalized", medical: true, recreational: false,
    rules: "Famous tolerance policy ('gedoogbeleid'): sale of up to 5g per person in licensed coffeeshops is tolerated though technically illegal. Possession up to 5g not prosecuted. Regulated supply-chain trial ('wietexperiment') running in multiple municipalities. Some cities restrict coffeeshop entry to residents.",
    updated: "2026-03-20",
    cities: [
      { slug: "amsterdam", name: "Amsterdam", guide: "≈160 coffeeshops. Tourists welcome. Smoking ban in the Red Light District's outdoor areas since 2023. Buy only in coffeeshops — street dealing is illegal and unsafe." },
    ],
  },
  {
    code: "US", slug: "united-states", name: "United States", flag: "🇺🇸",
    legalStatus: "medical", medical: true, recreational: false,
    rules: "Federally illegal (Schedule I; rescheduling to Schedule III proposed) but 24+ states have legalized recreational use and ~40 allow medical use. State laws vary widely on possession limits, home grow, and retail. Never transport across state lines or through airports.",
    updated: "2026-06-10",
    cities: [
      { slug: "los-angeles", name: "Los Angeles", guide: "The world's largest legal cannabis market. Adults 21+ may buy at hundreds of licensed dispensaries; up to 28.5g flower possession. No public consumption." },
      { slug: "denver", name: "Denver", guide: "Pioneer market since 2014. Licensed hospitality lounges allow social consumption. 21+, up to 2oz possession." },
      { slug: "new-york", name: "New York City", guide: "Recreational legal since 2021; licensed dispensaries expanding. Smoking allowed most places tobacco is. 21+, up to 3oz." },
    ],
  },
  {
    code: "UY", slug: "uruguay", name: "Uruguay", flag: "🇺🇾",
    legalStatus: "legal", medical: true, recreational: true,
    rules: "First country to fully legalize (2013). Residents 18+ can buy up to 40g/month at pharmacies, join cannabis clubs, or grow 6 plants — after registering with the state. Sales to tourists are not permitted.",
    updated: "2026-01-30",
    cities: [
      { slug: "montevideo", name: "Montevideo", guide: "Pharmacy sales for registered residents only. Tourists cannot legally purchase, though possession for personal use is not criminalized." },
    ],
  },
  {
    code: "TH", slug: "thailand", name: "Thailand", flag: "🇹🇭",
    legalStatus: "medical", medical: true, recreational: false,
    rules: "Decriminalized in 2022, then re-regulated: since 2025 cannabis is for medical use with prescription/certification. Thousands of dispensaries remain but recreational sale rules have tightened. Public smoking can incur nuisance fines. Rules continue to evolve — verify before travel.",
    updated: "2026-05-25",
    cities: [
      { slug: "bangkok", name: "Bangkok", guide: "Dispensaries operate under medical-certification rules. Carry documentation; avoid public consumption. Regulations shifting — check current status on arrival." },
    ],
  },
  {
    code: "ES", slug: "spain", name: "Spain", flag: "🇪🇸",
    legalStatus: "decriminalized", medical: false, recreational: false,
    rules: "Private use and cultivation decriminalized. Cannabis social clubs (asociaciones cannábicas) operate in a legal gray zone, especially in Catalonia and the Basque Country. Public possession/consumption fined. No commercial sale.",
    updated: "2026-02-14",
    cities: [
      { slug: "barcelona", name: "Barcelona", guide: "Europe's club capital: 200+ private cannabis associations. Membership required (often sponsor + fee); tourists join via referral. Never consume in public — fines up to €600." },
    ],
  },
  {
    code: "PT", slug: "portugal", name: "Portugal", flag: "🇵🇹",
    legalStatus: "decriminalized", medical: true, recreational: false,
    rules: "All drugs decriminalized for personal use since 2001 (up to 25g herb). Possession is an administrative offense, not a crime. Medical cannabis legal since 2018. Sale and trafficking remain criminal.",
    updated: "2026-01-10",
    cities: [
      { slug: "lisbon", name: "Lisbon", guide: "No legal retail — decriminalization ≠ legalization. Street offers are common and almost always fake or illegal. Medical patients access via pharmacies." },
    ],
  },
  {
    code: "MX", slug: "mexico", name: "Mexico", flag: "🇲🇽",
    legalStatus: "decriminalized", medical: true, recreational: false,
    rules: "Supreme Court declared prohibition of personal use unconstitutional (2021). Possession up to 5g decriminalized; permits for personal use/grow obtainable. Full regulated commercial market still pending in Congress.",
    updated: "2026-03-05",
    cities: [
      { slug: "mexico-city", name: "Mexico City", guide: "Tolerated consumption spaces exist; no licensed retail yet. Carry no more than 5g. Avoid consumption near police or federal buildings." },
    ],
  },
  {
    code: "ZA", slug: "south-africa", name: "South Africa", flag: "🇿🇦",
    legalStatus: "legal", medical: true, recreational: true,
    rules: "Private adult use, possession, and cultivation legalized (Constitutional Court 2018; Cannabis for Private Purposes Act 2024). No commercial recreational sale yet. Public use remains prohibited.",
    updated: "2026-02-28",
    cities: [
      { slug: "cape-town", name: "Cape Town", guide: "Private clubs and 'grow clubs' operate in a gray zone. Consume only in private residences. Durban Poison's homeland heritage runs deep here." },
    ],
  },
  {
    code: "GB", slug: "united-kingdom", name: "United Kingdom", flag: "🇬🇧",
    legalStatus: "medical", medical: true, recreational: false,
    rules: "Class B drug: possession up to 5 years, though small amounts often get warnings/on-the-spot fines. Medical cannabis legal since 2018 but NHS access is extremely limited; most patients use private clinics.",
    updated: "2026-04-02",
    cities: [
      { slug: "london", name: "London", guide: "No legal recreational market. Private medical clinics prescribe to eligible patients. Police discretion varies by borough." },
    ],
  },
  {
    code: "AU", slug: "australia", name: "Australia", flag: "🇦🇺",
    legalStatus: "medical", medical: true, recreational: false,
    rules: "Medical cannabis federally legal since 2016 with fast-growing patient numbers. Recreational: ACT (Canberra) allows possession up to 50g and 2 plants per adult; other states criminalize with diversion programs.",
    updated: "2026-03-18",
    cities: [
      { slug: "canberra", name: "Canberra", guide: "Only Australian jurisdiction with legal personal possession (50g) and home grow (2 plants/person). No retail — supply remains illegal." },
    ],
  },
  {
    code: "JP", slug: "japan", name: "Japan", flag: "🇯🇵",
    legalStatus: "illegal", medical: false, recreational: false,
    rules: "Strictly illegal. 2024 revision criminalized use itself (up to 7 years). CBD products without THC are permitted. Cannabis-derived pharmaceuticals (e.g., Epidiolex) approved for clinical use. Zero tolerance — do not risk it.",
    updated: "2026-01-20",
    cities: [],
  },
  {
    code: "SG", slug: "singapore", name: "Singapore", flag: "🇸🇬",
    legalStatus: "illegal", medical: false, recreational: false,
    rules: "Among the world's harshest laws: possession up to 10 years' prison and caning; trafficking above threshold quantities carries the death penalty. Consumption abroad by citizens/residents is also punishable. Absolute zero tolerance.",
    updated: "2026-01-20",
    cities: [],
  },
  {
    code: "FR", slug: "france", name: "France", flag: "🇫🇷",
    legalStatus: "illegal", medical: true, recreational: false,
    rules: "Illegal; on-the-spot fine (€200) for personal use. Medical cannabis experiment generalized into permanent framework. Despite strict law, France has Europe's highest usage rates.",
    updated: "2026-02-08",
    cities: [],
  },
  {
    code: "CH", slug: "switzerland", name: "Switzerland", flag: "🇨🇭",
    legalStatus: "decriminalized", medical: true, recreational: false,
    rules: "Possession under 10g decriminalized (CHF 100 fine). Low-THC (<1%) cannabis sold legally. Pilot programs in Zurich, Basel, and other cities legally sell regulated cannabis to registered participants — full legalization under parliamentary discussion.",
    updated: "2026-04-22",
    cities: [
      { slug: "zurich", name: "Zurich", guide: "'Züri Can' pilot: registered residents buy regulated cannabis at pharmacies and social clubs. Tourists excluded. Low-THC shops open to all." },
    ],
  },
];

export const getCountry = (slug: string) => countries.find((c) => c.slug === slug);

export const statusLabel: Record<LegalStatus, string> = {
  legal: "Legal",
  medical: "Medical only",
  decriminalized: "Decriminalized",
  illegal: "Illegal",
};
