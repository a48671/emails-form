import { IEmailOption } from "./types";
import { validateEmail } from "./utils/validateEmail";
import { createField } from "./components/createField";
import shortid from "shortid";

class EmailsField {
    state: IEmailOption[];
    constructor(private wrapper: HTMLElement, private emails: string[] = []) {
        this.state = [];
        this.addEmailsListToState(emails);
        if (!this.wrapper) return;
        const keyUpHandler = (event: KeyboardEvent): void => {
            const input: HTMLInputElement = this.wrapper.getElementsByTagName('input')[0];
            if (!input.value.length) return;
            if (event.code === 'Enter' && input && input.value.length) {
                this.addEmailInState(input.value);
                this.render();
                this.focusingOnInput();
            }
            if (input === document.activeElement && (event.code === 'Comma' || event.code === 'Slash')) {
                event.preventDefault();
                this.addEmailInState(input.value.split(',').join(''));
                this.render();
                this.focusingOnInput();
            }
        };
        document.addEventListener('keydown', keyUpHandler);
        document.addEventListener('click', (event: Event): void => {
            const input: HTMLInputElement = this.wrapper.getElementsByTagName('input')[0];
            const targetElement = event.target as HTMLElement;
            if (targetElement!== input && input.value.length) {
                this.addEmailInState(input.value, false);
                this.render();
            }
            if (targetElement && this.wrapper.contains(targetElement) && targetElement.tagName === 'SPAN') {
                const targetBlock: HTMLElement = targetElement.parentNode as HTMLElement;
                this.removeEmailFromState(targetBlock);
                this.render();
            }
            if (targetElement.classList.contains('emails-field')) {
                input.focus();
            }
        });
        this.render();
    }
    private addEmailInState = (email: string, focus: boolean = true): void => {
        this.state.push({email, valid: validateEmail(email)});
    };
    private removeEmailFromState = (emailElement: HTMLElement): void => {
        const fieldContainer: HTMLElement = this.wrapper.querySelector('.emails-field__container') as HTMLElement;
        const allBlocks: HTMLElement[] = Array.prototype.slice.call(fieldContainer.children);
        const targetBlockIndex = allBlocks.indexOf(emailElement);
        this.state.splice(targetBlockIndex, 1);
    };
    private focusingOnInput = (): void => {
        const input: HTMLInputElement = this.wrapper.getElementsByTagName('input')[0];
        if (input) {
            input.focus();
        }
    };
    private render = (): void => {
        this.wrapper.innerHTML = '';
        this.wrapper.append(createField(this.state));
        const field: HTMLElement | null = this.wrapper.querySelector('.emails-field');
        if (field) {
            field.scrollTop = field.scrollHeight
        }
    };
    private addEmailsListToState = (emails: string[] = []): void => {
        emails.forEach(email => this.state.push({email, valid: validateEmail(email)}));
    }
    public addMail = () => {
        this.addEmailInState(`${shortid.generate()}@gmail.com`);
        this.render();
    };
    public getEmailsCount = () => {
        const validEmailsCount: number = this.state.filter(email => email.valid).length;
        alert(`${validEmailsCount} valid emails`)
    };
}

export default EmailsField;