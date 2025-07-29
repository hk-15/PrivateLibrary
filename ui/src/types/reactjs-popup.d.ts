import * as React from 'react';
import 'reactjs-popup';

declare module 'reactjs-popup' {
  interface PopupProps {
    children?: React.ReactNode | ((close: () => void) => React.ReactNode);
  }
}