import * as Sentry from '@sentry/react';
import {useEffect} from 'react';
import {createRoutesFromChildren, matchRoutes, useLocation, useNavigationType} from 'react-router-dom';

export const useSentry = () => {
  if (import.meta.env.VITE_SENTRY === 'enable' && !!import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new Sentry.BrowserTracing({
          routingInstrumentation: Sentry.reactRouterV6Instrumentation(
            useEffect,
            useLocation,
            useNavigationType,
            createRoutesFromChildren,
            matchRoutes
          ),
        }),
        new Sentry.Replay(),
      ],
      tracesSampleRate: import.meta.env.VITE_SENTRY_SAMPLE_RATE,
      replaysSessionSampleRate: import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE,
      replaysOnErrorSampleRate: import.meta.env.VITE_REPLAYS_ON_ERROR_SAMPLE_RATE,
    });
  }
};
