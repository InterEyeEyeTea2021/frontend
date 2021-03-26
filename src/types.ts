export interface Tender {
  id: number;
  state: string;
  description: string;
  name: string;
  plan_uri: string;
  media: {
    uri: string;
    type: string;
  }[];
  milestones: {
    description: string;
    media: {
      uri: string;
      type: string;
    }[];
  }[];
  sme: {
    id: number;
    name: string;
    phone: string;
    profile_image_uri: string;
  };
}

export interface Milestone {
  id: number;
  name: string;
  description: string;
  status: string;
  media: {
    uri: string;
    type: string;
  }[];
}

export interface Fair {
  id: number;
  name: string;
  description: string;
  industry_type: string;
  media: {
    uri: string;
    type: string;
  }[];
  location: string;
  date: string;
  fee: string;
}

export interface Bid {
  id: number;
  amount: number;
  shg_id: number;
  tender_id: number;
}

export interface SHGprofileData {
  shg_id: number;
  name: string;
  phone: string;
  WAContact: string;
  industry_type: string;
  image_uri: string;
  order_size: string;
  prod_capacity: string;
}

export interface Video {
  kind: string;
  videoId: string;
}