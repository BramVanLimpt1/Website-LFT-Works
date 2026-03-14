'use client';
import PropTypes from 'prop-types';

import { useRef } from 'react';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import Slider from 'react-slick';

// @project
import { GraphicsCard } from '@/components/cards';
import { ProfileCard4 } from '@/components/cards/profile-card';
import ContainerWrapper from '@/components/ContainerWrapper';
import GraphicsImage from '@/components/GraphicsImage';
import MotionWrapper from '@/components/MotionWrapper';
import SlickArrows from '@/components/SlickArrows';
import Typeset from '@/components/Typeset';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  TESTIMONIAL - 6  ***************************/

export default function Testimonial6({ headingKey, captionKey, testimonials = [] }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const sliderRef = useRef(null);

  const settings = {
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    swipeToSlide: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm + 1,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const slickStyle = {
    overflow: 'hidden',
    '& .slick-list': { overflow: 'hidden' },
    '& .slick-track': { display: 'flex' },
    '& .slick-slide': { height: 'auto', ' > div': { height: 1, px: 0.75 } }
  };
  const boxPadding = { xs: 2, sm: 3, md: 5 };

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <MotionWrapper delay={0.5} duration={0.6}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 4 }}>
            <Typeset {...{ heading: t(headingKey), caption: t(captionKey) }} />
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <SlickArrows sliderRef={sliderRef} />
            </Box>
          </Stack>
        </MotionWrapper>
        <MotionWrapper delay={0.6} duration={0.6}>
          <Stack sx={{ ...slickStyle, gap: { xs: 3, sm: 2 } }}>
            <Slider ref={sliderRef} {...settings}>
              {testimonials.map((testimonial, index) => (
                <GraphicsCard key={index} sx={{ height: 1 }}>
                  <Stack sx={{ gap: { xs: 4, sm: 5, md: 7 }, p: boxPadding }}>
                    {/* Top row: name/role on the left, company logo on the right */}
                    <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
                      <ProfileCard4 name={testimonial.profile?.name} role={t(testimonial.profile?.roleKey)} />
                      {testimonial.image &&
                        (testimonial.companyHref ? (
                          <Link
                            component={NextLink}
                            href={testimonial.companyHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={testimonial.profile?.name}
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <GraphicsImage
                              image={testimonial.image}
                              sx={{ height: { xs: 40, sm: 48 }, width: 'auto', ...testimonial.imageProps?.sx }}
                              cardMediaProps={{ component: 'img', ...testimonial.imageProps?.cardMediaProps }}
                            />
                          </Link>
                        ) : (
                          <GraphicsImage
                            image={testimonial.image}
                            sx={{ height: { xs: 40, sm: 48 }, width: 'auto', ...testimonial.imageProps?.sx }}
                            cardMediaProps={{ component: 'img', ...testimonial.imageProps?.cardMediaProps }}
                          />
                        ))}
                    </Stack>
                    {/* Bottom: quote title + review text */}
                    <Stack sx={{ gap: { xs: 1.5, md: 2 } }}>
                      <Typography variant="h3">{t(testimonial.titleKey)}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{t(testimonial.reviewKey)}</Typography>
                    </Stack>
                  </Stack>
                </GraphicsCard>
              ))}
            </Slider>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <SlickArrows sliderRef={sliderRef} />
            </Box>
          </Stack>
        </MotionWrapper>
      </Stack>
    </ContainerWrapper>
  );
}

Testimonial6.propTypes = {
  headingKey: PropTypes.string,
  captionKey: PropTypes.string,
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      titleKey: PropTypes.string.isRequired,
      reviewKey: PropTypes.string.isRequired,
      image: PropTypes.any,
      imageProps: PropTypes.shape({ sx: PropTypes.object, cardMediaProps: PropTypes.object }),
      companyHref: PropTypes.string,
      profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        roleKey: PropTypes.string.isRequired
      }).isRequired
    })
  )
};
