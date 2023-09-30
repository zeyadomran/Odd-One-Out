const NavBar: React.FC = () => {
	return (
		<nav className="flex justify-between items-center p-8">
			<div>
				<h1 className="font-bold text-white text-4xl">Odd One Out</h1>
			</div>
			<div>
				<button className="py-3 px-6 text-black bg-white rounded-sm text-xl font-bold cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out">
					Rules
				</button>
			</div>
		</nav>
	);
};

export default NavBar;
