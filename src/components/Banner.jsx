import React from "react";

function Banner({ searchTerm, setSearchTerm }) {
  return (
    <section className="dark:bg-gray-900 bg-white text-white">
      <div className="mx-auto w-full h-60px px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r  dark:from-yellow-300 dark:via-purple-500 dark:to-green-600   from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Explore the Cryptoverse.
            <span className="sm:block">
              Learn more about your favourite cryptocurrencies...
            </span>
          </h1>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex w-full sm:w-auto gap-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Banner;
