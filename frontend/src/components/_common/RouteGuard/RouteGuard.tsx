import React from 'react';
import useRedirect from '@/hooks/_common/useRedirect';

interface RouteGuardProps {
  condition: boolean;
  redirectPath: string;
}

const RouteGuard = ({ condition, redirectPath, children }: React.PropsWithChildren<RouteGuardProps>) => {
  const isRedirected = useRedirect({
    condition,
    redirectPath,
  });

  if (isRedirected) {
    return null;
  }

  return <>{children}</>;
};

export default RouteGuard;
