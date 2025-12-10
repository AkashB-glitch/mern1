import React from "react";

function ForumList() {
  const threads = [
    { id: 1, title: "How to learn React?", comments: 12 },
    { id: 2, title: "Tailwind vs Bootstrap?", comments: 5 },
    { id: 3, title: "Is AI replacing programmers?", comments: 32 },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Latest Discussions
      </h1>

      {threads.map((t) => (
        <div
          key={t.id}
          className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {t.title}
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {t.comments} comments
          </p>
        </div>
      ))}
    </div>
  );
}

export default ForumList;
