import { useMatches } from 'react-router'


/**
 * loader vs cashe header, we concluded what can do for exports
 */
interface Match {
  pathname: string
//   params: Params<string>
//   data: RouteData
  handle: any
}

type MatchData = { flash?: string };

export function useFlashMessages(): string[] {
  return useMatches()
    .map((match) => match.data as MatchData)
    .filter((data): data is { flash: string } => Boolean(data?.flash))
    .map((data) => data.flash)
}
// headers: https://sergiodxa.com/articles/the-usematches-hook-in-remix

function useParentData(pathname: string): unknown {
  let matches = useMatches()
  let parentMatch = matches.find((match) => match.pathname === pathname)
  if (!parentMatch) return null
  return parentMatch.data
}


// function handleBlur(event) {
//   // get the input element
//   let $input = event.currentTarget
//   // get the value
//   let value = $input.value
// }

//  function validate(event: FocusEvent<HTMLInputElement>) {
//    let $input = event.currentTarget // get the input
//    let value = $input.value // get the value
//    let isValid = value.trim().length > 0 // validate it
//    // set the error message if it's invalid or set `""` if it's valid
//    $input.setCustomValidity(isValid ? '' : "It can't be empty.")
//    // check if it's valid or not to update the state
//    if ($input.checkValidity()) setError('')
//    else setError($input.validationMessage)
//  }