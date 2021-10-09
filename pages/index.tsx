import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetStaticProps,
	GetStaticPropsContext,
	NextPage,
} from 'next';
import { createContext, useState } from 'react';

import JobCard from '../components/JobCard';
import { Job } from '../types';

export const ShowJobDetailContext = createContext(null);

const About: NextPage = () => {
	const { siteConfig } = require('../data/fetchedData.json');
	const bodyData = siteConfig.pages.about.data.body;
	const descriptionData = siteConfig.pages.about.data.description;
	const descriptionItems = descriptionData.items;
	const jobs = bodyData.jobs;

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

//!called every time  the page refreshed
// export const getServerSideProps: GetServerSideProps = async (
//    context: GetServerSidePropsContext
// ) => {
//    const res = await fetch('http://localhost:3000/api/services')
//    const data = await res.json()
//    console.log(data)
//    return { props: { services: data.services } }
// }

//!called only during the build of the project
//? make sure the server(localhost:3000)[this will receive the request during build] is running on a terminal during the build
//? also need to change the localhost during the deployment | see the todo
// https://aude53.medium.com/set-environment-variables-with-next-js-and-vercel-e544c0460a48

// export const getStaticProps: GetStaticProps = async (
//    context: GetStaticPropsContext
// ) => {
//    // console.log(context);

//    const res = await fetch('http://localhost:3000/api/services')
//    const { services } = await res.json()
//    console.log({ services })
//    return { props: { services: services } }
// }
