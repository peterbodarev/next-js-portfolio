import { AiFillGithub, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';
import { GiTie } from 'react-icons/gi';
import { GoLocation } from 'react-icons/go';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const contactInfo = require('../data/contact-info.json');

const Sidebar = () => {
	const { theme, setTheme } = useTheme();

	const changeTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<>
			<div
				style={{
					width: 128,
					height: 128,
					position: 'relative',
					margin: 'auto',
				}}
			>
				<Image
					src='/avatar.jpg'
					alt={`${contactInfo.firstName} ${contactInfo.lastName}`}
					className=' mx-auto border rounded-full '
					layout='fill'
					objectFit='cover'
					quality='100'
				/>
			</div>

			<h3 className='my-4 text-3xl font-medium tracking-wider font-kaushan'>
				<span className='text-green '>{contactInfo.firstName}</span>
				{contactInfo.lastName}
			</h3>
			<p className='px-2 py-1 my-3 bg-gray-200 rounded-full dark:bg-dark-200 dark:bg-black-500'>
				{contactInfo.status}
			</p>
			{/* Resume */}
			<a
				href='/Resume.pdf'
				download={`${contactInfo.firstName} ${contactInfo.lastName} Resume.pdf`}
				className='flex items-center justify-center px-2 py-1 my-2 bg-gray-200 rounded-full cursor-pointer dark:bg-dark-200 dark:bg-black-500'
			>
				<GiTie className='w-6 h-6' />
				<span>Download Resume</span>
			</a>

			{/* Socials */}
			<div className='flex justify-around w-9/12 mx-auto my-5 text-green md:w-full '>
				<a href={contactInfo.linkedIn}>
					<AiFillLinkedin className='w-8 h-8 cursor-pointer' />
				</a>
				<a href={contactInfo.github}>
					<AiFillGithub className='w-8 h-8 cursor-pointer' />
				</a>
			</div>

			{/* Contacts */}
			<div
				className='py-4 my-5 bg-gray-200 dark:bg-dark-200 dark:bg-black-500'
				style={{ marginLeft: '-1rem', marginRight: '-1rem' }}
			>
				<div className='flex items-center justify-center'>
					<GoLocation className='mr-2' /> <span>{contactInfo.location} </span>
				</div>
				<p className='my-2' style={{ wordWrap: 'break-word' }}>
					{contactInfo.email}
				</p>
			</div>

			{/* Email Button */}

			<button
				className='w-8/12 px-5 py-2 text-white bg-black rounded-full cursor-pointer bg-gradient-to-r from-green to-blue-500 hover:scale-105 focus:outline-none'
				onClick={() => window.open(`mailto:${contactInfo.email}`)}
			>
				Email me
			</button>
			<button
				onClick={changeTheme}
				className='w-8/12 px-5 py-2 my-4 text-white bg-black rounded-full cursor-pointer bg-gradient-to-r from-green to-blue-500 focus:outline-none hover:scale-105 '
			>
				Toggle Theme
			</button>
		</>
	);
};

export default Sidebar;
