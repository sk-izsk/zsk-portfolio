import { Dropdown } from '@components/common/dropdown/Dropdown'
import { blogFilterValues, useSelectedBlogType } from '@hooks/blog/useSelectedBlogType'
import { useTranslation } from '@localization/localize'
import React from 'react'

export const BlogTypeDropdown: React.FC = () => {
  const { t } = useTranslation()
  const [selectedBlogType, setSelectedBlogType] = useSelectedBlogType()

  const options = blogFilterValues.map((optionValue) => ({
    value: optionValue,
    label: t(`blog.filter.options.${optionValue}`),
  }))

  return (
    <Dropdown
      value={selectedBlogType}
      options={options}
      onChange={setSelectedBlogType}
      ariaLabel={t('blog.filter.label')}
    />
  )
}
