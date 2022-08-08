export default function Category({ setSelectedTag, tag, selectedTag }) {
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      return setSelectedTag(null);
    }
    return setSelectedTag(tag);
  };

  return (
    <div
      key={tag}
      onClick={() => handleTagClick(tag)}
      className={`${
        selectedTag === tag && 'ring-2 ring-gray-400 text-gray-700'
      } inline-flex items-center px-3 py-1.5 uppercase bg-gray-100 rounded cursor-pointer`}
    >
      <span className="text-xs font-medium uppercase">{tag || 'All'}</span>
    </div>
  );
}
