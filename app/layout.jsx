import { DM_Mono, Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const mono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata = {
  title: 'Itzfizz — Scroll Animation',
  description: 'A GSAP-powered scroll driven hero built with Next.js and Tailwind CSS.'
};

export default function RootLayout({ children }) {
  return <html lang="en"><body className={`${montserrat.variable} ${mono.variable}`}>{children}</body></html>;
}
