import { Project, ProjectNavLink } from '../../types';

export default function getNavLinks(
	projectData: Project[],
	navLinks: ProjectNavLink[]
) {
	let resNavLinks: ProjectNavLink[] = [];

	navLinks.map((navLinksItem) => {
		const linkName = navLinksItem.linkName;
		const categories = navLinksItem.categories;
		let subLinksArray = new Set();

		for (let projectDataItem of projectData) {
			const projectCategories = projectDataItem.category;
			// check in project contain main link name

			if (projectCategories.includes(linkName)) {
				// loop throw all subLinks
				for (let subLink of categories) {
					// check if project contain sub link name
					if (projectCategories.includes(subLink)) {
						// console.log(subLink);
						subLinksArray.add(subLink);
					}
					// check if there was found all sub links
					if (subLinksArray.size === categories.length) {
						break;
					}
				}

				// check if there was found all sub links
				if (subLinksArray.size === categories.length) {
					// push nav link
					break;
				}
			}
		}

		if (subLinksArray.size) {
			// to keep the same order:
			let resCategories = categories.filter((link) => subLinksArray.has(link));
			resNavLinks.push({ linkName, categories: resCategories });
		}
	});

	return resNavLinks;
}
