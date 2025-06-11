// export * from '~/routes/$category/products'
// export { default } from '~/routes/$category/products'

export { default } from '~/routes/transaction+/_layout/$searchCategoryCompany/layout'

import { loader } from '~/routes/transaction+/_layout/$searchCategoryCompany/layout.loader.server'

export { loader }
import type { ShouldRevalidateFunction } from 'react-router'
/**
 * does not seem to have any effect when navigating without action
 * but default should do it :/
 * @param param0
 * @returns
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  actionResult,
  currentParams,
  nextParams,
  currentUrl,
  nextUrl,
  formMethod,
  defaultShouldRevalidate,
}) => {
  // Revalidate after a mutation (POST, PUT, etc.)
  if (actionResult && !actionResult.ok) {
    return true
  }

  // Skip revalidation if only the slug/user param changed
  if (currentParams.slug !== nextParams.slug) {
    return false
  }

  // Prevent revalidation for navigation that doesn't change path or query
  if (
    currentUrl.pathname === nextUrl.pathname &&
    currentUrl.search === nextUrl.search
  ) {
    return false
  }

  // Skip GET-based form navigations
  if (formMethod === 'GET') {
    return false
  }

  // Fallback to Remix's default behavior
  return defaultShouldRevalidate //;/projects/123 / tasks / abc /--> to url--> projects / 123 / tasks / def
}
