function Banner({ searchTerm, setSearchTerm }) {
  return (
    <section className="dark:bg-gray-900 bg-white text-white">
      <div className="mx-auto w-full h-60px px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-sky-300 via-blue-300 to-blue-900  dark:from-green-300 dark:via-blue-500 dark:to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Explore the Cryptoverse.
            <span className="sm:block">
              {" "}
              Learn more about your favourite cryptocurrencies...
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex w-full sm:w-auto gap-4 justify-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="dark:bg-gray-950 bg-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Banner;
