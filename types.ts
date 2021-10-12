import { IconType } from 'react-icons';

export interface Skill {
	Icon: IconType;
	name: string;
	level: string;
}
export interface ContactInfo {
	firstName: string;
	lastName: string;
	status: string;
	email: string;
	location: string;
	github: string;
	linkedIn: string;
	resumeLink: string;
}

// ---------------- About page ----------------

export interface Job {
	name: string;
	description: string;
	image_path: string;
	company_name: string;
	company_url: string;
	jobPositions: string[];
	responsibilities: string[];
	improvedSills: string[];
}

export interface AboutPageData {
	descriptionItems: string[][];
	jobs: Job[];
}

// ---------------- Resume page ----------------

export interface Education {
	status: string;
	period: string;
	specialty: string;
	university: string;
	university_url: string;
}

export interface Ability {
	name: string;
	level: string;
}

export interface Abilities {
	group_name: string;
	list_of_abilities: Ability[];
}

export interface ResumePageData {
	descriptionItems: Education[];
	abilities: Abilities[];
}

// ---------------- Awards page ----------------

export interface Award {
	short_name: string;
	long_name: string;
	description: string;
	image_path: string;
	event_page_url: string;
	category: string[];
}

export interface AwardsPageData {
	mainNavItems: string[];
	awardList: Award[];
}

// ---------------- Projects page ----------------

export interface Project {
	name: string;
	description: string;
	image_path: string;
	video_path: string;
	deployed_url: string;
	github_url: string;
	category: string[];
	key_techs: string[];
}

export interface ProjectCategory {
	category: string;
	toSearch: string[];
}
export interface SetOfProjectCategory {
	category: string;
	toSearch: string[];
	ignoreProjectWithName: string[];
}

export interface ProjectNavLink {
	linkName: string;
	categories: string[];
}

export interface ProjectsPageData {
	nameForAll: string;
	navLinks: ProjectNavLink[];
	projectData: Project[];
}
