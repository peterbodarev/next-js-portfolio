/* import fetchGithubReadme from '../data/fetchGithubReadme';

const configFile = require('../data/fetchedData.json');
const projectBody = configFile.data.project.body;

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

readmeApiURLs.map((url: string) => {
	addNewData(url, '', currentData);
});

const receiveNewProjectData = (url, newData) => {
	currentData.set(url, newData);
};

fetchGithubReadme(
	currentData,
	projectBody.allCategories.simple,
	projectBody.allCategories.setOfSimple,
	receiveNewProjectData
);

let currentReadmeText = []; */

import { callbackify } from 'util';

export default function fetchGithubReadme(
	readmeApiUrls = [],
	allSimpleCategories = [],
	allSetsOfSimpleCategories = [],
	allSetsOfCategories = [],
	getData
) {
	let fetchedProjectData = [];

	function findProjectCategories(allCategories = [], keyTechs = []) {
		let foundCategories = [];
		// console.log(allCategories);
		keyTechs.forEach((key_tech) => {
			const key_tech_forSearch = key_tech
				.replace(/\s/g, '')
				.toLocaleLowerCase();
			for (let categoryObj of allCategories) {
				// console.log(val.category);
				if (
					categoryObj.toSearch.find((key) => key_tech_forSearch.includes(key))
				) {
					foundCategories.push(categoryObj.category);
					// if (simpleCategory) {
					break;
					// }
				}
			}
		});
		// console.log(keyTechs, foundCategories);
		return foundCategories;
	}
	function findSetOfSimpleCategories(
		allCategories = [],
		keyTechs = [],
		projectName = ''
	) {
		let foundCategories = [];
		allCategories.map((setOfCategories) => {
			if (setOfCategories.ignore?.includes(projectName)) {
				// console.log(setOfCategories, projectName);
				return;
			}
			for (let cat of keyTechs) {
				if (setOfCategories.toSearch.find((catInSet) => catInSet === cat)) {
					foundCategories.push(setOfCategories.category);
					break;
				}
			}
		});
		return foundCategories;
	}
	function findSetOfCategories(allCategories = [], keyTechs = []) {
		let foundCategories = [];
		allCategories.map((setOfCategories) => {
			for (let cat of keyTechs) {
				if (setOfCategories.categories.find((catInSet) => catInSet === cat)) {
					foundCategories.push(setOfCategories.setName);
					break;
				}
			}
		});
		return foundCategories;
	}

	const getProjectSimpleCategories = (keyTechs = []) =>
		findProjectCategories(allSimpleCategories, keyTechs);

	const getProjectSetOfSimpleCategories = (keyTechs = [], projectName = '') =>
		findSetOfSimpleCategories(allSetsOfSimpleCategories, keyTechs, projectName);

	const getProjectSetOfCategories = (keyTechs = []) =>
		findSetOfCategories(allSetsOfCategories, keyTechs);

	function getProjectData(readmeText) {
		const readmeArray = readmeText.split('##');
		// template of project
		let projectObj = {
			name: '',
			description: '',
			image_path: '',
			video_path: '',
			deployed_url: '',
			// github_url: projectURL ? projectURL : '',
			category: [],
			key_techs: [],
		};

		// get name and demo link
		if (readmeArray[0].includes('⇒')) {
			// console.log(readmeArray[0].split('⇒'));
			let projName, deploy;
			[projName, deploy] = readmeArray[0].split('⇒');
			projectObj.name = projName.substring(2, projName.length - 1);
			projectObj.deployed_url = deploy.substring(
				deploy.indexOf('(') + 1,
				deploy.indexOf(')')
			);
		} else {
			projectObj.name = readmeArray[0].substring(
				2,
				readmeArray[0].indexOf('\n')
			);
		}

		// get description
		projectObj.description = readmeArray[1]
			.replace(' Description\n\n', '')
			.replace('\n\n', '');

		// const examplesArray = readmeArray[2].split('\n\n');
		const examplesArray = readmeArray[2].split('\n');

		// get first image url
		for (let el of examplesArray) {
			if (!el.search(/^\!\[/)) {
				projectObj.image_path = el.substring(
					el.indexOf('(') + 1,
					el.indexOf(')')
				);
				break;
			}
		}

		// get first video url
		for (let el of examplesArray) {
			if (!el.search(/^http/)) {
				projectObj.video_path = el;
				break;
			}
		}

		// get key techs
		projectObj.key_techs = readmeArray[3]
			.match(/alt=\"(.*?)\"/g)
			.map((alt) => alt.replace('alt="', '').replace('"', ''));

		// get Simple categories
		projectObj.category = getProjectSimpleCategories(projectObj.key_techs);

		// get Simple categories
		projectObj.category.push(
			...getProjectSetOfSimpleCategories(projectObj.category, projectObj.name)
		);

		// get sets of categories
		projectObj.category.push(...getProjectSetOfCategories(projectObj.category));

		// console.log(projectObj.name, projectObj.category);
		return projectObj;
	}

	async function fetchReadme(url, i, callback) {
		fetch(url)
			.then((response) => response.text())
			.then((data) => {
				const fetchedText = data.split('## Features 💡')[0];
				// console.log(fetchedText);
				const newProjectData = getProjectData(fetchedText);

				fetchedProjectData.push(newProjectData);
				if (fetchedProjectData.length === readmeApiUrls.length) {
					callback(fetchedProjectData);
					// console.log('last fetched project ', newProjectData.name);
				}
				// console.log(i, newProjectData.name, newProjectData.category);
				// return;
			});
	}
	// readmeApiUrls.map((url, i) => fetchReadme(url, i + 1));

	readmeApiUrls.map((url, i) => {
		fetchReadme(url, i + 1, getData);
	});

	// console.log(fetchedProjectData.length);
	// console.log(1);
	// fetchReadme(readmeApiUrls[0]);

	/* for (let readmeApiUrls of dataMap.keys()) {
		fetchReadme(readmeApiUrls);
		// console.log(readmeApiUrls);
	} */

	// return onlyChangedData;
	// return new Map();
	// console.log(fetchedReadmeTextArray[0]);
}
