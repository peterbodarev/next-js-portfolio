import fetchGithubReadme from './fetchGithubReadme';

const getProjectData = (sendBackProjectData) => {
	// console.log('start');
	const configFile = require('../fetchedData.json');
	const projectBody = configFile.siteConfig.pages.projects.data.body;

	let readmeApiURLs = [];
	let githubProjectURLs = [];

	projectBody.inputData.githubReadmeUrls.map((url) => {
		const readmeApiURL = url
			.replace('https://github.com', 'https://raw.githubusercontent.com')
			.replace('/blob', '');
		const githubProjectURL = url.split('/blob/')[0];

		readmeApiURLs.push(readmeApiURL);
		githubProjectURLs.push(githubProjectURL);
	});

	// console.log(githubProjectURLs[12]);
	// console.log(readmeApiURLs[0]);
	// console.log(readmeApiURLs, githubProjectURLs);
	let fetchedData = [];
	const getFetchedData = (data) => {
		// fetchedData.push(...data);
		// console.log(`was fetched ${data.length} projects`);
		const projectData = data?.map((projectObj, i) => ({
			...projectObj,
			github_url: githubProjectURLs[i],
		}));
		sendBackProjectData(projectData);
		// console.log(projectData);
	};

	fetchGithubReadme(
		readmeApiURLs,
		projectBody.allCategories.simple,
		projectBody.allCategories.setOfSimple,
		projectBody.allSetsOfCategories.setArray,
		getFetchedData
	);
};

export default getProjectData;
