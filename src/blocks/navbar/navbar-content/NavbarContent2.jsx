'use client';
import PropTypes from 'prop-types';

// @mui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// @project
import branding from '@/branding.json';
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import ContainerWrapper from '@/components/ContainerWrapper';
import LogoSection from '@/components/logo';
import { Customization, Localization, MenuPopper, NavMenu, NavMenuDrawer, NavPrimaryButton, NavSecondaryButton } from '@/components/navbar';
import SvgIcon from '@/components/SvgIcon';

/***************************  NAVBAR - CONTENT 2  ***************************/

export default function NavbarContent2({ navItems, primaryBtn, secondaryBtn, customization }) {
  const theme = useTheme();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5, pl: { xs: 0.5, sm: 1 } }}>
        <LogoSection
          isIcon={true}
          sx={{ '& .icon-logo': { width: { xs: 36, sm: 44, md: 48 } }, '& img': { width: '100%', height: 'auto' } }}
        />
        <Typography variant="h6" sx={{ fontWeight: 500, letterSpacing: 0.5, color: 'text.primary' }}>
          {branding.brandName}
        </Typography>
      </Stack>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
        {!downMD && navItems && (
          <Box sx={{ flexGrow: 1 }}>
            <NavMenu {...{ navItems }} />
          </Box>
        )}
        <Stack direction="row" sx={{ gap: { xs: 1, md: 1.5 } }}>
          {!downMD && <Customization showThemeToggle={true} showDirectionToggle={false} showLanguageSelector={true} />}
          {downMD && (
            <Box sx={{ flexGrow: 1, ...(!navItems && downMD && { display: { xs: 'flex', sm: 'none' } }) }}>
              <MenuPopper
                offset={downSM ? 12 : 28}
                toggleProps={{
                  children: <SvgIcon name="tabler-menu-2" color="text.primary" />,
                  color: 'inherit',
                  sx: { minWidth: 40, width: 40, height: 40, p: 0 }
                }}
              >
                <ContainerWrapper>
                  {navItems && (
                    <>
                      <Box sx={{ mx: -2 }}>
                        <NavMenuDrawer {...{ navItems }} />
                      </Box>
                      {downSM && <Divider />}
                    </>
                  )}
                  {downSM && (
                    <Stack direction="row" sx={{ justifyContent: 'space-between', gap: { xs: 1, md: 1.5 }, py: 2.5, width: 1 }}>
                      <Localization fullWidth />
                      {secondaryBtn && <NavSecondaryButton {...secondaryBtn} fullWidth />}
                      {primaryBtn && (
                        <ButtonAnimationWrapper style={{ width: '100%' }}>
                          <NavPrimaryButton {...primaryBtn} fullWidth />
                        </ButtonAnimationWrapper>
                      )}
                    </Stack>
                  )}
                </ContainerWrapper>
              </MenuPopper>
            </Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

NavbarContent2.propTypes = {
  navItems: PropTypes.any,
  primaryBtn: PropTypes.any,
  secondaryBtn: PropTypes.any,
  customization: PropTypes.any
};
