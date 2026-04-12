import type { FilterProjectType } from '@hooks/project/useProjectTypeFilteredProjects'
import React from 'react'
import { Modal } from '../common/modal/Modal'

interface Props {
  open: boolean
  onClose: () => void
  project: FilterProjectType
}

export const ProjectModalContainer: React.FC<Props> = ({ open, onClose, project }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Title onClose={onClose}>{project.title}</Modal.Title>
      <Modal.Body>
        <Modal.Description>{project?.shortDescription}</Modal.Description>
        <Modal.Highlights>
          {project.highlights?.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </Modal.Highlights>
      </Modal.Body>
      <Modal.Footer link={project.projectHref} demoLink={project.demoLink} onClose={onClose} />
    </Modal>
  )
}
