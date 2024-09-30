import React, { Component, ErrorInfo } from 'react';

interface Props {
    children: React.ReactNode;
    resetQuery: () => void;
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
    handleReset() {
        this.setState({ hasError: false });
        this.props.resetQuery();
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="border border-primary rounded-primary  p-4 lg:p-8 flex items-center justify-between gap-4">
                    <p className="lg:font-semibold text-lg lg:text-2xl">
                        Something went wrong!
                    </p>
                    <button
                        className="btn-secondary"
                        onClick={() => this.handleReset()}
                    >
                        Try Again!
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
