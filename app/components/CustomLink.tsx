import { Link, useMatch, useResolvedPath } from 'react-router'
import type { LinkProps } from 'react-router'
const CustomLink = ({
  className,
  children,
  to,
  ...props
}: LinkProps & { className: string }) => {
  let resolved = useResolvedPath(to)
  let match = useMatch({ path: resolved.pathname, end: true })

  return (
    <>
      <Link
        className={className}
        style={{ textDecoration: match ? 'underline' : 'none' }}
        to={to}
        {...props}>
        {children}
      </Link>
    </>
  )
}

export default CustomLink
