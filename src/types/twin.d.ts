import 'twin.macro';
import { css as cssProperty, CSSProp, DefaultTheme } from 'styled-components';

declare module 'twin.macro' {
  const css: typeof cssProperty;
  const styled: typeof styledImport;
  const theme: DefaultTheme;
}

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    tw?: string;
    css?: CSSProp;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      tw?: string;
      css?: CSSProp;
    }
  }
}
