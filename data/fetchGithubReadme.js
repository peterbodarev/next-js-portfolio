export default function fetchGithubReadme(
	dataMap = new Map(),
	allSimpleCategories = [],
	allSetsOfSimpleCategories = [],
	postNewProjectData = (url, value) => {}
) {
	let projectDataArray = [];
	let fetchedReadmeTextArray = [];

	let onlyChangedData = new Map();
	/* {
		projectData: projectData,
		readmeText: readmeText,
	} */

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
	function findSetOfCategories(allCategories = [], keyTechs = []) {
		let foundCategories = [];
		allCategories.map((setOfCategories) => {
			for (let cat of keyTechs) {
				if (setOfCategories.toSearch.find((catInSet) => catInSet === cat)) {
					foundCategories.push(setOfCategories.category);
					break;
				}
			}
		});
		return foundCategories;
	}

	const getProjectSimpleCategories = (keyTechs = []) =>
		findProjectCategories(allSimpleCategories, keyTechs);

	const getProjectSetOfSimpleCategories = (keyTechs = []) =>
		findSetOfCategories(allSetsOfSimpleCategories, keyTechs);

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

		const examplesArray = readmeArray[2].split('\n\n');

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
			...getProjectSetOfSimpleCategories(projectObj.category)
		);

		// console.log(projectObj.name, projectObj.category);
		return projectObj;
	}

	async function fetchReadme(url) {
		fetch(url)
			.then((response) => response.text())
			.then((data) => {
				const fetchedText = data.split('## Features 💡')[0];
				if (fetchedText !== dataMap.get(url)) {
					const newProjectData = getProjectData(fetchedText);
					// console.log(newProjectData);
					/* onlyChangedData.set(url, {
						projectData: newProjectData,
						readmeText: fetchedText,
					}); */
					postNewProjectData(url, {
						projectData: newProjectData,
						readmeText: fetchedText,
					});
				}

				// return;
				// console.log(fetchedText);
				// fetchedReadmeTextArray.push(fetchedText);
				//todo: add logic to not process if readme is the same with lastReadme
				// processReadme(fetchedText);
			});
	}

	for (let readmeApiUrls of dataMap.keys()) {
		fetchReadme(readmeApiUrls);
		// console.log(readmeApiUrls);
	}

	// return onlyChangedData;
	// return new Map();
	// console.log(fetchedReadmeTextArray[0]);
}
