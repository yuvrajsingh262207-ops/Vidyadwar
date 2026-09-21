export type ConditionStatus = "MATCH" | "FAIL" | "REVIEW" | "NOT_AVAILABLE";
export type StageStatus = "Compatible" | "Review" | "Conflict" | "Not Determined";

export interface User { id: string; full_name: string; email: string }
export interface Profile {
  user_id: string; full_name: string; course: string; branch: string; year: string; marks: number; state: string;
  category: string; gender: string; disability_status: string; annual_income: number; income_certificate: boolean;
  receiving_scholarship: boolean; receiving_stipend: boolean; other_benefit: boolean;
}
export interface Condition { key: string; label: string; required: string; status: ConditionStatus; student_value: string; explanation: string }
export interface Evidence { source_name: string; source_url: string; rule_text: string; clause?: string | null; date_checked: string; verification_status: "Verified" | "Needs Review" | "Demo Rule" | "Unavailable" }
export interface ScholarshipRule { course: string; minimum_marks: number; income_limit: number; state?: string | null; category?: string | null; important_condition: string }
export interface Scholarship { id: string; name: string; short_description: string; provider: string; rule: ScholarshipRule; required_documents: string[]; deadline: string; official_source: string; official_url: string; restrictions: string; evidence: Evidence; conflict_rules: Array<Record<string, string>>; demo_record: boolean }
export interface EligibilityResult { scholarship: Scholarship; conditions: Condition[]; overall_status: "ELIGIBLE" | "REVIEW" | "NOT_ELIGIBLE"; documents_ready: number; documents_total: number; next_action: string }
export interface StudentDocument { id: string; name: string; type: string; available: boolean; required_for: string[]; updated_at?: string | null; extracted_value?: string | null; extraction_status: "Verified" | "Manual review" | "Not uploaded" }
export interface StageResult { id: string; label: string; status: StageStatus; summary: string; why: string; evidence?: Evidence | null }
export interface ConflictAnalysis { id: string; student_name: string; scholarship_a: Scholarship; scholarship_b: Scholarship; stages: StageResult[]; overall_status: StageStatus; recommendation: string; disclaimer: string }
export interface TrackingItem { scholarship_id: string; scholarship_name: string; stage: string; updated_at?: string | null }
export interface Dashboard { profile: Profile; scholarships: EligibilityResult[]; documents: StudentDocument[]; tracking: TrackingItem[]; next_actions: string[]; matched_count: number; eligible_count: number; review_count: number; action_count: number; documents_ready: number; documents_total: number }
export interface AuthResponse { user: User; profile: Profile; demo_mode: boolean }
export interface Readiness { eligibility_checked: boolean; documents_ready: number; documents_total: number; compatibility_reviewed: boolean; official_evidence_available: boolean; overall_status: string; message: string; missing_documents: string[] }
export interface ActionItem { id: string; title: string; description: string; priority: string; done: boolean }
export interface ActionPlan { actions: ActionItem[]; student_name: string }