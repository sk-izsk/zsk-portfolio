# Portfolio Data Structure Guide

This describes the actual data architecture used by this portfolio application.

## Overview

Portfolio data is split across three static JSON files in `/public/`. This separation keeps language-agnostic data (URLs, dates, tags) in one place and translated content (titles, descriptions) in separate files per locale. The files are merged at runtime via `usePortfolioData`.

```text
public/
├── portfolio-data-common.json          # Language-agnostic data
├── portfolio-data-translations-en.json # English content
└── portfolio-data-translations-fr.json # French content
```

## Data Sections

### `personalInfo`

Basic identity fields. Non-translatable values (avatar URL, resume link, location, birthday) live in `common`. Translatable fields (bio, segments, name) live in translation files.

### `contact`

All in `common`. Social links keyed by platform (`github`, `linkedin`, etc.).

### `skills`

All in `common`. Contains `technical` (array of `{ name, level, category }`) and `categories` (grouped lists for UI rendering).

### `education`

Base duration in `common` (by `id`). Degree name and description in translation files (matched by `id`).

### `experience`

Base company/position/duration in `common`. Description and highlights array in translation files.

### `services`

Base icon in `common`. Title and description in translation files.

### `projects`

Base URL and tags in `common`. Title, excerpt, shortDescription, highlights in translation files.

## Project Interface

```ts
interface Project {
  id: number
  title: string
  url?: string // GitHub or source link — drives the 'Project Link' button
  demo_link?: string // Optional live URL — drives the 'Live Demo' button (only shown if present)
  excerpt: string
  shortDescription: string
  highlights: string[]
  category: string
  tags: string[]
  publishDate: string
}
```

The `demo_link` field is intentionally optional. Only the portfolio project (id 6) has a `demo_link` set to `https://izsk.netlify.app`. Any project without this field will simply not render the Demo button in the modal.

## Updating Data

1. Edit the relevant JSON file(s) in `/public/`.
2. No code changes needed — React Query and the store automatically pick up the new data on next fetch.
3. If adding a new project, add the base entry (url, tags, publishDate, demo_link if applicable) to `common` and the translatable content to both EN and FR files with a matching `id`.

## Adding a New Language

1. Create `portfolio-data-translations-[locale].json` following the same structure as `en.json`.
2. Register the locale in `src/localization/localize.ts`.
3. The merge logic in `usePortfolioData` will automatically compose the full data object.

## Overview

The portfolio data is stored in `/public/portfolio-data.json` and can be accessed from any React component using the provided custom hooks and utilities.

## File Structure

```text
src/
├── types/portfolio.ts           # TypeScript interfaces
├── hooks/usePortfolioData.ts    # Custom React hook
├── components/
│   ├── PortfolioExample.tsx     # Example usage component
│   └── PortfolioExample.css     # Styling for example
public/
└── portfolio-data.json          # Main data file
```

## Data Structure

### Main Sections

1. **personalInfo** - Basic personal information, bio, avatar, location
2. **contact** - Email, phone, social media links
3. **skills** - Technical skills with progress levels and categories
4. **education** - Educational background with timeline
5. **experience** - Work experience with achievements and technologies
6. **services** - Services offered with descriptions and features
7. **projects** - Portfolio projects (currently empty as requested)
8. **testimonials** - Client/colleague testimonials
9. **blog** - Blog posts with categories and tags
10. **portfolio** - Photo gallery
11. **offerings** - Detailed service offerings for frontend/backend
12. **meta** - Metadata, theme settings, SEO information

## Usage Examples

### Basic Usage

```tsx
import React from 'react'
import { usePortfolioData } from '../hooks/usePortfolioData'

export const MyComponent: React.FC = () => {
  const { loading, data, error } = usePortfolioData()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data available</div>

  return (
    <div>
      <h1>{data.personalInfo.name}</h1>
      <p>{data.personalInfo.title}</p>
    </div>
  )
}
```

### Using Utility Functions

```tsx
import {
  usePortfolioData,
  getCurrentExperience,
  getSkillsByCategory,
  getFeaturedBlogPosts,
} from '../hooks/usePortfolioData'

export const Dashboard: React.FC = () => {
  const { data } = usePortfolioData()

  if (!data) return null

  const currentJob = getCurrentExperience(data)
  const frontendSkills = getSkillsByCategory(data, 'frontend')
  const featuredPosts = getFeaturedBlogPosts(data)

  return (
    <div>
      {currentJob && (
        <section>
          <h2>Current Position</h2>
          <h3>
            {currentJob.position} at {currentJob.company}
          </h3>
        </section>
      )}

      <section>
        <h2>Frontend Skills</h2>
        {frontendSkills.map((skill) => (
          <div key={skill.name}>
            {skill.name}: {skill.level}%
          </div>
        ))}
      </section>

      <section>
        <h2>Featured Blog Posts</h2>
        {featuredPosts.map((post) => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
```

### Working with Skills

```tsx
// Get all skills
const allSkills = data.skills.technical;

// Filter by category
const backendSkills = data.skills.technical.filter(skill => skill.category === 'backend');

// Get skill categories
const skillCategories = data.skills.categories;

// Render skills with progress bars
{data.skills.technical.map(skill => (
  <div key={skill.name} className="skill-item">
    <span>{skill.name}</span>
    <div className="progress-bar">
      <div
        className="progress"
        style={{
          width: \`\${skill.level}%\`,
          backgroundColor: skill.color
        }}
      />
    </div>
    <span>{skill.level}%</span>
  </div>
))}
```

### Working with Experience

```tsx
// Get all experience
const allExperience = data.experience

// Get current job
const currentJob = data.experience.find((exp) => exp.current)

// Get experience by type
const fullTimeJobs = data.experience.filter((exp) => exp.type === 'full-time')

// Render experience timeline
{
  data.experience.map((exp) => (
    <div key={exp.id} className="experience-item">
      <h3>
        {exp.position} at {exp.company}
      </h3>
      <span>{exp.duration}</span>
      <p>{exp.description}</p>
      <div className="technologies">
        {exp.technologies.map((tech) => (
          <span key={tech} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
    </div>
  ))
}
```

### Working with Services

```tsx
// Render services grid
{
  data.services.map((service) => (
    <div key={service.id} className="service-card">
      <i className={service.icon}></i>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <ul>
        {service.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  ))
}
```

### Working with Blog Posts

```tsx
// Get recent posts
const recentPosts = data.blog.slice(0, 3)

// Get posts by category
const reactPosts = data.blog.filter((post) => post.category === 'React')

// Get posts with specific tag
const typescriptPosts = data.blog.filter((post) => post.tags.includes('TypeScript'))

// Render blog grid
{
  data.blog.map((post) => (
    <article key={post.id} className="blog-post">
      <img src={post.image} alt={post.title} />
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <span>{post.readTime}</span>
      <div className="tags">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </article>
  ))
}
```

## TypeScript Support

The data structure includes comprehensive TypeScript interfaces:

- `PortfolioData` - Main interface for the entire data structure
- `PersonalInfo` - Personal information section
- `ContactInfo` - Contact details and social links
- `Skill` - Individual skill with progress and color
- `Experience` - Work experience entry
- `Service` - Service offering
- `BlogPost` - Blog post entry
- And many more...

## Customization

### Adding New Data

1. **Skills**: Add to `skills.technical` array with appropriate category
2. **Experience**: Add to `experience` array with all required fields
3. **Services**: Add to `services` array with features and technologies
4. **Blog Posts**: Add to `blog` array with proper metadata

### Theme Colors

Update theme colors in the `meta.theme` section:

```json
{
  "meta": {
    "theme": {
      "primaryColor": "#ec1839",
      "secondaryColor": "#1854b4",
      "colorSchemes": [
        { "name": "Red", "value": "#ec1839" },
        { "name": "Blue", "value": "#1854b4" }
      ]
    }
  }
}
```

### SEO Configuration

Update SEO settings in `meta.seo`:

```json
{
  "meta": {
    "seo": {
      "title": "Your Name - Full Stack Developer",
      "description": "Your professional description",
      "keywords": ["React", "TypeScript", "Developer"]
    }
  }
}
```

## Best Practices

1. **Loading States**: Always handle loading and error states
2. **Type Safety**: Use TypeScript interfaces for type checking
3. **Performance**: Use React.memo() for components that render large lists
4. **Accessibility**: Include proper alt text for images and ARIA labels
5. **SEO**: Use the meta information for page titles and descriptions

## Integration with External Portfolios

This data structure is designed to work with:

1. **Modern Portfolio Website** (HTML/CSS/JS)
2. **vCard Portfolio** (HTML/CSS/JS)
3. **Your React Applications**

The JSON structure can be easily consumed by any JavaScript application, making it a single source of truth for all your portfolio websites.

## File Updates

To update your portfolio data:

1. Edit `/public/portfolio-data.json`
2. The changes will be automatically reflected in all components using `usePortfolioData()`
3. No code changes required for data updates

## Example Live Usage

See `src/components/PortfolioExample.tsx` for a complete example of how to use all sections of the portfolio data in a React component.
