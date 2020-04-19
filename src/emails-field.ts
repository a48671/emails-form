import { IEmailOption } from "./types";
import { validateEmail } from "./utils/validateEmail";
import { createField } from "./components/createField";
import shortid from "shortid";
import { createEmailBlock } from "./components/createEmaileBlock";

class EmailsField {
    state: IEmailOption[];
    input: HTMLInputElement;
    field: HTMLDivElement;
    fieldContainer: HTMLDivElement;
    listeners: ((state: IEmailOption[]) => void)[];
    constructor(private wrapper: HTMLElement, private emails: string[] = []) {
        this.state = [];
        this.addEmailsListToState(emails);
        // mount emails field in wrapper
        if (this.wrapper.children.length) this.wrapper.innerHTML = '';
        this.wrapper.append(createField(this.state));
        this.listeners = [];
        // declaration of the necessary nodes
        this.field = this.wrapper.querySelector('.emails-field') as HTMLDivElement;
        this.fieldContainer = this.wrapper.querySelector('.emails-field__container') as HTMLDivElement;
        this.input = this.wrapper.getElementsByTagName('input')[0];
        // listeners
        document.addEventListener('keydown', (event: KeyboardEvent): void => {
            if (!this.input.value.length) return;
            if (event.code === 'Enter' && this.input && this.input.value.length) {
                this.addEmail(this.input.value);
                this.callListeners();
            }
            if (this.input === document.activeElement && (event.code === 'Comma' || event.code === 'Slash')) {
                event.preventDefault();
                const withoutCommaEmail: string = this.input.value.split(',').join('');
                this.addEmail(withoutCommaEmail);
                this.callListeners();
            }
        });
        document.addEventListener('click', (event: Event): void => {
            const targetElement = event.target as HTMLElement;
            if (targetElement!== this.input && this.input.value.length) {
                this.addEmail(this.input.value);
                this.callListeners();
            }
            if (targetElement && this.wrapper.contains(targetElement) && targetElement.dataset.role === 'remove') {
                const targetBlock: HTMLElement = targetElement.parentNode as HTMLElement;
                this.removeEmail(targetBlock);
                this.callListeners();
            }
            if (targetElement === this.field || targetElement === this.fieldContainer) {
                this.input.focus();
            }
        });
        this.listeners = [];
    };
    private callListeners = () => this.listeners.forEach(listener => listener(this.state));
    private addEmail = (email: string) => {
        this.addEmailInState(email);
        this.addEmailInField(this.state[this.state.length - 1]);
        this.input.value = '';
    };
    private addEmailInState = (email: string): void => {
        this.state.push({value: email, valid: validateEmail(email)});
    };
    private addEmailInField = (email: IEmailOption) => {
        const emailElement = createEmailBlock(email);
        this.input.before(emailElement);
        if (this.field.scrollTop <  this.field.scrollHeight) {
            this.field.scrollTop = this.field.scrollHeight
        }
    }
    private removeEmail = (emailElement: HTMLElement): void => {
        const allBlocks: HTMLElement[] = Array.prototype.slice.call(this.fieldContainer.children);
        const targetBlockIndex = allBlocks.indexOf(emailElement);
        this.state.splice(targetBlockIndex, 1);
        this.fieldContainer.removeChild(emailElement);
    };
    private addEmailsListToState = (emails: string[] = []): void => {
        emails.forEach(email => this.state.push({value: email, valid: validateEmail(email)}));
    }
    public addRandomMail = () => {
        this.addEmail(`${shortid.generate()}@ya.ru`);
        this.callListeners();
    };
    public getEmailsCount = () => {
        const validEmailsCount: number = this.state.filter(email => email.valid).length;
        alert(`${validEmailsCount} valid emails`)
    };
    public getAllAddedEmails = (): string[] => this.state.map(email => email.value)
    public replaceAllEmails = (emails: string[]): void => {
        const emailBlocks = this.fieldContainer.querySelectorAll('.emails-field__added');
        if (emailBlocks && emailBlocks.length) {
            // tslint:disable-next-line
            for (let index = 0; index < emailBlocks.length; index++) {
                const currentEmailBlock: HTMLElement = emailBlocks[index] as HTMLElement;
                this.removeEmail(currentEmailBlock);
            }
        }
        this.state = [];
        emails.map(email => this.addEmail(email));
        this.callListeners();
    };
    public subscribe = (callback: () => void): void => {
        this.listeners.push(callback);
    }
}

export default EmailsField;