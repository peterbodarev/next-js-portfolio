import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/globals.css';

import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
	const contactInfo = pageProps.contactInfo;
	const pageData = pageProps.pageData;

	return (
		<ThemeProvider attribute='class' defaultTheme='dark'>
			<div className='grid grid-cols-12 gap-6 px-5 my-10 lg:mb-0 md:mb-16 sm:px-20 md:px-32 lg:px-36 xl:px-48 '>
				{/* // do this div style later (after putting the content) */}
				<div className='h-full col-span-12 p-4 text-base text-center bg-white dark:bg-dark-500 lg:col-span-3 rounded-2xl shadow-custom-light dark:shadow-custom-dark '>
					{/* //!sidebar */}
					<Sidebar {...contactInfo} />
				</div>
				<div className='flex flex-col col-span-12 overflow-hidden bg-white shadow-custom-light dark:shadow-custom-dark rounded-2xl lg:col-span-9 dark:bg-dark-500'>
					{/* //!navbar */}
					<Navbar />
					{/* //!about */}
					<Component {...pageData} />
				</div>
			</div>
		</ThemeProvider>
	);
}

export default MyApp;
