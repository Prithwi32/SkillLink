const MessageSkeletonLoader = () => {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`flex ${index%2==0?"justify-end":"justify-start"} animate-pulse`}
          >
            <div className="max-w-[80%] rounded-lg px-16 py-2 bg-gray-300">
              <div className="h-4 bg-gray-400 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-400 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageSkeletonLoader;