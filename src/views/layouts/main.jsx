'use client';
import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';

// @project
import { Footer3 } from '@/blocks/footer';
import { Navbar2 } from '@/blocks/navbar';
import { NavbarContent2 } from '@/blocks/navbar/navbar-content';

// @data
import { useNavbarData } from './data/navbar';

import { footerData } from './data';

/***************************  LAYOUT - MAIN  ***************************/

export default function MainLayout({ children }) {
  const navbarData = useNavbarData();

  return (
    <>
      {/* Header section */}
      <Box>
        <Navbar2>
          <NavbarContent2 {...navbarData} />
        </Navbar2>
      </Box>
      {/* Page content */}
      <main>{children}</main>
      {/* Footer section */}
      <Footer3 {...footerData} />
    </>
  );
}

MainLayout.propTypes = { children: PropTypes.any };
