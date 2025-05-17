export interface LoyaltyTransaction {
  id: number;
  account_id: number;
  points: number;
  transaction_type: string; // earn, spend
  source: string; // purchase, activity, referral, bonus
  reference_id?: string;
  created_at: string;
}

export interface LoyaltyAccount {
  id: number;
  user_id: number;
  level: string; // basic, silver, gold, platinum, vip
  points: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
  transactions: LoyaltyTransaction[];
}

export interface LoyaltyReward {
  id: number;
  name: string;
  description?: string;
  points_required: number;
  reward_type: string; // discount, service, product, exclusive
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
