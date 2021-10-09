import { BsCircleFill } from 'react-icons/bs';

import Bar from '../components/Bar';
import { Abilities, Ability, Education } from '../types';

const Resume = () => {
	const { siteConfig } = require('../data/fetchedData.json');
	const descriptionData = siteConfig.pages.resume.data.description;
	const bodyData = siteConfig.pages.resume.data.body;
	const descriptionItems = descriptionData.items;
	const abilitiesData = bodyData.abilities;

	return (
		<div className='px-6 py-2'>
			{/* Education */}
			<div className='grid gap-2 md:grid-cols-2'>
				{descriptionItems.map((education: Education, i) => (
					<div key={i}>
						<div className=''>
							<h5 className='my-1 text-xl font-bold'>
								{education.status}
								<small>{` ${education.period}`}</small>
							</h5>

							<p className='font-semibold'>{education.specialty}</p>
							<a
								target='_blank'
								href={education.university_url}
								className='my-3'
								style={{ color: '#00BA37' }}
							>
								{education.university}
							</a>
						</div>
					</div>
				))}
			</div>

			{/* Abilities */}
			<div className='grid gap-2 md:grid-cols-2'>
				{abilitiesData.map((abilityGroup: Abilities, i) => (
					<div key={i}>
						<h6 className='text-2xl font-bold'>{abilityGroup.group_name}</h6>
						<div>
							{abilityGroup.list_of_abilities.map((ability: Ability, i) => (
								<Bar value={{ Icon: BsCircleFill, ...ability }} key={i} />
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Resume;
