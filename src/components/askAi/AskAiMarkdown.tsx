import * as styles from '@components/askAi/askAi.css'
import Markdown from 'markdown-to-jsx'
import React from 'react'

interface AskAiMarkdownProps {
  children: string
}

export const AskAiMarkdown: React.FC<AskAiMarkdownProps> = ({ children }) => (
  <div className={styles.markdownContent}>
    <Markdown
      options={{
        disableParsingRawHTML: true,
        overrides: {
          a: {
            props: {
              target: '_blank',
              rel: 'noreferrer',
            },
          },
        },
      }}
    >
      {children}
    </Markdown>
  </div>
)
