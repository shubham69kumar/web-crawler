const {normalizeURL , getURLformHTML} = require('./crawl.js')
const {test , expect } = require('@jest/globals')

test('normalizeURl strip protocol' , () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURl strip trailing slash' , () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURl Capital' , () => {
    const input = 'https://bLog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getUTLformHTML' , () => {
    const htmlbody =   `
    <html>
        <body>
            <a href = "https://blog.boot.dev/">
            <a href = "/path/">
            Blog.boot Dev 
        </body>
    </html>

    `
    const input = 'https://blog.boot.dev'
    const actual = getURLformHTML(htmlbody , input)
    const expected = ['https://blog.boot.dev/' , 'https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getUTLformHTML proper url ' , () => {
    const htmlbody =   `
    <html>
        <body>
            <a href = "https://blog.boot.dev/">
            <a href = "/path/">
            <a href = "path">
            Blog.boot Dev 
        </body>
    </html>

    `
    const input = 'https://blog.boot.dev'
    const actual = getURLformHTML(htmlbody , input)
    const expected = ['https://blog.boot.dev/' , 'https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})