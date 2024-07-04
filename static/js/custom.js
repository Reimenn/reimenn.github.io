function CreateTitle(type,title) {
    const p = document.createElement("p")
    p.classList.add("title")

    const iconSpan = document.createElement("span")
    iconSpan.innerText = type.toUpperCase()
    iconSpan.classList.add("icon")
    const titleSpan = document.createElement("span")
    titleSpan.innerText = title
    titleSpan.classList.add("text")
    p.append(iconSpan)
    p.append(titleSpan)
    return p
}


const blockquote = document.querySelectorAll("div.post-content blockquote")
blockquote.forEach(block => {
    const title = block.querySelector("p")
    const titleText = title.textContent
    const match = titleText.match(/\[!(.*?)](.*)/)
    if (match === null)
        return
    const newTitle = CreateTitle(match[1],match[2])
    block.classList.add("admonish-obsidian-style")
    block.classList.add("admonition-" + match[1])
    block.removeChild(title)

    const div = document.createElement("div");
    div.classList.add("body")
    while(block.childElementCount > 0) {
        const node = block.childNodes[1]
        block.removeChild(node)
        div.append(node)
    }
    block.append(newTitle)
    block.append(div)
})

const titleImgs = document.querySelectorAll("div.post-content img[src*='#title']")
titleImgs.forEach(img => {
    const alt = img.getAttribute("alt")
    const p = document.createElement('p')
    p.classList.add("img-title")
    p.innerText = alt
    img.parentElement.appendChild(p)
})