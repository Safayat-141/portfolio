/**
 * Wraps page content with consistent max-width and padding.
 * Nav and Footer are rendered once at the App root (Stage 9), not per-page —
 * PageWrapper only controls the content area between them.
 *
 * Usage:
 *   <PageWrapper>...</PageWrapper>            // standard width
 *   <PageWrapper narrow>...</PageWrapper>      // narrower reading measure,
 *                                              // for text-heavy pages like
 *                                              // About or WorkDetail body copy
 */
export default function PageWrapper({ children, narrow = false }) {
  return (
    <div className="page-wrapper">
      <main
        className={
          narrow
            ? 'page-wrapper__content page-wrapper__content--narrow'
            : 'page-wrapper__content'
        }
      >
        {children}
      </main>
    </div>
  );
}
