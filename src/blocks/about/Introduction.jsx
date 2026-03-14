'use client';
import PropTypes from 'prop-types';

// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import ContainerWrapper from '@/components/ContainerWrapper';
import MotionWrapper from '@/components/MotionWrapper';
import Typeset from '@/components/Typeset';

import useTranslation from '@/hooks/useTranslation';

import { SECTION_COMMON_PY } from '@/utils/constant';

/***************************  ABOUT - INTRODUCTION  ***************************/

export default function Introduction({ headingKey, highlightKey, paragraphKeys }) {
  const { t } = useTranslation();

  return (
    <ContainerWrapper sx={{ py: SECTION_COMMON_PY }}>
      <MotionWrapper>
        <Stack spacing={3} sx={{ maxWidth: 800, textAlign: 'center', mx: 'auto' }}>
          <Typeset
            heading={
              <>
                {t(headingKey)}{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {t(highlightKey)}
                </Box>
              </>
            }
            headingProps={{ variant: 'h2' }}
          />
          <Stack spacing={2}>
            {paragraphKeys.map((key, i) => (
              <Typography key={i} variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {t(key)}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </MotionWrapper>
    </ContainerWrapper>
  );
}

Introduction.propTypes = {
  headingKey: PropTypes.string.isRequired,
  highlightKey: PropTypes.string.isRequired,
  paragraphKeys: PropTypes.arrayOf(PropTypes.string).isRequired
};
