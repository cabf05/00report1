export interface CompanyData {
  companyName: string;
  logo: string;
  location: string;
  locationImage: string;
  marketInfo: string;
  companyDescription: string;
  companyStrengths: string[];
  kpis: {
    name: string;
    value: string;
  }[];
  revenueData: {
    historical: {
      year: string;
      value: number;
    }[];
    projected: {
      year: string;
      value: number;
    }[];
  };
  ebitdaData: {
    historical: {
      year: string;
      value: number;
    }[];
    projected: {
      year: string;
      value: number;
    }[];
  };
  transactionObjective: string;
  transactionSuggestions: string[];
}

export interface Template {
  id: string;
  name: string;
  bank: string;
  thumbnailUrl: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
}