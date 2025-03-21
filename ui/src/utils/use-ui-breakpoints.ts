import {useMantineTheme} from '@mantine/core'
import {useMediaQuery} from '@mantine/hooks'

export function useUiBreakpoints() {
  const { breakpoints } = useMantineTheme()
  const isXs = useMediaQuery(`(max-width: ${breakpoints.xs})`)
  const isSm = useMediaQuery(`(max-width: ${breakpoints.sm})`)
  const isMd = useMediaQuery(`(max-width: ${breakpoints.md})`)
  const isLg = useMediaQuery(`(max-width: ${breakpoints.lg})`)
  const isXl = useMediaQuery(`(max-width: ${breakpoints.xl})`)

  return {
    isXs: isXs ?? false,
    isSm: isSm ?? false,
    isMd: isMd ?? false,
    isLg: isLg ?? false,
    isXl: isXl ?? false,
  }
}
