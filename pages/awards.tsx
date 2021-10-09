import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetStaticProps,
	GetStaticPropsContext,
	NextPage,
} from 'next';
import { createContext, useState } from 'react';

import AwardCard from '../components/AwardCard';
import AwardsNavbar from '../components/AwardsNavbar';
import { Award } from '../types';

export const ShowAwardDetailContext = createContext(null);

const Awards: NextPage = () => {
	const { siteConfig } = require('../data/fetchedData.json');
	const bodyData = siteConfig.pages.awards.data.body;
	const awardsData = bodyData.finalData;
	const mainNavItems = bodyData.mainNavItems;

	const [awards, setAwards] = useState(awardsData);
	const [active, setActive] = useState(mainNavItems[0]);

	const [showDetail, setShowDetailState] = useState('');
	function setShowDetail(awardName: string) {
		setShowDetailState((showDetail) => awardName);
	}

	const handlerFilterCategory = (category: string) => {
		if (category === mainNavItems[0]) {
			setAwards(awardsData);
			setActive(category);
			return;
		}

		const newArray = awardsData.filter((award: Award) =>
			award.category.includes(category)
		);
		setAwards(newArray);
		setActive(category);
	};

	return (
		<div>
			<AwardsNavbar
				navItems={mainNavItems}
				handlerFilterCategory={handlerFilterCategory}
				active={active}
			/>
			<div className='px-3 py-2 overflow-y-scroll' style={{ height: '70vh' }}>
				<ShowAwardDetailContext.Provider value={{ showDetail, setShowDetail }}>
					<div className='relative grid grid-cols-12 gap-4 my-3'>
						{awards.map((award: Award) => (
							<div
								className='col-span-12 p-2 bg-gray-200 rounded-lg sm:col-span-6 lg:col-span-4 dark:bg-dark-200'
								key={award.long_name}
							>
								<AwardCard job={award} />
							</div>
						))}
					</div>
				</ShowAwardDetailContext.Provider>
			</div>
		</div>
	);
};

export default Awards;
