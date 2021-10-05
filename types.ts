import { FunctionComponent } from 'react';
import { IconType } from 'react-icons';
export interface Service {
	Icon: IconType;
	title: string;
	about: string;
}

export interface Skill {
	Icon: IconType;
	name: string;
	level: string;
}

export interface IProject {
	name: string;
	description: string;
	image_path: string;
	deployed_url: string;
	github_url: string;
	category: Category[];
	key_techs: string[];
}

export type Category =
	| 'Full stack'
	| 'Front-end'
	| 'Back-end'
	| 'HTML5 '
	| 'CSS3'
	| 'SASS'
	| 'JavaScript'
	| 'TypeScript'
	| 'jQuery'
	| 'React'
	| 'Redux'
	| 'Next'
	| 'Express'
	| 'MERN'
	| 'Node'
	| 'JWT'
	| 'MongoDB'
	| 'Tailwind'
	| 'Material UI'
	| 'Styled Components'
	| 'Webpack'
	| 'Gulp';

export type SetOfCategories =
	| 'Layer'
	| 'Language'
	| 'Framework'
	| 'Stack'
	| 'Engine'
	| 'Auth'
	| 'DB'
	| 'Style framework'
	| 'Bundler';
