interface ICreateElementOptions {
    tag?: string;
    className?: string,
    content?: HTMLElement | string
}

export const createElement = (options: ICreateElementOptions): HTMLElement => {
    const { tag = 'div', className, content } = options;
    const element: HTMLElement = document.createElement(tag);
    if (className) {
        element.classList.add(className);
    }
    if (content) {
        if (typeof content === "object") {
            element.append(content);
        } else {
            element.innerHTML = content;
        }
    }
    return element;
};
