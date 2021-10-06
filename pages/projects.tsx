import { createContext, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectsNavbar from '../components/ProjectsNavbar';
import { projects as projectsData } from '../data';
import { Category } from '../types';

import fetchGithubReadme from '../data/fetchGithubReadme';

const configFile = require('../data/fetchedData.json');
const projectBody = configFile.data.project.body;
// console.log(projectBody);
// console.log(1);
// console.log(projectBody.inputData.githubReadmeUrls);

let readmeApiURLs = [];
let githubProjectURLs = [];

projectBody.inputData.githubReadmeUrls.map((url: string) => {
	const readmeApiURL = url
		.replace('https://github.com', 'https://raw.githubusercontent.com')
		.replace('/blob', '');
	const githubProjectURL = url.split('/blob/')[0];

	readmeApiURLs.push(readmeApiURL);
	githubProjectURLs.push(githubProjectURL);
});

// console.log(githubUrlArray);
let currentData = new Map();
function addNewData(
	key: string,
	readmeText: string,
	destinationMap: Map<string, Object>,
	projectData?: Object
) {
	destinationMap.set(key, {
		projectData: projectData,
		readmeText: readmeText,
	});
}

/* let initialDataMap =  */
readmeApiURLs.map((url: string) => {
	addNewData(url, '', currentData);
});

const receiveNewProjectData = (url, newData) => {
	// for (let entry of newData) {
	// 	console.log(entry);
	// }
	// console.log(url, newData);
	currentData.set(url, newData);
};

// let responseMap =
fetchGithubReadme(
	currentData,
	projectBody.allCategories.simple,
	projectBody.allCategories.setOfSimple,
	receiveNewProjectData
);

// console.log(Object.keys(responseMap).length);
/* if (Object.keys(responseMap).length !== 0) {
	console.log(1);
} else {
	console.log(2);
} */

/* for (let entries of currentData) {
	console.log(entries);
} */

// function fetchData(){

// }

// function resetCurrentData(
// 	newMap: Map<string, Object>,
// 	currentMap: Map<string, Object>,
// 	destinationMap: Map<string, Object>
// ) {
// 	for (let entry of newData.entries()) {
// 		const mapIsChanged = true;
// 		if (mapIsChanged) {
// 		}
// 	}
// }

let currentReadmeText = [];
// { fetchedData = [], ReadmeText = [] }
/* const response = fetchGithubReadme({
	lastFetchedReadmeText: currentReadmeText,
	allSimpleCategories: projectBody.allCategories.simple,
	allSetsOfSimpleCategories: projectBody.allCategories.setOfSimple,
}); */
/* const response = fetchGithubReadme({
	lastFetchedReadmeText: currentReadmeText,
	allSimpleCategories: projectBody.allCategories.simple,
	allSetsOfSimpleCategories: projectBody.allCategories.setOfSimple,
	readmeApiUrls: readmeApiURLs,
}); */
// console.log(projectBody.allCategories.simple);

export const ShowDetailContext = createContext(null);

const Projects = () => {
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
