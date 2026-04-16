import type { ProjectFilterType } from '../../types/portfolio'
import { useHandleParams } from '../useHandleParams'

export const projectFilterValues = [
  'all',
  'full-stack',
  'frontend',
  'backend',
  'library',
  'ai-skill',
  'misc',
] as const satisfies readonly ProjectFilterType[]

export const useSelectedProjectType = (): [
  ProjectFilterType,
  (value: ProjectFilterType) => void,
] => {
  const { currentParams, updateParams, clearParams } = useHandleParams<{
    projectType: ProjectFilterType
  }>()

  const selectedProjectType: ProjectFilterType = projectFilterValues.includes(
    currentParams.projectType as ProjectFilterType,
  )
    ? (currentParams.projectType as ProjectFilterType)
    : 'all'

  const setSelectedProjectType = (value: ProjectFilterType) => {
    if (value === 'all') {
      clearParams(['projectType'])
      return
    }

    updateParams({ projectType: value })
  }

  return [selectedProjectType, setSelectedProjectType]
}
