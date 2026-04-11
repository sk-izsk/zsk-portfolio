import { Code, Cog, FlaskConical, GraduationCap, Laptop, Server } from 'lucide-react'
import React from 'react'
import { useTranslation } from '@localization/localize'
import { useSkills } from '@stores/portfolioStore'
import { SkillsTagSection } from '@components/skills/SkillsTagSection'

export const SkillsTag: React.FC = () => {
  const { t } = useTranslation()
  const categories = useSkills()?.categories

  if (!categories) {
    return null
  }

  return (
    <>
      <SkillsTagSection
        icon={Laptop}
        titleText={t('skills.tags.frontend')}
        tags={categories.frontend ?? []}
      />
      <SkillsTagSection
        icon={Server}
        titleText={t('skills.tags.backend')}
        tags={categories.backend ?? []}
      />
      <SkillsTagSection
        icon={Code}
        titleText={t('skills.tags.languages')}
        tags={categories.languages ?? []}
      />
      <SkillsTagSection
        icon={Cog}
        titleText={t('skills.tags.tools')}
        tags={categories.tools ?? []}
      />
      <SkillsTagSection
        icon={FlaskConical}
        titleText={t('skills.tags.testing')}
        tags={categories.testing ?? []}
      />
      <SkillsTagSection
        icon={GraduationCap}
        titleText={t('skills.tags.learning')}
        tags={categories.learning ?? []}
      />
    </>
  )
}
