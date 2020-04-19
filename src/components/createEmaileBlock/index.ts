import { createElement } from '../../utils/createElement';
import { IEmailOption } from '../../types/index';

export const createEmailBlock = (email: IEmailOption): HTMLElement => {
    const emailBlock: HTMLElement = createElement({
        className: `emails-field__added`,
        content: `${email.value} <span class="emails-field__remove" data-role="remove"></span>`
    });
    if (!email.valid) {
        emailBlock.classList.add('invalid');
    }
    return emailBlock;
}