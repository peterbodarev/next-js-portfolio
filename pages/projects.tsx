import { createContext, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectsNavbar from '../components/ProjectsNavbar';
import { projects as projectsData } from '../data';
import { Category } from '../types';

export const ShowDetailContext = createContext(null);

const Projects = () => {
	const [projects, setProjects] = useState(projectsData);
	const [active, setActive] = useState('all');

	const [showDetail, setShowDetailState] = useState('');
	function setShowDetail(projectName: string) {
		setShowDetailState((showDetail) => projectName);
	}

	const handlerFilterCategory = (category: Category | 'all') => {
		if (category === 'all') {
			setProjects(projectsData);
			setActive(category);
			return;
		}

		const newArray = projectsData.filter((project) =>
			project.category.includes(category)
		);
		setProjects(newArray);
		setActive(category);
	};

	return (
		<div className='px-5 py-2 overflow-y-scroll' style={{ height: '65vh' }}>
			<ProjectsNavbar
				handlerFilterCategory={handlerFilterCategory}
				active={active}
			/>
			<ShowDetailContext.Provider value={{ showDetail, setShowDetail }}>
				<div className='relative grid grid-cols-12 gap-4 my-3'>
					{projects.map((project) => (
						<div
							className='col-span-12 p-2 bg-gray-200 rounded-lg sm:col-span-6 lg:col-span-4 dark:bg-dark-200'
							key={project.name}
						>
							<ProjectCard project={project} />
						</div>
					))}
				</div>
			</ShowDetailContext.Provider>
		</div>
	);
};

export default Projects;
