import { CompanyData } from '../types';

export const defaultCompanyData: CompanyData = {
  companyName: "EcoWind Services",
  logo: "",
  location: "Brazil",
  locationImage: "https://images.pexels.com/photos/2310713/pexels-photo-2310713.jpeg",
  marketInfo: "The Brazilian wind energy market has grown by 15% annually over the last five years, with installed capacity reaching 17.5 GW. Northeast Brazil accounts for 80% of all wind farms, with significant growth expected in offshore installations by 2030.",
  companyDescription: "EcoWind Services is a leading provider of maintenance solutions for wind farms across Brazil. Founded in 2010, the company has established itself as a trusted partner for both onshore and offshore wind installations, serving over 40% of Brazil's operational wind farms.",
  companyStrengths: [
    "Proprietary predictive maintenance technology reducing downtime by 35%",
    "Specialized drone inspection capabilities for hard-to-reach turbine components",
    "Certified technicians with 50,000+ hours of combined experience",
    "Strategic partnerships with major turbine manufacturers"
  ],
  kpis: [
    { name: "Market Share", value: "42%" },
    { name: "Annual Growth", value: "22%" },
    { name: "Customer Retention", value: "96%" },
    { name: "Service Contracts", value: "215" }
  ],
  revenueData: {
    historical: [
      { year: "2021", value: 42 },
      { year: "2022", value: 58 },
      { year: "2023", value: 73 },
      { year: "2024", value: 92 }
    ],
    projected: [
      { year: "2025", value: 115 },
      { year: "2026", value: 140 },
      { year: "2027", value: 168 }
    ]
  },
  ebitdaData: {
    historical: [
      { year: "2021", value: 12 },
      { year: "2022", value: 18 },
      { year: "2023", value: 24 },
      { year: "2024", value: 31 }
    ],
    projected: [
      { year: "2025", value: 39 },
      { year: "2026", value: 48 },
      { year: "2027", value: 58 }
    ]
  },
  transactionObjective: "EcoWind Services is seeking strategic investment to expand its operational capacity and develop new proprietary maintenance technologies for the growing offshore wind market in Brazil.",
  transactionSuggestions: [
    "Partial acquisition (30-49%) by strategic partner",
    "Full acquisition by industry leader seeking Brazilian market entry",
    "Private equity investment to fund 3-year expansion plan",
    "Joint venture with complementary renewable service provider"
  ]
};