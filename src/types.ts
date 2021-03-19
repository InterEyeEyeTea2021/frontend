export interface Tender {
  id: number;
  state: string;
  description: string;
  name: string;
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

export interface Bid {
  amount: number;
  shg_id: number;
  tender_id: number;
}
