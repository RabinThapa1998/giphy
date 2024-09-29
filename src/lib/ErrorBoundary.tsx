import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div className='border border-primary rounded-primary  p-4 lg:p-8'>
        <p className='font-bold text-lg lg:text-2xl'>ERROR IN COMPONENT</p>
      </div>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;