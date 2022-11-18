interface pets { 
   _id: string,
   petType: string,
   petName: string,
   petAdTitle: string,
   petIssue: string,
   petImage : string    
}

interface AdvertisePlan{
    adPlanId : string,
    adPlanName : string,
    adPlanCategory: string,
    inDays : boolean,
    days : number,
    inHours : boolean,
    hours : number,
    advertisePrice : number,
    advertiseAutoRenewal : {type: Boolean, default: false},
    paid : {type: Boolean, default: false},
    purchasedOn : string,
    purchaseToken : string,
    refunded : {type: string, default: false},
    endTime : string   
}

interface Neighbour {
    name : string,
    contact: string,
    extension : string,
    occupation: string,
    organization: string
}

export interface Ad {
    _id : string
    receiverId : string,
    firstName? : string,
    lastName? : string,
    agencyTitle?: string,
    sponsorTitle?: string,
    ownerType : string,
    gender? : string,
    adTitle: string,
    tagline: string,
    categoryId? : string,
    categoryName?: string,
    description: string,
    country : string,
    state: string,
    city : string,
    zipCode: string,
    area : string,
    address: string,
    contact?: string,
    emergencyContact?: string,
    email?: string,
    lat : number,
    lng : number,
    dob: string,
    age: number,
    neighbours1 : Neighbour, 
    neighbours2: Neighbour,
    adImages : string[],
    adImagesCount: number
    identityImages : string[],
    identityImagesCount: number, 
    adVideo : string,
    petsCount: number,
    pets? : pets[],
    bumbupPlanCheck: boolean,
    bumbupPlan : BumpsTaken,
    advertisePlanCheck : boolean,
    advertisePlan? : AdvertisePlan,
    createdOn: string,
    updatedOn : string,
    publishedOn: string,
    approvedOn: string, //set when admin approves
    rejectedOn : string,
    rejectionCause : string,
    hiddenCause : string,
    adState: string, //or 'published' set when user publishes;
    status: number, //true->visible, false->invisible
    approved : number //0->pending, 1->rejected, 2->pending
}


export interface AgencyAd {
    _id : string
    agencyId : string,
    agencyTitle : string,
    adTitle: string,
    tagline: string,
    description: string,
    country : string,
    state: string,
    city : string,
    zipCode: string,
    area : string,
    address: string,
    contact?: string,
    emergencyContact?: string,
    email?: string,
    lat : number,
    lng : number,
    adImages : string[],
    adImagesCount: number
    adVideo : string,
    bumbupPlanCheck: boolean,
    bumbupPlan : BumpsTaken,
    advertisePlanCheck : boolean,
    advertisePlan? : AdvertisePlan,
    createdOn: string,
    updatedOn : string,
    publishedOn: string,
    approvedOn: string, //set when admin approves
    rejectedOn : string,
    rejectionCause : string,
    hiddenCause : string,
    adState: string, //or 'published' set when user publishes;
    status: number, //true->visible, false->invisible
    approved : number //0->pending, 1->rejected, 2->pending
}



interface BumpsTaken {
    count: number,
    price : number,
    createdOn?: string,
    autoRenewal : boolean,
}

export interface Bumps {
        _id : string,
        count: number,
        price : number,
        status?: boolean,
        createdOn?: string,
        updatedOn? : string
}

export interface category{
    _id : string,
    title: string,
    description: string,
    slug : string,
    image : string,
    status : Boolean
}

export interface ServerResponse {
    status : boolean,
    message: string,
    data? : any;
    code? : any;
}

export interface Contact {
    firstName: string,
    lastName: string,
    age: number,
    dob : string;
    country: string,
    state : string,
    city : string,
    zipCode : string,  
    contact : string,
    emergencyContact : string,
    email : string,
    neighbours1 : Neighbour,
    neighbours2 : Neighbour
  }
export interface AgencyContact {
    agencyTitle: string,
    country: string,
    state : string,
    city : string,
    zipCode : string,  
    contact : string,
    emergencyContact : string,
    email : string,
  }

  export interface Agency {
        agencyTitle : string,
        countryId: string,
        city : string,
        categoryId: string,
        categoryName : string,
        address :string,
        websiteURL : string,
        officePhone : string,
        fax : string,
        email : string,
        serviceContact : string,
        boundaries : string,
        hours : string,
        eligibility : string,
        services : string,
        GST : string,
        howToApply: string,
        fees: number,
        legalStatus: string,
        listingCopyRightTitle: string,
        listingCopyRightURL : string,
        physicalAccess: string,
  }

  export interface Sponsor {
        sponsorTitle : string,
        countryId: string,
        city : string,
        categoryId: string,
        categoryName : string,
        address :string,
        websiteURL : string,
        officePhone : string,
        fax : string,
        email : string,
        serviceContact : string,
        boundaries : string,
        hours : string,
        eligibility : string,
        services : string,
        GST : string,
        howToApply: string,
        fees: number,
        legalStatus: string,
        listingCopyRightTitle: string,
        listingCopyRightURL : string,
        physicalAccess: string,
  }


export interface notifications {
    fromAdmin: string,
    from: string,
    to: string,
    adId: string,
    message: string,
    read: boolean,
    date: string
}