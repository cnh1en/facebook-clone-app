import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TailwindProvider } from 'tailwind-rn';
import MyStacks from './navigations/Stacks';
import AuthProvider from './context/AuthContext';
import RegisterProvider from './context/RegisterContext';
import utilities from './tailwind.json';

export default function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10000,
      },
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={client}>
        <TailwindProvider utilities={utilities}>
          <AuthProvider>
            <RegisterProvider>
              <BottomSheetModalProvider>
                <MyStacks />
              </BottomSheetModalProvider>
            </RegisterProvider>
          </AuthProvider>
        </TailwindProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
