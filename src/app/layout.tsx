import './globals.css';
import { BioRhyme } from 'next/font/google';
import Head from 'next/head';
import { ReactNode } from 'react';

const bioRhyme = BioRhyme({
	weight: ['200', '300', '400', '700', '800'],
	subsets: ['latin'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<Head>
				<title>Odd One Out</title>
			</Head>
			<body className={bioRhyme.className + ' overflow-hidden'}>
				{children}
			</body>
		</html>
	);
}
