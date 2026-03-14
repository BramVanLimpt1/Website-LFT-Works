'use client';
import PropTypes from 'prop-types';

// @next
import NextLink from 'next/link';

// @mui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import { GraphicsCard } from '@/components/cards';
import ContainerWrapper from '@/components/ContainerWrapper';
import { Copyright } from '@/components/footer';
import LogoSection from '@/components/logo';
import MotionWrapper from '@/components/MotionWrapper';
import SvgIcon from '@/components/SvgIcon';

import useTranslation from '@/hooks/useTranslation';

import { CopyrightType, IconType } from '@/enum';

import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  FOOTER 3 - INFO ITEM  ***************************/

function InfoItem({ labelKey, icon, value, href }) {
  const { t } = useTranslation();

  const itemContent = (
    <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center' }}>
      <Stack sx={{ gap: 0, alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, lineHeight: 1 }}>
          {t(labelKey)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, lineHeight: 1.4 }}>
          {value}
        </Typography>
      </Stack>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SvgIcon name={icon} color="text.secondary" size={20} />
      </Box>
    </Stack>
  );

  if (href) {
    return (
      <Link
        component={NextLink}
        href={href}
        sx={{
          textDecoration: 'none',
          display: 'block',
          '&:hover': {
            '& .MuiTypography-root:last-child': { color: 'primary.main' }
          }
        }}
      >
        {itemContent}
      </Link>
    );
  }

  return itemContent;
}

/***************************  FOOTER - 3  ***************************/

export default function Footer3({ logo, logoTextKey, socialLinks = [], infoItems = [], copyrightType = 'TYPE1' }) {
  const { t } = useTranslation();
  const theme = useTheme();

  const logoEl =
    logo?.light && logo?.dark ? (
      <NextLink href="/" aria-label="logo">
        <CardMedia
          component="img"
          src={theme.palette.mode === 'dark' ? logo.dark : logo.light}
          alt="logo"
          sx={{ width: { xs: 112, lg: 140 }, cursor: 'pointer' }}
          loading="lazy"
        />
      </NextLink>
    ) : (
      <LogoSection />
    );

  const logoFollowContent = (
    <Stack
      sx={{ alignItems: { xs: 'center', md: 'flex-start' }, justifyContent: 'space-between', gap: 4, height: 1, pb: { xs: 2.5, md: 0 } }}
    >
      <Stack spacing={1.75} sx={{ alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>
        {logoEl}
        {logoTextKey && (
          <Typography variant="body2" sx={{ maxWidth: 280 }}>
            {t(logoTextKey)}
          </Typography>
        )}
      </Stack>
      {socialLinks.length > 0 && (
        <Stack sx={{ alignItems: { xs: 'center', md: 'flex-start' }, gap: 1.5 }}>
          <Typography variant="h4">{t('footer.followUsOn')}</Typography>
          <Stack direction="row" sx={{ gap: { xs: 0.5, sm: 1.5 } }}>
            {socialLinks.map((item, index) => (
              <Link
                key={index}
                component={NextLink}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                sx={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: 'grey.200',
                    width: { xs: 40, sm: 52, lg: 56 },
                    height: { xs: 40, sm: 52, lg: 56 },
                    borderRadius: 3,
                    ':hover': { bgcolor: 'grey.300' }
                  }}
                >
                  <SvgIcon type={IconType.FILL} name={item.icon} />
                </Avatar>
              </Link>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <MotionWrapper delay={0.4} duration={0.4}>
        <GraphicsCard id="footer-3" role="contentinfo" aria-label="Footer 3">
          <Box sx={{ padding: { xs: 2.5, sm: 3, md: 4 } }}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>{logoFollowContent}</Grid>
              {infoItems.length > 0 && (
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack sx={{ gap: 2.5, justifyContent: 'center', alignItems: { xs: 'center', md: 'flex-end' }, height: 1 }}>
                    {infoItems.map((item, index) => (
                      <InfoItem key={index} {...item} />
                    ))}
                  </Stack>
                </Grid>
              )}
              <Grid size={12}>
                <Divider />
              </Grid>
              <Grid size={12}>
                <Stack sx={{ alignItems: 'center' }}>
                  <Copyright type={CopyrightType[copyrightType]} />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </GraphicsCard>
      </MotionWrapper>
    </ContainerWrapper>
  );
}

Footer3.propTypes = {
  logo: PropTypes.shape({ light: PropTypes.string, dark: PropTypes.string }),
  logoTextKey: PropTypes.string,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  infoItems: PropTypes.arrayOf(
    PropTypes.shape({
      labelKey: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      href: PropTypes.string
    })
  ),
  copyrightType: PropTypes.string
};
