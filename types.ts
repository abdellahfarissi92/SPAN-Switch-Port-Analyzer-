import React from 'react';

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface SpanSection {
  title: string;
  icon: React.ElementType;
  content: React.ReactNode;
}