import {
	ProjectNavLink,
	ProjectCategory,
	SetOfProjectCategory,
} from '../../types';

export default function readmeText_to_projectData(
	readmeText: string,
	categories: ProjectCategory[],
	setsOfCategories: SetOfProjectCategory[],
	allNavLinks: ProjectNavLink[]
) {
	const [nameAndDemoTxt, descriptionTxt, examplesTxt, keyTechsTxt] =
		readmeText.split('##');

	// projectDataObj template
	let projectObj = {
		name: '',
		description: '',
		image_path: '',
		video_path: '',
		deployed_url: '',
		// github_url: '',
		category: [],
		key_techs: [],
	};

	// get name and demo link
	if (nameAndDemoTxt.includes('⇒')) {
		let projName: string, deploy: string;
		[projName, deploy] = nameAndDemoTxt.split('⇒');
		projectObj.name = projName.substring(2, projName.length - 1);
		projectObj.deployed_url = deploy.substring(
			deploy.indexOf('(') + 1,
			deploy.indexOf(')')
		);
	} else {
		projectObj.name = nameAndDemoTxt.substring(2, nameAndDemoTxt.indexOf('\n'));
	}

	// get description
	projectObj.description = descriptionTxt
		.replace(' Description\n\n', '')
		.replace('\n\n', '');

	const examplesArray = examplesTxt.split('\n');

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
	projectObj.key_techs = keyTechsTxt
		.match(/alt=\"(.*?)\"/g)
		.map((alt) => alt.replace('alt="', '').replace('"', ''));

	// get categories
	projectObj.category = getCategories(projectObj.key_techs, categories);

	// get set of categories
	projectObj.category.push(
		...getSetsOfCategories(
			projectObj.category,
			projectObj.name,
			setsOfCategories
		)
	);

	// get navLinks
	projectObj.category.push(...getNavLinks(projectObj.category, allNavLinks));

	return projectObj;
}

function getCategories(keyTechs = [], categories = []) {
	let foundCategories = [];

	keyTechs.forEach((key_tech) => {
		const key_tech_forSearch = key_tech.replace(/\s/g, '').toLocaleLowerCase();

		for (let categoryObj of categories) {
			if (
				categoryObj.toSearch.find((key: string) =>
					key_tech_forSearch.includes(key)
				)
			) {
				foundCategories.push(categoryObj.category);
				break;
			}
		}
	});

	return foundCategories;
}

function getSetsOfCategories(
	categories: string[],
	projectName: string,
	setsOfCategories: SetOfProjectCategory[]
) {
	let foundCategories = [];

	setsOfCategories.map((setOfCategories) => {
		// ignore project
		if (setOfCategories.ignoreProjectWithName?.includes(projectName)) {
			return;
		}

		for (let cat of categories) {
			if (setOfCategories.toSearch.find((catInSet) => catInSet === cat)) {
				foundCategories.push(setOfCategories.category);
				break;
			}
		}
	});

	return foundCategories;
}

function getNavLinks(categories = [], navLinks = []) {
	let foundCategories = [];

	navLinks.map((navLinkObj) => {
		for (let cat of categories) {
			if (navLinkObj.categories.includes(cat)) {
				foundCategories.push(navLinkObj.linkName);
				break;
			}
		}
	});

	return foundCategories;
}
