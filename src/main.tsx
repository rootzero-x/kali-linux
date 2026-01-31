import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { GamificationProvider } from './contexts/GamificationContext'
import { AcademyProvider } from './contexts/AcademyContext'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { HelmetProvider } from 'react-helmet-async'

import { ThemeProvider } from './contexts/ThemeContext'
import { LevelUpModal } from './components/gamification/LevelUpModal'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <GamificationProvider>
          <AcademyProvider>
            <RouterProvider router={router} />
          </AcademyProvider>
          <LevelUpModal />
        </GamificationProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
