const colors = [
  "bg-red-700",
  "bg-green-700",
  "bg-emerald-800",
  "bg-teal-700",
  "bg-purple-700",
  "bg-orange-700",
  "bg-lime-700",
];


export const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];