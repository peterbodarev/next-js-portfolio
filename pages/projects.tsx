import { createContext, useState } from 'react';

import ProjectCard from '../components/ProjectCard';
import ProjectsNavbar from '../components/ProjectsNavbar';
import { ProjectsSubNavbar } from '../components/ProjectsNavbar';
import getNavLinks from '../data/projectData/getNavLinks';
import readmeText_to_projectData from '../data/projectData/readmeTextProcessing';
import { Project, ProjectNavLink, ProjectsPageData } from '../types';

export const ShowProjectDetailContext = createContext(null);

const Projects = ({ nameForAll, navLinks, projectData }: ProjectsPageData) => {
	const [projects, setProjects] = useState(projectData);
	const [active, setActive] = useState(nameForAll);
	const [activeSubLinks, setActiveSubLinks] = useState([]);

	const [showDetail, setShowDetailState] = useState('');
	function setShowDetail(projectName: string) {
		setShowDetailState((showDetail) => projectName);
	}

	const handlerFilterCategory = (category: string) => {
		if (category === nameForAll) {
			setProjects(projectData);
			setActive(category);
			setActiveSubLinks([]);
			return;
		}

		const newArray = projectData.filter((project) =>
			project.category.includes(category)
		);
		setProjects(newArray);
		setActive(category);

		const navLinkObj = navLinks.find(
			(navLink) => navLink.linkName === category
		);
		if (navLinkObj) {
			setActiveSubLinks(navLinkObj.categories);
		}
	};

	return (
		<div className='px-5 py-2 overflow-y-scroll' style={{ height: '80vh' }}>
			<ProjectsNavbar
				nameForAll={nameForAll}
				navItems={navLinks}
				handlerFilterCategory={handlerFilterCategory}
				active={active}
			/>
			<ProjectsSubNavbar
				navItems={activeSubLinks}
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

export async function getStaticProps() {
	const baseUrl =
		'https://raw.githubusercontent.com/peterbodarev/portfolioConfig/master/';

	const contactInfo = await fetch(baseUrl + 'contactInfo.json').then(
		(response) => response.json()
	);

	const projectInitialData = await fetch(baseUrl + 'projects.json').then(
		(response) => response.json()
	);

	const {
		githubReadmeUrls,
		categories,
		setsOfCategories,
		nameForAll,
		allNavLinks,
	} = projectInitialData;

	const projectDataPromise = Promise.all<Project>(
		githubReadmeUrls.map(async (url: string) => {
			const readmeApiURL = url
				.replace('https://github.com', 'https://raw.githubusercontent.com')
				.replace('/blob', '');
			const githubProjectURL = url.split('/blob/')[0];

			const projectDataPromise = fetch(readmeApiURL)
				.then((response) => response.text())
				.then((data) => {
					const fetchedReadmeText = data.split('## Features 💡')[0];

					const generatedProjectData: Project = {
						...readmeText_to_projectData(
							fetchedReadmeText,
							categories,
							setsOfCategories,
							allNavLinks
						),
						github_url: githubProjectURL,
					};

					return generatedProjectData;
				});

			return projectDataPromise;
		})
	);

	const pageData = await projectDataPromise.then((projectData: Project[]) => {
		const navLinks = getNavLinks(projectData, allNavLinks);
		return { nameForAll, navLinks, projectData };
	});

	return {
		props: {
			contactInfo,
			pageData,
		},
	};
}
