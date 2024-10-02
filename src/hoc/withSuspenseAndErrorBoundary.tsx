import ErrorBoundary from '@/lib/ErrorBoundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import React, { ComponentType, Suspense, forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';

type WithSuspenseAndErrorBoundaryProps = {
    fallback?: React.ReactNode;
};

function withSuspenseAndErrorBoundary<P extends object, R = unknown>(
    Component: ComponentType<P>,
    defaultFallback: React.ReactNode = (
        <p className="text-white font-bold">Loading...</p>
    )
): ForwardRefExoticComponent<PropsWithoutRef<P & WithSuspenseAndErrorBoundaryProps> & RefAttributes<R>> {
    const WrappedComponent = forwardRef<R, P & WithSuspenseAndErrorBoundaryProps>((props, ref) => {
        const { fallback: propsFallback, ...restProps } = props;
        return (
            <QueryErrorResetBoundary>
                {({ reset }) => (
                    <ErrorBoundary resetQuery={reset}>
                        <Suspense fallback={propsFallback || defaultFallback}>
                            <Component {...restProps as P} ref={ref} />
                        </Suspense>
                    </ErrorBoundary>
                )}
            </QueryErrorResetBoundary>
        );
    });

    WrappedComponent.displayName = `withSuspenseAndErrorBoundary(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
}

export default withSuspenseAndErrorBoundary;