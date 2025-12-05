# Welcome to Chat App 👋

Send, receive, and manage messages with this **React Native** app built with **Expo**.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

---

## App Features 🚀

- Browse all chat conversations
- Send and receive messages in real-time
- View organized conversation threads
- Optimistic updates for instant message display
- Animated empty/loading states using **Lottie**
- Smooth scrolling for long chat histories
- Clean, modern UI with responsive components

---

## Technology Stack 🛠️ 

### Core Dependencies
- **Expo**: Development platform and tools for React Native
- **React Native**: Cross-platform mobile app framework
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Type-safe JavaScript development

### State Management
- **Redux Toolkit**: Predictable state container for JavaScript apps
  - `@reduxjs/toolkit`: Modern Redux development toolkit
  - `react-redux`: React bindings for Redux

### Data Fetching
- **React Query**: Efficient data fetching, caching, and state synchronization

### UI Components & Animations
- **Tamagui**: Responsive, high-performance UI library
- **Lottie React Native**: Render After Effects animations for loading and empty states
- **Expo Vector Icons**: Icon library for React Native
- **Expo Linear Gradient**: Gradient backgrounds

### Development Tools
- **TypeScript**: Type checking and compilation
- **Expo TypeScript Config**: TypeScript configuration for Expo

---

## Setup Instructions 🚀

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Expo CLI
- Xcode (for iOS development - macOS only)
- Android Studio (for Android development)

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-app
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm start
   ```

### Running on Different Platforms
- **Web**: `npm run web`
- **Android**: `npm run android`
- **iOS**: `npm run ios` (requires Xcode on macOS)

---

## 🎯 App Architecture

### Navigation Structure
- **Stack Navigation**: Manage screen transitions (Chat List → Chat Detail)
- **Screens**:
  - ChatListScreen: Displays all conversations
  - ChatDetailScreen: View and send messages in a conversation

### State Management
- **Redux Toolkit (RTK)**: Centralized state management
  - `chatState`: Manages messages, selected chat, and user info
- **React Query**: Handles fetching conversations and messages efficiently

### Data Flow
1. **API Integration**: Fetch conversations and messages
2. **React Query**: Handles caching and background updates
3. **Redux Actions**: Updates global state on user interaction
4. **Tamagui Components**: UI reflects the latest state
5. **Lottie Animations**: Enhance empty states and loading indicators

---

## 🎨 UI/UX Features

### Design System
- **Typography**: Consistent font styling for chat messages and headers
- **Color Scheme**: Green gradients and clean white backgrounds
- **Icons**: Ionicons for message and navigation icons
- **Animations**: Lottie for sending messages, empty chats, and loading states

### Key UI Components
- **ChatCard**: Displays conversation preview with last message
- **MessageBubble**: Shows sent and received messages
- **ChatInput**: Input field with send button
- **EmptyState**: Animated Lottie animations for empty chats
- **LoadingIndicator**: Lottie animation for fetching data

---

## 📄 License

This project is private and for educational purposes.

---

## 🤝 Contributing

1. Fork the repository  
2. Create a feature branch  
3. Make your changes  
4. Test thoroughly  
5. Submit a pull request  

---

## 📞 Support

For support and questions, please refer to the project maintainers or the Expo documentation.

---

*Last Updated: December 2025*  
*Version: 1.0.0*