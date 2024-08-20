export const getIcon = (type) => {
  let icon;
  switch (type) {
    case 'add':
      icon = 'mdi-plus-box-outline';
      break;
    case 'save':
      icon = 'mdi-content-save-outline';
      break;
    case 'delete':
      icon = 'mdi-trash-can-outline';
      break;
    case 'excel':
      icon = 'mdi-microsoft-excel';
      break;
    case 'error':
      icon = 'mdi-alert-circle';
      break;
    case 'success':
      icon = 'mdi-check-circle';
      break;
  }
  return icon;
};
