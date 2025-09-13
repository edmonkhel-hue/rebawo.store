# Focus Timer - Distraction-Free Countdown Timer

## Overview

A beautiful, minimalist countdown timer application inspired by Forest and Be Focused apps. The application provides a distraction-free interface for focus sessions with customizable durations, audio feedback, and progress tracking. Built with React, TypeScript, and modern web technologies, it emphasizes calm design principles and user-friendly interactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent, accessible design
- **State Management**: React hooks and Context API for local state management
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack React Query for server state management and caching

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **API Structure**: RESTful API with `/api` prefix for all endpoints
- **Middleware**: Custom logging and error handling middleware
- **Development**: Hot module replacement via Vite integration

### Database & Storage
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Local Storage**: Browser localStorage for timer settings and session persistence
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions

### Design System
- **Component Library**: Radix UI primitives with custom styling
- **Theming**: CSS custom properties with light/dark mode support
- **Color Palette**: Forest green theme (142 69% 58%) with calming sage green accents
- **Typography**: Inter for UI text, Roboto Mono for timer display
- **Spacing**: Consistent Tailwind spacing scale (2, 4, 8, 12, 16 units)

### Audio System
- **Web Audio API**: Custom AudioManager class for generating timer sounds
- **Sound Types**: Four preset options (gentle, chime, bell, digital)
- **Volume Control**: User-configurable volume with real-time preview
- **Browser Compatibility**: Graceful fallback for unsupported browsers

### Timer Logic
- **Timer Engine**: JavaScript intervals with precise time calculation
- **State Management**: Comprehensive timer states (idle, running, paused, completed)
- **Persistence**: Session recovery after page refresh or browser restart
- **Keyboard Shortcuts**: Spacebar (start/pause), R (reset), S (settings), Escape (close dialogs)

### User Experience Features
- **Preset Timers**: Quick selection buttons (5min, 15min, 25min Pomodoro, 45min, 1hour)
- **Custom Duration**: Manual time input with hours, minutes, and seconds
- **Visual Progress**: Circular progress ring with smooth animations
- **Completion Feedback**: Audio alerts and visual confirmation
- **Settings Persistence**: Automatic saving of user preferences
- **Responsive Design**: Mobile-first approach with touch-friendly controls

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **TypeScript**: Full TypeScript support with strict type checking
- **Vite**: Development server and build tool with HMR support

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Headless component primitives for accessibility
- **Lucide React**: Consistent icon library with tree-shaking support
- **Class Variance Authority**: Type-safe component variant management

### Database & Backend
- **Neon Database**: Serverless PostgreSQL hosting platform
- **Drizzle ORM**: Type-safe database operations and migrations
- **Express.js**: Minimal web application framework
- **Connect-pg-simple**: PostgreSQL session store for Express

### Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution for development server
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **Replit Integration**: Development environment compatibility

### Audio & Notifications
- **Web Audio API**: Native browser audio synthesis (no external libraries)
- **Browser Notifications API**: Native system notifications for timer completion

### Data Management
- **TanStack Query**: Server state management and caching
- **Date-fns**: Date manipulation and formatting utilities
- **Zod**: Runtime type validation and schema definition