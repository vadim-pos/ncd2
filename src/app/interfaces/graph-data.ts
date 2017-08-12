export interface GraphData {
  available_types?: string[],
  range_report?: {
    [date: string]: {
      phone?: { requests_count?: number, paid_count?: number, successful_count?: number }
    }
  }
}
