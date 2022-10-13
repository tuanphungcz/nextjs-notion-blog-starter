import TagItem from './base/TagItem';

export default function Category({ setSelectedTag, tag, selectedTag, setSearchValue }) {
  const handleTagClick = (tag: string) => {
    setSearchValue('');
    if (selectedTag === tag) {
      return setSelectedTag(null);
    }
    return setSelectedTag(tag);
  };

  return (
    <TagItem onClick={() => handleTagClick(tag)} isSelected={selectedTag === tag}>
      {tag || 'All'}
    </TagItem>
  );
}
