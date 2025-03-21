import * as Yup from 'yup';

  const addMediaFileValidationSchema = Yup.object().shape({
    media: Yup.mixed().required('required')
      .test('fileFormat', 'Only media files are allowed', value => {
        if (value) {
          const supportedFormats = ['jpeg', "png", "jpg", "mp4"];
          return supportedFormats.includes(value.name.split('.').pop().toLowerCase());
        }
        return true;
      })
      .test('fileSize', 'File size must be less than 3MB', value => {
        if (value) {
          return value.size <= 10 * 1024 * 1024;
        }
        return true;
      }),
  })

export default addMediaFileValidationSchema;