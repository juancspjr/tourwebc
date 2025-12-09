import cristoImage from "@assets/generated_images/cristo_redentor_statue.webp";
import favelaImage from "@assets/generated_images/colorful_rio_favela.webp";
import beachImage from "@assets/generated_images/copacabana_beach_rio.webp";
import trekkingImage from "@assets/generated_images/dois_irmaos_trekking.webp";
import boatImage from "@assets/generated_images/ilha_grande_paradise.webp";
import yachtImage from "@assets/generated_images/vip_yacht_rio.webp";
import helicopterImage from "@assets/generated_images/helicopter_tour_rio.webp";

import rio1 from "@assets/rio_1_1764736349812.webp";
import rio2 from "@assets/rio_2_1764736349812.webp";
import rio4 from "@assets/rio_4_1764736349812.webp";
import rioV1 from "@assets/riov_1-1_1764736349812.webp";

import daytourCarnaval from "@assets/daytour_carnaval_sambadrome.webp";
import daytourCatedral from "@assets/daytour_catedral_metropolitana.webp";
import daytourCristoVista from "@assets/daytour_cristo_redentor_vista.webp";
import daytourFavelaVidigal from "@assets/daytour_favela_vidigal.webp";
import daytourMorroUrca from "@assets/daytour_morro_urca_sunset.webp";
import daytourVistaCorcovado from "@assets/daytour_vista_corcovado.webp";
import daytourRioNoturno from "@assets/daytour_rio_noturno_mirante.webp";
import daytourAmanhecer from "@assets/daytour_amanhecer_pedra_bonita.webp";

import favela1 from "@assets/favela1_1764736538872.webp";
import favela3 from "@assets/favela3_1764736538872.webp";
import favela4 from "@assets/favela4_1764736538872.webp";
import favela5 from "@assets/favela5_1764995992345.webp";
import favela6 from "@assets/favela6_1764995992347.webp";

import playaAtardecerLeblon from "@assets/playa_atardecer_leblon.webp";
import playaBuggyArraial from "@assets/playa_buggy_arraial.webp";
import playa2 from "@assets/playa2_1764991730825.webp";
import playa3 from "@assets/playa3_1764991730825.webp";
import playa4 from "@assets/playa4_1764991730825.webp";
import playa5 from "@assets/playa5_1764992092315.webp";
import playa6 from "@assets/playa6_1764992092315.webp";

import trekking1 from "@assets/trekking1_1764989191591.webp";

import trekkingPedra1Left from "@assets/trekking_pedra1_left.webp";
import trekkingPedra1Right from "@assets/trekking_pedra1_right.webp";
import trekkingPedra2Left from "@assets/trekking_pedra2_left.webp";
import trekkingPedra2Right from "@assets/trekking_pedra2_right.webp";
import trekkingVista1Left from "@assets/trekking_vista1_left.webp";
import trekkingVista1Right from "@assets/trekking_vista1_right.webp";
import trekkingVista2Left from "@assets/trekking_vista2_left.webp";
import trekkingVista2Right from "@assets/trekking_vista2_right.webp";

import barco1 from "@assets/PaseosBarco1_1764759429302.webp";
import barco2 from "@assets/PaseosBarco2_1764759429302.webp";
import barco3 from "@assets/PaseosBarco3_1764759429302.webp";
import barco4 from "@assets/PaseosBarco4_1764759429302.webp";
import barco5 from "@assets/PaseosBarco5_1764759429302.webp";
import barco6 from "@assets/barco6_1764997173256.webp";

import yate1 from "@assets/YateVIP1_1764759541668.webp";
import yate2 from "@assets/YateVIP2_1764759541668.webp";
import yate3 from "@assets/YateVIP3_1764759541668.webp";
import yate4 from "@assets/YateVIP4_1764759541668.webp";
import yate5 from "@assets/YateVIP5_1764759541668.webp";

import heli1 from "@assets/Helicóptero1_1764759625353.webp";
import heli2 from "@assets/Helicóptero2_1764759625353.webp";
import heli3 from "@assets/Helicóptero3_1764759625353.webp";
import heli4 from "@assets/Helicóptero4_1764759625353.webp";
import heli5 from "@assets/Helicóptero5_1764759625353.webp";

export interface FAQ {
  questionKey: string;
  answerKey: string;
}

export interface PackageIncludes {
  titleKey: string;
  itemKeys: string[];
}

export interface PackageData {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  images: string[];
  gallery: string[];
  price: number;
  priceNoteKey?: string;
  durationKey: string;
  locationKeys: string[];
  highlightKeys: string[];
  category: string;
  badgeKey?: string;
  rating?: number;
  includes: PackageIncludes[];
  faqs: FAQ[];
}

export const categoryKeys = [
  "all",
  "cityTour",
  "culture",
  "beach",
  "adventure",
  "water",
  "vip",
] as const;

export type CategoryKey = typeof categoryKeys[number];

export const categories: CategoryKey[] = [
  "all",
  "cityTour",
  "culture",
  "beach",
  "adventure",
  "water",
  "vip",
];

export interface GeneralInfoPaymentMethod {
  nameKey: string;
  icon: string;
}

export interface GeneralInfoCurrency {
  nameKey: string;
  countryKey: string;
  primary: boolean;
}

export interface GeneralInfoFAQ {
  questionKey: string;
  answerKey: string;
}

export const generalInfo = {
  paymentMethods: {
    titleKey: "generalInfo.paymentMethods.title",
    methods: [
      { nameKey: "generalInfo.paymentMethods.methods.0", icon: "pix" },
      { nameKey: "generalInfo.paymentMethods.methods.1", icon: "credit-card" },
      { nameKey: "generalInfo.paymentMethods.methods.2", icon: "bank" },
      { nameKey: "generalInfo.paymentMethods.methods.3", icon: "cash" },
      { nameKey: "generalInfo.paymentMethods.methods.4", icon: "paypal" },
      { nameKey: "generalInfo.paymentMethods.methods.5", icon: "bitcoin" },
    ]
  },
  visaInfo: {
    titleKey: "generalInfo.visaInfo.title",
    descriptionKey: "generalInfo.visaInfo.description",
    contactNoteKey: "generalInfo.visaInfo.contactNote",
  },
  prohibitedActivities: {
    titleKey: "generalInfo.prohibitedActivities.title",
    descriptionKey: "generalInfo.prohibitedActivities.description",
    itemKeys: [
      "generalInfo.prohibitedActivities.items.0",
      "generalInfo.prohibitedActivities.items.1",
      "generalInfo.prohibitedActivities.items.2",
      "generalInfo.prohibitedActivities.items.3",
      "generalInfo.prohibitedActivities.items.4"
    ]
  },
  currency: {
    titleKey: "generalInfo.currency.title",
    descriptionKey: "generalInfo.currency.description",
    currencies: [
      { nameKey: "generalInfo.currency.currencies.0.name", countryKey: "generalInfo.currency.currencies.0.country", primary: true },
      { nameKey: "generalInfo.currency.currencies.1.name", countryKey: "generalInfo.currency.currencies.1.country", primary: false },
      { nameKey: "generalInfo.currency.currencies.2.name", countryKey: "generalInfo.currency.currencies.2.country", primary: false },
      { nameKey: "generalInfo.currency.currencies.3.name", countryKey: "generalInfo.currency.currencies.3.country", primary: false }
    ]
  },
  generalFaqs: [
    { questionKey: "generalInfo.faqs.0.question", answerKey: "generalInfo.faqs.0.answer" },
    { questionKey: "generalInfo.faqs.1.question", answerKey: "generalInfo.faqs.1.answer" },
    { questionKey: "generalInfo.faqs.2.question", answerKey: "generalInfo.faqs.2.answer" },
    { questionKey: "generalInfo.faqs.3.question", answerKey: "generalInfo.faqs.3.answer" },
    { questionKey: "generalInfo.faqs.4.question", answerKey: "generalInfo.faqs.4.answer" },
    { questionKey: "generalInfo.faqs.5.question", answerKey: "generalInfo.faqs.5.answer" },
    { questionKey: "generalInfo.faqs.6.question", answerKey: "generalInfo.faqs.6.answer" },
    { questionKey: "generalInfo.faqs.7.question", answerKey: "generalInfo.faqs.7.answer" }
  ]
};

export const packages: PackageData[] = [
  {
    id: "day-tour",
    titleKey: "tourPackages.dayTour.title",
    descriptionKey: "tourPackages.dayTour.description",
    image: cristoImage,
    images: [cristoImage, daytourCarnaval, daytourCatedral, daytourCristoVista, daytourFavelaVidigal, daytourMorroUrca, daytourVistaCorcovado, daytourRioNoturno, daytourAmanhecer],
    gallery: [daytourCarnaval, daytourCatedral, daytourCristoVista, daytourFavelaVidigal, daytourMorroUrca, daytourVistaCorcovado, daytourRioNoturno, daytourAmanhecer],
    price: 100,
    durationKey: "tourPackages.dayTour.duration",
    locationKeys: [
      "tourPackages.dayTour.locations.0",
      "tourPackages.dayTour.locations.1",
      "tourPackages.dayTour.locations.2",
      "tourPackages.dayTour.locations.3",
      "tourPackages.dayTour.locations.4",
      "tourPackages.dayTour.locations.5"
    ],
    highlightKeys: [
      "tourPackages.dayTour.highlights.0",
      "tourPackages.dayTour.highlights.1",
      "tourPackages.dayTour.highlights.2"
    ],
    category: "cityTour",
    badgeKey: "tourPackages.badges.mostPopular",
    rating: 4.9,
    includes: [
      {
        titleKey: "tourPackages.dayTour.includes.transport.title",
        itemKeys: [
          "tourPackages.dayTour.includes.transport.items.0",
          "tourPackages.dayTour.includes.transport.items.1",
          "tourPackages.dayTour.includes.transport.items.2"
        ]
      },
      {
        titleKey: "tourPackages.dayTour.includes.guide.title",
        itemKeys: [
          "tourPackages.dayTour.includes.guide.items.0",
          "tourPackages.dayTour.includes.guide.items.1",
          "tourPackages.dayTour.includes.guide.items.2"
        ]
      },
      {
        titleKey: "tourPackages.dayTour.includes.tickets.title",
        itemKeys: [
          "tourPackages.dayTour.includes.tickets.items.0",
          "tourPackages.dayTour.includes.tickets.items.1",
          "tourPackages.dayTour.includes.tickets.items.2"
        ]
      },
      {
        titleKey: "tourPackages.dayTour.includes.extras.title",
        itemKeys: [
          "tourPackages.dayTour.includes.extras.items.0",
          "tourPackages.dayTour.includes.extras.items.1",
          "tourPackages.dayTour.includes.extras.items.2"
        ]
      }
    ],
    faqs: [
      { questionKey: "tourPackages.dayTour.faqs.0.question", answerKey: "tourPackages.dayTour.faqs.0.answer" },
      { questionKey: "tourPackages.dayTour.faqs.1.question", answerKey: "tourPackages.dayTour.faqs.1.answer" },
      { questionKey: "tourPackages.dayTour.faqs.2.question", answerKey: "tourPackages.dayTour.faqs.2.answer" },
      { questionKey: "tourPackages.dayTour.faqs.3.question", answerKey: "tourPackages.dayTour.faqs.3.answer" },
      { questionKey: "tourPackages.dayTour.faqs.4.question", answerKey: "tourPackages.dayTour.faqs.4.answer" }
    ]
  },
  {
    id: "favelas-tour",
    titleKey: "tourPackages.favelasTour.title",
    descriptionKey: "tourPackages.favelasTour.description",
    image: favelaImage,
    images: [favelaImage, favela6, favela1, favela3, favela4, favela5],
    gallery: [favela6, favela1, favela3, favela4, favela5],
    price: 35,
    durationKey: "tourPackages.favelasTour.duration",
    locationKeys: [
      "tourPackages.favelasTour.locations.0",
      "tourPackages.favelasTour.locations.1",
      "tourPackages.favelasTour.locations.2",
      "tourPackages.favelasTour.locations.3"
    ],
    highlightKeys: [
      "tourPackages.favelasTour.highlights.0",
      "tourPackages.favelasTour.highlights.1",
      "tourPackages.favelasTour.highlights.2"
    ],
    category: "culture",
    rating: 4.8,
    includes: [
      {
        titleKey: "tourPackages.favelasTour.includes.transport.title",
        itemKeys: [
          "tourPackages.favelasTour.includes.transport.items.0",
          "tourPackages.favelasTour.includes.transport.items.1",
          "tourPackages.favelasTour.includes.transport.items.2"
        ]
      },
      {
        titleKey: "tourPackages.favelasTour.includes.guide.title",
        itemKeys: [
          "tourPackages.favelasTour.includes.guide.items.0",
          "tourPackages.favelasTour.includes.guide.items.1",
          "tourPackages.favelasTour.includes.guide.items.2"
        ]
      },
      {
        titleKey: "tourPackages.favelasTour.includes.experiences.title",
        itemKeys: [
          "tourPackages.favelasTour.includes.experiences.items.0",
          "tourPackages.favelasTour.includes.experiences.items.1",
          "tourPackages.favelasTour.includes.experiences.items.2",
          "tourPackages.favelasTour.includes.experiences.items.3"
        ]
      },
      {
        titleKey: "tourPackages.favelasTour.includes.social.title",
        itemKeys: [
          "tourPackages.favelasTour.includes.social.items.0",
          "tourPackages.favelasTour.includes.social.items.1",
          "tourPackages.favelasTour.includes.social.items.2"
        ]
      }
    ],
    faqs: [
      { questionKey: "tourPackages.favelasTour.faqs.0.question", answerKey: "tourPackages.favelasTour.faqs.0.answer" },
      { questionKey: "tourPackages.favelasTour.faqs.1.question", answerKey: "tourPackages.favelasTour.faqs.1.answer" },
      { questionKey: "tourPackages.favelasTour.faqs.2.question", answerKey: "tourPackages.favelasTour.faqs.2.answer" },
      { questionKey: "tourPackages.favelasTour.faqs.3.question", answerKey: "tourPackages.favelasTour.faqs.3.answer" },
      { questionKey: "tourPackages.favelasTour.faqs.4.question", answerKey: "tourPackages.favelasTour.faqs.4.answer" }
    ]
  },
  {
    id: "playas-tour",
    titleKey: "tourPackages.playasTour.title",
    descriptionKey: "tourPackages.playasTour.description",
    image: beachImage,
    images: [beachImage, playaAtardecerLeblon, playaBuggyArraial, playa2, playa3, playa4, playa5, playa6],
    gallery: [playaAtardecerLeblon, playaBuggyArraial, playa2, playa3, playa4, playa5, playa6],
    price: 80,
    durationKey: "tourPackages.playasTour.duration",
    locationKeys: [
      "tourPackages.playasTour.locations.0",
      "tourPackages.playasTour.locations.1",
      "tourPackages.playasTour.locations.2",
      "tourPackages.playasTour.locations.3",
      "tourPackages.playasTour.locations.4"
    ],
    highlightKeys: [
      "tourPackages.playasTour.highlights.0",
      "tourPackages.playasTour.highlights.1",
      "tourPackages.playasTour.highlights.2",
      "tourPackages.playasTour.highlights.3"
    ],
    category: "beach",
    rating: 4.7,
    includes: [
      {
        titleKey: "tourPackages.playasTour.includes.transport.title",
        itemKeys: [
          "tourPackages.playasTour.includes.transport.items.0",
          "tourPackages.playasTour.includes.transport.items.1",
          "tourPackages.playasTour.includes.transport.items.2"
        ]
      },
      {
        titleKey: "tourPackages.playasTour.includes.beachTime.title",
        itemKeys: [
          "tourPackages.playasTour.includes.beachTime.items.0",
          "tourPackages.playasTour.includes.beachTime.items.1",
          "tourPackages.playasTour.includes.beachTime.items.2"
        ]
      },
      {
        titleKey: "tourPackages.playasTour.includes.included.title",
        itemKeys: [
          "tourPackages.playasTour.includes.included.items.0",
          "tourPackages.playasTour.includes.included.items.1",
          "tourPackages.playasTour.includes.included.items.2",
          "tourPackages.playasTour.includes.included.items.3"
        ]
      },
      {
        titleKey: "tourPackages.playasTour.includes.optional.title",
        itemKeys: [
          "tourPackages.playasTour.includes.optional.items.0",
          "tourPackages.playasTour.includes.optional.items.1",
          "tourPackages.playasTour.includes.optional.items.2"
        ]
      }
    ],
    faqs: [
      { questionKey: "tourPackages.playasTour.faqs.0.question", answerKey: "tourPackages.playasTour.faqs.0.answer" },
      { questionKey: "tourPackages.playasTour.faqs.1.question", answerKey: "tourPackages.playasTour.faqs.1.answer" },
      { questionKey: "tourPackages.playasTour.faqs.2.question", answerKey: "tourPackages.playasTour.faqs.2.answer" },
      { questionKey: "tourPackages.playasTour.faqs.3.question", answerKey: "tourPackages.playasTour.faqs.3.answer" },
      { questionKey: "tourPackages.playasTour.faqs.4.question", answerKey: "tourPackages.playasTour.faqs.4.answer" }
    ]
  },
  {
    id: "trekking",
    titleKey: "tourPackages.trekking.title",
    descriptionKey: "tourPackages.trekking.description",
    image: trekkingImage,
    images: [trekkingImage, trekking1, trekkingPedra1Left, trekkingPedra1Right, trekkingPedra2Left, trekkingPedra2Right, trekkingVista1Left, trekkingVista1Right, trekkingVista2Left, trekkingVista2Right],
    gallery: [trekking1, trekkingPedra1Left, trekkingPedra1Right, trekkingPedra2Left, trekkingPedra2Right, trekkingVista1Left, trekkingVista1Right, trekkingVista2Left, trekkingVista2Right],
    price: 50,
    priceNoteKey: "tourPackages.trekking.priceNote",
    durationKey: "tourPackages.trekking.duration",
    locationKeys: [
      "tourPackages.trekking.locations.0",
      "tourPackages.trekking.locations.1",
      "tourPackages.trekking.locations.2",
      "tourPackages.trekking.locations.3"
    ],
    highlightKeys: [
      "tourPackages.trekking.highlights.0",
      "tourPackages.trekking.highlights.1",
      "tourPackages.trekking.highlights.2"
    ],
    category: "adventure",
    badgeKey: "tourPackages.badges.adventure",
    rating: 4.9,
    includes: [
      {
        titleKey: "tourPackages.trekking.includes.transport.title",
        itemKeys: [
          "tourPackages.trekking.includes.transport.items.0",
          "tourPackages.trekking.includes.transport.items.1",
          "tourPackages.trekking.includes.transport.items.2"
        ]
      },
      {
        titleKey: "tourPackages.trekking.includes.safety.title",
        itemKeys: [
          "tourPackages.trekking.includes.safety.items.0",
          "tourPackages.trekking.includes.safety.items.1",
          "tourPackages.trekking.includes.safety.items.2",
          "tourPackages.trekking.includes.safety.items.3"
        ]
      },
      {
        titleKey: "tourPackages.trekking.includes.included.title",
        itemKeys: [
          "tourPackages.trekking.includes.included.items.0",
          "tourPackages.trekking.includes.included.items.1",
          "tourPackages.trekking.includes.included.items.2",
          "tourPackages.trekking.includes.included.items.3"
        ]
      },
      {
        titleKey: "tourPackages.trekking.includes.kit.title",
        itemKeys: [
          "tourPackages.trekking.includes.kit.items.0",
          "tourPackages.trekking.includes.kit.items.1",
          "tourPackages.trekking.includes.kit.items.2"
        ]
      }
    ],
    faqs: [
      { questionKey: "tourPackages.trekking.faqs.0.question", answerKey: "tourPackages.trekking.faqs.0.answer" },
      { questionKey: "tourPackages.trekking.faqs.1.question", answerKey: "tourPackages.trekking.faqs.1.answer" },
      { questionKey: "tourPackages.trekking.faqs.2.question", answerKey: "tourPackages.trekking.faqs.2.answer" },
      { questionKey: "tourPackages.trekking.faqs.3.question", answerKey: "tourPackages.trekking.faqs.3.answer" },
      { questionKey: "tourPackages.trekking.faqs.4.question", answerKey: "tourPackages.trekking.faqs.4.answer" }
    ]
  },
  {
    id: "boat-tour",
    titleKey: "tourPackages.boatTour.title",
    descriptionKey: "tourPackages.boatTour.description",
    image: boatImage,
    images: [boatImage, barco6, barco1, barco2, barco3, barco4, barco5],
    gallery: [barco6, barco1, barco2, barco3, barco4, barco5],
    price: 70,
    durationKey: "tourPackages.boatTour.duration",
    locationKeys: [
      "tourPackages.boatTour.locations.0",
      "tourPackages.boatTour.locations.1",
      "tourPackages.boatTour.locations.2"
    ],
    highlightKeys: [
      "tourPackages.boatTour.highlights.0",
      "tourPackages.boatTour.highlights.1",
      "tourPackages.boatTour.highlights.2"
    ],
    category: "water",
    rating: 4.8,
    includes: [
      {
        titleKey: "tourPackages.boatTour.includes.transport.title",
        itemKeys: [
          "tourPackages.boatTour.includes.transport.items.0",
          "tourPackages.boatTour.includes.transport.items.1",
          "tourPackages.boatTour.includes.transport.items.2"
        ]
      },
      {
        titleKey: "tourPackages.boatTour.includes.nautical.title",
        itemKeys: [
          "tourPackages.boatTour.includes.nautical.items.0",
          "tourPackages.boatTour.includes.nautical.items.1",
          "tourPackages.boatTour.includes.nautical.items.2"
        ]
      },
      {
        titleKey: "tourPackages.boatTour.includes.onboard.title",
        itemKeys: [
          "tourPackages.boatTour.includes.onboard.items.0",
          "tourPackages.boatTour.includes.onboard.items.1",
          "tourPackages.boatTour.includes.onboard.items.2"
        ]
      },
      {
        titleKey: "tourPackages.boatTour.includes.safety.title",
        itemKeys: [
          "tourPackages.boatTour.includes.safety.items.0",
          "tourPackages.boatTour.includes.safety.items.1",
          "tourPackages.boatTour.includes.safety.items.2"
        ]
      }
    ],
    faqs: [
      { questionKey: "tourPackages.boatTour.faqs.0.question", answerKey: "tourPackages.boatTour.faqs.0.answer" },
      { questionKey: "tourPackages.boatTour.faqs.1.question", answerKey: "tourPackages.boatTour.faqs.1.answer" },
      { questionKey: "tourPackages.boatTour.faqs.2.question", answerKey: "tourPackages.boatTour.faqs.2.answer" },
      { questionKey: "tourPackages.boatTour.faqs.3.question", answerKey: "tourPackages.boatTour.faqs.3.answer" },
      { questionKey: "tourPackages.boatTour.faqs.4.question", answerKey: "tourPackages.boatTour.faqs.4.answer" }
    ]
  },
  {
    id: "yacht-vip",
    titleKey: "tourPackages.yachtVip.title",
    descriptionKey: "tourPackages.yachtVip.description",
    image: yachtImage,
    images: [yachtImage, yate1, yate2, yate3, yate4, yate5],
    gallery: [yate1, yate2, yate3, yate4, yate5],
    price: 200,
    priceNoteKey: "tourPackages.yachtVip.priceNote",
    durationKey: "tourPackages.yachtVip.duration",
    locationKeys: [
      "tourPackages.yachtVip.locations.0",
      "tourPackages.yachtVip.locations.1",
      "tourPackages.yachtVip.locations.2",
      "tourPackages.yachtVip.locations.3"
    ],
    highlightKeys: [
      "tourPackages.yachtVip.highlights.0",
      "tourPackages.yachtVip.highlights.1",
      "tourPackages.yachtVip.highlights.2"
    ],
    category: "vip",
    badgeKey: "tourPackages.badges.exclusive",
    rating: 5.0,
    includes: [
      {
        titleKey: "tourPackages.yachtVip.includes.yacht.title",
        itemKeys: [
          "tourPackages.yachtVip.includes.yacht.items.0",
          "tourPackages.yachtVip.includes.yacht.items.1",
          "tourPackages.yachtVip.includes.yacht.items.2",
          "tourPackages.yachtVip.includes.yacht.items.3"
        ]
      },
      {
        titleKey: "tourPackages.yachtVip.includes.crew.title",
        itemKeys: [
          "tourPackages.yachtVip.includes.crew.items.0",
          "tourPackages.yachtVip.includes.crew.items.1",
          "tourPackages.yachtVip.includes.crew.items.2",
          "tourPackages.yachtVip.includes.crew.items.3"
        ]
      },
      {
        titleKey: "tourPackages.yachtVip.includes.included.title",
        itemKeys: [
          "tourPackages.yachtVip.includes.included.items.0",
          "tourPackages.yachtVip.includes.included.items.1",
          "tourPackages.yachtVip.includes.included.items.2",
          "tourPackages.yachtVip.includes.included.items.3"
        ]
      },
      {
        titleKey: "tourPackages.yachtVip.includes.extras.title",
        itemKeys: [
          "tourPackages.yachtVip.includes.extras.items.0",
          "tourPackages.yachtVip.includes.extras.items.1",
          "tourPackages.yachtVip.includes.extras.items.2",
          "tourPackages.yachtVip.includes.extras.items.3"
        ]
      }
    ],
    faqs: [
      { questionKey: "tourPackages.yachtVip.faqs.0.question", answerKey: "tourPackages.yachtVip.faqs.0.answer" },
      { questionKey: "tourPackages.yachtVip.faqs.1.question", answerKey: "tourPackages.yachtVip.faqs.1.answer" },
      { questionKey: "tourPackages.yachtVip.faqs.2.question", answerKey: "tourPackages.yachtVip.faqs.2.answer" },
      { questionKey: "tourPackages.yachtVip.faqs.3.question", answerKey: "tourPackages.yachtVip.faqs.3.answer" },
      { questionKey: "tourPackages.yachtVip.faqs.4.question", answerKey: "tourPackages.yachtVip.faqs.4.answer" }
    ]
  },
  {
    id: "helicopter",
    titleKey: "tourPackages.helicopter.title",
    descriptionKey: "tourPackages.helicopter.description",
    image: helicopterImage,
    images: [helicopterImage, heli1, heli2, heli3, heli4, heli5],
    gallery: [heli1, heli2, heli3, heli4, heli5],
    price: 180,
    priceNoteKey: "tourPackages.helicopter.priceNote",
    durationKey: "tourPackages.helicopter.duration",
    locationKeys: [
      "tourPackages.helicopter.locations.0",
      "tourPackages.helicopter.locations.1",
      "tourPackages.helicopter.locations.2",
      "tourPackages.helicopter.locations.3",
      "tourPackages.helicopter.locations.4"
    ],
    highlightKeys: [
      "tourPackages.helicopter.highlights.0",
      "tourPackages.helicopter.highlights.1",
      "tourPackages.helicopter.highlights.2"
    ],
    category: "vip",
    badgeKey: "tourPackages.badges.premium",
    rating: 5.0,
    includes: [
      {
        titleKey: "tourPackages.helicopter.includes.flight.title",
        itemKeys: [
          "tourPackages.helicopter.includes.flight.items.0",
          "tourPackages.helicopter.includes.flight.items.1",
          "tourPackages.helicopter.includes.flight.items.2",
          "tourPackages.helicopter.includes.flight.items.3"
        ]
      },
      {
        titleKey: "tourPackages.helicopter.includes.routes.title",
        itemKeys: [
          "tourPackages.helicopter.includes.routes.items.0",
          "tourPackages.helicopter.includes.routes.items.1",
          "tourPackages.helicopter.includes.routes.items.2"
        ]
      },
      {
        titleKey: "tourPackages.helicopter.includes.multimedia.title",
        itemKeys: [
          "tourPackages.helicopter.includes.multimedia.items.0",
          "tourPackages.helicopter.includes.multimedia.items.1",
          "tourPackages.helicopter.includes.multimedia.items.2",
          "tourPackages.helicopter.includes.multimedia.items.3"
        ]
      },
      {
        titleKey: "tourPackages.helicopter.includes.extras.title",
        itemKeys: [
          "tourPackages.helicopter.includes.extras.items.0",
          "tourPackages.helicopter.includes.extras.items.1",
          "tourPackages.helicopter.includes.extras.items.2"
        ]
      }
    ],
    faqs: [
      { questionKey: "tourPackages.helicopter.faqs.0.question", answerKey: "tourPackages.helicopter.faqs.0.answer" },
      { questionKey: "tourPackages.helicopter.faqs.1.question", answerKey: "tourPackages.helicopter.faqs.1.answer" },
      { questionKey: "tourPackages.helicopter.faqs.2.question", answerKey: "tourPackages.helicopter.faqs.2.answer" },
      { questionKey: "tourPackages.helicopter.faqs.3.question", answerKey: "tourPackages.helicopter.faqs.3.answer" },
      { questionKey: "tourPackages.helicopter.faqs.4.question", answerKey: "tourPackages.helicopter.faqs.4.answer" }
    ]
  },
];

export function getPackageById(id: string): PackageData | undefined {
  return packages.find(pkg => pkg.id === id);
}

export function getPackageByTitle(titleKey: string): PackageData | undefined {
  return packages.find(pkg => pkg.titleKey === titleKey);
}

export interface TestimonialData {
  id: string;
  nameKey: string;
  dateKey: string;
  rating: number;
  textKey: string;
  tourKey: string;
}

export const testimonials: TestimonialData[] = [
  {
    id: "1",
    nameKey: "testimonials.items.1.name",
    dateKey: "testimonials.items.1.date",
    rating: 5,
    textKey: "testimonials.items.1.text",
    tourKey: "testimonials.items.1.tour",
  },
  {
    id: "2",
    nameKey: "testimonials.items.2.name",
    dateKey: "testimonials.items.2.date",
    rating: 5,
    textKey: "testimonials.items.2.text",
    tourKey: "testimonials.items.2.tour",
  },
  {
    id: "3",
    nameKey: "testimonials.items.3.name",
    dateKey: "testimonials.items.3.date",
    rating: 5,
    textKey: "testimonials.items.3.text",
    tourKey: "testimonials.items.3.tour",
  },
  {
    id: "4",
    nameKey: "testimonials.items.4.name",
    dateKey: "testimonials.items.4.date",
    rating: 5,
    textKey: "testimonials.items.4.text",
    tourKey: "testimonials.items.4.tour",
  },
  {
    id: "5",
    nameKey: "testimonials.items.5.name",
    dateKey: "testimonials.items.5.date",
    rating: 5,
    textKey: "testimonials.items.5.text",
    tourKey: "testimonials.items.5.tour",
  },
  {
    id: "6",
    nameKey: "testimonials.items.6.name",
    dateKey: "testimonials.items.6.date",
    rating: 5,
    textKey: "testimonials.items.6.text",
    tourKey: "testimonials.items.6.tour",
  },
  {
    id: "7",
    nameKey: "testimonials.items.7.name",
    dateKey: "testimonials.items.7.date",
    rating: 5,
    textKey: "testimonials.items.7.text",
    tourKey: "testimonials.items.7.tour",
  },
  {
    id: "8",
    nameKey: "testimonials.items.8.name",
    dateKey: "testimonials.items.8.date",
    rating: 5,
    textKey: "testimonials.items.8.text",
    tourKey: "testimonials.items.8.tour",
  },
  {
    id: "9",
    nameKey: "testimonials.items.9.name",
    dateKey: "testimonials.items.9.date",
    rating: 5,
    textKey: "testimonials.items.9.text",
    tourKey: "testimonials.items.9.tour",
  },
  {
    id: "10",
    nameKey: "testimonials.items.10.name",
    dateKey: "testimonials.items.10.date",
    rating: 5,
    textKey: "testimonials.items.10.text",
    tourKey: "testimonials.items.10.tour",
  },
  {
    id: "11",
    nameKey: "testimonials.items.11.name",
    dateKey: "testimonials.items.11.date",
    rating: 5,
    textKey: "testimonials.items.11.text",
    tourKey: "testimonials.items.11.tour",
  },
  {
    id: "12",
    nameKey: "testimonials.items.12.name",
    dateKey: "testimonials.items.12.date",
    rating: 5,
    textKey: "testimonials.items.12.text",
    tourKey: "testimonials.items.12.tour",
  },
  {
    id: "13",
    nameKey: "testimonials.items.13.name",
    dateKey: "testimonials.items.13.date",
    rating: 5,
    textKey: "testimonials.items.13.text",
    tourKey: "testimonials.items.13.tour",
  },
];
