import './styles/index.scss';

import EmailsField from './emails-field';

interface IEmailsFieldAPI {
    addMail: () => void;
    getEmailsCount: () => void;
}

declare global {
    interface Window {
        EmailsInput: (wrapper: HTMLElement, emails: string[]) => IEmailsFieldAPI | null;
    }
}

window.EmailsInput = (wrapper: HTMLElement, emails: string[]): IEmailsFieldAPI | null => {
    if (!wrapper) return null;
    const emailsField = new EmailsField(wrapper, emails);
    return ({
        addMail: emailsField.addMail,
        getEmailsCount: emailsField.getEmailsCount
    });
}