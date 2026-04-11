import { Code, Cog, Laptop, Server } from 'lucide-react'
import React from 'react'
import { useTranslation } from '@localization/localize'
import { SkillsRateSection } from '@components/skills/SkillsRateSection'

export const SkillsRate: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="row">
        <SkillsRateSection
          icon={Laptop}
          titleText={t('skills.rate.frontend')}
          category="frontend"
        />
        <SkillsRateSection icon={Server} titleText={t('skills.rate.backend')} category="backend" />
      </div>
      <div className="row">
        <SkillsRateSection icon={Code} titleText={t('skills.rate.languages')} category="language" />
        <SkillsRateSection icon={Cog} titleText={t('skills.rate.tools')} category="tools" />
      </div>
    </>
  )
}
