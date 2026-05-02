import React from 'react'
import { Dropdown, type DropdownOption } from '@components/common/dropdown/Dropdown'
import { useTranslation } from '@localization/localize'

interface BlogTagFilterDropdownProps {
  options: DropdownOption<string>[]
  value: string
  onChange: (value: string) => void
}

export const BlogTagFilterDropdown: React.FC<BlogTagFilterDropdownProps> = ({
  options,
  value,
  onChange,
}) => {
  const { t } = useTranslation()

  return (
    <Dropdown
      value={value}
      options={options}
      onChange={onChange}
      ariaLabel={t('blog.filter.label')}
    />
  )
}
