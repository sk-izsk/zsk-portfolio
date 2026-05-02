import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'
import { BlogCard, BlogCardBody } from '@components/blog/BlogCard'
import { AllProviders } from '@tests/helpers/AllProviders'

const renderCard = (ui: React.ReactElement) => render(<AllProviders>{ui}</AllProviders>)

describe('BlogCard', () => {
  it('renders title, excerpt, and tags', () => {
    renderCard(
      <BlogCard>
        <BlogCard.Cover imageUrl={null} imageAlt="Post cover" fallbackLabel="New post" />
        <BlogCardBody>
          <BlogCard.Meta publishedAt="2026-05-02T19:30:53.107Z" sourceLabel="Hashnode" />
          <BlogCard.Title>Hashnode Post</BlogCard.Title>
          <BlogCard.Excerpt brief="Useful excerpt text" />
          <BlogCard.Tags
            postId="1"
            tags={[
              { id: 'tag-1', name: 'React', slug: 'react' },
              { id: 'tag-2', name: 'TypeScript', slug: 'typescript' },
            ]}
          />
          <BlogCard.Footer>
            <BlogCard.ReadMore
              href="https://izsk.hashnode.dev/post"
              isExternal={true}
              ariaLabel="Open post"
            >
              Read article
            </BlogCard.ReadMore>
          </BlogCard.Footer>
        </BlogCardBody>
      </BlogCard>,
    )

    expect(screen.getByRole('heading', { name: 'Hashnode Post' })).toBeInTheDocument()
    expect(screen.getByText('Useful excerpt text')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders only the read-more external link', () => {
    renderCard(
      <BlogCard>
        <BlogCardBody>
          <BlogCard.Title>Linked post</BlogCard.Title>
          <BlogCard.Footer>
            <BlogCard.ReadMore
              href="https://izsk.hashnode.dev/post"
              isExternal={true}
              ariaLabel="Open post"
            >
              Read article
            </BlogCard.ReadMore>
          </BlogCard.Footer>
        </BlogCardBody>
      </BlogCard>,
    )

    const link = screen.getByRole('link', { name: 'Open post' })
    expect(link).toHaveAttribute('href', 'https://izsk.hashnode.dev/post')
    expect(link).toHaveAttribute('target', '_blank')
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })

  it('renders nothing for tags when tags array is empty', () => {
    const { container } = renderCard(
      <BlogCard>
        <BlogCardBody>
          <BlogCard.Tags postId="1" tags={[]} />
        </BlogCardBody>
      </BlogCard>,
    )

    expect(container.querySelectorAll('.tag, [class*="tag"]').length).toBe(0)
  })
})
