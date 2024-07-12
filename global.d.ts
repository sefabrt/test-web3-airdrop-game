interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe?: {
          user?: {
            username?: string;
          };
        };
        onEvent: (eventType: string, callback: () => void) => void;
        ready: () => void;
      };
    };
  }
  