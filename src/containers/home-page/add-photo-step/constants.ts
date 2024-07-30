export const MB = 1_000_000

export const validationData: import('~/types').AddDocuments = {
  maxFileSize: 10 * MB,
  maxAllFilesSize: 10 * MB,
  allFilesSizeError: 'becomeTutor.photo.fileSizeError',
  filesTypes: ['image/jpeg', 'image/png'],
  fileSizeError: 'becomeTutor.photo.fileSizeError',
  typeError: 'becomeTutor.photo.typeError',
  maxQuantityFiles: 1
}
