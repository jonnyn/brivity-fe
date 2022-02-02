import React from "react";

const posts = [
  {
    id: 6,
    title: "The Anatomy of a Well-Engineered App",
    body: "Try making it a bit less blah low resolution? It looks ok on my screen, or could you do an actual logo instead of a font i'll know it when i see it but make the font bigger and this turned out different that i decscribed but i love it, but can you invert all colors?.",
    created_at: "2021-12-29T07:55:29.523Z",
    updated_at: "2021-12-29T11:33:07.033Z",
    comment_count: 11,
    user: {
      id: 3,
      display_name: "Izzo",
    },
  },
  {
    id: 5,
    title: "Last of the Mohicans",
    body: "Try making it a bit less blah low resolution? It looks ok on my screen, or could you do an actual logo instead of a font i'll know it when i see it but make the font bigger and this turned out different that i decscribed but i love it, but can you invert all colors?.",
    created_at: "2021-12-29T07:55:21.943Z",
    updated_at: "2021-12-29T11:33:18.135Z",
    comment_count: 5,
    user: {
      id: 3,
      display_name: "Izzo",
    },
  },
  {
    id: 4,
    title: "Extrapolation is the new Black",
    body: "Try making it a bit less blah low resolution? It looks ok on my screen, or could you do an actual logo instead of a font i'll know it when i see it but make the font bigger and this turned out different that i decscribed but i love it, but can you invert all colors?.",
    created_at: "2021-12-29T07:54:57.503Z",
    updated_at: "2021-12-29T11:33:33.265Z",
    comment_count: 1,
    user: {
      id: 3,
      display_name: "Izzo",
    },
  },
  {
    id: 2,
    title: "Return of the Suicide Squad",
    body: "Try making it a bit less blah low resolution? It looks ok on my screen, or could you do an actual logo instead of a font i'll know it when i see it but make the font bigger and this turned out different that i decscribed but i love it, but can you invert all colors?.",
    created_at: "2021-12-28T16:17:47.509Z",
    updated_at: "2021-12-29T11:33:56.109Z",
    comment_count: 8,
    user: {
      id: 3,
      display_name: "Izzo",
    },
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Body
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Comment Count
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.body}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.comment_count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
