const TaskCard = ({ title, description, link }) => (
  <div className="bg-white shadow p-4 rounded">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-sm text-gray-700 mb-2">{description}</p>
    <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 underline">Kumpulkan via Google Form</a>
  </div>
);

export default TaskCard;
