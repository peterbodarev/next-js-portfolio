import { FunctionComponent } from 'react';
import { ProjectNavLink } from '../types';

export const NavItem: FunctionComponent<{
	value: string;
	handlerFilterCategory: Function;
	active: string;
}> = ({ value, handlerFilterCategory, active }) => {
	let className = 'capitalize cursor-pointer hover:text-green text-center';
	if (active === value) className += ' text-green';

	return (
		<li className={className} onClick={() => handlerFilterCategory(value)}>
			{value}
		</li>
	);
};

const ProjectsNavbar: FunctionComponent<{
	nameForAll: string;
	navItems: ProjectNavLink[];
	handlerFilterCategory: Function;
	active: string;
}> = ({ nameForAll, navItems, ...props }) => {
	return (
		<>
			<div className='flex px-3 py-2 space-x-3 overflow-x-auto list-none items-center'>
				{nameForAll && <NavItem value={nameForAll} {...props} />}
				{navItems.map((navItem) => (
					<NavItem key={navItem.linkName} value={navItem.linkName} {...props} />
				))}
			</div>
		</>
	);
};

export default ProjectsNavbar;

export const ProjectsSubNavbar: FunctionComponent<{
	navItems: string[];
	handlerFilterCategory: Function;
	active: string;
}> = ({ navItems, ...props }) => {
	return (
		<>
			<div className='flex px-3 py-2 space-x-3 overflow-x-auto list-none items-center'>
				{navItems.map((navItem) => (
					<NavItem key={navItem} value={navItem} {...props} />
				))}
			</div>
		</>
	);
};
