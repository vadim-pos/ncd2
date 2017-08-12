export interface ChartsData {
  charts_data?: {
    [type: string]: {
      age: { calls_count: number, values: {'18-30': number, '31-64': number, '65+': number}, allowed: boolean },
      education: { calls_count: number, values: {'HIGH SCHOOL': number, 'COLLEGE': number, 'GRAD SCHOOL': number}, allowed: boolean },
      gender: { calls_count: number, values: {Male: number, Female: number}, allowed: boolean },
      has_kids: { calls_count: number, values: {has_kids: number}, allowed: boolean },
      married: { calls_count: number, values: {Single: number, Married: number}, allowed: boolean },
      tech_savvy: { calls_count: number, values: {tech_savvy: number}, allowed: boolean },
      wealthy: { calls_count: number, values: {wealthy: number}, allowed: boolean }
    }
  }
}
