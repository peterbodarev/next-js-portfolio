import { FunctionComponent } from 'react';

export const NavItem: FunctionComponent<{
	value: string;
	handlerFilterCategory: Function;
	active: string;
}> = ({ value, handlerFilterCategory, active }) => {
	let className = 'capitalize cursor-pointer hover:text-green';
	if (active === value) className += ' text-green';

	return (
		<li className={className} onClick={() => handlerFilterCategory(value)}>
			{value}
		</li>
	);
};

const ProjectsNavbar: FunctionComponent<{
	navItems: string[];
	handlerFilterCategory: Function;
	active: string;
}> = ({ navItems, ...props }) => {
	return (
		<>
			<div className='flex px-3 py-2 space-x-3 overflow-x-auto list-none'>
				{navItems.map((navItem) => (
					<NavItem key={navItem} value={navItem} {...props} />
				))}
			</div>
		</>
	);
};

export default ProjectsNavbar;
