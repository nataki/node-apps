import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router';

type TProps = { children: ReactNode };
type TState = { error: Error | null };

export class ErrorBoundary extends Component<TProps, TState> {
    state: TState = { error: null };

    static getDerivedStateFromError(error: Error): TState {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Uncaught error:', error, info);
    }

    render() {
        if (this.state.error) {
            return (
                <div className="max-w-xl mx-auto px-4 py-10 text-center">
                    <p className="text-sm text-red-500 mb-4">Something went wrong. Please refresh the page.</p>
                    <Link to="/" className="text-sm text-violet-600 hover:underline">← Back to home</Link>
                </div>
            );
        }
        return this.props.children;
    }
}
