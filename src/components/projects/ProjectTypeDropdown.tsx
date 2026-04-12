import { Dropdown } from '@components/common/dropdown/Dropdown'
import { projectFilterValues, useSelectedProjectType } from '@hooks/project/useSelectedProjectType'
import { useTranslation } from '@localization/localize'
import React from 'react'

export const ProjectTypeDropdown: React.FC = () => {
  const { t } = useTranslation()
  const [selectedProjectType, setSelectedProjectType] = useSelectedProjectType()

  const options = projectFilterValues.map((optionValue) => ({
    value: optionValue,
    label: t(`projects.filter.options.${optionValue}`),
  }))

  return (
    <Dropdown
      value={selectedProjectType}
      options={options}
      onChange={setSelectedProjectType}
      ariaLabel={t('projects.filter.label')}
    />
  )
}
