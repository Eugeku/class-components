import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.scss';

type Props = {
  children: ReactNode;
}
type State = {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-boundary">Synthetick Error</div>;
    }
    return this.props.children;
  }
}
