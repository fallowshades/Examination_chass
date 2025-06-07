interface NetworkInformation extends Navigator {
  connection?: {
    effectiveType?: string
    saveData?: boolean
  }
}

export function isSlowNetwork() {
  const nav = navigator as NetworkInformation
  return (
    nav.connection &&
    (['slow-2g', '2g'].includes(nav.connection.effectiveType || '') ||
      nav.connection.saveData)
  )
}

// export default isSlowNetwork
