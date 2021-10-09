import { FunctionComponent, useContext } from 'react';
import { AiFillProject } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';

import { Award } from '../types';
import { ShowAwardDetailContext } from '../pages/awards';

const AwardCard: FunctionComponent<{
	job: Award;
}> = ({
	job: {
		short_name,
		long_name,
		description,
		image_path,
		event_page_url,
		category,
	},
}) => {
	const { showDetail, setShowDetail } = useContext(ShowAwardDetailContext);

	return (
		<div>
			<Image
				src={image_path}
				alt={short_name}
				className='cursor-pointer object-cover'
				onClick={() => {
					setShowDetail(short_name);
				}}
				layout='responsive'
				height='150'
				width='300'
			/>

			<p className='my-2 text-center'>{short_name}</p>

			{showDetail === short_name && (
				<div className='absolute left-0 z-10 grid w-full h-auto p-2 text-black bg-gray-100 md:grid-cols-2 gap-x-12 dark:text-white dark:bg-dark-100'>
					<div>
						<Image
							src={image_path}
							alt={short_name}
							className='object-cover'
							layout='responsive'
							height='150'
							width='300'
						/>

						<div className='flex justify-center my-2 space-x-3'>
							{event_page_url && (
								<a
									target='_blank'
									href={event_page_url}
									className='flex items-center px-4 py-2 space-x-3 text-lg bg-gray-200 dark:bg-dark-200'
								>
									<AiFillProject /> <span>Event page</span>
								</a>
							)}
						</div>
					</div>

					<div>
						<h2 className='mb-3 mr-10 text-xl font-medium md:text-2xl'>
							{long_name}
						</h2>
						<h3 className='mb-3 font-medium'>{description}</h3>
					</div>

					<button
						onClick={() => {
							setShowDetail('');
						}}
						className='absolute p-1 bg-gray-200 rounded-full top-3 right-3 focus:outline-none dark:bg-dark-200'
					>
						<MdClose size={30} />
					</button>
				</div>
			)}
		</div>
	);
};

export default AwardCard;
