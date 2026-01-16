export const Theme = {
  colors: {
    primary: '#ffffff',   
    background: '#212121',     
    card: '#2a2b32',           
    text: '#cfcfcfff',         
    border: '#3f3f46',       
    gray: '#808080',
    blue: '#5c728fff',
    red: '#ff5b5bff',
    green: '#32CD32',
    dourado: '#fed731',
  },

 fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '800' },
  },

  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xlg: 22,
    xl: 24,
    xxl: 28,
    gxl: 32,
    gxxl: 40,

  },
};
export type ThemeType = typeof Theme;