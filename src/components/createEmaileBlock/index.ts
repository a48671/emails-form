import { createElement } from '../../utils/createElement';
import { IEmailOption } from '../../types/index';

export const createEmailBlock = (emailData: IEmailOption): HTMLElement => {
    const emailBlock: HTMLElement = createElement({
        className: `emails-field__added`,
        content: `${emailData.email} <span></span>`
    });
    if (!emailData.valid) {
        emailBlock.classList.add('invalid');
    }
    return emailBlock;
}