export interface Profile {
  fraud_calls_count?: number,
  id_tool_types?: string[],
  initial_date?: string,
  is_platform?: boolean,
  keys?: { public: string, private: string }, 
  profile?: { first_name: string, last_name: string, email: string, phone: string, platform: string },
  samples_count?: number,
  status?: { is_unapproved: boolean, has_bad_status: boolean, messages: string[] },
  total_calls_count?: number
}
