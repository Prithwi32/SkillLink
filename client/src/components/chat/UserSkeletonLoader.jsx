const UserSkeletonLoader = () => {
  return (
    <div className="w-16 border-r bg-muted/30 p-2 flex flex-col gap-3 overflow-y-auto hide-scrollbar">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center"
        >
          <div className="h-6 w-6 bg-gray-400 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default UserSkeletonLoader;
