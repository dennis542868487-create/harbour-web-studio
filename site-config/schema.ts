import { business } from "./business";
import { faqs } from "./faq";
import { services } from "./services";

export function getLocalBusinessSchema(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${business.siteUrl}/#business`,
    name: business.name,
    description,
    url: `${business.siteUrl}/`,
    telephone: business.phoneE164,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.city,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: business.country,
    },
    areaServed: business.areaServed,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        opens: business.opens,
        closes: business.closes,
      },
    ],
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
      },
      price: service.price.replace("$", "").replace(/,/g, ""),
      priceCurrency: "CAD",
    })),
  };
}

export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
