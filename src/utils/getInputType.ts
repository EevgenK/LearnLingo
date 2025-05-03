export const getInputType = (key: string, showPassword: boolean): string => {
  switch (key) {
    case 'email':
      return 'email';
    case 'password':
      return showPassword ? 'text' : 'password';
    case 'name':
      return 'text';
    case 'number':
      return 'tel';
    default:
      return 'text';
  }
};
