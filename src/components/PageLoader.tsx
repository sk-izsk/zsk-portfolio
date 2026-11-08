import * as styles from '@components/pageLoader.css'

const BAR_DELAYS = [0, 0.1, 0.2, 0.3, 0.4]

// Plain CSS bars in the theme colour, instead of a spinner library that pulled styled-components into
// the first chunk.
export const PageLoader = () => (
  <div className="page-loader">
    <div className="loading" role="status" aria-label="Loading">
      <div className={styles.bars}>
        {BAR_DELAYS.map((delay) => (
          <span key={delay} className={styles.bar} style={{ animationDelay: `${delay}s` }} />
        ))}
      </div>
    </div>
  </div>
)
