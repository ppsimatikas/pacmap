// Core styles
import '@mantine/core/styles.css'
// Package styles
// import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/charts/styles.css';

import {generateColors} from '@mantine/colors-generator'

import {createTheme} from "@mantine/core";

export const black = '#040307'
export const brandColor = '#0D1932'
export const brand = generateColors(brandColor)
export const lightYellowColor = '#FFF0DC'
export const lightYellow = generateColors(lightYellowColor)
export const blueColor = '#03BCFF'
export const blue = generateColors(blueColor)
export const redColor = '#cc2332'
export const red = generateColors(redColor)
export const gradientColor = 'linear-gradient(90deg, rgba(29,47,134,1) 0%, rgba(226,226,226,1) 49%, rgba(204,35,50,1) 100%)'
export const gradient = {
    from: blueColor,
    to: redColor,
    deg: 141
};

export const theme = createTheme({
    black,

    colors: {
        blue,
        red,
        brand,
        lightYellow
    },
    primaryColor: 'brand',
    fontFamily: 'Roboto, sans-serif',
    fontFamilyMonospace: 'ABCDiatypeSemi-Mono-Medium, monospace',
    headings: {fontFamily: 'ABCDiatype-Medium, sans-serif'},
    components: {
        Tooltip: {
            defaultProps: {
                withArrow: true,
                c: 'white',
                bg: 'rgba(100, 100, 100, 0.9)'
            },
        },
        TextInput: {
            styles: () => ({
                label: {
                    display: 'block',
                    textAlign: 'left',
                },
            }),
        },
        Textarea: {
            styles: () => ({
                label: {
                    display: 'block',
                    textAlign: 'left',
                },
            }),
        },
        Select: {
            styles: () => ({
                label: {
                    display: 'block',
                    textAlign: 'left',
                },
            }),
        },
        Button: {
            styles: () => ({
                root: {
                    backgroundColor: brandColor,
                    border: 'none',
                },
            }),
        },
    },
})