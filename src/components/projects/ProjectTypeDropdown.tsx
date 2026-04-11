import React from 'react'
import { useTranslation } from '../../localization/localize'
import type { ProjectFilterType } from '../../types/portfolio'
import { Dropdown } from '../common/dropdown/Dropdown'

const projectFilterValues = [
  'all',
  'full-stack',
  'frontend',
  'backend',
  'library',
  'misc',
] as const satisfies readonly ProjectFilterType[]

interface ProjectTypeDropdownProps {
  value: ProjectFilterType
  onChange: (value: ProjectFilterType) => void
  className?: string
}

export const ProjectTypeDropdown: React.FC<ProjectTypeDropdownProps> = ({
  value,
  onChange,
  className,
}) => {
  const { t } = useTranslation()

  const options = projectFilterValues.map((optionValue) => ({
    value: optionValue,
    label: t(`projects.filter.options.${optionValue}`),
  }))

  return (
    <Dropdown
      value={value}
      options={options}
      onChange={onChange}
      ariaLabel={t('projects.filter.label')}
      className={className}
    />
  )
}
