import type { FilterBlogPostType } from '@hooks/blog/useBlogTypeFilteredPosts'
import { useTranslation } from '@localization/localize'
import React from 'react'
import { Modal } from '../common/modal/Modal'

interface Props {
  open: boolean
  onClose: () => void
  post: FilterBlogPostType
}

export const BlogModalContainer: React.FC<Props> = ({ open, onClose, post }) => {
  const { t } = useTranslation()

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Title onClose={onClose}>{post.title}</Modal.Title>
      <Modal.Body>
        <Modal.Description>{post.shortDescription}</Modal.Description>
        <Modal.Highlights>
          {post.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </Modal.Highlights>
      </Modal.Body>
      <Modal.Footer link={post.articleHref} linkLabel={t('blog.readArticle')} onClose={onClose} />
    </Modal>
  )
}
