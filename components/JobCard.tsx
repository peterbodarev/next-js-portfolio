import { FunctionComponent, useContext } from 'react';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';

import { Job } from '../types';
import { ShowJobDetailContext } from '../pages/index';

const JobCard: FunctionComponent<{
	job: Job;
}> = ({
	job: {
		name,
		description,
		image_path,
		company_name,
		company_url,
		jobPositions,
		responsibilities,
		improvedSills,
	},
}) => {
	const { showDetail, setShowDetail } = useContext(ShowJobDetailContext);

	return (
		<div>
			<Image
				src={image_path}
				alt={name}
				className='cursor-pointer object-cover'
				onClick={() => {
					setShowDetail(name);
				}}
				layout='responsive'
				height='150'
				width='300'
			/>

			<p className='my-2 text-center'>{name}</p>

			{showDetail === name && (
				<div className='absolute left-0 z-10 grid w-full h-auto p-2 text-black bg-gray-100 md:grid-cols-2 gap-x-12 dark:text-white dark:bg-dark-100'>
					<div>
						<Image
							src={image_path}
							alt={name}
							className='object-cover'
							layout='responsive'
							height='150'
							width='300'
						/>

						<div className='flex justify-center my-2 space-x-3'>
							<span style={{ color: '#00BFFF' }}>Improved skills:</span>
						</div>
						<div className='flex flex-wrap mt-2 space-x-2 text-sm tracking-wider'>
							{improvedSills.map((skill) => (
								<span
									key={skill}
									className='px-2 py-1 my-1 bg-gray-200 dark:bg-dark-200 rounde-sm'
								>
									{skill}
								</span>
							))}
						</div>
					</div>

					<div>
						<h2 className='mb-3 text-xl font-medium md:text-2xl'>{name}</h2>
						<h3 className='mb-3 font-medium'>{description}</h3>
						<h3 className='mb-3 font-medium'>
							<a
								target='_blank'
								href={company_url}
								style={{ color: '#00BA37' }}
							>
								{company_name}
							</a>
							<ul>
								{jobPositions.map((position) => (
									<li key={position}>{`- ${position}`}</li>
								))}
							</ul>
							<ul>
								<span style={{ color: '#00BFFF' }}>Key responsibilities:</span>
								{responsibilities.map((resp) => (
									<li key={resp}>{`- ${resp}`}</li>
								))}
							</ul>
						</h3>
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

export default JobCard;
