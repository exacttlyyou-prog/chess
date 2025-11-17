import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = '/home';
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black flex items-center justify-center p-8">
          <div className="glass-card max-w-md w-full p-8 text-center">
            {/* Error Icon */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-400" strokeWidth={2} />
            </div>

            {/* Error Message */}
            <h1 className="!text-2xl mb-3">Упс! Что-то пошло не так</h1>
            <p className="text-body text-gray-400 mb-6">
              Произошла ошибка при загрузке приложения. Мы уже работаем над решением проблемы.
            </p>

            {/* Error Details (dev mode) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-left">
                <p className="text-xs text-red-400 font-mono break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Вернуться на главную
              </button>
              <button
                onClick={this.handleReload}
                className="glass-button w-full flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Перезагрузить страницу
              </button>
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500 mt-6">
              Если проблема повторяется, попробуйте очистить кэш браузера или обратитесь в поддержку.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
