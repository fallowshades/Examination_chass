import { type ComponentType, type SVGProps, isValidElement } from 'react'
import { cn } from '~/lib/utils';
import href from './icons/sprite.svg'
import { MdMoreTime as IconName} from "react-icons/md";

export { href }
export { IconName }

const sizeClassName = {
	font: 'size-[1em]',
	xs: 'size-3',
	sm: 'size-4',
	md: 'size-5',
	lg: 'size-6',
	xl: 'size-7',
} as const

type Size = keyof typeof sizeClassName

const childrenSizeClassName = {
	font: 'gap-1.5',
	xs: 'gap-1.5',
	sm: 'gap-1.5',
	md: 'gap-2',
	lg: 'gap-2',
	xl: 'gap-3',
} satisfies Record<Size, string>

/**
 * Renders an SVG icon. The icon defaults to the size of the font. To make it
 * align vertically with neighboring text, you can pass the text as a child of
 * the icon and it will be automatically aligned.
 * Alternatively, if you're not ok with the icon being to the left of the text,
 * you need to wrap the icon and text in a common parent and set the parent to
 * display "flex" (or "inline-flex") with "items-center" and a reasonable gap.
 *
 * Pass `title` prop to the `Icon` component to get `<title>` element rendered
 * in the SVG container, providing this way for accessibility.
 */
export function Icon({
  icon: IconComponent,
  size = 'font',
  className,
  title,
  children,
  ...props
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  size?: Size
  className?: string
  title?: string
  children?: React.ReactNode
} & SVGProps<SVGSVGElement>) {
  const icon = (
    <IconComponent
      className={cn(sizeClassName[size], className)}
      aria-hidden={!title}
      aria-label={title}
      {...props}
    />
  )
	if (children) {
		return (
			<span
				className={`inline-flex items-center ${childrenSizeClassName[size]}`}
			>
				 {icon}
				{children}
			</span>
		)
	}
	return (
		<svg
			{...props}
			className={cn(sizeClassName[size], 'inline self-center', className)}
		>
			{title ? <title>{title}</title> : null}
			<use href={`${href}#${name}`} />
		</svg>
	)
}