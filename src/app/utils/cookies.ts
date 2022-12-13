export const setCookie = (name: string, value: string) => {
  document.cookie = name + '=' + value + ';path=/';
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`) || [''];
  if (parts.length === 2) {
    const newParts = parts.pop() || '';
    return newParts.split(';').shift();
  }
  return '';
};

export const API_CRM = `${getCookie('API_CRM')}`;
