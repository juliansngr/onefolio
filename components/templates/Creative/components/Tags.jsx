export default function Tags({ data, className }) {
  const { tags } = data;
  return (
    <div className={className}>
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
            Skills & Superpowers ⚡
          </h2>
          <p className="text-xl text-gray-600">
            The tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tags.map((skill, index) => {
            const colors = [
              "from-cyan-400 to-blue-500",
              "from-pink-400 to-red-500",
              "from-yellow-400 to-orange-500",
              "from-purple-400 to-pink-500",
              "from-green-400 to-cyan-500",
              "from-indigo-400 to-purple-500",
            ];
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${
                  colors[index % colors.length]
                } p-4 rounded-2xl text-white text-center font-bold transform hover:scale-105 hover:rotate-2 transition-all cursor-pointer shadow-lg`}
              >
                <p className="text-sm">{skill}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
