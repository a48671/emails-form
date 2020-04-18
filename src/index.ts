import './styles/index.scss';

import EmailsField from './emails-field';

interface IEmailsFieldAPI {
    addMail: () => void;
    getEmailsCount: () => void;
}

declare global {
    interface Window {
        EmailsInput: (wrapper: HTMLElement) => IEmailsFieldAPI | null;
    }
}

window.EmailsInput = (wrapper: HTMLElement): IEmailsFieldAPI | null => {
    if (!wrapper) return null;
    const emailsField = new EmailsField(wrapper);
    return ({
        addMail: emailsField.addMail,
        getEmailsCount: emailsField.getEmailsCount
    });
}