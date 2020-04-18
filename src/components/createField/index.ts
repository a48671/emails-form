import { createElement } from '../../utils/createElement';
import { createEmailBlock } from '../createEmaileBlock';
import { IEmailOption } from '../../types/index';

export const createField = (options: IEmailOption[]): HTMLElement => {
    // create array with email blocks
    const emailBlocks: HTMLElement[] = options.map(option => createEmailBlock(option));
    // create array input
    const input: HTMLInputElement =  createElement({
        tag: 'input',
        className: 'emails-field__input'
    }) as HTMLInputElement;
    input.placeholder = 'add more people…';
    input.type = 'email';
    // create container for email blocks and input
    const fieldContainer: HTMLElement = createElement({
        className: 'emails-field__container'
    });
    emailBlocks.forEach(block => fieldContainer.append(block));
    fieldContainer.append(input);
    // create main field
    const fieldElement: HTMLElement = createElement({
        className: 'emails-field',
        content: fieldContainer
    });
    return fieldElement;
};