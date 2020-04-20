import './styles/index.scss';

import EmailsField from './emails-field';
import { IEmailsFieldAPI } from './types';

declare global {
    interface Window {
        EmailsInput: (wrapper: HTMLElement, emails: string[]) => IEmailsFieldAPI | null;
    }
}

window.EmailsInput = (wrapper: HTMLElement, emails: string[]): IEmailsFieldAPI | null => {
    if (!wrapper) return null;
    const emailsField = new EmailsField(wrapper, emails);
    return ({
        addEmail: emailsField.addEmailOutside,
        getEmailsCount: emailsField.getEmailsCount,
        getAllAddedEmails: emailsField.getAllAddedEmails,
        replaceAllEmails: emailsField.replaceAllEmails,
        subscribe: emailsField.subscribe
    });
}