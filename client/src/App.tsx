import { Global, css } from '@emotion/react';
import { CurrencyExchangePage } from 'pages';
import { COLORS } from 'constants';

const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, ${COLORS.GRADIENT_START} 0%, ${COLORS.GRADIENT_END} 100%);
    min-height: 100vh;
  }
`;

export function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <CurrencyExchangePage />
    </>
  );
}

export default App;
