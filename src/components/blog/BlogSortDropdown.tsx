import React from 'react'
import { Dropdown } from '@components/common/dropdown/Dropdown'
import { blogSortValues, type BlogSortValue } from '@hooks/blog/useSelectedBlogSort'
import { useTranslation } from '@localization/localize'

interface BlogSortDropdownProps {
  value: BlogSortValue
  onChange: (value: BlogSortValue) => void
}

export const BlogSortDropdown: React.FC<BlogSortDropdownProps> = ({ value, onChange }) => {
  const { t } = useTranslation()

  const options = blogSortValues.map((optionValue) => ({
    value: optionValue,
    label: t(`blog.sort.options.${optionValue}`),
  }))

  return (
    <Dropdown
      value={value}
      options={options}
      onChange={onChange}
      ariaLabel={t('blog.sort.label')}
    />
  )
}
