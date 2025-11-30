import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'ClickRadio - Consultation Radiologie',
  description: 'Plateforme sécurisée de consultation des images de radiologie',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>🏥</text></svg>" />
      </head>
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
