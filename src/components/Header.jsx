const Header = () => (
  <header className="bg-red-600 text-white p-4 shadow-md border-b-4 border-red-800">
    <div className="container mx-auto flex items-center justify-between">
      <h1 className="text-2xl md:text-3xl font-bold tracking-wider">
        <span className="text-yellow-300">日本</span>
        <span className="text-white">語 課外授業</span>
      </h1>
      <div className="flex space-x-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-red-600 rounded-full"></div>
        </div>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>
    </div>
  </header>
);

export default Header;