import './styles/index.scss';

import EmailsField from './emails-field';

interface IEmailsFieldAPI {
    addRandomMail: () => void;
    getEmailsCount: () => void;
    getAllAddedEmails: () => void;
    replaceAllEmails: (emails: string[]) => void;
    subscribe: (callback: () => void) => void;
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
        addRandomMail: emailsField.addRandomMail,
        getEmailsCount: emailsField.getEmailsCount,
        getAllAddedEmails: emailsField.getAllAddedEmails,
        replaceAllEmails: emailsField.replaceAllEmails,
        subscribe: emailsField.subscribe
    });
}