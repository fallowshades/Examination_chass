
import { cn } from '~/lib/utils'
import { Button, type ButtonVariants } from './button'
import { Icon } from './icon'


export const StatusButton = ({
	message,
	status,
	className,
	children,
	spinDelay,
	...props
}: React.ComponentProps<'button'> &
	ButtonVariants & {
		status: 'pending' | 'success' | 'error' | 'idle'
		message?: string | null
		spinDelay?: never
	}) => {


	return (
		<Button className={cn('flex justify-center gap-4', className)} {...props}>
			<div>{children}</div>
			mess
		</Button>
	)
}
StatusButton.displayName = 'Button'