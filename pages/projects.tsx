import { createContext, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectsNavbar from '../components/ProjectsNavbar';
// import { projects as projectsData } from '../data';
import { Category } from '../types';

// import getProjectData from '../data/projectData/getProjectData';
import generateFinalProjectData from '../data/projectData/generateFinalProjectData';

export const ShowProjectDetailContext = createContext(null);

const Projects = () => {
	// getProjectData();

	let projectsData = [];

	// const callback = (data) => console.log(data);
	const callback = (data) => {
		/* data.map((prj, i) => {
			if (prj.image_path === '') console.log(i, prj.name, prj.image_path);
		}); */
		projectsData.push(...data);
	};
	generateFinalProjectData(callback);

	/*	------------------------------------------- */
	const [projects, setProjects] = useState(projectsData);
	const [active, setActive] = useState('All');

	const [showDetail, setShowDetailState] = useState('');
	function setShowDetail(projectName: string) {
		setShowDetailState((showDetail) => projectName);
	}

	const handlerFilterCategory = (category: Category | 'All') => {
		if (category === 'All') {
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
		<div className='px-5 py-2 overflow-y-scroll' style={{ height: '80vh' }}>
			<ProjectsNavbar
				handlerFilterCategory={handlerFilterCategory}
				active={active}
			/>
			<ShowProjectDetailContext.Provider value={{ showDetail, setShowDetail }}>
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
			</ShowProjectDetailContext.Provider>
		</div>
	);
};

export default Projects;
