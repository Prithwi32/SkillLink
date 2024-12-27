export function EditableField({ value, onChange, isEditing, type = "input", label }) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      {isEditing ? (
        type === "textarea" ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            rows={4}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
        )
      ) : (
        <p className="p-2 rounded-md cursor-pointer hover:bg-gray-50 transition-all duration-300">
          {type === "textarea" ? <span className="whitespace-pre-wrap">{value}</span> : value}
        </p>
      )}
    </div>
  );
}