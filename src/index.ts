import './styles/index.scss';

import { createField } from './components/createField';
import { IEmailOption } from './types';
import { validateEmail } from './utils/validateEmail';

interface IEmailsInputAPI {
    addMail: any;
    getEmailsCount: any;
}

declare global {
    interface Window {
        EmailsInput: any;
    }
}

window.EmailsInput = (inputContainerNode: HTMLDivElement, options: IEmailOption[]): IEmailsInputAPI | null  => {

    const state: IEmailOption[] = options;

    if (!inputContainerNode) return null;
    const keyUpHandler = (event: KeyboardEvent): void => {
        const input: HTMLInputElement = inputContainerNode.getElementsByTagName('input')[0];
        if (!input.value.length) return;
        if (event.code === 'Enter' && input && input.value.length) {
            addEmailInState(input.value);
        }
        if (input === document.activeElement && (event.code === 'Comma' || event.code === 'Slash')) {
            event.preventDefault();
            addEmailInState(input.value.split(',').join(''));
        }
    };
    document.addEventListener('keydown', keyUpHandler);
    document.addEventListener('click', (event: Event): void => {
        const input: HTMLInputElement = inputContainerNode.getElementsByTagName('input')[0];
        const targetElement = event.target as HTMLElement;
        if (targetElement!== input && input.value.length) {
            addEmailInState(input.value, false);
        }
        if (targetElement && inputContainerNode.contains(targetElement) && targetElement.tagName === 'SPAN') {
            const targetBlock: HTMLElement = targetElement.parentNode as HTMLElement;
            removeEmailFromState(targetBlock);
        }
        if (targetElement.classList.contains('emails-field')) {
            input.focus();
        }
    });
    const addEmailInState = (email: string, focus: boolean = true): void => {
        state.push({email, valid: validateEmail(email)});
        render();
        if (focus) focusingOnInput();
    };
    const removeEmailFromState = (emailElement: HTMLElement): void => {
        const fieldContainer: HTMLElement = inputContainerNode.querySelector('.emails-field__container') as HTMLElement;
        const allBlocks: HTMLElement[] = Array.prototype.slice.call(fieldContainer.children);
        const targetBlockIndex = allBlocks.indexOf(emailElement);
        state.splice(targetBlockIndex, 1);
        render();
    };
    const focusingOnInput = (): void => {
        const input: HTMLInputElement = inputContainerNode.getElementsByTagName('input')[0];
        if (input) {
            input.focus();
        }
    };
    const render = (): void => {
        inputContainerNode.innerHTML = '';
        inputContainerNode.append(createField(state));
        const field: HTMLElement | null = inputContainerNode.querySelector('.emails-field');
        if (field) {
            field.scrollTop = field.scrollHeight
        }
    };
    render();
    return ({
        addMail: () => alert('addMail'),
        getEmailsCount: () => alert('getEmailsCount')
    })
}