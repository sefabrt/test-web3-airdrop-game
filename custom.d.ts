interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username: string;
    language_code: string;
  }
  
  interface TelegramWebApp {
    initDataUnsafe: {
      user: TelegramUser;
    };
    ready: () => void;
    onEvent: (eventType: string, callback: () => void) => void;
  }
  
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
  