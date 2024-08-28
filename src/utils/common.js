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

export const formatBusinessNumber = (target) => {
  let rawValue = target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
  let formattedValue = '';

  if (rawValue.length > 0) {
    formattedValue = rawValue.slice(0, 3); // 처음 3자리
  }
  if (rawValue.length > 3) {
    formattedValue += '-' + rawValue.slice(3, 5); // 중간 2자리
  }
  if (rawValue.length > 5) {
    formattedValue += '-' + rawValue.slice(5, 10); // 나머지 숫자
  }

  return formattedValue;
};
