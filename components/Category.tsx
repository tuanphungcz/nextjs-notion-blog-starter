export default function Category({ setSelectedTag, tag, selectedTag, setSearchValue }) {
  const handleTagClick = (tag: string) => {
    setSearchValue('');
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
        selectedTag === tag && 'ring-2 ring-gray-400 text-gray-600'
      }  text-xs font-medium text-gray-600 inline-flex items-center capitalize px-3 select-none py-1.5  bg-gray-100 rounded-lg cursor-pointer outline-none hover:bg-gray-200`}
    >
      <span className="text-xs font-medium outline-none">{tag || 'All'}</span>
    </div>
  );
}
