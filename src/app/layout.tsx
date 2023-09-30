'use client';
import { GameStateProvider } from '@/context/GameStateContext';
import './globals.css';
import type { Metadata } from 'next';
import { BioRhyme } from 'next/font/google';
import Head from 'next/head';

const bioRhyme = BioRhyme({
	weight: ['200', '300', '400', '700', '800'],
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Head>
				<title>Odd One Out</title>
			</Head>
			<GameStateProvider>
				<body className={bioRhyme.className}>{children}</body>
			</GameStateProvider>
		</html>
	);
}
