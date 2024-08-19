export const getIcon = (type) => {
  let icon;
  switch (type) {
    case 'error':
      icon = 'mdi-alert-circle';
      break;
  }
  return icon;
};
