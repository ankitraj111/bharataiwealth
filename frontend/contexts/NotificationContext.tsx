'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'sip' | 'alert' | 'report' | 'general';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const defaultNotifications: Notification[] = [
  {
    id: '1',
    title: 'SIP Installment Due',
    message: 'Your monthly SIP for "Nifty 50 Index Fund" is due tomorrow.',
    time: '2 hours ago',
    isRead: false,
    type: 'sip'
  },
  {
    id: '2',
    title: 'Price Alert Triggered',
    message: 'RELIANCE has reached your target price of ₹2,850.',
    time: '5 hours ago',
    isRead: false,
    type: 'alert'
  },
  {
    id: '3',
    title: 'Weekly Report Ready',
    message: 'Your AI wealth digest for December Week 4 is now available.',
    time: 'Yesterday',
    isRead: false,
    type: 'report'
  },
  {
    id: '4',
    title: 'Portfolio Rebalancing',
    message: 'AI suggests rebalancing based on market conditions.',
    time: '2 days ago',
    isRead: true,
    type: 'general'
  }
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'time' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      time: 'Just now',
      isRead: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
