'use client'

import StoreProvider from './StoreProvider'
import { ThemeProvider } from 'styled-components'
import StyledComponentsRegistry from '../lib/registry'
import theme from '../styles/theme'
import '../styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  )
}
