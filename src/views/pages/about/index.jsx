'use client';

// @mui
import Stack from '@mui/material/Stack';

// @project
import { HeroSlideshow } from '@/blocks/hero';
import LazySection from '@/components/LazySection';
import useDataThemeMode from '@/hooks/useDataThemeMode';

// @data
import { heroData, ourStoryData, timelineData, teamData, ctaData } from './data';

/***************************  ABOUT PAGE  ***************************/

export default function AboutPage() {
  useDataThemeMode();

  return (
    <Stack spacing={0}>
      <HeroSlideshow {...heroData} />
      <LazySection
        sections={[
          { importFunc: () => import('@/blocks/about').then((m) => ({ default: m.Introduction })), props: ourStoryData },
          { importFunc: () => import('@/blocks/team').then((m) => ({ default: m.Team10 })), props: teamData },
          { importFunc: () => import('@/blocks/timeline').then((m) => ({ default: m.TimeLine1 })), props: timelineData },
          { importFunc: () => import('@/blocks/cta').then((m) => ({ default: m.Cta1 })), props: ctaData }
        ]}
        offset="200px"
      />
    </Stack>
  );
}
