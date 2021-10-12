import { NextPage } from 'next';
import { createContext, useState } from 'react';

import JobCard from '../components/JobCard';
import { AboutPageData, Job } from '../types';

export const ShowJobDetailContext = createContext(null);

const About: NextPage<AboutPageData> = ({ descriptionItems, jobs }) => {
	const [showDetail, setShowDetailState] = useState('');
	function setShowDetail(jobName: string) {
		setShowDetailState((showDetail) => jobName);
	}

	return (
		<div className='flex flex-col flex-grow px-6 pt-1 '>
			{descriptionItems?.length &&
				descriptionItems.map(([descTitle, descText], i) => (
					<h6 key={i} className='my-1 text-base font-medium'>
						<b>{descTitle}</b>
						{descText}
					</h6>
				))}
			<div className='px-3 py-2 overflow-y-scroll' style={{ height: '40vh' }}>
				<ShowJobDetailContext.Provider value={{ showDetail, setShowDetail }}>
					<div className='relative grid grid-cols-12 gap-4 my-3'>
						{jobs.map((job: Job) => (
							<div
								className='col-span-12 p-2 bg-gray-200 rounded-lg sm:col-span-6 lg:col-span-4 dark:bg-dark-200'
								key={job.name}
							>
								<JobCard job={job} />
							</div>
						))}
					</div>
				</ShowJobDetailContext.Provider>
			</div>
		</div>
	);
};

export default About;

export async function getStaticProps() {
	const baseUrl =
		'https://raw.githubusercontent.com/peterbodarev/portfolioConfig/master/';

	const contactInfo = await fetch(baseUrl + 'contactInfo.json').then(
		(response) => response.json()
	);

	const pageData = await fetch(baseUrl + 'about.json').then((response) =>
		response.json()
	);

	return {
		props: {
			contactInfo,
			pageData,
		},
	};
}
