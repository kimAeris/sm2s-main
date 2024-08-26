export const isFailed = (res) => {
  let result = false;
  if (res.status < 200 && res.status > 299) result = true;
  if (res.data.header.code !== 200) result = true;
  return result;
};

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
