import mongoose from "mongoose";

const { Schema } = mongoose;
// here is udpate
const campaignSchema = new Schema(
  {
    currentSwitch: {
      type: Boolean,
    },
    pageID: {
      type: String,
    },
    campaingname: {
      type: String,
    },
    campainglink: {
      type: String,
    },
    adname: {
      type: String,
    },
    Delivery: {
      type: String,
    },
    Bidstrategy: {
      type: String,
    },
    Budget: {
      type: Number,
    },
    Attributionsetting: {
      type: String,
    },
    Results: {
      type: Number,
    },
    Reach: {
      type: Number,
    },
    Impressions: {
      type: Number,
    },
    Costperresult: {
      type: Number,
    },
    Amountspent: {
      type: Number,
    },
    Ends: {
      type: String,
    },
    campaingImage: {
      type: String,
    },
    entryDate: {
      type: String,
    },
    lastSignificent: {
      type: String,
    },
    schedule: {
      type: String,
    },
    qualityRanking: {
      type: String,
    },
    engagementrateranking: {
      type: String,
    },
    conversionrateranking: {
      type: String,
    },
    quoteheading: {
      type: String,
    },
    quotetext: {
      type: String,
    },
    frequency: {
      type: Number,
    },
    //Below i add new fields
    CPM: {
      type: Number,
    },
    LinksClicks: {
      type: Number,
    },
    CPC: {
      type: Number,
    },
    CTR: {
      type: Number,
    },
    clicksAll: {
      type: Number,
    },
    CTRALL: {
      type: Number,
    },
    CPCAll: {
      type: Number,
    },
    //delvieryfields
    Costperthousandcentreaccounts: {
      type: Number,
    },
    CPMCostperthousandimpressions: {
      type: Number,
    },
    //Engagement
    PageEngagement: {
      type: Number,
    },
    PostReactions: {
      type: Number,
    },
    PostComments: {
      type: Number,
    },
    PostSaves: {
      type: Number,
    },
    PostShares: {
      type: Number,
    },
    PostLinkCliks: {
      type: Number,
    },
    Postfollowslikes: {
      type: Number,
    },
    PostCPClinkClick: {
      type: Number,
    },
    // Newly added fields
    twosecondvideoplay: {
      type: Number,
    },
    costpertwosecondvideoplay: {
      type: Number,
    },
    threesecondvideoplay: {
      type: Number,
    },
    costperthreesecondvideoplay: {
      type: Number,
    },
    thruplays: {
      type: Number,
    },
    costperthruplay: {
      type: Number,
    },
    videoplaytwentyfivepercent: {
      type: Number,
    },
    videoplayfiftypercent: {
      type: Number,
    },
    videoplayseventyfivepercent: {
      type: Number,
    },
    videoplayninetyfivepercent: {
      type: Number,
    },
    videoplayhundredpercent: {
      type: Number,
    },
    // adName: {
    //   type: String,
    // },
    // pageName: {
    //   type: String,
    // },
    // campaignID: {
    //   type: String,
    // },
    // adSetID: {
    //   type: String,
    // },
    // adID: {
    //   type: String,
    // },
    // pageID: {
    //   type: String,
    // },
    // adCreative: {
    //   type: String,
    // },
    // day: {
    //   type: String,
    // },
    // week: {
    //   type: String,
    // },
    // twoWeeks: {
    //   type: String,
    // },
    // month: {
    //   type: String,
    // },
    // age: {
    //   type: String,
    // },
    // gender: {
    //   type: String,
    // },
    // businessLocations: {
    //   type: String,
    // },
    // country: {
    //   type: String,
    // },
    // region: {
    //   type: String,
    // },
    // dmaRegion: {
    //   type: String,
    // },
    // impressionDevice: {
    //   type: String,
    // },
    // platform: {
    //   type: String,
    // },
    // placement: {
    //   type: String,
    // },
    // devicePlatform: {
    //   type: String,
    // },
    // productID: {
    //   type: String,
    // },
    // audienceSegments: {
    //   type: String,
    // },
    // timeOfDayAdAccountTimeZone: {
    //   type: String,
    // },
    // timeOfDayViewerTimeZone: {
    //   type: String,
    // },
    // messagingPurchaseSource: {
    //   type: String,
    // },
    // conversionDevice: {
    //   type: String,
    // },
    // postReactionType: {
    //   type: String,
    // },
    // destination: {
    //   type: String,
    // },
    // videoViewType: {
    //   type: String,
    // },
    // videoSound: {
    //   type: String,
    // },
    // carouselCard: {
    //   type: String,
    // },
    // instantExperienceComponent: {
    //   type: String,
    // },
    // categoryOnsite: {
    //   type: String,
    // },
    // brandOnsite: {
    //   type: String,
    // },
    // objective: {
    //   type: String,
    // },
    // imageVideoAndSlideshow: {
    //   type: String,
    // },
    // callToAction: {
    //   type: String,
    // },
    // description: {
    //   type: String,
    // },
    // headlineAdSettings: {
    //   type: String,
    // },
    // text: {
    //   type: String,
    // },
    // websiteURL: {
    //   type: String,
    // },
    // amountSpent: {
    //   type: String,
    // },
    // impressions: {
    //   type: String,
    // },
    // reach: {
    //   type: String,
    // },
    // results: {
    //   type: String,
    // },
    // costPerResult: {
    //   type: String,
    // },
    // delivery: {
    //   type: String,
    // },
    // frequency: {
    //   type: String,
    // },
    // linkClicks: {
    //   type: String,
    // },
    // cpcCostPerLinkClick: {
    //   type: String,
    // },
    // cpmCostPerThousandImpressions: {
    //   type: String,
    // },
    // ctrAll: {
    //   type: String,
    // },
    // resultRate: {
    //   type: String,
    // },
    // clicksAll: {
    //   type: String,
    // },
    // cpcAll: {
    //   type: String,
    // },
    // grossImpressionsIncludesInvalidImpressionsFromNonHumanTraffic: {
    //   type: String,
    // },
    // autoRefreshImpressions: {
    //   type: String,
    // },
    // attributionSetting: {
    //   type: String,
    // },
    // averagePurchasesConversionValue: {
    //   type: String,
    // },
    // qualityRanking: {
    //   type: String,
    // },
    // engagementRateRanking: {
    //   type: String,
    // },
    // conversionRateRanking: {
    //   type: String,
    // },
    // costPerThousandAccountsCentreAccountsReached: {
    //   type: String,
    // },
    // adDelivery: {
    //   type: String,
    // },
    // adSetDelivery: {
    //   type: String,
    // },
    // campaignDelivery: {
    //   type: String,
    // },
    // engagement: {
    //   type: String,
    // },
    // pageEngagement: {
    //   type: String,
    // },
    // followsOrLikes: {
    //   type: String,
    // },
    // joinGroupRequests: {
    //   type: String,
    // },
    // postComments: {
    //   type: String,
    // },
    // postEngagements: {
    //   type: String,
    // },
    // postReactions: {
    //   type: String,
    // },
    // postSaves: {
    //   type: String,
    // },
    // postShares: {
    //   type: String,
    // },
    // photoViews: {
    //   type: String,
    // },
    // eventResponses: {
    //   type: String,
    // },
    // checkIns: {
    //   type: String,
    // },
    // effectShare: {
    //   type: String,
    // },
    // costPerPageEngagement: {
    //   type: String,
    // },
    // costPerFollowOrLike: {
    //   type: String,
    // },
    // costPerJoinGroupRequest: {
    //   type: String,
    // },
    // costPerPostEngagement: {
    //   type: String,
    // },
    // costPerEventResponse: {
    //   type: String,
    // },
    // estimatedCallConfirmationClicks: {
    //   type: String,
    // },
    // callbackRequestsSubmitted: {
    //   type: String,
    // },
    // messengerCallsPlaced: {
    //   type: String,
    // },
    // twentySecondMessengerCalls: {
    //   type: String,
    // },
    // sixtySecondMessengerCalls: {
    //   type: String,
    // },
    // newMessagingContacts: {
    //   type: String,
    // },
    // blocks: {
    //   type: String,
    // },
    // messagingConversationsStarted: {
    //   type: String,
    // },
    // messagingSubscriptions: {
    //   type: String,
    // },
    // welcomeMessageViews: {
    //   type: String,
    // },
    // messagingConversationsReplied: {
    //   type: String,
    // },
    // costPerNewMessagingContact: {
    //   type: String,
    // },
    // costPerMessagingConversationStarted: {
    //   type: String,
    // },
    // costPerMessagingSubscription: {
    //   type: String,
    // },
    // uniqueTwoSecondContinuousVideoPlays: {
    //   type: String,
    // },
    // twoSecondContinuousVideoPlays: {
    //   type: String,
    // },
    // threeSecondVideoPlays: {
    //   type: String,
    // },
    // thruPlays: {
    //   type: String,
    // },
    // videoPlaysAt25Percent: {
    //   type: String,
    // },
    // videoPlaysAt50Percent: {
    //   type: String,
    // },
    // videoPlaysAt75Percent: {
    //   type: String,
    // },
    // videoPlaysAt95Percent: {
    //   type: String,
    // },
    // videoPlaysAt100Percent: {
    //   type: String,
    // },
    // videoAveragePlayTime: {
    //   type: String,
    // },
    // videoPlays: {
    //   type: String,
    // },
    // instantExperienceViewTime: {
    //   type: String,
    // },
    // instantExperienceViewPercentage: {
    //   type: String,
    // },
    // instantExperienceImpressions: {
    //   type: String,
    // },
    // instantExperienceReach: {
    //   type: String,
    // },
    // costPerTwoSecondContinuousVideoPlay: {
    //   type: String,
    // },
    // costPerThreeSecondVideoPlay: {
    //   type: String,
    // },
    // costPerThruPlay: {
    //   type: String,
    // },
    // uniqueLinkClicks: {
    //   type: String,
    // },
    // outboundClicks: {
    //   type: String,
    // },
    // uniqueOutboundClicks: {
    //   type: String,
    // },
    // ctrLinkClickThroughRate: {
    //   type: String,
    // },
    // uniqueCtrLinkClickThroughRate: {
    //   type: String,
    // },
    // outboundCtrClickThroughRate: {
    //   type: String,
    // },
    // uniqueOutboundCtrClickThroughRate: {
    //   type: String,
    // },
    // uniqueClicksAll: {
    //   type: String,
    // },
    // uniqueCtrAll: {
    //   type: String,
    // },
    // instantExperienceClicksToOpen: {
    //   type: String,
    // },
    // instantExperienceClicksToStart: {
    //   type: String,
    // },
    // instantExperienceOutboundClicks: {
    //   type: String,
    // },
    // netRemindersOn: {
    //   type: String,
    // },
    // instagramProfileVisits: {
    //   type: String,
    // },
    // costPerUniqueLinkClick: {
    //   type: String,
    // },
    // costPerOutboundClick: {
    //   type: String,
    // },
    // costPerUniqueOutboundClick: {
    //   type: String,
    // },
    // costPerUniqueClickAll: {
    //   type: String,
    // },
    // estimatedAdRecallLiftPeople: {
    //   type: String,
    // },
    // estimatedAdRecallLiftRate: {
    //   type: String,
    // },
    // costPerEstimatedAdRecallLiftPeople: {
    //   type: String,
    // },
    // achievementsUnlocked: {
    //   type: String,
    // },
    // costPerAchievementUnlocked: {
    //   type: String,
    // },
    // achievementsUnlockedConversionValue: {
    //   type: String,
    // },
    // uniqueAchievementsUnlocked: {
    //   type: String,
    // },
    // costPerUniqueAchievementUnlocked: {
    //   type: String,
    // },
    // addsOfPaymentInfo: {
    //   type: String,
    // },
    // costPerAddOfPaymentInfo: {
    //   type: String,
    // },
    // addsOfPaymentInfoConversionValue: {
    //   type: String,
    // },
    // uniqueAddsOfPaymentInfo: {
    //   type: String,
    // },
    // costPerUniqueAddOfPaymentInfo: {
    //   type: String,
    // },
    // addsToCart: {
    //   type: String,
    // },
    // costPerAddToCart: {
    //   type: String,
    // },
    // addsToCartConversionValue: {
    //   type: String,
    // },
    // uniqueAddsToCart: {
    //   type: String,
    // },
    // costPerUniqueAddToCart: {
    //   type: String,
    // },
    // addsToWishlist: {
    //   type: String,
    // },
    // costPerAddToWishlist: {
    //   type: String,
    // },
    // addsToWishlistConversionValue: {
    //   type: String,
    // },
    // uniqueAddsToWishlist: {
    //   type: String,
    // },
    // costPerUniqueAddToWishlist: {
    //   type: String,
    // },
    // appActivations: {
    //   type: String,
    // },
    // costPerAppActivation: {
    //   type: String,
    // },
    // appActivationsConversionValue: {
    //   type: String,
    // },
    // uniqueAppActivations: {
    //   type: String,
    // },
    // costPerUniqueAppActivation: {
    //   type: String,
    // },
    // appInstalls: {
    //   type: String,
    // },
    // costPerAppInstall: {
    //   type: String,
    // },
    // applicationsSubmitted: {
    //   type: String,
    // },
    // costPerApplicationSubmitted: {
    //   type: String,
    // },
    // submitApplicationConversionValue: {
    //   type: String,
    // },
    // appointmentsScheduled: {
    //   type: String,
    // },
    // costPerAppointmentScheduled: {
    //   type: String,
    // },
    // appointmentsScheduledConversionValue: {
    //   type: String,
    // },
    // checkoutsInitiated: {
    //   type: String,
    // },
    // costPerCheckoutInitiated: {
    //   type: String,
    // },
    // checkoutsInitiatedConversionValue: {
    //   type: String,
    // },
    // uniqueCheckoutsInitiated: {
    //   type: String,
    // },
    // costPerUniqueCheckoutInitiated: {
    //   type: String,
    // },
    // contacts: {
    //   type: String,
    // },
    // costPerContact: {
    //   type: String,
    // },
    // contactConversionValue: {
    //   type: String,
    // },
    // contentViews: {
    //   type: String,
    // },
    // costPerContentView: {
    //   type: String,
    // },
    // contentViewsConversionValue: {
    //   type: String,
    // },
    // uniqueContentViews: {
    //   type: String,
    // },
    // costPerUniqueContentView: {
    //   type: String,
    // },
    // creditSpends: {
    //   type: String,
    // },
    // costPerCreditSpend: {
    //   type: String,
    // },
    // creditSpendsConversionValue: {
    //   type: String,
    // },
    // uniqueCreditSpends: {
    //   type: String,
    // },
    // costPerUniqueCreditSpend: {
    //   type: String,
    // },
    // customEvents: {
    //   type: String,
    // },
    // costPerCustomEvent: {
    //   type: String,
    // },
    // desktopAppEngagements: {
    //   type: String,
    // },
    // costPerDesktopAppEngagement: {
    //   type: String,
    // },
    // desktopAppStoryEngagements: {
    //   type: String,
    // },
    // costPerDesktopAppStoryEngagement: {
    //   type: String,
    // },
    // desktopAppUses: {
    //   type: String,
    // },
    // costPerDesktopAppUse: {
    //   type: String,
    // },
    // donationROAS: {
    //   type: String,
    // },
    // donations: {
    //   type: String,
    // },
    // costPerDonation: {
    //   type: String,
    // },
    // donateConversionValue: {
    //   type: String,
    // },
    // gamePlays: {
    //   type: String,
    // },
    // costPerGamePlay: {
    //   type: String,
    // },
    // getDirectionsClicks: {
    //   type: String,
    // },
    // inAppAdClicks: {
    //   type: String,
    // },
    // costPerInAppAdClick: {
    //   type: String,
    // },
    // inAppAdImpressions: {
    //   type: String,
    // },
    // costPerThousandInAppAdImpressions: {
    //   type: String,
    // },
    // landingPageViews: {
    //   type: String,
    // },
    // costPerLandingPageView: {
    //   type: String,
    // },
    // uniqueLandingPageViews: {
    //   type: String,
    // },
    // costPerUniqueLandingPageView: {
    //   type: String,
    // },
    // leads: {
    //   type: String,
    // },
    // costPerLead: {
    //   type: String,
    // },
    // leadsConversionValue: {
    //   type: String,
    // },
    // levelsAchieved: {
    //   type: String,
    // },
    // costPerLevelAchieved: {
    //   type: String,
    // },
    // levelsAchievedConversionValue: {
    //   type: String,
    // },
    // uniqueLevelsCompleted: {
    //   type: String,
    // },
    // costPerUniqueLevelAchieved: {
    //   type: String,
    // },
    // locationSearches: {
    //   type: String,
    // },
    // costPerLocationSearch: {
    //   type: String,
    // },
    // locationSearchConversionValue: {
    //   type: String,
    // },
    // metaWorkflowCompletions: {
    //   type: String,
    // },
    // costPerMetaWorkflowCompletion: {
    //   type: String,
    // },
    // metaWorkflowCompletionConversionValue: {
    //   type: String,
    // },
    // mobileAppDay2Retention: {
    //   type: String,
    // },
    // costPerMobileAppDay2Retention: {
    //   type: String,
    // },
    // uniqueMobileAppDay2Retention: {
    //   type: String,
    // },
    // costPerUniqueMobileAppDay2Retention: {
    //   type: String,
    // },
    // mobileAppDay7Retention: {
    //   type: String,
    // },
    // costPerMobileAppDay7Retention: {
    //   type: String,
    // },
    // uniqueMobileAppDay7Retention: {
    //   type: String,
    // },
    // costPerUniqueMobileAppDay7Retention: {
    //   type: String,
    // },
    // ordersCreated: {
    //   type: String,
    // },
    // ordersDispatched: {
    //   type: String,
    // },
    // otherOfflineConversions: {
    //   type: String,
    // },
    // costPerOtherOfflineConversion: {
    //   type: String,
    // },
    // otherOfflineConversionValue: {
    //   type: String,
    // },
    // phoneNumberClicks: {
    //   type: String,
    // },
    // productsCustomised: {
    //   type: String,
    // },
    // costPerProductCustomised: {
    //   type: String,
    // },
    // customiseProductConversionValue: {
    //   type: String,
    // },
    // purchaseROAS: {
    //   type: String,
    // },
    // purchases: {
    //   type: String,
    // },
    // costPerPurchase: {
    //   type: String,
    // },
    // purchasesConversionValue: {
    //   type: String,
    // },
    // uniquePurchases: {
    //   type: String,
    // },
    // costPerUniquePurchase: {
    //   type: String,
    // },
    // ratingsSubmitted: {
    //   type: String,
    // },
    // costPerRatingSubmitted: {
    //   type: String,
    // },
    // ratingsSubmittedConversionValue: {
    //   type: String,
    // },
    // uniqueRatingsSubmitted: {
    //   type: String,
    // },
    // costPerUniqueRatingSubmitted: {
    //   type: String,
    // },
    // registrationsCompleted: {
    //   type: String,
    // },
    // costPerRegistrationCompleted: {
    //   type: String,
    // },
    // registrationsCompletedConversionValue: {
    //   type: String,
    // },
    // uniqueRegistrationsCompleted: {
    //   type: String,
    // },
    // costPerUniqueRegistrationCompleted: {
    //   type: String,
    // },
    // searches: {
    //   type: String,
    // },
    // costPerSearch: {
    //   type: String,
    // },
    // searchesConversionValue: {
    //   type: String,
    // },
    // addsToStoreFavourites: {
    //   type: String,
    // },
    // costPerAddToStoreFavourites: {
    //   type: String,
    // },
    // storeFavouritesConversionValue: {
    //   type: String,
    // },
    // subscriptionsInitiated: {
    //   type: String,
    // },
    // costPerSubscriptionInitiated: {
    //   type: String,
    // },
    // subscriptionsInitiatedConversionValue: {
    //   type: String,
    // },
    // successfulPurchasesConversionValue: {
    //   type: String,
    // },
    // successfulSales: {
    //   type: String,
    // },
    // testDrivesInitiated: {
    //   type: String,
    // },
    // trialsStarted: {
    //   type: String,
    // },
    // costPerTrialStarted: {
    //   type: String,
    // },
    // trialsStartedConversionValue: {
    //   type: String,
    // },
    // tutorialCompletions: {
    //   type: String,
    // },
    // costPerTutorialCompletion: {
    //   type: String,
    // },
    // viewContentConversionValue: {
    //   type: String,
    // },
    // websitePurchasesConversionValue: {
    //   type: String,
    // },
    // websiteSalesConversionValue: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("NewCampaign", campaignSchema);

// usama here usmaa here
//second time is here now
