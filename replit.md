# Crowdchain dApp

## Overview

Crowdchain is a sophisticated Web3 crowdfunding platform that enables decentralized fundraising with milestone-based funding and DAO governance. The platform connects startups with investors through smart contract integration, featuring comprehensive campaign management, voting mechanisms, and mentorship programs. Built as a full-stack application with a React frontend, Express backend, and PostgreSQL database, the system is designed to be production-ready with strong emphasis on user experience, security, and blockchain integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend uses React with TypeScript in a single-page application architecture, utilizing Wouter for lightweight client-side routing. The UI is built with Tailwind CSS and shadcn/ui components for consistent design, while GSAP handles animations and visual effects. State management follows a hybrid approach using Zustand for global application state (wallet connection, theme, settings) and TanStack Query for server state management and caching. The application implements a component-based architecture with clear separation between presentation and business logic.

### Backend Architecture
The backend follows an Express.js architecture with TypeScript, providing RESTful API endpoints prefixed with `/api`. The server implements middleware for request logging, JSON parsing, and error handling. The application uses a development/production split where Vite middleware handles frontend serving in development, while static assets are served in production. The storage layer abstracts database operations through an interface pattern, currently implementing in-memory storage with provisions for database integration.

### Database Design
The application uses PostgreSQL with Drizzle ORM for type-safe database operations. The schema defines a users table with UUID primary keys and basic authentication fields. The database configuration supports both local development and production deployments through environment variables, with automatic schema generation and migration capabilities through Drizzle Kit.

### Web3 Integration
The Web3 layer uses Ethers.js v6 for blockchain interactions with a runtime configuration approach that avoids hardcoded contract addresses or ABIs. The system loads contract configuration from environment variables and local JSON files, with a settings interface allowing runtime overrides for development flexibility. Wallet integration primarily targets MetaMask through window.ethereum, with architecture designed to accommodate additional wallet providers. The smart contract interface supports campaign creation, milestone voting, and DAO governance functions.

### State Management Strategy
Application state is managed through multiple layers: Zustand stores handle global UI state (theme, wallet connection, settings), TanStack Query manages server-side data with caching and synchronization, and local component state handles form inputs and temporary UI states. The wallet connection state persists across sessions, while campaign and user data are cached with appropriate invalidation strategies.

### Styling and UI Framework
The design system uses Tailwind CSS with CSS custom properties for theming, supporting both light and dark modes with automatic detection and manual override. The primary color scheme centers around midnight blue (#050170) with accessible contrast ratios. Components follow the shadcn/ui pattern with Radix UI primitives for accessibility, while animations use GSAP for smooth interactions and progressive enhancement.

## External Dependencies

### Core Framework Dependencies
- **React 18** with TypeScript for component architecture
- **Express.js** for backend API server
- **Vite** for build tooling and development server
- **Wouter** for lightweight client-side routing

### Database and ORM
- **PostgreSQL** as the primary database (configurable)
- **Drizzle ORM** for type-safe database operations and migrations
- **@neondatabase/serverless** for serverless PostgreSQL connections

### Web3 and Blockchain
- **Ethers.js v6** for Ethereum blockchain interactions
- **MetaMask** wallet integration through window.ethereum API
- Smart contract ABI loaded from local JSON files at runtime

### UI and Styling
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component library built on Radix UI primitives
- **GSAP** for animations and visual effects
- **Lucide React** for consistent iconography

### Data Management
- **TanStack Query** for server state management and caching
- **Zustand** for global client state management
- **React Hook Form** with Zod validation for form handling

### Development and Build Tools
- **TypeScript** for type safety across the application
- **ESLint** and **Prettier** for code quality and formatting
- **PostCSS** with Autoprefixer for CSS processing
- **tsx** for TypeScript execution in development

### Additional Libraries
- **date-fns** for date manipulation and formatting
- **class-variance-authority** for component variant management
- **clsx** and **tailwind-merge** for conditional class composition