'use client';
import PropTypes from 'prop-types';

// @react
import { useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// @third-party
import { useForm, Controller } from 'react-hook-form';

// @project
import ButtonAnimationWrapper from '@/components/ButtonAnimationWrapper';
import SvgIcon from '@/components/SvgIcon';
import FileUpload from '@/components/contact-us/FileUpload';

import useTranslation from '@/hooks/useTranslation';

import useConfig from '@/hooks/useConfig';

import countries from '@/data/countries';

import { submitContactForm } from '@/api/contact';

import { getEmailSchema, getFirstNameSchema, getLastNameSchema, getPhoneSchema, getMessageSchema } from '@/utils/validationSchema';

/***************************  FORM - INPUT LABEL  ***************************/

function FieldLabel({ name, helper }) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        {name}
      </Typography>
      {helper && (
        <Tooltip title={helper} arrow>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 18,
              height: 18,
              borderRadius: '50%',
              border: '1.5px solid',
              borderColor: 'text.secondary',
              cursor: 'help',
              color: 'text.secondary',
              fontSize: '14px',
              fontWeight: 600,
              '&:hover': {
                borderColor: 'text.primary',
                color: 'text.primary',
                bgcolor: 'action.hover'
              }
            }}
          >
            ?
          </Box>
        </Tooltip>
      )}
    </Stack>
  );
}

/***************************  FORM - ERROR MESSAGE  ***************************/

function ErrorMessage({ message }) {
  return (
    <Typography variant="caption" sx={{ color: 'error.main' }}>
      {message}
    </Typography>
  );
}

/***************************  CONTACT US - FORM 2  ***************************/

export default function ContactUsForm2() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { language } = useConfig();

  // Set default dial code based on language
  const getDefaultDialCode = () => {
    if (language === 'nl') return '+31'; // Netherlands
    return '+31'; // Default to Netherlands for this Dutch company
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'dialcode-popper' : undefined;

  // Initialize the form with default values and error handling
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
    setValue
  } = useForm({ defaultValues: { dialcode: getDefaultDialCode() } });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [file, setFile] = useState(null);

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      formData.append('name', `${data.firstName} ${data.lastName}`);
      formData.append('email', data.email);
      formData.append('phone', `${data.dialcode}${data.phone}`);
      formData.append('company', data.company || '');
      formData.append('message', data.message);
      if (file) {
        formData.append('file', file);
      }

      const result = await submitContactForm(formData, language);

      setSubmitStatus({ type: 'success', message: result.message });
      reset();
      setFile(null);
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message || t('forms.validation.submitError') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ gap: { xs: 3, sm: 4 } }}>
        <Grid container spacing={2.5} sx={{ justifyContent: 'space-between' }}>
          {/* First Name Field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('forms.firstName')} />
              <OutlinedInput
                {...register('firstName', getFirstNameSchema(t))}
                placeholder={t('forms.firstName')}
                slotProps={{ input: { 'aria-label': 'First name' } }}
                fullWidth
                error={errors.firstName && Boolean(errors.firstName)}
              />
              {errors.firstName?.message && <ErrorMessage message={errors.firstName?.message} />}
            </Stack>
          </Grid>

          {/* Last Name Field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('forms.lastName')} />
              <OutlinedInput
                {...register('lastName', getLastNameSchema(t))}
                placeholder={t('forms.lastName')}
                slotProps={{ input: { 'aria-label': 'Last name' } }}
                fullWidth
                error={errors.lastName && Boolean(errors.lastName)}
              />
              {errors.lastName?.message && <ErrorMessage message={errors.lastName?.message} />}
            </Stack>
          </Grid>

          {/* Email Field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('forms.email')} />
              <OutlinedInput
                {...register('email', getEmailSchema(t))}
                placeholder={t('forms.emailPlaceholder')}
                slotProps={{ input: { 'aria-label': 'Email Address' } }}
                fullWidth
                error={errors.email && Boolean(errors.email)}
              />
              {errors.email?.message && <ErrorMessage message={errors.email?.message} />}
            </Stack>
          </Grid>

          {/* Phone Field with Dial Code Selector */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('forms.phone')} />
              <Controller
                control={control}
                name="phone"
                rules={getPhoneSchema(t)}
                render={({ field: { onChange } }) => (
                  <OutlinedInput
                    placeholder={t('forms.phonePlaceholder')}
                    slotProps={{ input: { 'aria-label': 'Phone number' } }}
                    fullWidth
                    error={errors.phone && Boolean(errors.phone)}
                    onChange={onChange}
                    startAdornment={
                      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', pr: 1.5 }}>
                        <Button
                          endIcon={<SvgIcon name="tabler-chevron-down" size={16} color="text.primary" stroke={2} />}
                          sx={{
                            p: { xs: 0.25 },
                            borderRadius: 2,
                            color: 'text.primary',
                            '&:hover': { bgcolor: 'transparent' },
                            '&:before': { display: 'none' },
                            '& .MuiInputBase-input:focus': { bgcolor: 'transparent' },
                            width: 'max-content',
                            fontSize: 16
                          }}
                          disableRipple
                          aria-describedby={id}
                          type="button"
                          onClick={handleClick}
                        >
                          {watch('dialcode')}
                        </Button>
                        <Popper
                          placement="bottom-start"
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          transition
                          popperOptions={{
                            modifiers: [
                              {
                                name: 'offset',
                                options: {
                                  offset: [-16, 2]
                                }
                              }
                            ]
                          }}
                        >
                          {({ TransitionProps }) => (
                            <Fade in={open} {...TransitionProps}>
                              <Card elevation={0} sx={{ border: '1px solid', borderColor: theme.palette.divider, borderRadius: 4 }}>
                                <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                                  <Box sx={{ p: 1, pr: 0.5 }}>
                                    <List disablePadding>
                                      <Box sx={{ overflow: 'auto', maxHeight: 320, width: { xs: 296, sm: 320 } }}>
                                        {countries.map((country, index) => (
                                          <ListItemButton
                                            key={index}
                                            sx={{ borderRadius: 4, mb: 0.5 }}
                                            selected={country.dialCode === watch('dialcode')}
                                            onClick={() => {
                                              setValue('dialcode', country.dialCode);
                                              setAnchorEl(null);
                                            }}
                                          >
                                            <ListItemAvatar sx={{ minWidth: 32 }}>
                                              <CardMedia
                                                image={`https://flagcdn.com/w20/${country.countyCode.toLowerCase()}.png`}
                                                component="img"
                                                sx={{ height: 'fit-content', width: 21 }}
                                                loading="lazy"
                                              />
                                            </ListItemAvatar>
                                            <ListItemText primary={`${country.name} (${country.dialCode})`} />
                                          </ListItemButton>
                                        ))}
                                      </Box>
                                    </List>
                                  </Box>
                                </ClickAwayListener>
                              </Card>
                            </Fade>
                          )}
                        </Popper>
                        <Divider orientation="vertical" flexItem sx={{ height: 24, my: 'auto' }} />
                      </Stack>
                    }
                  />
                )}
              />
              {errors.phone?.message && <ErrorMessage message={errors.phone?.message} />}
            </Stack>
          </Grid>

          {/* Company Field (optional) */}
          <Grid size={12}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('forms.company')} />
              <OutlinedInput
                {...register('company')}
                placeholder={t('forms.companyPlaceholder')}
                slotProps={{ input: { 'aria-label': 'Company' } }}
                fullWidth
              />
            </Stack>
          </Grid>

          {/* Message Field */}
          <Grid size={12}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('forms.message')} />
              <OutlinedInput
                {...register('message', getMessageSchema(t))}
                multiline
                rows={4}
                placeholder={t('forms.messagePlaceholder')}
                fullWidth
                error={errors.message && Boolean(errors.message)}
                slotProps={{ input: { 'aria-label': 'Message' } }}
              />
              {errors.message?.message && <ErrorMessage message={errors.message?.message} />}
            </Stack>
          </Grid>

          {/* File Upload Field */}
          <Grid size={12}>
            <Stack sx={{ gap: 0.5 }}>
              <FieldLabel name={t('forms.attachment')} helper={t('forms.attachmentHelper')} />
              <FileUpload onFileSelect={setFile} />
            </Stack>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box sx={{ textAlign: 'center' }}>
          <ButtonAnimationWrapper>
            <Button type="submit" color="primary" size="large" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? t('common.loading') : t('forms.send')}
            </Button>
          </ButtonAnimationWrapper>
        </Box>

        {/* Submission Status Message */}
        {submitStatus && (
          <Grid size={12}>
            <Box
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: 3,
                bgcolor: submitStatus.type === 'success' ? 'success.lighter' : 'error.lighter',
                border: '2px solid',
                borderColor: submitStatus.type === 'success' ? 'success.main' : 'error.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 1.5,
                animation: 'slideUp 0.3s ease-out',
                '@keyframes slideUp': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(10px)'
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                }
              }}
            >
              <SvgIcon
                name={submitStatus.type === 'success' ? 'tabler-circle-check' : 'tabler-alert-circle'}
                color={submitStatus.type === 'success' ? 'success.main' : 'error.main'}
                size={24}
              />
              <Stack sx={{ gap: 0.25, alignItems: 'center', flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: submitStatus.type === 'success' ? 'success.darker' : 'error.darker',
                    fontWeight: 600
                  }}
                >
                  {submitStatus.type === 'success' ? t('common.success') : t('common.error')}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: submitStatus.type === 'success' ? 'success.darker' : 'error.darker'
                  }}
                >
                  {submitStatus.message}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        )}
      </Stack>
    </form>
  );
}

FieldLabel.propTypes = { name: PropTypes.string, helper: PropTypes.string };

ErrorMessage.propTypes = { message: PropTypes.string };
