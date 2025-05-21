import * as React from 'react'
import { useRevalidator } from 'react-router'
import { useOptionalRequestInfo, useRequestInfo } from './request-info'

// Dummy fallback 
export function useHints() {
	const requestInfo = useRequestInfo() as { path: string; hints?: unknown }
	return requestInfo.hints // may be undefined or stale
}

export function useOptionalHints() {
	const requestInfo = useOptionalRequestInfo() as { path: string; hints?: unknown }
	return requestInfo?.hints
}

export function ClientHintCheck({ nonce }: { nonce: string }) {
	
	const { revalidate } = useRevalidator()
	React.useEffect(() => {
		// You could set up your own event listeners here
	}, [revalidate])

	return null // No script tag 
}
