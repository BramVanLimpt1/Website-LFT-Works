export const heroSlides = [
  {
    image: '/assets/home/hero_1.webp',
    titleKey: 'home.hero.slide.title',
    descriptionKey: 'home.hero.slide.description'
  },
  {
    image: '/assets/home/hero_2.jpg',
    titleKey: 'home.hero.slide.title',
    descriptionKey: 'home.hero.slide.description'
  },
  {
    image: '/assets/home/hero_3.webp',
    titleKey: 'home.hero.slide.title',
    descriptionKey: 'home.hero.slide.description'
  }
];

export const servicesData = {
  headingKey: 'home.services.heading',
  headerAlign: 'center',
  list: [
    {
      icon: 'tabler-cpu',
      titleKey: 'home.services.plcSoftware.title',
      descriptionKey: 'home.services.plcSoftware.description',
      link: {
        href: '/diensten/plc-software',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-plug',
      titleKey: 'home.services.panelenbouw.title',
      descriptionKey: 'home.services.panelenbouw.description',
      link: {
        href: '/diensten/panelenbouw',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-help',
      titleKey: 'home.services.advies.title',
      descriptionKey: 'home.services.advies.description',
      link: {
        href: '/diensten/advies',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-settings',
      titleKey: 'home.services.aandrijvingConfiguratie.title',
      descriptionKey: 'home.services.aandrijvingConfiguratie.description',
      link: {
        href: '/diensten/aandrijving-configuratie',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-refresh',
      titleKey: 'home.services.machineUpgrades.title',
      descriptionKey: 'home.services.machineUpgrades.description',
      link: {
        href: '/diensten/machine-upgrades',
        children: 'common.learnMore'
      }
    },
    {
      icon: 'tabler-rocket',
      titleKey: 'home.services.inbedrijfstelling.title',
      descriptionKey: 'home.services.inbedrijfstelling.description',
      link: {
        href: '/diensten/inbedrijfstelling',
        children: 'common.learnMore'
      }
    }
  ]
};

export const aboutTeaserData = {
  headingKey: 'home.aboutTeaser.heading',
  highlightKey: 'home.aboutTeaser.highlight',
  captionKey: 'home.aboutTeaser.caption',
  image: '/assets/temp/placeholder_person.jpg',
  primaryBtn: {
    href: '/over-ons',
    children: 'home.aboutTeaser.button'
  }
};

export const processData = {
  heading: 'home.process.heading',
  caption: 'home.process.caption',
  cards: [
    {
      title: 'home.process.step1.title',
      description: 'home.process.step1.description',
      icon: 'tabler-search',
      image: '/assets/temp/placeholder.png'
    },
    {
      title: 'home.process.step2.title',
      description: 'home.process.step2.description',
      icon: 'tabler-pencil',
      image: '/assets/temp/placeholder.png'
    },
    {
      title: 'home.process.step3.title',
      description: 'home.process.step3.description',
      icon: 'tabler-code',
      image: '/assets/temp/placeholder.png'
    },
    {
      title: 'home.process.step4.title',
      description: 'home.process.step4.description',
      icon: 'tabler-rocket',
      image: '/assets/temp/placeholder.png'
    }
  ]
};

export const clienteleData = {
  titleKey: 'home.clientele.title',
  clienteleList: [
    { image: '/assets/temp/placeholder.png', sx: { height: 40 } },
    { image: '/assets/temp/placeholder.png', sx: { height: 40 } },
    { image: '/assets/temp/placeholder.png', sx: { height: 40 } },
    { image: '/assets/temp/placeholder.png', sx: { height: 40 } },
    { image: '/assets/temp/placeholder.png', sx: { height: 40 } }
  ]
};

export const testimonialData = {
  headingKey: 'home.testimonials.heading',
  captionKey: 'home.testimonials.caption',
  testimonials: [
    {
      titleKey: 'home.testimonials.t1.title',
      reviewKey: 'home.testimonials.t1.review',
      image: '/assets/companies/imp.png',
      // imageProps overrides the default logo size/style. Examples:
      //   wide logo:   imageProps: { sx: { height: 32, width: 'auto' } }
      //   square logo: imageProps: { sx: { width: 48, height: 48 } }
      //   tall logo:   imageProps: { sx: { height: 56, width: 'auto' } }
      imageProps: { sx: { height: 48, width: 'auto' } },
      companyHref: 'https://imp-automation.nl/',
      profile: { name: 'Pieter van den Berg', roleKey: 'home.testimonials.t1.role' }
    },
    {
      titleKey: 'home.testimonials.t2.title',
      reviewKey: 'home.testimonials.t2.review',
      image: '/assets/temp/placeholder.png',
      companyHref: 'https://example.com',
      profile: { name: 'Hanne Mulder', roleKey: 'home.testimonials.t2.role' }
    },
    {
      titleKey: 'home.testimonials.t3.title',
      reviewKey: 'home.testimonials.t3.review',
      image: '/assets/temp/placeholder.png',
      companyHref: 'https://example.com',
      profile: { name: 'Ruud Smits', roleKey: 'home.testimonials.t3.role' }
    },
    {
      titleKey: 'home.testimonials.t4.title',
      reviewKey: 'home.testimonials.t4.review',
      image: '/assets/temp/placeholder.png',
      companyHref: 'https://example.com',
      profile: { name: 'Lisa Bergmans', roleKey: 'home.testimonials.t4.role' }
    }
  ]
};

export const ctaData = {
  headingKey: 'home.cta.heading',
  primaryBtn: {
    children: 'home.cta.button',
    href: '/contact'
  }
};
