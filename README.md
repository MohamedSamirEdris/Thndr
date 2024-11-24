# Stock Market Explorer (Thndr Task)

A modern, responsive web application for exploring stock market data with real-time search capabilities and infinite scrolling.

## 🚀 Features

- **Real-time Stock Search**: Instantly search through thousands of stocks
- **Infinite Scrolling**: Seamlessly load more stocks as you scroll
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works perfectly on all device sizes
- **Error Handling**: Graceful handling of API rate limits and network errors
- **Loading States**: Smooth loading indicators for better UX

## 🛠 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for lightning-fast development
- **State Management**:
  - MobX for UI state (themes, preferences)
  - React Query for server state management
- **Styling**:
  - Tailwind CSS for utility-first styling
  - shadcn/ui for beautiful, accessible components
- **API Integration**: Custom API service with error handling
- **Code Quality**:
  - ESLint for code linting
  - TypeScript for type safety
  - Prettier for code formatting

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/MohamedSamirEdris/Thndr.git
cd Thndr
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_api_key_here
VITE_API_BASE_URL=your_api_base_url_here
```

4. Start the development server:

```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build locally

## 🎯 Future Enhancements

- [ ] Add detailed stock view with charts
- [ ] Implement user authentication
- [ ] Add watchlist functionality
- [ ] Integrate real-time price updates
- [ ] Add an order system so user can buy and sell stocks
- [ ] Add Deposit and withdrawal system
- [ ] Add more technical indicators
- [ ] Implement stock comparison features
- [ ] Add portfolio tracking
- [ ] Integrate news feed for stocks

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Mohamed Samir - [GitHub Profile](https://github.com/MohamedSamirEdris)

## 🙏 Acknowledgments

- [Polygon.io](https://polygon.io) for providing the stock market data API
- [shadcn/ui](https://ui.shadcn.com) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
