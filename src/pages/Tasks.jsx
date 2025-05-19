    import TaskCard from "../components/TaskCard";

const tasks = [
  {
    title: "Tugas 1: Hiragana",
    description: "Pelajari huruf Hiragana dan tulis 10 kata.",
    link: "https://forms.gle/formlink1"
  },
  {
    title: "Tugas 2: Perkenalan Diri",
    description: "Buat video perkenalan dalam Bahasa Jepang.",
    link: "https://forms.gle/formlink2"
  },
];

const Tasks = () => (
  <div className="p-6 grid gap-4">
    {tasks.map((task, idx) => (
      <TaskCard key={idx} {...task} />
    ))}
  </div>
);

export default Tasks;
